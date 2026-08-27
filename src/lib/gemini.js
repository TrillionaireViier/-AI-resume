export async function generateResumeContent(apiKey, prompt, contextType) {
  if (!apiKey) {
    throw new Error('API Key is missing');
  }

  const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`;

  let systemInstruction = "";
  if (contextType === 'summary') {
    systemInstruction = "You are an expert resume writer. The user will provide a rough draft of their professional summary. Rewrite it into a polished, compelling, and professional summary (3-4 sentences max). Do not include any introductory text like 'Here is your summary:', just output the final text.";
  } else {
    systemInstruction = "You are an expert resume writer. The user will provide rough notes about their work experience. Rewrite them into 3-4 highly professional, action-oriented bullet points using the STAR method (Situation, Task, Action, Result). Start each bullet point with '• '. Do not include any introductory text, just output the bullet points.";
  }

  const requestBody = {
    contents: [{
      parts: [{ text: prompt }]
    }],
    systemInstruction: {
      parts: [{ text: systemInstruction }]
    },
    generationConfig: {
      temperature: 0.7,
      maxOutputTokens: 500,
    }
  };

  const response = await fetch(endpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(requestBody)
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error?.message || 'Failed to generate content');
  }

  const data = await response.json();
  return data.candidates[0].content.parts[0].text.trim();
}
