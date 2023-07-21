import { MoonIcon, SunIcon } from "@chakra-ui/icons";
import ProfileAvatar from "./ProfileAvatar";
import { useColorMode } from "@chakra-ui/react";
import AccountName from "./AccountName";
import AccountMenu from "./AccountMenu";

export default function AccountHeader() {
  const { colorMode, toggleColorMode } = useColorMode();

  const ThemeToggleIcon = colorMode === "light" ? MoonIcon : SunIcon;

  return (
    <div className="flex flex-col items-end">
      <div className="mb-2 flex items-center">
        <ThemeToggleIcon
          onClick={toggleColorMode}
          boxSize={6}
          className="mr-2"
        />
        <AccountMenu>
          <ProfileAvatar />
        </AccountMenu>
      </div>
      <AccountName />
      <AccountMenu />
    </div>
  );
}
