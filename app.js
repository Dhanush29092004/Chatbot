function askgemini() {
  const questionInput = document.getElementById("questionInput");
  const question = questionInput.value.trim();
  if (!question) return;

  const chatWindow = document.getElementById("chat-window");

  // 👉 Add USER message
  const userMessage = document.createElement("div");
  userMessage.className = "message user";
  userMessage.innerText = question;
  chatWindow.appendChild(userMessage);

  // 👉 Add BOT placeholder
  const botMessage = document.createElement("div");
  botMessage.className = "message bot";
  botMessage.innerText = "Typing...";
  chatWindow.appendChild(botMessage);

  // 👉 Scroll to bottom
  chatWindow.scrollTop = chatWindow.scrollHeight;

  questionInput.value = "";


    fetch("https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=AIzaSyB2kuopoRPuFhuMMeEHuehwZG9NP2cpe8Q", {
         method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      contents: [{ parts: [{ text: question }] }]
    })
  })
    .then(response => response.json())
    .then(data => {
      botMessage.innerText = data.candidates[0].content.parts[0].text;
    })
    .catch(error => {
      console.error(error);
      botMessage.innerText = "Oops! Something went wrong.";
    });
}