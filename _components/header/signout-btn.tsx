// @/_components/auth/SignOutForm.tsx
import { signOutUser } from "@/lib/user-auth";
import IconPendingButton from "./pending-btn";

export default function SignOutForm() {
  return (
    <form>
      <IconPendingButton
        ariaLabel="Sign out"
        icon="log-out"
        label="Sign out"
        size="sm"
        variant="ghost"
        formAction={signOutUser}
      />
    </form>
  );
}
