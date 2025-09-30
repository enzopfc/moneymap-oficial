import NextAuth, { type NextAuthOptions, type DefaultSession } from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import { validateUser, getPublicUser } from '../server/user-store';

// Augment the built-in session types
declare module 'next-auth' {
  interface Session {
    user: {
      id: string;
      name: string;
      email: string;
      image?: string;
    } & DefaultSession['user'];
  }

  interface User {
    id: string;
    name: string;
    email: string;
    image?: string;
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    id?: string;
    name?: string;
    email?: string;
    picture?: string;
  }
}

export const authOptions: NextAuthOptions = {
  session: {
    strategy: 'jwt',
  },
  secret: process.env.NEXTAUTH_SECRET || 'dev-secret',
  pages: {
    signIn: '/auth/login',
  },
  providers: [
    Credentials({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null;
        const user = validateUser(credentials.email, credentials.password);
        if (!user) return null;
        return getPublicUser(user);
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.name = user.name;
        token.email = user.email;
        token.picture = user.image;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
        session.user.name = token.name as string;
        session.user.email = token.email as string;
        session.user.image = token.picture as string | undefined;
      }
      return session;
    },
  },
};

export const { auth } = NextAuth(authOptions);
