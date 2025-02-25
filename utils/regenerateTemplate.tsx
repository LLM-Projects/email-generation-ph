"use server";

import OpenAI from "openai";

export async function regenerateTemplate(
  current_html: string,
  prompt: string,
  apiKey: string
) {
  const errStr =
    "An error occurred while regenerating the template. Please try again.";
  try {
    const openai = new OpenAI({ apiKey: apiKey });
    const response = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        {
          role: "system",
          content:
            "Regenerate the HTML email template according to the given prompt without any additional text or explanations.",
        },
        {
          role: "user",
          content: `Current HTML: ${current_html}\n\nPrompt: ${prompt}\nEnsure not to include backticks in the generated HTML.`,
        },
      ],
      max_tokens: 1000,
    });
    return response.choices[0].message.content;
  } catch (error) {
    console.error("Error regenerating template:", error);
    return errStr;
  }
}
