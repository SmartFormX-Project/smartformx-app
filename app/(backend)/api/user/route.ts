import { NextResponse } from "next/server";
import prisma from "@/config/prisma";
import { hash } from "bcryptjs";

export async function GET() {
  const users = await prisma.user.findMany({select:{name: true, email: true, subscribeStatus: true}});

  return NextResponse.json(users);
}

export async function POST(req: Request) {
  const { user, business, provider, country } = await req.json();

  if (!user.email) {
    return NextResponse.json(
      { message: "you miss email", type: "missing_email" },
      { status: 403 }
    );
  }

  const exists = await prisma.user.findUnique({
    where: {
      email: user.email,
    },
  });
  if (exists) {
    return NextResponse.json(
      { message: "user already exists", type: "user_exists" },
      { status: 409 }
    );
  } else {
    const res = await prisma.user.create({
      data: {
        name: user.name,
        email: user.email,
        provider: provider,
        password: await hash(user.password, 10),
        country: country,
        Business: {
          create: {
            name: business.name,
            clients: business.clients,
            category: business.category,
            description: business.description,
          },
        },
      },
    });
    return NextResponse.json(res.id, { status: 201 });
  }
}
