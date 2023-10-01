import { getServerSession } from 'next-auth/next';
import { authOptions } from '../auth/[...nextauth]/route';
import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function POST(req: any, res: any) {
  const body = await req.json();

  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json(
      { message: 'You must sign in to add a comment.' },
      {
        status: 401,
      }
    );
  }

  const user = await prisma.user.findUnique({
    where: { email: session?.user?.email as string },
  });

  if (!body.content) {
    return NextResponse.json(
      { message: 'You must add content.' },
      {
        status: 400,
      }
    );
  }

  if (body.content.length > 500) {
    return NextResponse.json(
      { message: 'You must write a shorter comment.' },
      {
        status: 400,
      }
    );
  }

  try {
    const result = await prisma.comment.create({
      data: {
        message: body.content,
        userId: user?.id || '',
        postId: body.id,
      },
    });
    return NextResponse.json({ result });
  } catch {
    return NextResponse.json(
      { message: 'An error occurred while creating a comment.' },
      {
        status: 500,
      }
    );
  }
}
