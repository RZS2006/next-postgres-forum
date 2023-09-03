import type { NextApiRequest, NextApiResponse } from 'next';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../auth/[...nextauth]/route';
import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET(req: any, res: any) {
  try {
    const data = await prisma.post.findMany({
      include: {
        user: true,
        comments: true,
      },
      orderBy: {
        createdAt: 'desc',
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

  const user = await prisma.user.findUnique({
    where: { email: session?.user?.email as string },
  });

  if (!body.title) {
    return NextResponse.json(
      { message: 'You must add a title.' },
      {
        status: 400,
      }
    );
  }

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
      { message: 'You must write a shorter post.' },
      {
        status: 400,
      }
    );
  }

  try {
    const result = await prisma.post.create({
      data: {
        title: body.title,
        content: body.content,
        userId: user?.id || '',
      },
    });
    return NextResponse.json({ result });
  } catch {
    return NextResponse.json(
      { message: 'An error occurred while creating a post.' },
      {
        status: 500,
      }
    );
  }
}
