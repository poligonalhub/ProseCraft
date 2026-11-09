/// <reference types="vite/client" />

interface ImportMetaEnv {
  /** Desktop app OAuth client secret, supplied through a local .env file. */
  readonly VITE_GOOGLE_CLIENT_SECRET?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

declare module 'pdfjs-dist' {
  export interface PDFDocumentProxy {
    numPages: number;
    getPage(pageNumber: number): Promise<any>;
    destroy(): Promise<void>;
    [key: string]: any;
  }
  export interface RenderTask {
    promise: Promise<void>;
    cancel(): void;
    [key: string]: any;
  }
  export interface PDFLoadingTask {
    promise: Promise<PDFDocumentProxy>;
    destroy(): Promise<void>;
    [key: string]: any;
  }
  export const GlobalWorkerOptions: {
    workerSrc: string;
  };
  export function getDocument(src: any): PDFLoadingTask;
  const content: any;
  export default content;
}
