import { GoogleGenAI } from "@google/genai";

const apiKey = process.env.API_KEY;
const ai = apiKey ? new GoogleGenAI({ apiKey }) : null;

export const streamDocumentGeneration = async (
  prompt: string,
  onChunk: (text: string) => void,
  currentDocument?: string
): Promise<string> => {
  if (!ai) {
    throw new Error("API Key is missing. Please check your environment configuration.");
  }

  // "Training" the model via System Instructions using specific legal corpuses
  const systemInstruction = `
    You are an automated legal drafting engine.
    
    CORE OBJECTIVE:
    Generate valid, institutional-grade legal documents.
    
    STYLE:
    - Font: Formal, plain text.
    - Formatting: Use ALL CAPS for headers. Numbering: 1.1, (a), (i).
    - Tone: Strict, contractual, non-conversational.
    - NO MARKDOWN: Do not use bold (**) or headers (#). Do not use code blocks. Output raw text only.

    CRITICAL RULE - COMPLETENESS:
    - You must output the ENTIRE document from Preamble to Signature Block.
    - Do not summarize. Do not truncate.
    - If the document is long, continue generating until the signature lines are drawn.
    - IGNORE output length concerns. Priority is completeness.

    EDITING MODE:
    - If provided a current draft, your job is to REPRINT the entire document with the requested changes applied.
    - Do not output a diff.
    - Do not say "Rest of document unchanged".
    - Reprint every word.
  `;

  let effectivePrompt = prompt;
  
  if (currentDocument) {
      effectivePrompt = `
      CURRENT DRAFT:
      ${currentDocument}
      
      TASK: REWRITE the above document entirely to satisfy this request: "${prompt}"
      
      OUTPUT: The full, updated legal text.
      `;
  } else {
      effectivePrompt = `
      TASK: Draft a full ${prompt}.
      STANDARD: NVCA / BigLaw / Y Combinator.
      REQUIREMENT: Output full text including signature block.
      `;
  }

  try {
    const responseStream = await ai.models.generateContentStream({
      model: 'gemini-3-pro-preview', 
      contents: effectivePrompt,
      config: {
        systemInstruction: systemInstruction,
        temperature: 0.4, 
        maxOutputTokens: 8192, 
      },
    });

    let fullText = '';
    for await (const chunk of responseStream) {
      const text = chunk.text; 
      if (text) {
        fullText += text;
        onChunk(fullText);
      }
    }
    return fullText;
  } catch (error) {
    console.error("Error generating document:", error);
    throw error;
  }
};