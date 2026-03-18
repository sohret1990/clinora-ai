import OpenAI from "openai";

/**
 * Groq API OpenAI ilə uyğun olduğu üçün OpenAI SDK-sını 
 * birbaşa Groq endpoint-inə yönləndiririk.
 */
const client = new OpenAI({
    apiKey: import.meta.env.VITE_GROQ_API_KEY, // .env-də VITE_ ön şəkilçisi mütləqdir
    baseURL: "https://api.groq.com/openai/v1",
    dangerouslyAllowBrowser: true,
});

export const DEFAULT_MODEL = 'llama-3.3-70b-versatile'; // Groq-da olan real model adı

export async function streamAi(
    text: string,
    onChunk: (delta: string, accumulated: string) => void,
    model: string = DEFAULT_MODEL,
): Promise<string> {
    
    // Groq üçün standart Chat Completion istifadə edilməlidir
    const stream = await client.chat.completions.create({
        model: model,
        messages: [{ role: "user", content: text }],
        stream: true,
    });

    let accumulated = "";

    for await (const chunk of stream) {
        const delta = chunk.choices[0]?.delta?.content || "";
        if (delta) {
            accumulated += delta;
            // Hər yeni parça gələndə callback funksiyasını çağırırıq
            onChunk(delta, accumulated);
        }
    }

    return accumulated;
}