import { signIn, signOut, useSession } from "next-auth/react";
import { api } from "@/utils/api";
import ItemUploadContainer from "@/components/ItemUploadContainer";
import AccountHeader from "@/components/AccountHeader";
import AuthButton from "@/components/AuthButton";

export default function Home() {
  const { data: sessionData } = useSession();

  return (
    <div className="p-5">
      <AccountHeader />
      {!sessionData && <AuthButton />}
      <ItemUploadContainer />
    </div>
  );
}
