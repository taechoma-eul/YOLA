import { NextRequest, NextResponse } from 'next/server';
import heicConvert from 'heic-convert';

export async function POST(request: NextRequest): Promise<NextResponse> {
  try {
    const formData: FormData = await request.formData();
    const file: File | null = formData.get('file') as File | null;

    if (!file) {
      return NextResponse.json({ message: '파일이 없습니다' }, { status: 400 });
    }

    const arrayBuffer: ArrayBuffer = await file.arrayBuffer();
    const inputBuffer: Buffer = Buffer.from(arrayBuffer);

    const outputBuffer: Buffer = await heicConvert({
      buffer: inputBuffer,
      format: 'JPEG',
      quality: 1
    });

    return new NextResponse(outputBuffer, {
      status: 200,
      headers: {
        'Content-Type': 'image/jpeg',
        'Content-Length': outputBuffer.length.toString()
      }
    });
  } catch (error: unknown) {
    console.error('HEIC 변환 오류:', (error as Error).message);
    return NextResponse.json({ message: '변환 실패' }, { status: 500 });
  }
}
