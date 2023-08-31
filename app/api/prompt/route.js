import { connectToDB } from "@utils/database";
import Prompt from "@models/prompt";

console.log("Inside Route.js");

export const GET = async (reqest) => {
  console.log("Sending all posts");
  try {
    await connectToDB();

    console.log("Connected to DB");
    const prompts = await Prompt.find({}).populate("creator");
    console.log("Got prompts:", prompts);
    return new Response(JSON.stringify(prompts), { status: 201 });
  } catch (error) {
    return new Response("Failed to fetch all prompts", { status: 201 });
  }
};
