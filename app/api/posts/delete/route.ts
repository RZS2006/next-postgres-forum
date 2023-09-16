import { getServerSession } from 'next-auth/next';
import { authOptions } from '../../auth/[...nextauth]/route';
import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function POST(req: any, res: any) {
  const body = await req.json();

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
    const result = await prisma.post.delete({
      where: {
        id: body.data,
      },
    });
    return NextResponse.json({ result });
  } catch {
    return NextResponse.json(
      { message: 'An error occurred while deleting the post.' },
      {
        status: 500,
      }
    );
  }
}
