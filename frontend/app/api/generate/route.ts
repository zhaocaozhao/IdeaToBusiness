import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const { topic } = await request.json();
  // TODO: integrate GPT, TTS and video generation services
  return NextResponse.json({
    message: `已根据主题「${topic}」生成视频（示例）。`
  });
}
