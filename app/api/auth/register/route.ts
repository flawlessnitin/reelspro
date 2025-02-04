import { NextRequest, NextResponse } from "next/server";
import { dbConnect } from "@/lib/db";
import User from "@/models/User";

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json();
    if (!email || !password) {
      return NextResponse.json(
        { error: "Email and password are required!!" },
        { status: 400 }
      );
    }
    await dbConnect();
    const userExist = await User.findOne({ email });
    if (userExist) {
      return NextResponse.json(
        { error: "Email is already registered!" },
        { status: 400 }
      );
    }
    await User.create({
      email,
      password,
    });
    return NextResponse.json(
      { message: "User registerd Successfully!!" },
      { status: 201 }
    );
  } catch (error) {
    console.log(error)
    return NextResponse.json(
      { message: "Failed to register User!!",
      },
      { status: 201 }
    );
  }
}
