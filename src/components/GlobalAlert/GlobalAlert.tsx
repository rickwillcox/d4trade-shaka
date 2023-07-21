import { Box, CloseButton, UseDisclosureReturn } from "@chakra-ui/react";
import {
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  AlertProps,
} from "@chakra-ui/react";

export interface GlobalAlertDetails {
  title: string;
  description: string;
  status: AlertProps["status"];
}

interface GlobalAlertProps {
  isVisible: UseDisclosureReturn["isOpen"];
  details: GlobalAlertDetails;
  onClose: UseDisclosureReturn["onClose"];
}

export function GlobalAlert(props: GlobalAlertProps) {
  const { isVisible, details, onClose } = props;
  return (
    <>
      {isVisible && (
        <Alert
          status={details.status}
          position="fixed"
          top={4}
          left={4}
          right={4}
          zIndex="toast"
          maxWidth="400"
          padding={2}
        >
          <AlertIcon />
          <Box>
            <AlertTitle>{details.title}</AlertTitle>
            <AlertDescription>{details.description}</AlertDescription>
          </Box>
          <CloseButton
            alignSelf="flex-start"
            position="relative"
            right={-1}
            top={-1}
            onClick={onClose}
          />
        </Alert>
      )}
    </>
  );
}
