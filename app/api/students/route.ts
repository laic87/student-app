// Skapar APIer backend
import { UserModel } from "@/utils/models/userModels";
import { Student } from "@/utils/types/user";
import { NextRequest, NextResponse } from "next/server";

//  * C R E A T E   P O S T *       m async görs med await för att invänta svaret
export async function POST(request: NextRequest) {
  try {
    // {destructionary} ->  await -> invänta värden Parse JSON from request body
    const { name, email, age, course }: Student = await request.json(); //

    console.log("Receive data:", { name, email, age, course });

    //Validate the request body
    if (!name || !email || !age || !course) {
      return NextResponse.json(
        { message: "Invalid request body" },
        { status: 400 }
      );
    }

    //const courseIds = await getCourseIds(course)
    // * C R E A T E   N E W   U S E R  *       use UserModel
    const newUser = await UserModel.create({ name, email, age, course }); // är queri pushas till MongoDB,
    console.log("====");
    console.log(course);
    await newUser.save();
    console.log("Hello user: ", newUser);

    return NextResponse.json(
      { message: "User created successfully", user: newUser },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: "Error", error }, { status: 500 });
  }
}

//  C R E A T E   G E T
export async function GET() {
  try {
    const allUsers = await UserModel.find(); // pop to include course data
    return NextResponse.json({ allUsers });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: "Error", error }, { status: 500 });
  }
}
