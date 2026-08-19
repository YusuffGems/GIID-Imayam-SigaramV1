/**
 * Client-side error reporting hook.
 *
 * Previously forwarded to Lovable's editor telemetry. Now it just logs to the
 * console, so nothing is sent to a third party. Wire up your own service here
 * (Sentry, etc.) if you want remote reporting.
 */
export function reportError(error: unknown, context: Record<string, unknown> = {}) {
  if (typeof window === "undefined") return;
  console.error("[app error]", error, context);
}
