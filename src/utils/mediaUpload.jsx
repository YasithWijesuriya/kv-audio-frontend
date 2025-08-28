import { createClient } from "@supabase/supabase-js";

const anon_key =
	"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNseHVmbWp0ZWtoZm5rZXp1ZWdwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDAwODE0OTAsImV4cCI6MjA1NTY1NzQ5MH0.Fu7tRx_bJf0xRh76ER9Sc05t7SbsX4VuVnqDszQydlE";
const supabase_url = "https://slxufmjtekhfnkezuegp.supabase.co";

const supabase = createClient(supabase_url, anon_key);

export default async function mediaUpload(file, folder = "products") {
    if (file == null) {
        throw new Error("No file selected");
    }
    const backendUrl = import.meta.env.VITE_BACKEND_URL;
    if (!backendUrl) {
        throw new Error("VITE_BACKEND_URL not set");
    }

    const contentType = file.type || "application/octet-stream";

    // Request a presigned upload URL from the backend
    const presignRes = await fetch(`${backendUrl}/api/uploads/presign`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token") || ""}`
        },
        body: JSON.stringify({ contentType, folder })
    });

    if (!presignRes.ok) {
        const errText = await presignRes.text();
        throw new Error(errText || "Failed to presign upload");
    }

    const { uploadUrl, publicUrl } = await presignRes.json();

    // Upload the file directly to R2 using the presigned URL
    const putRes = await fetch(uploadUrl, {
        method: "PUT",
        headers: { "Content-Type": contentType },
        body: file
    });

    if (!putRes.ok) {
        const errText = await putRes.text();
        throw new Error(errText || "Failed to upload file to storage");
    }

    // Return the public URL to be stored in the DB
    return publicUrl;
}