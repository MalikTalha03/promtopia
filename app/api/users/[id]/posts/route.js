import { connectToDB } from "@utils/database";
import Prompt from "@models/prompt";

export const GET = async (req, { params }) => {
  try {
    await connectToDB();
    const prompts = await Prompt.find({ creator: params.id }).populate(
      "creator"
    );
    return new Response(JSON.stringify(prompts), { status: 200 });
  } catch (error) {
    return new Response("Failed to fetch prompts", { status: 500 });
  }
};

export const PATCH = async (req, { params }) => {
  const { prompt, tag } = req.json();
  try {
    await connectToDB();
    const exsisitingPrompt = await Prompt.findById(params.id);
    if (!exsisitingPrompt) {
      return new Response("Prompt not found", { status: 404 });
    }
    exsisitingPrompt.prompt = prompt;
    exsisitingPrompt.tag = tag;
    await exsisitingPrompt.save();
    return new Response(JSON.stringify(exsisitingPrompt), { status: 200 });
  } catch (error) {
    return new Response("Failed to update prompt", { status: 500 });
  }
};

export const DELETE = async (req, { params }) => {
  try {
    await connectToDB();
    await Prompt.findByIdAndDelete(params.id);
    return new Response("Prompt deleted", { status: 200 });
  } catch (error) {
    return new Response("Failed to delete prompt", { status: 500 });
  }
};
