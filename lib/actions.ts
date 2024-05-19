"use server";

import { redirect } from "next/navigation";

import { saveMeal } from "./meals";
import { revalidatePath } from "next/cache";

function isValidText(text: string): boolean {
  return !text || text.trim() === "";
}

// sercer actions
export async function shareMeal(prevState: any, formData: FormData) {
  const meal = {
    title: formData.get("title") as string,
    summary: formData.get("summary") as string,
    instructions: formData.get("instructions") as string,
    image: formData.get("image") as string | File,
    creator: formData.get("name") as string,
    creator_email: formData.get("email") as string,
  };
  console.log(meal);

  if (
    isValidText(meal.summary) ||
    isValidText(meal.instructions) ||
    isValidText(meal.title) ||
    isValidText(meal.creator) ||
    isValidText(meal.creator_email) ||
    !meal.creator_email.includes("@") ||
    !(meal.image instanceof File && meal.image.size > 0)
  ) {
    return message;
  }
  await saveMeal(meal);
  revalidatePath("/meals"); // Triggers a revalidation of the data at the "/meals" path.
  redirect("/meals");
}

type messageType = { message: string | null };

const message: messageType = {
  message: "Invalid input. Please check your input and try again.",
};
