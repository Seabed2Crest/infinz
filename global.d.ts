export {};

declare global {
  interface Window {
    /**
     * Google Analytics gtag function (injected by GA script).
     * We keep this type intentionally permissive to avoid fighting GA's dynamic API.
     */
    gtag?: (...args: any[]) => void;
  }
}


