export function navigate(hash: string): void {
  window.location.hash = hash.startsWith('#') ? hash : `#${hash}`;
}
