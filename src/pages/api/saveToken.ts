export const prerender = "false";
import type { APIRoute } from "astro";
import storeAuthToken from "../../scritps/storeAuthToken";

export const POST: APIRoute = async ({ request }) => {
    try {
        // Get the form data
        const formData = await request.formData();
        const token = formData.get("token");

        // Check token is a string
        if (typeof token !== "string") {
            throw new Error("Token is not a valid string");
        }

        // Store token based on environment
        const state = await storeAuthToken(token);
        if (state === false)  {
            throw new Error("Error storing token");
        }

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
