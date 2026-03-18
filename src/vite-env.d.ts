/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_GROQ_API_KEY: string;
  readonly VITE_CLINORA_AI_GROQ_TOKEN?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
