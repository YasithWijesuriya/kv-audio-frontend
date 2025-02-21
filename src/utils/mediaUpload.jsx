import { createClient } from "@supabase/supabase-js";

const anon_key =
	"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNseHVmbWp0ZWtoZm5rZXp1ZWdwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDAwODE0OTAsImV4cCI6MjA1NTY1NzQ5MH0.Fu7tRx_bJf0xRh76ER9Sc05t7SbsX4VuVnqDszQydlE";
const supabase_url = "https://slxufmjtekhfnkezuegp.supabase.co";

const supabase = createClient(supabase_url, anon_key);

export default function mediaUpload(file) {
	return new Promise((resolve, reject) => {
        if(file == null){
            reject("No file selected")
        }

		const timestamp = new Date().getTime();
		const fileName = timestamp + file.name;

		supabase.storage
			.from("images")
			.upload(fileName, file, {
				cacheControl: "3600",
				upsert: false,
			})
			.then(() => {
				const publicUrl = supabase.storage.from("images").getPublicUrl(fileName)
					.data.publicUrl;
				resolve(publicUrl);
			}).catch(()=>{
                reject("Error uploading file")
            })
	});
}