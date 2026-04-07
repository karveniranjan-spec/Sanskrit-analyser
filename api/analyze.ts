import type { VercelRequest, VercelResponse } from '@vercel/node';

const systemPrompt = `You are an expert Vedic analyst and Sanskrit scholar.
When provided with a Vedic verse, reference, or fragment, you must provide a meticulous analysis formatted exactly as a JSON string matching the following TypeScript interface (do not wrap in markdown blocks, just return exact JSON):

export interface WordAnalysis {
  word: string;
  transliteration: string;
  meaning: string;
}

export interface VedicData {
  verseId: string;
  mantraDevanagari: string;
  mantraTransliteration: string;
  literalTranslation: string;
  philosophicalTranslation: string;
  padapathaDevanagari: string;
  padapathaTransliteration: string;
  wordAnalysis: WordAnalysis[];
  imagePrompt: string;      // A visually descriptive prompt describing a cinematic/mystical scene relating to this verse.
  notebookLmInput: string; // A brief analytical prompt/summary explaining the verse context.
}
`;

export default async function handler(
  request: VercelRequest,
  response: VercelResponse,
) {
  if (request.method !== 'POST') {
    return response.status(405).json({ error: 'Method Not Allowed' });
  }

  const { verse } = request.body;
  
  if (!verse || typeof verse !== 'string') {
    return response.status(400).json({ error: 'Verse input is required' });
  }

  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return response.status(500).json({ error: 'Server configuration error: API key is missing.' });
  }

  try {
    const geminiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`;

    const res = await fetch(geminiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        systemInstruction: {
          parts: [{ text: systemPrompt }]
        },
        contents: [
          { parts: [{ text: `Please analyze the following Vedic input: ${verse}` }] }
        ],
        generationConfig: {
          responseMimeType: 'application/json'
        }
      })
    });

    if (!res.ok) {
        const errorText = await res.text();
        console.error("Gemini API Error:", errorText);
        throw new Error('Failed to fetch from Gemini API');
    }

    const data = await res.json();
    const RawText = data.candidates?.[0]?.content?.parts?.[0]?.text;
    
    if (!RawText) {
        throw new Error('Invalid response structure from Gemini');
    }

    const parsedResults = JSON.parse(RawText);

    return response.status(200).json(parsedResults);

  } catch (error: any) {
    console.error('Error processing request:', error);
    return response.status(500).json({ error: error.message || 'Internal Server Error' });
  }
}
