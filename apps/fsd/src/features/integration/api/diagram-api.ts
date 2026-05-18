import { getDiagramApiUrl } from '../config';
import type { IntegrationDataFormat, IntegrationDataFormatOptional } from '../types';

export async function fetchDiagram(): Promise<IntegrationDataFormatOptional | undefined> {
  const response = await fetch(getDiagramApiUrl());

  if (!response.ok) {
    return undefined;
  }

  return (await response.json()) as IntegrationDataFormatOptional;
}

export async function saveDiagram(data: IntegrationDataFormat): Promise<boolean> {
  const response = await fetch(getDiagramApiUrl(), {
    body: JSON.stringify(data),
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  return response.ok;
}
