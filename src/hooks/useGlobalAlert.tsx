import { GlobalAlertDetails } from "@/components/GlobalAlert";
import { useDisclosure } from "@chakra-ui/react";
import { useState } from "react";

export function useGlobalAlert() {
  const {
    isOpen: alertIsVisible,
    onClose,
    onOpen,
  } = useDisclosure({ defaultIsOpen: false });

  const [alertDetails, setAlertDetails] = useState<GlobalAlertDetails>({
    title: "",
    description: "",
    status: undefined,
  });

  function showGlobalAlert({ title, description, status }: GlobalAlertDetails) {
    setAlertDetails({ title, description, status });
    onOpen();
  }

  return {
    showGlobalAlert: showGlobalAlert,
    alertIsVisible,
    alertDetails,
    closeAlert: onClose,
  };
}
