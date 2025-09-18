// app/actions/tracks/create-track.ts
"use server";

import { z } from "zod";
import { put } from "@vercel/blob";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

// ----- Zod input schema (FormData) -----
const VisibilityEnum = z.enum(["PUBLIC", "UNLISTED", "PRIVATE"]);

const CreateTrackSchema = z.object({
  name: z.string().trim().min(1, "Name is required").max(120),
  visibility: VisibilityEnum.default("PUBLIC"),
  bpm: z.preprocess((v) => (v === "" ? undefined : Number(v)), z.number().int().positive().max(400).optional()),
  key: z.preprocess((v) => (typeof v === "string" ? v.trim() : v), z.string().min(1).max(12).optional()),
  durationSec: z.preprocess((v) => (v === "" ? undefined : Number(v)), z.number().int().positive().max(60 * 60 * 4).optional()),
  tags: z
    .preprocess((v) => (typeof v === "string" ? v : ""), z.string())
    .transform((s) => s.split(",").map((t) => t.trim()).filter(Boolean)),
});

type CreateTrackInput = z.infer<typeof CreateTrackSchema>;

function assertFile(file: unknown, kind: "audio" | "image") {
  if (!(file instanceof File)) throw new Error(`${kind} file is required`);
  if (kind === "audio" && !file.type.startsWith("audio/")) throw new Error("Audio must be audio/*");
  if (kind === "image" && !file.type.startsWith("image/")) throw new Error("Cover image must be image/*");
  // soft size caps (adjust to your plan limits)
  const bytes = file.size;
  if (kind === "audio" && bytes > 50 * 1024 * 1024) throw new Error("Audio file too large (max 50MB)");
  if (kind === "image" && bytes > 8 * 1024 * 1024) throw new Error("Image file too large (max 8MB)");
  return file;
}

// ----- Main server action -----
export async function createTrackAction(formData: FormData) {
  // 1) Require auth
  const session = await auth();
  const userEmail = session?.user?.email;
  if (!userEmail) {
    return { ok: false as const, error: "Unauthorized" };
  }

  try {
    // 2) Parse scalar fields with Zod
    const input: CreateTrackInput = CreateTrackSchema.parse({
      name: formData.get("name"),
      visibility: formData.get("visibility"),
      bpm: formData.get("bpm"),
      key: formData.get("key"),
      durationSec: formData.get("durationSec"),
      tags: formData.get("tags") ?? "",
    });

    // 3) Extract and validate files
    const audio = assertFile(formData.get("audio"), "audio");
    const image = assertFile(formData.get("image"), "image");

    // 4) Upload to Vercel Blob (public)
    //    Path pattern keeps things tidy; feel free to change the foldering
    const idPrefix = crypto.randomUUID();
    const safeName = input.name.replace(/[^\w\-]+/g, "-").slice(0, 80) || "track";

    const audioKey = `tracks/${userEmail}/${idPrefix}-${safeName}`;
    const imageKey = `covers/${userEmail}/${idPrefix}-${safeName}`;

    const [audioBlob, imageBlob] = await Promise.all([
      put(audioKey, audio, {
        access: "public",
        contentType: audio.type || "audio/mpeg",
        token: process.env.BLOB_READ_WRITE_TOKEN,
      }),
      put(imageKey, image, {
        access: "public",
        contentType: image.type || "image/jpeg",
        token: process.env.BLOB_READ_WRITE_TOKEN,
      }),
    ]);

    // 5) Create DB row
    const created = await prisma.track.create({
      data: {
        name: input.name,
        userEmail,
        audioUrl: audioBlob.url, // store full public URL (or .pathname if you prefer)
        imageUrl: imageBlob.url,
        durationSec: input.durationSec,
        bpm: input.bpm,
        key: input.key,
        tags: input.tags,
        visibility: input.visibility,
      },
      select: { id: true, name: true },
    });

    // 6) Revalidate any lists you show (optional)
    revalidatePath("/library");
    revalidatePath("/");

    return { ok: true as const, id: created.id, name: created.name };
  } catch (err) {
    const message = err instanceof Error ? err.message : "Upload failed";
    return { ok: false as const, error: message };
  }
}
