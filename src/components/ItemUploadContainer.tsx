import { useGetImageFromClipboard } from "@/hooks/useGetImageFromClipboard";
import { useState } from "react";
import ItemImage from "./ItemImage";

export default function ItemUploadContainer() {
  const { clipboardImage, getImagefromClipboard } = useGetImageFromClipboard();
  const [imgSrc, setImgSrc] = useState<string>("");

  function getImageFromClipboardHandler() {
    getImagefromClipboard();
  }

  async function uploadImageHandler() {
    await uploadImage(imgSrc);
    setTimeout(getImagefromClipboard, 250);
  }

  return (
    <div>
      <button onClick={getImageFromClipboardHandler}>
        Get Image from Clipboard
      </button>
      <input value={imgSrc} onChange={(e) => setImgSrc(e.target.value)} />

      <button onClick={uploadImageHandler}>Upload Image</button>

      <ItemImage img={clipboardImage} />
    </div>
  );
}

async function uploadImage(imgSrc?: string) {
  if (!imgSrc) {
    return;
  }
  try {
    const copiedImage = await fetch(imgSrc);
    const blobData = await copiedImage.blob();
    const clipboardItemInput = new ClipboardItem({
      "image/png": blobData,
    });
    navigator.clipboard.write([clipboardItemInput]);
  } catch (e) {
    console.log(e);
  }
}
