export const prerender = "false";
import type { APIRoute } from "astro";

import fs from "fs";
import { createClient } from "@vercel/kv";


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

        if (typeof token !== "string") {
            throw new Error("Token is not a valid string");
        }

        if (process.env.prduction) {
            try {

                const kv = createClient({
                    url: process.env.KV_REST_API_URL,
                    token: process.env.KV_REST_API_TOKEN,
                });

                kv.set("auth-token", token as string)
                console.log("Token saved successfully");
            } catch (e) {
                throw new Error("Error storing the token");
            }
        } else {
            writeFile(
                "./src/data/auth/auth-token.txt",
                JSON.stringify({ token }),
                function (err) {
                    if (err) throw err;
                    console.log("Token saved successfully");
                }
            );
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
