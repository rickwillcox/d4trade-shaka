import { useState } from "react";

export function useGetImageFromClipboard() {
  const [clipboardImage, setClipboardImage] = useState<string | null>(null);

  const getImagefromClipboard = async () => {
    try {
      const clipboardItems = await navigator.clipboard.read();
      if (clipboardItems) {
        console.log(clipboardItems);
        const blobOutput = await clipboardItems[0]?.getType("image/png");
        if (blobOutput) {
          const data = URL.createObjectURL(blobOutput);
          setClipboardImage(data);
        }
      }
    } catch (e) {
      console.log(e);
    }
  };

  return {
    clipboardImage,
    getImagefromClipboard,
    setClipboardImage,
  };
}
