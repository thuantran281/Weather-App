/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_WEATHER_KEY: string;
  readonly VITE_WEATHER_URL: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
