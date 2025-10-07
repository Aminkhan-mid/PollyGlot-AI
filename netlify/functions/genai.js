import OpenAI from "@google/generative-ai";

export async function handler(event) {
  if (event.httpMethod !== "POST") {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: "Method Not Allowed" }),
    };
  }

  try {
    const { prompt } = JSON.parse(event.body);

    const client = new OpenAI({ apiKey: process.env.POLLYGLOT_GENAI_KEY });

    const response = await client.responses.create({
      model: "gemini-2.5-flash",
      input: prompt
    });

    return {
      statusCode: 200,
      body: JSON.stringify({ text: response.output_text }),
    };
  } catch (err) {
    console.error(err);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: err.message || "Something went wrong!" }),
    };
  }
}
