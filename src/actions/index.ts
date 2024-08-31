// src/actions/index.ts
import { defineAction, ActionError } from 'astro:actions';
import { z } from 'astro:schema';
import { writeFile } from 'node:fs/promises';

// Define the action to handle form submissions
export const server = {
    saveText: defineAction({
        input: z.object({
            text: z.string().min(1, 'Text is required'), // Validation for non-empty string
        }),
        handler: async (input) => {
            try {
                // Write the input text to a file
                await writeFile('data/auth-token.txt', input.text);
                console.log('Text saved successfully:', input.text);
                return { success: true, message: 'Text saved successfully' };
            } catch (error) {
                throw new ActionError({
                    code: 'INTERNAL_SERVER_ERROR',
                    message: 'Failed to save text',
                });
            }
        },
    }),
};
