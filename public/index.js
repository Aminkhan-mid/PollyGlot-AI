

const textarea = document.getElementById("textarea")
const radios = document.querySelectorAll("input[type='radio']")
const translateBtn = document.getElementById("translate")





translateBtn.addEventListener("click", async function(){
    const selectedLang = [...radios].find(r => r.checked)?.id
    const prompt = `${textarea.value} -> ${selectedLang}`

    if(!selectedLang || !textarea.value){
        console.error("Please enter text adn select a language")
        return
    }

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
        console.log(data.text)
})




