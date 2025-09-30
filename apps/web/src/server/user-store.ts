// Simple in-memory user store for demo purposes (non-persistent)
export interface UserRecord {
  id: string;
  name: string;
  email: string;
  password: string; // plaintext for demo only; DO NOT use in production
  image?: string;
  createdAt: string;
}

let users: UserRecord[] = [
  {
    id: '1',
    name: 'Usuário Demo',
    email: 'demo@moneymap.com',
    password: 'demo123',
    image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=demo',
    createdAt: new Date().toISOString(),
  },
];

export function findUserByEmail(email: string) {
  return users.find((u) => u.email.toLowerCase() === email.toLowerCase()) || null;
}

export function validateUser(email: string, password: string) {
  const user = findUserByEmail(email);
  if (!user) return null;
  if (user.password !== password) return null;
  return user;
}

export function createUser(name: string, email: string, password: string) {
  if (findUserByEmail(email)) {
    throw new Error('E-mail já cadastrado');
  }
  const user: UserRecord = {
    id: Math.random().toString(36).slice(2),
    name,
    email,
    password,
    image: `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(name)}`,
    createdAt: new Date().toISOString(),
  };
  users.push(user);
  return user;
}

export function getPublicUser(user: UserRecord) {
  const { password, ...rest } = user;
  return rest;
}
