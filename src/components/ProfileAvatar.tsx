import { Avatar, AvatarBadge, AvatarGroup } from "@chakra-ui/react";
import { useSession } from "next-auth/react";

export default function ProfileAvatar() {
  const { data: sessionData } = useSession();

  return <Avatar name={sessionData?.user?.name ?? "?"} />;
}
