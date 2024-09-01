export default async function getAuthToken(): Promise<string | null> {
    try {
        if (process.env.production) {
            return await getAuthTokenFromKV();
        } else {
            return await getAuthTokenFromFile();
        }
    } catch (error) {
        console.error("Error in getAuthToken:", error);
        return null;
    }
}

async function getAuthTokenFromKV(): Promise<string | null> {
    try {
        const { createClient } = await import("@vercel/kv");
        const kv = createClient({
            url: process.env.KV_REST_API_URL!,
            token: process.env.KV_REST_API_TOKEN!,
        });

        const token = await kv.get("auth-token");
        if (typeof token === "string") {
            return token;
        } else {
            console.error("KV: Retrieved token is not a string");
            return null;
        }
    } catch (error) {
        console.error("KV: Error retrieving auth token:", error);
        return null;
    }
}

async function getAuthTokenFromFile(): Promise<string | null> {
    try {
        const fs = await import('fs/promises');
        const { AUTH_TOKEN_PATH } = await import("../data/constants");
        const authToken = await fs.readFile(AUTH_TOKEN_PATH, "utf-8");
        const authTokenJson = JSON.parse(authToken);

        if (typeof authTokenJson.token === 'string') {
            return authTokenJson.token;
        } else {
            console.error("File: Retrieved token is not a string");
            return null;
        }
    } catch (error) {
        console.error("File: Error reading auth token:", error);
        return null;
    }
}
