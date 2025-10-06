import {GoogleGenAI} from "@google/genai";

export async function handler(e, context) {
  try{
    const {prompt} = JSON.parse(e.body)
    const genai = new GoogleGenAI({
    apiKey: process.env.PollyGlot_GENAI_KEY
    })
    const response = await genai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt
    }) 
    return{
      statusCode: 200,
      body: JSON.stringify({text: response.text}),
    }

  }catch(err) {
    console.error(err)
    return{
      statusCode: 500,
      body: JSON.stringify({error: "SOMETHING WENT WRONG!"})
    }
  }
}