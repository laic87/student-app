import { UserModel } from "@/utils/models/userModels";
import { Student } from "@/utils/types/user";
import { NextApiRequest } from "next";
import { NextRequest, NextResponse } from "next/server";

// G E T   U S E R   B Y   I D
export async function GET(request: NextApiRequest) {
  const id = request.url?.split("students/")[1];
  console.log(request.url);
  console.log(request.url?.split("students"));
  console.log(request.url?.split("students/")[0]);
  console.log(request.url?.split("students/")[1]);

  try {
    if (!id) {
      throw new Error("Missing ID parameter");
    }
    const user = await UserModel.findById(id);

    if (!user) {
      return NextResponse.json({ messange: "User not found" }, { status: 404 });
    }
    return NextResponse.json({ user });
  } catch (error) {
    return NextResponse.json(
      { message: error || "Error occurred" },
      { status: 400 }
    );
  }
}

//
export async function DELETE(request: NextApiRequest) {
  const id = request.url?.split("students/")[1];

  //http://localhost:3000/students/65860815dcd613644688177d

  try {
    if (!id) {
      throw new Error("Missing ID parameter");
    }
    // 3
    const deleteStudent = await UserModel.findByIdAndDelete(id); // 2

    if (deleteStudent) {
      const allUsers = await UserModel.find(); // 2
      return NextResponse.json({ allUsers, message: "Student was deleted" });
    } else {
      return NextResponse.json(
        { message: "Student not found" },
        { status: 404 }
      );
    }
  } catch (error) {
    return NextResponse.json("Internal Server Error:" + error);
  }
}

export async function PUT(request: NextRequest) {
  const id = request.url?.split("students/")[1];

  try {
    if (!id) {
      throw new Error("Missing ID parameter");
    }

    // Extract updated data from request body
    const { name, email, age, course }: Student = await request.json();

    console.log("====");
    console.log(course);

    // Find the student by ID
    const student = await UserModel.findById(id);

    if (!student) {
      return NextResponse.json(
        { message: "Student not found" },
        { status: 404 }
      );
    }

    // Update student properties with the provided data
    student.name = name;
    student.email = email;
    student.age = age;
    student.courses = course;

    // Save the updated student
    const updatedStudent = await student.save();

    return NextResponse.json({
      updatedStudent,
      message: "Student updated successfully",
    });
  } catch (error) {
    return NextResponse.json("Internal Server Error:" + error);
  }
}
