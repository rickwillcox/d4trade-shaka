import { Avatar } from "@chakra-ui/react";
import { useSession } from "next-auth/react";

export default function ProfileAvatar() {
  const { data: sessionData } = useSession();

  return (
    <Avatar
      name={sessionData?.user?.name ?? "?"}
      src={sessionData?.user?.image ?? ""}
      border="2px solid #2D3748"
      size="md"
      p={1}
    />
  );
}
