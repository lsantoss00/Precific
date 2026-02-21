import imageCompression from "browser-image-compression";

export async function compressImage(file: File) {
  const options = {
    maxSizeMB: 0.1,
    maxWidthOrHeight: 500,
    useWebWorker: true,
    fileType: "image/webp" as const,
  };

  try {
    const compressedBlob = await imageCompression(file, options);
    return new File([compressedBlob], "avatar.webp", { type: "image/webp" });
  } catch (error) {
    return file;
  }
}
