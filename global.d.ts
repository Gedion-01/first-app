declare global {
  type meal = {
    title: string;
    slug?: string;
    image: File | string;
    summary: string;
    instructions: string;
    creator: string;
    creator_email: string;
  };
}
export {}