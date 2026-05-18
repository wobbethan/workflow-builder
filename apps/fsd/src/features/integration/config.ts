/**
 * Diagram persistence API base URL.
 * Set NEXT_PUBLIC_WB_API_URL in the host app to override (no trailing slash).
 */
export function getDiagramApiUrl(): string {
  const configured = process.env.NEXT_PUBLIC_WB_API_URL?.replace(/\/$/, '');

  if (configured) {
    return configured;
  }

  if (typeof location !== 'undefined') {
    return `${location.origin}/fake-api`;
  }

  return '/fake-api';
}
