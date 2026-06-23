const API_KEY = "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";

const chat =
document.getElementById("chat");

const sendBtn =
document.getElementById("sendBtn");

const userInput =
document.getElementById("userInput");

function addMessage(text,type){

  const div =
  document.createElement("div");

  div.className =
  type === "user"
  ? "user-msg"
  : "ai-msg";

  div.textContent = text;

  chat.appendChild(div);

  chat.scrollTop =
  chat.scrollHeight;
}

async function askAI(message){

  const response =
  await fetch(
  "https://api.groq.com/openai/v1/chat/completions",
  {
    method:"POST",
    headers:{
      "Content-Type":"application/json",
      "Authorization":
      `Bearer ${API_KEY}`
    },
    body:JSON.stringify({
      model:
      "llama-3.3-70b-versatile",

      messages:[
      {
        role:"system",
        content:
        "You are Sambhav AI, a helpful assistant."
      },
      {
        role:"user",
        content:message
      }
      ]
    })
  });

  const data =
  await response.json();

  return data.choices[0]
  .message.content;
}

sendBtn.onclick =
async () => {

  const msg =
  userInput.value.trim();

  if(!msg) return;

  addMessage(msg,"user");

  userInput.value = "";

  addMessage(
  "Thinking...",
  "ai"
  );

  try{

    const reply =
    await askAI(msg);

    chat.lastChild.remove();

    addMessage(
    reply,
    "ai"
    );

  }catch(err){

    chat.lastChild.remove();

    addMessage(
    "❌ API Error",
    "ai"
    );

    console.log(err);
  }

};