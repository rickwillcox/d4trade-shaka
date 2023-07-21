import { api } from "@/utils/api";
import { useSession } from "next-auth/react";
import { Text } from "@chakra-ui/react";

export default function AccountName() {
  const { data: sessionData } = useSession();

  return sessionData && <Text>Logged in as {sessionData.user?.name}</Text>;
}
