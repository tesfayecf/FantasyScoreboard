export const prerender = "false";

import fs from "fs";
import type { APIRoute } from "astro";

export const POST: APIRoute = async ({ request }) => {
    try {
        // Get the form data
        const formData = await request.formData();
        const token = formData.get("token");

        await fs.writeFile("./src/data/auth-token.txt", token as string, (err) => {
            if (err) throw err;
            console.log("Token saved successfully!");
        })

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
