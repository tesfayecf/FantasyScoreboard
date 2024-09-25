class HTTPError extends Error {
    constructor(public status: number, public statusText: string, message: string) {
        super(message);
        this.name = "HTTPError";
    }
}

class NetworkError extends Error {
    constructor(message: string) {
        super(message);
        this.name = "NetworkError";
    }
}

export class RequestManager {
    private authToken: string | null;
    private retryCount: number;
    private timeout: number;

    constructor(authToken: string | null, retryCount: number = 3, timeout: number = 5000) {
        this.authToken = authToken;
        this.retryCount = retryCount;
        this.timeout = timeout;
    }

    // Set token dynamically
    setAuthToken(token: string | null): void {
        this.authToken = token;
    }

    // Helper method for GET requests
    async get<T>(endpoint: string, init?: RequestInit): Promise<T> {
        const response = await this.request(endpoint, { ...init, method: "GET" });
        return this.parseJson<T>(response);
    }

    // Helper method for POST requests
    async post<T>(endpoint: string, body: unknown, init?: RequestInit): Promise<T> {
        const response = await this.request(endpoint, {
            ...init,
            method: "POST",
            body: JSON.stringify(body),
        });
        return this.parseJson<T>(response);
    }

    // Helper method for PUT requests
    async put<T>(endpoint: string, body: unknown, init?: RequestInit): Promise<T> {
        const response = await this.request(endpoint, {
            ...init,
            method: "PUT",
            body: JSON.stringify(body),
        });
        return this.parseJson<T>(response);
    }

    // Helper method for DELETE requests
    async delete<T>(endpoint: string, init?: RequestInit): Promise<T> {
        const response = await this.request(endpoint, { ...init, method: "DELETE" });
        return this.parseJson<T>(response);
    }

    // Core request method with retries and timeout
    async request(endpoint: string, init?: RequestInit): Promise<Response> {
        let attempts = 0;

        while (attempts < this.retryCount) {
            try {
                const controller = new AbortController();
                const timeoutId = setTimeout(() => controller.abort(), this.timeout);

                const headers = new Headers(init?.headers);
                if (this.authToken) {
                    headers.set("Authorization", `Bearer ${this.authToken}`);
                }
                headers.set("Content-Type", "application/json");

                const response = await fetch(endpoint, {
                    ...init,
                    headers,
                    signal: controller.signal,
                });

                clearTimeout(timeoutId);

                if (!response.ok) {
                    throw new HTTPError(response.status, response.statusText, `HTTP error: ${response.status}`);
                }

                this.logRequest(endpoint);
                return response;
            } catch (error: any) {
                attempts += 1;
                if (attempts >= this.retryCount) {
                    if (error instanceof HTTPError) {
                        throw error;
                    } else if (error.name === "AbortError") {
                        throw new NetworkError(`Request to ${endpoint} timed out after ${this.timeout} ms.`);
                    }
                    throw new NetworkError(`Network error: ${error.message}`);
                }
                console.warn(`Retrying request (${attempts}/${this.retryCount})...`);
            }
        }

        throw new Error("Max retries reached.");
    }

    // Helper method to parse JSON responses
    private async parseJson<T>(response: Response): Promise<T> {
        try {
            const data = await response.json();
            return data as T;
        } catch (error) {
            throw new Error("Failed to parse JSON response.");
        }
    }

    // Logging for debugging purposes
    private logRequest(endpoint: string): void {
        console.log(`Request to ${endpoint}`);
    }
}
