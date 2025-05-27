import { NextRequest, NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';

export const runtime = 'edge';

export async function POST(req: NextRequest) {
  try {
    const { content, images } = await req.json();
    
    // Initialize the Google Generative AI client
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');
    const model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash-preview-05-20' });
    
    // Construct prompt for brand guide parsing
    const prompt = `Parse the following brand guide content and extract structured information about the brand:

${content}

Extract the following information:
1. Brand colors (HEX codes if available)
2. Font names (primary and secondary)
3. Business type/industry
4. Brand tone/personality
5. Target audience
6. Unique selling proposition
7. Any other relevant brand identity information

Respond in JSON format with the following structure:
{
  "colours": ["#HEX1", "#HEX2", "#HEX3", "#HEX4", "#HEX5"],
  "fonts": { "primary": "Font Name", "secondary": "Font Name" },
  "metadata": { 
    "businessType": "Industry", 
    "tone": "Brand Personality",
    "audience": "Target Audience",
    "usp": "Unique Selling Proposition",
    "description": "Brief description of the brand"
  }
}`;
    
    // Generate content with the constructed prompt
    const result = await model.generateContent(prompt);
    const response = result.response;
    const text = response.text();
    
    // Parse the JSON response
    try {
      // Extract JSON from response (in case there's any extra text)
      const jsonMatch = text.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        const parsedData = JSON.parse(jsonMatch[0]);
        
        // Construct theme data
        const themeData = {
          logo: null, // Logo will be handled separately
          colours: parsedData.colours || [],
          fonts: parsedData.fonts || null,
          icons: null, // Icons will be selected later
          metadata: {
            ...parsedData.metadata,
            source: 'brandGuide',
            createdAt: new Date().toISOString(),
          },
          presets: [],
        };
        
        return NextResponse.json({ themeData });
      } else {
        throw new Error('Could not parse JSON from response');
      }
    } catch (parseError) {
      console.error('Error parsing Gemini response:', parseError);
      return NextResponse.json(
        { error: 'Failed to parse AI response', details: text },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error('Error in parse-brand-guide API:', error);
    return NextResponse.json(
      { error: 'Failed to parse brand guide', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
} 