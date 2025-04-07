import { heicConvertImage } from './api/heic-convert-image.api';

/**
 * 이미지 파일의 확장자가 heic 타입인지 체크하는 함수입니다.
 * @param { File } file - 업로드 하려는 이미지 파일
 * @returns { boolean } isHeic - heic 타입일 때: true, 그 외: false
 */
export const isHeicCheck = (file: File): boolean => {
  const isHeic =
    file.type === 'image/heic' ||
    file.name.toLowerCase().endsWith('.heic') ||
    file.name.toLowerCase().endsWith('.heif');

  return isHeic;
};

/**
 * 이미지 업로드 시, 선택한 파일의 확장자가 heic 타입이면 해당 파일을 jpg로 변환해주는 함수입니다.
 * heic 파일일 때는 heicConvertImage api 함수를 통해 파일을 jpg로 변환하여 processedFile에 할당한 후 반환합니다.
 * heic 파일이 아닐 때는 원본 파일 그대로 processedFile에 할당한 후 반환합니다.
 * @param { File } file - 업로드 하려는 이미지 파일
 * @returns { File } - jpg로 변환된 파일 또는 heic 파일이 아닐 때는 원본 파일
 */
export const processedImage = async (file: File): Promise<File> => {
  const isHeic = isHeicCheck(file);

  let processedFile = file;

  if (isHeic) {
    // HEIC 파일을 JPEG로 변환
    const formData = new FormData();
    formData.append('file', file);

    try {
      const blob = await heicConvertImage(formData);
      processedFile = new File([blob], `${file.name.split('.')[0]}.jpg`, {
        type: 'image/jpeg'
      });
    } catch (error) {
      console.error('HEIC 변환 오류:', error);
      throw error;
    }
  }

  return processedFile;
};

/**
 * 선택한 파일의 확장자가 heic 타입이면 해당 파일을 jpg로 변환한 미리보기 url을 반환해주는 함수입니다.
 * heic 파일일 때는 heicConvertImage api 함수를 통해 파일을 jpg로 변환한 뒤 해당 파일 미리보기 링크를 url에 할당하여 반환합니다.
 * heic 파일이 아닐 때는 원본 파일 그대로의 미리보기 링크를 url에 할당하여 반환합니다.
 * 변환 오류가 발생할 시에는 null 값을 반환합니다.
 * @param { File } selectedFile - 미리보기를 위해 선택한 이미지 파일
 * @returns { string | null } - jpg로 변환된 파일 또는 heic 파일이 아닐 때는 원본 파일의 미리보기 url
 */
export const processedImagePreview = async (selectedFile: File): Promise<string | null> => {
  // HEIC 파일인지 확인
  const isHeic = isHeicCheck(selectedFile);

  let url: string | null = null;

  if (isHeic) {
    // HEIC 파일을 JPEG로 변환
    const formData = new FormData();
    formData.append('file', selectedFile);

    try {
      const blob = await heicConvertImage(formData);
      url = URL.createObjectURL(blob);
    } catch (error) {
      console.error('HEIC 변환 오류:', error);
      return null;
    }
  } else {
    // HEIC가 아닌 경우 원본 파일로 미리보기 생성
    url = URL.createObjectURL(selectedFile);
  }

  return url;
};
