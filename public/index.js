fetch("/.netlify/functions/generate", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ prompt: "Hello, how are you?" })
})
.then(res => res.json())
.then(data => console.log(data.text))
