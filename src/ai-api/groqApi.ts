import OpenAI from "openai";

const client = new OpenAI({
    // API açarının gəldiyini yoxlayın
    apiKey: import.meta.env.VITE_GROQ_API_KEY, 
    baseURL: "https://api.groq.com/openai/v1",
    dangerouslyAllowBrowser: true,
});

// Daha stabil bir model adı istifadə edək
export const DEFAULT_MODEL = 'llama3-8b-8192'; 

export async function streamAi(
    text: string,
    onChunk: (delta: string, accumulated: string) => void,
    model: string = DEFAULT_MODEL,
): Promise<string> {
    
    // API açarı yoxdursa xəta ver ki, vaxt itirməyəsən
    if (!import.meta.env.VITE_GROQ_API_KEY) {
        throw new Error("API Key tapılmadı! .env faylını yoxlayın.");
    }

    try {
        const stream = await client.chat.completions.create({
            model: model,
            messages: [{ role: "user", content: text }],
            stream: true,
        });

        let accumulated = "";

        for await (const chunk of stream) {
            const delta = chunk.choices[0]?.delta?.content || "";
            console.log("Alınan delta:", delta); // Hər delta gəldikdə konsola yazdır
            if (delta) {
                accumulated += delta;
                onChunk(delta, accumulated);
            }
        }

        return accumulated;
    } catch (error: any) {
        console.error("Groq API Xətası:", error);
        throw error;
    }
}