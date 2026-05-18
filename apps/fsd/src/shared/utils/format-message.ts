export function formatMessage(template: string, params?: Record<string, unknown>): string {
  if (!params) {
    return template;
  }

  return template.replaceAll(/\{\{(\w+)\}\}/g, (_, name: string) => {
    const value = params[name];
    return value === undefined || value === null ? '' : String(value);
  });
}
