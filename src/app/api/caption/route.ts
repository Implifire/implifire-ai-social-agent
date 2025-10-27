import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY!,
});

export async function POST(req: NextRequest) {
  try {
    const { imageUrl, platform } = await req.json();

    const response = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        {
          role: 'user',
          content: [
            { type: 'text', text: `Write a ${platform}-optimized caption for this image. Local business vibe. Engaging. Include emojis. Max 120 chars.` },
            { type: 'image_url', image_url: { url: imageUrl } },
          ],
        },
      ],
      max_tokens: 100,
    });

    const caption = response.choices[0].message.content?.trim() || 'No caption.';
    return NextResponse.json({ caption });
  } catch (error) {
    console.error('OpenAI error:', error);
    return NextResponse.json({ error: 'Failed to generate caption' }, { status: 500 });
  }
}
