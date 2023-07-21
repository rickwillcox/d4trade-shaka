import { useGetImageFromClipboard } from "@/hooks/useGetImageFromClipboard";
import { useState } from "react";
import ItemImage from "./ItemImage";
import { Button, Input } from "@chakra-ui/react";

import { useGlobalAlert } from "@/hooks/useGlobalAlert";
import { GlobalAlert } from "./GlobalAlert";

export default function ItemUploadContainer() {
  const { clipboardImage, setClipboardImage, getImagefromClipboard } =
    useGetImageFromClipboard();
  const [imgSrc, setImgSrc] = useState<string>("");

  const { alertIsVisible, alertDetails, closeAlert, showGlobalAlert } =
    useGlobalAlert();

  function getImageFromClipboardHandler() {
    getImagefromClipboard();
  }

  async function uploadImageHandler() {
    const [success, message] = await uploadImage(imgSrc);
    if (!success) {
      showGlobalAlert({
        title: "Error",
        description: message,
        status: "error",
      });
    }

    setTimeout(getImagefromClipboard, 250);
  }

  function handleClearClipBoardImage() {
    setImgSrc("");
    setClipboardImage(null);
  }

  return (
    <div className="flex flex-col items-start space-y-4">
      <div className="flex items-center space-x-4">
        <Button
          onClick={uploadImageHandler}
          className="flex w-60 flex-none items-center justify-center"
        >
          Upload Image from URL
        </Button>
        <Input
          value={imgSrc}
          onChange={(e) => setImgSrc(e.target.value)}
          className="rounded border p-2"
        />
      </div>
      <GlobalAlert
        isVisible={alertIsVisible}
        onClose={closeAlert}
        details={alertDetails}
      />
      <Button
        onClick={getImageFromClipboardHandler}
        className="flex w-60 flex-none items-center justify-center"
      >
        Paste Image from Clipboard
      </Button>
      <Button
        onClick={handleClearClipBoardImage}
        className="flex w-60 flex-none items-center justify-center"
      >
        Clear
      </Button>
      <ItemImage img={clipboardImage} />
    </div>
  );
}

async function uploadImage(imgSrc?: string): Promise<[boolean, string]> {
  if (!imgSrc) {
    return [false, "No img source"];
  }
  try {
    const copiedImage = await fetch(imgSrc);
    if (!copiedImage.ok) {
      throw Error;
    }
    const blobData = await copiedImage.blob();
    const clipboardItemInput = new ClipboardItem({
      "image/png": blobData,
    });
    navigator.clipboard.write([clipboardItemInput]);
    return [true, "Image uploaded"];
  } catch (e) {
    return [false, "Image could not be uploaded"];
  }
}
