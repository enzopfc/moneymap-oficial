import { NextResponse } from 'next/server';
import { createUser, getPublicUser } from '../../../../server/user-store';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, password } = body;
    if (!name || !email || !password) {
      return NextResponse.json({ error: 'Dados inválidos' }, { status: 400 });
    }
    const user = createUser(name, email, password);
    return NextResponse.json({ user: getPublicUser(user) }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ error: error?.message || 'Erro ao registrar' }, { status: 400 });
  }
}
