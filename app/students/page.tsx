"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Student } from "@/utils/types/user";

const page = () => {
  const [students, setStudents] = useState<Student[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api/students", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (response.ok) {
          const result = await response.json();
          setStudents(result.allUsers);
        } else {
          const error = await response.json();
          console.log(error);
        }
      } catch (error) {
        console.error("Error: ", error);
      }
    };
    fetchData();
  }, []);

  const deleteUserById = async (id: number) => {
    try {
      const response = await fetch(`/api/students/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        const result = await response.json();
        setStudents(result.allUsers);
      } else {
        const error = await response.json();
        console.log(error);
      }
    } catch (error) {
      console.log("Error: ", error);
    }
  };

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full table-auto border border-gray-200">
        <caption className="caption-top">StudentList</caption>
        <thead>
          <tr>
            <th className="px-2 py-2">Name</th>
            <th className="px-2 py-2">Email</th>
            <th className="px-2 py-2">Age</th>
            <th className="px-2 py-2">Course</th>
            <th className="px-2 py-2"></th>
            <th className="px-2 py-2"></th>
          </tr>
        </thead>
        <tbody>
          {students.length > 0 ? (
            students.map((student, index) => (
              <tr key={index}>
                <td className="px-2 py-2 justify-center items-center">
                  {student.name}
                </td>
                <td className="px-2 py-2">{student.email}</td>
                <td className="px-2 py-2">{student.age}</td>
                <td className="px-2 py-2">
                  {student.course.map((value, index) => (
                    <span key={index}>
                      {value.name}
                      {index !== student.course.length - 1 && " "}
                    </span>
                  ))}
                </td>
                <td>
                  <Link
                    href={`/students/${student._id}`}
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-2 rounded-full"
                  >
                    Update
                  </Link>
                </td>
                <td>
                  <button
                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-2 rounded-full"
                    onClick={() => deleteUserById(student._id!)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td>No students</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default page;
