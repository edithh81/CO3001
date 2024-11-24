import axios from "axios";
import { v4 as uuidv4 } from "uuid";
export const uploadFileToCDN = async (
    file: File
): Promise<{ message: string } | { error: string }> => {
    if (!file) throw new Error("No file provided.");
    try {
        const fileId =
            file.name
                .substring(0, file.name.lastIndexOf("."))
                .trim()
                .replaceAll(/\s+/g, "_")
                .replaceAll(/_+/g, "_") +
            "-" +
            uuidv4().replace("-", "").substring(0, 10) +
            "." +
            file.name.split(".").pop();

        const response = await axios.put(
            `/api/upload?filename=${encodeURIComponent(fileId)}`,
            file,
            {
                headers: {
                    "Content-Type": file.type,
                },
            }
        );

        if (response.status === 200) {
            return { message: fileId };
        } else {
            return { error: response.data.error || "Upload failed" };
        }
    } catch (error) {
        console.log("Error uploading file to CDN:", error);
        return { error: "Something wrong occurred" };
    }
};

export const getFileFromCDN = async (fileName: string) => {};
