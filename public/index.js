const textarea = document.getElementById("textarea");
const radios = document.querySelectorAll("input[type='radio']");
const translateBtn = document.getElementById("translate");
const aiResponse = document.getElementById("aiResponse"); // The element where we'll show the translation

translateBtn.addEventListener("click", async function () {
  const selectedLang = [...radios].find(r => r.checked)?.id;
  const prompt = `${textarea.value} -> ${selectedLang}`;

  if (!selectedLang || !textarea.value) {
    aiResponse.textContent = "⚠️ Please enter text and select a language.";
    return;
  }

  aiResponse.textContent = "⏳ Translating...";

  try {
    const response = await fetch(`/.netlify/functions/genai`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ prompt })
    });

    if (!response.ok) {
      aiResponse.textContent = `❌ Server Error: ${response.status}`;
      console.error("Server returned an error", response.status);
      return;
    }

    const data = await response.json();
    aiResponse.textContent = data.text || "No response received.";
    console.log("AI Response:", data.text);
  } catch (err) {
    aiResponse.textContent = "🚨 Something went wrong. Check console for details.";
    console.error("Error:", err);
  }
});
