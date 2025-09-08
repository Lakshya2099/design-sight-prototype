import axios from 'axios';
import fs from 'fs';
import path from 'path';

const getBase64Image = (imagePath) => {
  const fullPath = path.resolve(imagePath);
  return fs.readFileSync(fullPath, { encoding: 'base64' });
};

const generateAnalysisPrompt = (base64Image) => {
  return {
    model: "gpt-4o",
    messages: [
      {
        role: "system",
        content: `You are DesignSight, an expert AI design reviewer. Your task is to analyze a UI screenshot and provide structured feedback in JSON format.
        Analyze the image for these four categories: 'Accessibility', 'Visual Hierarchy', 'Content & Copy', and 'UI/UX Patterns'.
        For each issue you find, create a feedback object. Each object must include:
        - category: One of the four categories.
        - severity: 'Low', 'Medium', or 'High'.
        - feedbackText: A concise description of the issue.
        - recommendation: A clear, actionable suggestion for improvement.
        - coordinates: An object with x, y, width, and height as percentages (0-100) of the image dimensions, representing the bounding box of the issue. Be precise.
        - roleTags: An array of roles that would find this feedback most relevant ('Designer', 'Reviewer', 'Product Manager', 'Developer').

        Respond ONLY with a valid JSON array of these feedback objects inside a root key named "feedback". Do not include any other text, explanations, or markdown formatting.`
      },
      {
        role: "user",
        content: [
          { type: "text", text: "Analyze the following UI design and provide structured feedback as a JSON array." },
          { type: "image_url", image_url: { url: `data:image/jpeg;base64,${base64Image}` } }
        ]
      }
    ],
    response_format: { type: "json_object" },
    max_tokens: 4096
  };
};

export const analyzeImageWithAI = async (imagePath) => {
  try {
    const base64Image = getBase64Image(imagePath);
    const payload = generateAnalysisPrompt(base64Image);

    const response = await axios.post(
      'https://api.openai.com/v1/chat/completions',
      payload,
      {
        headers: {
          'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
          'Content-Type': 'application/json',
        },
      }
    );

    const rawContent = response.data.choices[0].message.content;
    const jsonContent = JSON.parse(rawContent);
    
    const feedbackArray = jsonContent.feedback;

    if (!Array.isArray(feedbackArray)) {
        throw new Error("AI response was not a valid JSON array of feedback items.");
    }
      
    return feedbackArray;

  } catch (error) {
    console.error('Error analyzing image with AI:', error.response ? error.response.data : error.message);
    throw new Error('Failed to get analysis from AI service.');
  }
};