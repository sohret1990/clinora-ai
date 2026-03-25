import OpenAI from "openai";

<<<<<<< HEAD
const client = new OpenAI({
    // API açarının gəldiyini yoxlayın
    apiKey: import.meta.env.VITE_GROQ_API_KEY, 
=======
/**
 * Groq API OpenAI ilə uyğun olduğu üçün OpenAI SDK-sını 
 * birbaşa Groq endpoint-inə yönləndiririk.
 */
const client = new OpenAI({
    apiKey: import.meta.env.VITE_GROQ_API_KEY, // .env-də VITE_ ön şəkilçisi mütləqdir
>>>>>>> 1868c4ff4b9f6e5f5b2af73aed29b2eba1bb0c2e
    baseURL: "https://api.groq.com/openai/v1",
    dangerouslyAllowBrowser: true,
});

<<<<<<< HEAD
// Daha stabil bir model adı istifadə edək
export const DEFAULT_MODEL = 'llama3-8b-8192'; 
=======
export const DEFAULT_MODEL = 'llama-3.3-70b-versatile'; // Groq-da olan real model adı
>>>>>>> 1868c4ff4b9f6e5f5b2af73aed29b2eba1bb0c2e

export async function streamAi(
    text: string,
    onChunk: (delta: string, accumulated: string) => void,
    model: string = DEFAULT_MODEL,
): Promise<string> {
    
<<<<<<< HEAD
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
=======
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
>>>>>>> 1868c4ff4b9f6e5f5b2af73aed29b2eba1bb0c2e
}