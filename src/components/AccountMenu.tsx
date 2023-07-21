import { ChevronDownIcon } from "@chakra-ui/icons";
import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuItemOption,
  MenuGroup,
  MenuOptionGroup,
  MenuDivider,
  Button,
} from "@chakra-ui/react";
import ProfileAvatar from "./ProfileAvatar";
import { signIn, signOut, useSession } from "next-auth/react";
import AuthButton from "./AuthButton";

interface Props {
  children?: React.ReactNode;
}

export default function AccountMenu(props: Props) {
  const { children } = props;
  const { data: sessionData } = useSession();
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
          </MenuList>
        </>
      )}
    </Menu>
  );
}
