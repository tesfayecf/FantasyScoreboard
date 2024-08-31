export const prerender = "false";
import type { APIRoute } from "astro";

import fs from "fs";


function writeFile(path: string, contents: string, cb: fs.NoParamCallback) {
    fs.mkdir("./src/data/auth/", { recursive: true }, function (err) {
        if (err) return cb(err);
        fs.writeFile(path, contents, cb);
    });
}

export const POST: APIRoute = async ({ request }) => {
    try {
        // Get the form data
        const formData = await request.formData();
        const token = formData.get("token");

        writeFile("./src/data/auth/auth-token.txt", token as string, () => console.log("Token saved succesfully"));

        // Return a success response
        return new Response("Token saved successfully!", {
            status: 200,
        });
    } catch (error) {
        console.error("Error saving the token:", error);
        return new Response("Failed to save token", {
            status: 500,
        });
    }
};
