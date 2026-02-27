import { cookies } from 'next/headers';
import { db } from './db';

const SESSION_COOKIE_NAME = 'bellas_session';

export interface SessionUser {
  id: string;
  email: string;
  name: string | null;
  role: 'ADMIN' | 'MODEL' | 'VISITOR';
  image: string | null;
  profile?: {
    id: string;
    artisticName: string | null;
    status: 'PENDING' | 'APPROVED' | 'REJECTED';
    featured: boolean;
  } | null;
}

export async function getServerSession(): Promise<SessionUser | null> {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get(SESSION_COOKIE_NAME)?.value;

    if (!token) {
      return null;
    }

    const session = await db.session.findUnique({
      where: { token },
      include: {
        user: {
          include: {
            profile: {
              select: {
                id: true,
                artisticName: true,
                status: true,
                featured: true,
              },
            },
          },
        },
      },
    });

    if (!session || session.expiresAt < new Date()) {
      if (session) {
        await db.session.delete({ where: { token } });
      }
      return null;
    }

    const { user } = session;
    return {
      id: user.id,
      email: user.email,
      name: user.name,
      role: user.role,
      image: user.image,
      profile: user.profile,
    };
  } catch (error) {
    console.error('Error getting server session:', error);
    return null;
  }
}

export async function validateSession(token: string): Promise<boolean> {
  const session = await db.session.findUnique({
    where: { token },
  });

  if (!session || session.expiresAt < new Date()) {
    return false;
  }

  return true;
}

export async function destroySession(token: string): Promise<void> {
  await db.session.deleteMany({
    where: { token },
  });
}

export async function cleanExpiredSessions(): Promise<void> {
  await db.session.deleteMany({
    where: {
      expiresAt: {
        lt: new Date(),
      },
    },
  });
}
