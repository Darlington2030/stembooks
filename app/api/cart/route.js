// import { NextRequest, NextResponse } from "next/server";

// export async function POST(req: NextRequest) {
//     const formData = await req.formData();
//     const file = formData.get("file");

//     if (!file || !(file instanceof Blob)) {
//         return NextResponse.json({ error: "Invalid file upload" }, { status: 400 });
//     }

//     const pages = formData.get("pages");
//     const colorType = formData.get("colorType");
//     const size = formData.get("size");
//     const orientation = formData.get("orientation");
//     const price = formData.get("price");

//     // Example: You can process and save the file to a storage service, or just log for now
//     console.log({
//         pages, colorType, size, orientation, price, file
//     });

//     // For now, just respond back with success
//     return NextResponse.json({ message: "Book added to cart successfully!" });
// }
import { NextResponse } from "next/server";

export async function POST(req) {
    try {
        const formData = await req.formData();
        const file = formData.get("file");

        if (!file || !(file instanceof Blob)) {
            return NextResponse.json({ error: "Invalid file upload" }, { status: 400 });
        }

        const pages = formData.get("pages");
        const colorType = formData.get("colorType");
        const size = formData.get("size");
        const orientation = formData.get("orientation");
        const price = formData.get("price");

        // Example: Process and save the file or log for debugging
        console.log({ pages, colorType, size, orientation, price, file });

        return NextResponse.json({ message: "Book added to cart successfully!" });
    } catch (error) {
        return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
    }
}
