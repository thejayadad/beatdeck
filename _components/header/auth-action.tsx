// components/header/auth-action.tsx (server)
import Image from "next/image";
import { auth } from "@/auth";
import { signInWithGoogle, signOutUser } from "@/lib/user-auth";
import IconPendingButton from "./pending-btn";

export default async function AuthAction() {
  const session = await auth();
  const user = session?.user;

  if (!user) {
    return (
      <div className="flex items-center gap-2">
        {/* mobile: icon-only */}
        <form action={signInWithGoogle} className="sm:hidden">
          <IconPendingButton ariaLabel="Sign in" icon="log-in" size="sm" variant="neutral" />
        </form>
        {/* desktop: icon + label */}
        <form action={signInWithGoogle} className="hidden sm:block">
          <IconPendingButton ariaLabel="Sign in" icon="log-in" label="Sign in" size="sm" variant="neutral" />
        </form>
      </div>
    );
  }



  return (
    <div className="flex items-center gap-2">

      {/* mobile: icon-only sign out */}
      <form action={signOutUser} className="sm:hidden">
        <IconPendingButton ariaLabel="Sign out" icon="log-out" size="sm" variant="ghost" />
      </form>
      {/* desktop: icon + label sign out */}
      <form action={signOutUser} className="hidden sm:block">
        <IconPendingButton ariaLabel="Sign out" icon="log-out" label="Sign out" size="sm" variant="ghost" />
      </form>
    </div>
  );
}
