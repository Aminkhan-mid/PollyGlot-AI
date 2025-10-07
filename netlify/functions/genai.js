import {GoogleGenerativeAI} from "@google/generative-ai";

export async function handler(e, context) {
  if (e.httpMethod !== "POST") {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: "Method Not Allowed" }),
    };
  }

  try {
    const {prompt} = JSON.parse(e.body)
    const genAI = new GoogleGenerativeAI(process.env.PollyGlot_GENAI_KEY)
    const model = genAI.getGenerativeModel({model: "gemini-2.0-flash"})

    const results = await model.generateContent(prompt)
    const text = results.text()

    return {
      statusCode: 200,
      body: JSON.stringify({text}),
    }
  } catch(err) {
    console.error(err)
    return {
      statusCode: 500,
      body: JSON.stringify({error: err.message || "SOMETHING WENT WRONG!"})
    }
  }
}
