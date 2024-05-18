"use server";

import { redirect } from "next/navigation";

import { saveMeal } from "./meals";

function isValidText(text: string): boolean {
  return !text || text.trim() === "";
}

// sercer actions
export async function shareMeal(formData: FormData) {
  const meal = {
    title: formData.get("title") as string,
    summary: formData.get("summary") as string,
    instructions: formData.get("instructions") as string,
    image: formData.get("image") as string | File,
    creator: formData.get("name") as string,
    creator_email: formData.get("email") as string,
  };

  if (
    isValidText(meal.title) ||
    isValidText(meal.summary) ||
    isValidText(meal.instructions) ||
    isValidText(meal.creator) ||
    isValidText(meal.creator_email) ||
    !meal.creator_email.includes("@") ||
    !meal.image ||
    !(meal.image instanceof File && meal.image.size === 0)
  ) {
    throw new Error("Invalid meal data");
  }
  console.log(meal);
  await saveMeal(meal);
  redirect("/meals");
}
