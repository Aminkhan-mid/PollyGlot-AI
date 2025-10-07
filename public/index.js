const textarea = document.getElementById("textarea");
const radios = document.querySelectorAll("input[type='radio']");
const translateBtn = document.getElementById("translate");
const occurChange = document.getElementById("occurChange");
const origianText = document.getElementById("origianText");

translateBtn.addEventListener("click", async function () {
  const selectedLang = [...radios].find(r => r.checked)?.id;
  const prompt = `Translate this into ${selectedLang?.toUpperCase()}: ${textarea.value}`;

  if (!selectedLang || !textarea.value) {
    const aiResponse = document.getElementById("aiResponse"); 
    if(aiResponse) aiResponse.textContent = "⚠️ Please enter text and select a language.";
    return;
  }

  occurChange.innerHTML = `
        <p id="newTranslation">Your Translation 🎙️</p>
        <p id="aiResponse" class="aiResponse">
        Translating...
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200"><circle fill="#FF156D" stroke="#FF156D" stroke-width="15" r="15" cx="40" cy="65"><animate attributeName="cy" calcMode="spline" dur="2" values="65;135;65;" keySplines=".5 0 .5 1;.5 0 .5 1" repeatCount="indefinite" begin="-.4"></animate></circle><circle fill="#FF156D" stroke="#FF156D" stroke-width="15" r="15" cx="100" cy="65"><animate attributeName="cy" calcMode="spline" dur="2" values="65;135;65;" keySplines=".5 0 .5 1;.5 0 .5 1" repeatCount="indefinite" begin="-.2"></animate></circle><circle fill="#FF156D" stroke="#FF156D" stroke-width="15" r="15" cx="160" cy="65"><animate attributeName="cy" calcMode="spline" dur="2" values="65;135;65;" keySplines=".5 0 .5 1;.5 0 .5 1" repeatCount="indefinite" begin="0"></animate></circle></svg>
        </p>
        <button id="translate">Start Over</button>
  `
  const aiResponse = document.getElementById("aiResponse")
  const startOverBtn = document.getElementById("translate")
  origianText.textContent = `Original Text ⭐️`
  startOverBtn.addEventListener("click", ()=>{
    location.reload()
  })
  
  try {
    const response = await fetch(`/generate`, {
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
