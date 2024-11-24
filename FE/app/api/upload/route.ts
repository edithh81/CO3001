import { NextRequest, NextResponse } from "next/server";
import axios from "axios";
export async function PUT(request: NextRequest) {
    try {
        console.log("PUT request received");
        const contentType = request.headers.get("content-type");
        const filename = request.nextUrl.searchParams.get("filename");

        if (!filename) {
            return NextResponse.json(
                { error: "Filename is required" },
                { status: 400 }
            );
        }

        // Get the file buffer from the request
        const fileBuffer = await request.arrayBuffer();

        // Using the correct API URL structure
        const apiUrl = `${process.env.NEXT_PUBLIC_FILE_UPLOAD_API_URL}/${filename}`;

        const uploadResponse = await axios.put(
            apiUrl,
            Buffer.from(fileBuffer),
            {
                headers: {
                    "Content-Type": contentType,
                },
            }
        );

        if (uploadResponse.status === 200) {
            return NextResponse.json({ message: "File uploaded successfully" });
        } else {
            return NextResponse.json(
                { error: "Upload failed" },
                { status: uploadResponse.status }
            );
        }
    } catch (error) {
        console.error("Error in upload handler:", error);
        return NextResponse.json(
            { error: "Internal server error" },
            { status: 500 }
        );
    }
}
