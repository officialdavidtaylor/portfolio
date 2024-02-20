/// <reference types="astro/client" />
/// <reference types="@sanity/astro/module" />

type NetlifyLocals = import("@astrojs/netlify").NetlifyLocals;

interface ImportMetaEnv {}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

declare namespace App {
  interface Locals extends NetlifyLocals {}
}
