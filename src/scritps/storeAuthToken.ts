export default async function storeAuthToken(token: string): Promise<boolean> {
    try {
        if (process.env.production) {
            return await storeAuthTokenInKV(token);
        } else {
            return await storeAuthTokenInFile(token);
        }
    } catch (error) {
        console.error("Error in storeAuthToken:", error);
        return false;
    }
}

async function storeAuthTokenInKV(token: string): Promise<boolean> {
    try {
        const { createClient } = await import("@vercel/kv");
        const kv = createClient({
            url: process.env.KV_REST_API_URL!,
            token: process.env.KV_REST_API_TOKEN!,
        });

        await kv.set("auth-token", token);
        return true;
    } catch (error) {
        console.error("KV: Error storing the token:", error);
        return false;
    }
}

async function storeAuthTokenInFile(token: string): Promise<boolean> {
    try {
        const fs = await import('fs/promises');
        const { AUTH_TOKEN_PATH } = await import("../data/constants");

        const authData = JSON.stringify({ token }, null, 2);
        await fs.mkdir(new URL(AUTH_TOKEN_PATH, 'file://').pathname, { recursive: true });
        await fs.writeFile(AUTH_TOKEN_PATH, authData, "utf-8");

        return true;
    } catch (error) {
        console.error("File: Error storing the token:", error);
        return false;
    }
}
