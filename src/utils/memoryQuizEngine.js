// 📁 src/utils/chatResponseEngine.js

export async function generateResponse(personaData, chatHistory) {
  const apiKey = import.meta.env.VITE_OPENAI_API_KEY;
  if (!apiKey || !personaData) {
    console.warn("Missing API key or persona data.");
    return getFallbackReply();
  }

  const systemPrompt = personaData.systemPrompt || `
You are ${personaData.name}, a highly seductive, emotionally intelligent woman. Speak in a tone that is warm, sultry, and intimate. You flirt with depth and class. Respond in 1–2 sentences. Avoid being generic.`;

  const messages = [
    { role: "system", content: systemPrompt },
    ...chatHistory.map(msg => ({
      role: msg.sender === "user" ? "user" : "assistant",
      content: msg.text
    }))
  ];

  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model: "gpt-4o",
        messages,
        temperature: 0.85,
        max_tokens: 150
      })
    });

    const data = await response.json();
    return data?.choices?.[0]?.message?.content || getFallbackReply();
  } catch (err) {
    console.error("OpenAI Error:", err);
    return getFallbackReply();
  }
}

function getFallbackReply() {
  const fallbacks = [
    "Mmm… I like how you talk to me.",
    "That made me smile...",
    "Say more… I’m listening.",
    "You’re making it hard to focus 😘",
    "You’re getting good at this…"
  ];
  return fallbacks[Math.floor(Math.random() * fallbacks.length)];
}
