import fs from "node:fs";
import sql from "better-sqlite3";
import slugify from "slugify";
import xss from "xss";

const db = sql("meals.db");

export async function getMeals() {
  await new Promise((resolve) => setTimeout(resolve, 2000));
  // throw new Error("failed")
  return db.prepare("SELECT * FROM meals").all();
}

export function getMeal(slug: string) {
  return db.prepare("SELECT * FROM meals WHERE slug = ?").get(slug);
}

export async function saveMeal(meal: meal) {
  // sanitizing meal data
  meal.slug = slugify(meal.title, { lower: true });
  meal.instructions = xss(meal.instructions);

  if (meal.image instanceof File) {
    // let's write the image to the file system
    const extension = meal.image.name.split(".").pop();
    const fileName = `${meal.slug}.${extension}`;
    const stream = fs.createWriteStream(`public/images/${fileName}`);

    const bufferedImage = await meal.image.arrayBuffer();
    stream.write(Buffer.from(bufferedImage), (error) => {
      if (error) {
        throw new Error("Failed to save image");
      }
    });

    meal.image = `/images/${fileName}`;

    db.prepare(
      `
      INSERT INTO meals (title, slug, image, summary, instructions, creator, creator_email)
      VALUES (
        @title,
        @slug,
        @image,
        @summary,
        @instructions,
        @creator,
        @creator_email
      )`
    ).run(meal);
  }
}
