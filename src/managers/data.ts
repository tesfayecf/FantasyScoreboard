/**
 * Implement a data manager that manages the connection to a key-values store. If the app is in production, 
 * use the vercel kv store, otherwise connect to the local redis instance in localhost and default port. 
 * Implement the methods to get and set. Also implement automatic updating. the data must be stored in a json with the 
 * endpoint used to fetch the data, the last time it was fetched and the actual data. {endpooin: "", timestamp: 0, data: {}}
 */

import { createClient as createVercelKVClient } from "@vercel/kv";
import { createClient as createRedisClient } from 'redis';
import { RequestManager } from "./request";

import type { RedisClientType } from 'redis';
type VercelKVClientType = ReturnType<typeof createVercelKVClient>;

export class DataManager {
    private vercelClient: VercelKVClientType | null = null;
    private redisClient: any | null = null;
    private PROD: boolean = import.meta.env.PROD;
    private requestManager: RequestManager | null = null;
    private cacheTime: number;

    constructor(cacheTime: number) {
        this.cacheTime = cacheTime;
    }

    public async connect(): Promise<void> {
        if (this.PROD) {
            this.vercelClient = createVercelKVClient({
                url: import.meta.env.KV_REST_API_URL!,
                token: import.meta.env.KV_REST_API_TOKEN!,
            });
        } else {
            const redisClient = createRedisClient();
            await redisClient.connect();
            this.redisClient = redisClient;
        }
    }

    public async init(): Promise<void> {
        // Get auth token 
        const authToken = await this.getAuthToken();
        this.requestManager = new RequestManager(authToken);
    }

    private async getAuthToken(): Promise<string | null> {
        if (this.PROD) {
            if (!this.vercelClient) throw new Error('Client not connected');
            return (await this.vercelClient.get('auth-token')) as string | null;
        } else {
            if (!this.redisClient) throw new Error('Client not connected');
            return (await this.redisClient.get('auth-token')) as string | null;
        }
    }

    public async setAuthToken(token: string): Promise<boolean> {
        try {
            if (this.PROD) {
                if (!this.vercelClient) throw new Error('Client not connected');
                await this.vercelClient.set('auth-token', token);
            } else {
                if (!this.redisClient) throw new Error('Client not connected');
                await this.redisClient.set('auth-token', token);
            }

            if (!this.requestManager) throw new Error('Request manager not initialized');
            this.requestManager.setAuthToken(token);
            return true;
        } catch (error) {
            console.error('Error setting auth token:', error);
            return false;
        }
    }

    public async get<T>(endpoint: string): Promise<T | null> {
        if (this.PROD) {
            // Handle Vercel KV client 
            if (!this.vercelClient) throw new Error('Client not connected');
            const data = await this.vercelClient.get(endpoint) as { timestamp: number, data: T } | null;
            if (!data) {
                await this.update(endpoint);
                return (await this.get(endpoint)) as T;
            }
            const { timestamp, data: dataValue } = data;
            if (timestamp + this.cacheTime < Date.now()) {
                await this.update(endpoint);
                return (await this.get(endpoint)) as T;
            }
            return dataValue as T;
        } else {
            // Handle Redis client
            if (!this.redisClient) throw new Error('Client not connected');
            const data = await this.redisClient.get(endpoint) as string | null;
            if (!data) {
                await this.update(endpoint);
                return (await this.get(endpoint)) as T;
            }
            const { timestamp, data: dataValue } = JSON.parse(data) as { timestamp: number, data: T };
            if (timestamp + this.cacheTime < Date.now()) {
                await this.update(endpoint);
                return (await this.get(endpoint)) as T;
            }
            return dataValue as T;
        }
    }

    public async set(endpoint: string, data: unknown): Promise<void> {
        if (this.PROD) {
            if (!this.vercelClient) throw new Error('Client not connected');
            await this.vercelClient.set(endpoint, { timestamp: Date.now(), data });
            return;
        } else {
            if (!this.redisClient) throw new Error('Client not connected');
            await this.redisClient.set(endpoint, JSON.stringify({ timestamp: Date.now(), data }));
            return;
        }
    }

    private async update(endpoint: string): Promise<void> {
        if (!this.requestManager) throw new Error('Request manager not initialized');
        const response = await this.requestManager.request(endpoint);
        const data = await response.json();
        await this.set(endpoint, data);
    }
}

