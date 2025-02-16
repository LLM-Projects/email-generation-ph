"use server";

import { generateText } from "ai";
import { openai } from "@ai-sdk/openai";

export async function regenerateTemplate(current_html: string, prompt: string) {
  const errStr =
    "An error occurred while regenerating the template. Please try again.";
  try {
    const { text } = await generateText({
      model: openai("gpt-4o"),
      prompt: `Regenerate the HTML email template according to the ${prompt}
               without any additional text or explanations:\n\n
               Current HTML: ${current_html}\n
               Ensure not to include backticks in the generated HTML.`,
    });
    return text;
  } catch (error) {
    console.error("Error regenerating template:", error);
    return errStr;
  }
}
