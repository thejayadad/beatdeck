// @/_components/auth/SignInForm.tsx
import { signInWithGoogle } from "@/lib/user-auth";
import IconPendingButton from "./pending-btn";

export default function SignInForm() {
  return (
    <form>
      <IconPendingButton
        ariaLabel="Sign in"
        icon="log-in"
        label="Sign in"
        size="sm"
        variant="neutral"
        formAction={signInWithGoogle}
      />
    </form>
  );
}
