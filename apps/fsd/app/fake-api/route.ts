import { NextResponse } from 'next/server';

import type { IntegrationDataFormat } from '@/features/integration/types';

/** In-memory store for local dev / portable kit demo. Replace with your backend in production. */
let storedDiagram: IntegrationDataFormat | null = null;

export async function GET() {
  if (!storedDiagram) {
    return NextResponse.json({});
  }

  return NextResponse.json(storedDiagram);
}

export async function POST(request: Request) {
  try {
    storedDiagram = (await request.json()) as IntegrationDataFormat;
    return new NextResponse(null, { status: 200 });
  } catch {
    return NextResponse.json({ error: 'Invalid JSON body' }, { status: 400 });
  }
}
