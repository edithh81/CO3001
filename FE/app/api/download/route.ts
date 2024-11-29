import { NextResponse } from "next/server";
import axios from "axios";

export async function GET(request: Request) {
    try {
        // Parse the `fileId` query parameter
        const { searchParams } = new URL(request.url);
        const rawFileId = searchParams.get("fileId");

        if (!rawFileId) {
            return NextResponse.json(
                { error: "fileId is required" },
                { status: 400 }
            );
        }

        // Decode the fileId (to handle special characters)
        const fileId = decodeURIComponent(rawFileId);

        // Make the external API call to download the file
        const downloadResponse = await axios.get(
            `${process.env.NEXT_PUBLIC_FILE_UPLOAD_API_URL}/${fileId}`,
            { responseType: "stream" } // Stream the file
        );

        // Extract headers from the response
        const contentType =
            downloadResponse.headers["content-type"] ||
            "application/octet-stream";
        const contentDisposition =
            downloadResponse.headers["content-disposition"] ||
            `attachment; filename="${fileId}"`;

        // Properly format Content-Disposition header
        const headers = new Headers({
            "Content-Type": contentType,
            "Content-Disposition": contentDisposition,
        });

        // Return the streamed file response
        return new NextResponse(downloadResponse.data, {
            headers,
            status: 200,
        });
    } catch (error) {
        console.error("Error streaming file:", error);
        return NextResponse.json(
            { error: "Internal server error" },
            { status: 500 }
        );
    }
}
