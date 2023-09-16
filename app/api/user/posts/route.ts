import type { NextApiRequest, NextApiResponse } from 'next';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../..//auth/[...nextauth]/route';
import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET(req: any, res: any) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json(
      { message: 'You must sign in to create a post.' },
      {
        status: 401,
      }
    );
  }

  try {
    const data = await prisma.user.findUnique({
      where: {
        email: session.user?.email || '',
      },
      include: {
        posts: {
          orderBy: {
            createdAt: 'desc',
          },
          include: {
            user: true,
            comments: true,
          },
        },
      },
    });
    return NextResponse.json(data);
  } catch {
    return NextResponse.json(
      { message: 'An error occurred while fetching the posts.' },
      {
        status: 500,
      }
    );
  }
}
