export const heicConvertImage = async (formData: FormData): Promise<Blob> => {
  const response: Response = await fetch('/api/convert-heic', {
    method: 'POST',
    body: formData
  });

  if (!response.ok) throw new Error('HEIC 변환 실패');

  // 변환된 JPEG 파일을 Blob으로 받아 새로운 File 객체 생성
  const blob: Blob = await response.blob();

  return blob;
};
