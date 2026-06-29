// src/types/global.d.ts
import Lenis from 'lenis';

declare global {
  interface Window {
    lenis?: Lenis;
  }
}

export {};