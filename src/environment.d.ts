export declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NODE_ENV: "development" | "production";
      PORT?: string;
      PWD: string;

      CLIENT_ORIGIN: string;
      GOOGLE_EMAIL: string;
      GOOGLE_PASSWORD: string;
      GOOGLE_CLIENT_ID: string;
      GOOGLE_CLIENT_SECRET: string;
      NEXTAUTH_SECRET: string;
    }
  }
}
