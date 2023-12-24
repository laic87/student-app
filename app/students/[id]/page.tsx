"use client";
import React, { useState, useEffect, FormEvent } from "react";
import { useRouter } from "next/navigation";
import { Course, Student } from "@/utils/types/user";

const page = ({ params }: { params: { id: string } }) => {
  const [formData, setFormData] = useState<Student>({
    name: "",
    email: "",
    age: 0,
    course: [
      {
        name: "",
      },
    ],
  });

  const id = params.id;

  const router = useRouter();

  useEffect(() => {
    const fetchStudent = async () => {
      if (id) {
        console.log(id);
        try {
          const response = await fetch(`/api/students/${id}`, {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          });
          if (response.ok) {
            const result = await response.json();
            setFormData(result.user);
          } else {
            console.log("Couldnt fetch Student ");
          }
        } catch (error) {
          console.log("Something went wrong: " + error);
        }
      }
    };
    fetchStudent();
  }, [id]);

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();

    const updatedStudent: Student = {
      name: formData.name,
      email: formData.email,
      age: formData.age,
      course: formData.course,
    };

    try {
      const response = await fetch(`/api/students/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedStudent),
      });

      if (response.ok) {
        const result = await response.json();
        console.log(result);
        router.push("/students");
      } else {
        const error = await response.json();
        console.log(error);
      }
    } catch (error) {
      console.log("Something went wrong: " + error);
    }
  };

  const courseHandleChange = (event: any) => {
    event.preventDefault();
    const coursValue = event.trget.value; // hämtar värdet
    const coursesArray: Course[] = coursValue
      .split(",")
      .map((courseName: string) => ({ name: courseName.trim() }));

    setFormData((formData) => ({
      //...prevState, course: [...prevState.course, ...coursesArray]
      ...formData,
      course: coursesArray,
    }));
    console.log("Course Array: ", coursesArray); // finns värde i arrayen
  };

  const handleChangeForm = (event: any) => {
    setFormData({
      ...formData,
      [event.target.name]:
        event.target.type === "number"
          ? parseFloat(event.target.value)
          : event.target.value,
    });
    console.log(formData);
  };

  return (
    <div className="flex flex-row h-screen items-center justify-center">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col items-center space-y-3 "
      >
        <label htmlFor="name">Namn</label>
        <input
          className="p-2 rounded-sm"
          type="text"
          id="name"
          name="name"
          placeholder="name"
          value={formData.name}
          onChange={handleChangeForm}
          required
        />

        <label htmlFor="email">Email</label>
        <input
          className="p-2 rounded-sm"
          type="email"
          id="email"
          name="email"
          placeholder="email"
          value={formData.email}
          onChange={handleChangeForm}
          required
        />

        <label htmlFor="age">Ålder</label>
        <input
          className="p-2 rounded-sm"
          type="number"
          id="age"
          name="age"
          placeholder="12"
          value={formData.age}
          onChange={handleChangeForm}
          required
        />

        <label htmlFor="course">
          Kurs (separera med komma tecknet för fler kurser)
        </label>
        <input
          className="p-2 rounded-sm"
          type="text"
          id="course"
          name="course"
          placeholder="Kurs 1, Kurs 2, Kurs 3"
          value={formData.course.map((c) => c.name).join(",")}
          onChange={courseHandleChange}
          required
        />

        <button
          type="submit"
          className="bg-slate-600 hover:bg-green-600  rounded rounded-m w-32 h-9"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default page;
