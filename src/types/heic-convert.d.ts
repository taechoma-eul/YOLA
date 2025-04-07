declare module 'heic-convert' {
  // heic-convert 함수의 입력 옵션
  interface ConvertOptions {
    buffer: Buffer;
    format: 'JPEG' | 'PNG';
    quality: number;
  }

  // heic-convert 함수 타입
  function heicConvert(options: ConvertOptions): Promise<Buffer>;

  // 모듈 내보내기
  export default heicConvert;
}
