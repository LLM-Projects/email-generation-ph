"use server";

import { generateText } from "ai";
import { openai } from "@ai-sdk/openai";

export async function generateTemplate(prompt: string, imageUrls: string[]) {
  const errStr =
    "An error occurred while generating the template. Please try again.";
  try {
    const { text } = await generateText({
      model: openai("gpt-4o"),
      prompt: `Generate an HTML email template based on the following prompt. 
               Return only the HTML for the email template (no markdown format),
              without any additional text or explanations:\n\n${prompt}. Use the
              image URLs array to map Image URLs to their respective image URLs
              in the array (1-indexed). Images: ${JSON.stringify(imageUrls)}.
              Ensure not to include backticks in the generated HTML.`,
    });
    return text;
  } catch (error) {
    console.error("Error generating template:", error);
    return errStr;
  }
}
