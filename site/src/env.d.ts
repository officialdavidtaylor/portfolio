/// <reference types="astro/client" />

type NetlifyLocals = import("@astrojs/netlify").NetlifyLocals;

declare namespace App {
  interface Locals extends NetlifyLocals {}
}
