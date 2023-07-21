import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  HStack,
  Avatar,
} from "@chakra-ui/react";
import { signIn, signOut, useSession } from "next-auth/react";
import { profileIcons } from "@/common";
import { useRouter } from "next/router";
import { api } from "@/utils/api";

interface Props {
  children?: React.ReactNode;
}

export default function AccountMenu(props: Props) {
  const { children } = props;
  const { data: sessionData } = useSession();
  const { updateProfileAvatar } = useUpdateProfileAvatar();

  return (
    <Menu>
      {({ isOpen }) => (
        <>
          <MenuButton>{children}</MenuButton>
          <MenuList>
            <MenuItem>Profile</MenuItem>
            <MenuItem>Settings</MenuItem>
            <MenuItem
              onClick={sessionData ? () => void signOut() : () => void signIn()}
            >
              {sessionData ? "Sign Out" : "Sign In"}
            </MenuItem>
            <MenuItem>
              <HStack spacing={2}>
                {Object.entries(profileIcons).map(([key, icon]) => {
                  const profileIconKey = key as keyof typeof profileIcons;

                  return (
                    <Avatar
                      key={key}
                      name={key}
                      src={icon}
                      size="sm"
                      onClick={() =>
                        updateProfileAvatar(profileIcons[profileIconKey])
                      }
                    />
                  );
                })}
              </HStack>
            </MenuItem>
          </MenuList>
        </>
      )}
    </Menu>
  );
}

export function useUpdateProfileAvatar() {
  const { data: sessionData } = useSession();
  const { query } = useRouter();
  const user = api.userRouter.getUserByName.useQuery({
    name: sessionData?.user?.name ?? "",
  });
  const updatedUser = api.userRouter.updateUserImage.useMutation();

  async function updateProfileAvatar(profileIcon: string) {
    if (!user) return;
    if (!updatedUser) return;
    return updatedUser.mutate({
      id: user.data?.id ?? "",
      image: profileIcon,
    });
  }

  return {
    updateProfileAvatar,
  };
}
