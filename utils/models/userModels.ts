import mongoose, { Schema } from "mongoose";
import { Course, Student } from "../types/user";

const studentSchema = new Schema<Student>( // Object Student
  {
    name: {
      type: String,
      required: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
    },

    age: {
      type: Number,
      required: true,
    },
    course: [
      {
        name: {
          type: String,
        },
        teacher: {
          type: String,
          default: "Anders",
        },
      },
    ],
  },
  { strict: true } //regler i mallen
);

// man kan lägga in funktioner i Schema, visar namn med .fullName
studentSchema.methods.fullName = function () {
  const courseNames = this.course
    .map((course: { name: string }) => course.name)
    .join(",");
  return `${this.name} (Course: ${courseNames})`;
};

// Identifierar att det finns UserModel för att bli en Singelton
export const UserModel =
  mongoose.models.UserModel ||
  // Finns det ingen så identifiera en
  mongoose.model<Student>("UserModel", studentSchema, "users"); // på collection "user"
