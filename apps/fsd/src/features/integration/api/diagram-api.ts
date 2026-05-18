import type { IntegrationDataFormat, IntegrationDataFormatOptional } from '../types';

const DIAGRAM_API_URL = `${location.origin}/fake-api`;

export async function fetchDiagram(): Promise<IntegrationDataFormatOptional | undefined> {
  const response = await fetch(DIAGRAM_API_URL);

  if (!response.ok) {
    return undefined;
  }

  return (await response.json()) as IntegrationDataFormatOptional;
}

export async function saveDiagram(data: IntegrationDataFormat): Promise<boolean> {
  const response = await fetch(DIAGRAM_API_URL, {
    body: JSON.stringify(data),
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  return response.ok;
}
