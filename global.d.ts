/* eslint-disable @typescript-eslint/no-unused-vars */
import { Express } from 'express';

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      DB_USER: string;
      DB_PASSWORD: string;
      DB: string;
      DB_HOST: string;
      DB_PORT: number;
      NODE_ENV: string;
      COOKIE_SECRET: string | undefined;
    }
  }
}

declare module 'express-session' {
  interface SessionData {
    startTime: number;
    finalTime: number;
    numOfMarkers: number;
    foundMarkers: number;
  }
}
