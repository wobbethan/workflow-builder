import { en } from './locales/en';

function getValue(path: string): unknown {
  const keys = path.split('.');
  let current: unknown = en;
  for (const key of keys) {
    if (current === null || current === undefined || typeof current !== 'object') {
      return undefined;
    }
    if (!(key in (current as object))) {
      return undefined;
    }
    current = (current as Record<string, unknown>)[key];
  }
  return current;
}

function interpolate(template: string, options?: Record<string, unknown>): string {
  if (!options) {
    return template;
  }
  return template.replaceAll(/\{\{(\w+)\}\}/g, (_, name: string) => {
    const value = options[name];
    return value === undefined || value === null ? '' : String(value);
  });
}

function resolvePluralTemplate(baseKey: string, count: number): string | undefined {
  if (count === 0) {
    const zeroKey = `${baseKey}_zero`;
    const zero = getValue(zeroKey);
    if (typeof zero === 'string') {
      return zero;
    }
  }
  if (count === 1) {
    const oneKey = `${baseKey}_one`;
    const one = getValue(oneKey);
    if (typeof one === 'string') {
      return one;
    }
  }
  const defaultMessage = getValue(baseKey);
  return typeof defaultMessage === 'string' ? defaultMessage : undefined;
}

export function exists(key: string): boolean {
  return typeof getValue(key) === 'string';
}

export function t(key: string, options?: Record<string, unknown>): string {
  let template: string | undefined;

  if (options && typeof options.count === 'number' && Number.isFinite(options.count)) {
    template = resolvePluralTemplate(key, options.count);
  }

  if (template === undefined) {
    const raw = getValue(key);
    template = typeof raw === 'string' ? raw : undefined;
  }

  if (template === undefined) {
    return key;
  }

  return interpolate(template, options);
}
