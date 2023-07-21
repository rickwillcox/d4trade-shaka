import { api } from "@/utils/api";
import { Button } from "@chakra-ui/react";
import { signIn, signOut, useSession } from "next-auth/react";

export default function AuthButton() {
  const { data: sessionData } = useSession();
  return (
    <div>
      <Button
        onClick={sessionData ? () => void signOut() : () => void signIn()}
      >
        {sessionData ? "Sign out" : "Sign in"}
      </Button>
    </div>
  );
}
