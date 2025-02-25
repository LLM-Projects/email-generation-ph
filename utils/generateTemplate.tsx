"use server";

import OpenAI from "openai";

export async function generateTemplate(
  prompt: string,
  imageUrls: string[],
  apiKey: string
) {
  const openai = new OpenAI({ apiKey: apiKey });
  if (!apiKey) {
    console.error("❌ OpenAI API key is missing on the server.");
    return "An error occurred while generating the template.";
  }

  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        {
          role: "system",
          content:
            "Generate an HTML email template based on the following prompt. Return only the HTML for the email template (no markdown format), without any additional text or explanations.",
        },
        {
          role: "user",
          content: `${prompt}. Use the image URLs array to map Image URLs to their respective image URLs in the array (1-indexed). Images: ${JSON.stringify(
            imageUrls
          )}. Ensure not to include backticks in the generated HTML.`,
        },
      ],
      max_tokens: 1000,
    });

    return response.choices[0].message.content;
  } catch (error) {
    console.error("Error generating template:", error);
    return "An error occurred while generating the template.";
  }
}
