export async function generateResumeContent(apiKey, prompt, contextType) {
  if (!apiKey) {
    throw new Error('API Key is missing');
  }

  const endpoint = "https://openrouter.ai/api/v1/chat/completions";

  let systemInstruction = "";
  if (contextType === 'summary') {
    systemInstruction = "You are an expert resume writer. The user will provide a rough draft of their professional summary. Rewrite it into a polished, compelling, and professional summary (3-4 sentences max). Do not include any introductory text like 'Here is your summary:', just output the final text.";
  } else {
    systemInstruction = "You are an expert resume writer. The user will provide rough notes about their work experience. Rewrite them into 3-4 highly professional, action-oriented bullet points using the STAR method (Situation, Task, Action, Result). Start each bullet point with '• '. Do not include any introductory text, just output the bullet points.";
  }

  const requestBody = {
    model: "qwen/qwen-2.5-7b-instruct",
    messages: [
      { role: "system", content: systemInstruction },
      { role: "user", content: prompt }
    ],
    temperature: 0.7,
    max_tokens: 500,
  };

  const response = await fetch(endpoint, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${apiKey}`,
      'HTTP-Referer': window.location.origin, // required by OpenRouter
      'X-Title': 'AI Resume Builder', // optional, helps OpenRouter dashboard
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(requestBody)
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error?.message || 'Failed to generate content');
  }

  const data = await response.json();
  return data.choices[0].message.content.trim();
}
