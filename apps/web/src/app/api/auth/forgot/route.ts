import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email } = body;
    if (!email) {
      return NextResponse.json({ error: 'E-mail é obrigatório' }, { status: 400 });
    }
    // Mock: always succeed but do nothing
    await new Promise((r) => setTimeout(r, 800));
    return NextResponse.json({ ok: true });
  } catch (error: any) {
    return NextResponse.json({ error: error?.message || 'Erro ao processar requisição' }, { status: 500 });
  }
}
