const textarea = document.getElementById("textarea")
const radios = document.querySelectorAll("input[type='radio']")
const translateBtn = document.getElementById("translate")
const displayResponse = document.getElementById("display-airesponse")
const aiResponse = document.getElementById("aiResponse")





translateBtn.addEventListener("click", async function(){
    const selectedLang = [...radios].find(r => r.checked)?.id
    const prompt = `${textarea.value} -> ${selectedLang}`

    if(!selectedLang || !textarea.value){
        console.error("Please enter text and select a language")
        return
    }

    try {
        const response = await fetch(`/.netlify/functions/genai`, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({prompt})
        })

        if(!response.ok){
            console.error("Server returned an error", response.status)
            return
        }

        const data = await response.json()

        // ✅ Display the AI response in the page
        aiResponse.textContent = data.text

    } catch(err) {
        console.error("Error fetching AI response:", err)
        aiResponse.textContent = "Something went wrong!"
    }
})




