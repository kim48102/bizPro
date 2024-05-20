import { createWorker } from 'tesseract.js';
import path from 'path';

const runTesseract = async () => {
  console.log('Creating worker...');
  const worker = await createWorker();

  try {
    console.log('Recognizing text...');
    // 이미지 파일의 절대 경로를 설정합니다.
    const imagePath = path.join('sample_driver_license.png');
    const {
      data: { text },
    } = await worker.recognize(imagePath, 'kor');

    console.log('Text recognized:', text);
  } catch (error) {
    console.error('Error during Tesseract processing:', error);
  } finally {
    console.log('Terminating worker...');
    await worker.terminate();
  }
};

runTesseract();
