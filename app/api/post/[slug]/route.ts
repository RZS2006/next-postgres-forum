import type { NextApiRequest, NextApiResponse } from 'next';
import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET(req: any, { params }: { params: { slug: string } }) {
  try {
    const data = await prisma.post.findUnique({
      where: {
        id: params.slug,
      },
      include: {
        user: true,
        comments: {
          orderBy: {
            createdAt: 'desc',
          },
          include: { user: true },
        },
      },
    });
    return NextResponse.json(data);
  } catch {
    return NextResponse.json(
      { message: 'An error occurred while fetching the post.' },
      {
        status: 500,
      }
    );
  }
}
