/// <reference types="vite/client" />

declare module "*.vue" {
  import type { DefineComponent } from "vue";
  const component: DefineComponent<{}, {}, any>;
  export default component;
}

declare module "vue3-pdfjs/esm";
declare module "pdfjs-dist/build/pdf.worker.entry";
declare module "pdfjs-dist";
declare module "pdfjs-dist/build/pdf";
