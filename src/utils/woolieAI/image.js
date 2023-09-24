export function readFileAsync(imageFile) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = () => {
      resolve(reader.result);
    };

    reader.readAsDataURL(imageFile);
    reader.onerror = reject;
  });
}

export async function detectFaces(imageUrl) {
  const apiKey = process.env.REACT_APP_API_KEY;
  const apiSecret = process.env.REACT_APP_API_SECRET;
  const apiUrl1 = process.env.REACT_APP_API_URL_1;

  const formData = new FormData();
  formData.append('api_key', apiKey);
  formData.append('api_secret', apiSecret);
  formData.append('image_base64', imageUrl.split(',')[1]);
  formData.append('return_landmark', 2);
  formData.append('return_attributes', 'headpose');

  try {
    const response = await fetch(apiUrl1, {
      method: 'POST',
      body: formData,
    });
    if (!response.ok) {
      alert('죄송합니다. 네트워크 오류가 발생했습니다. 이미지를 다시 선택부탁드려요.');
      throw new Error('Network response was not ok');
    }
    const data = await response.json();

    if (data.face_num == 1) {
      if (Math.abs(data.faces[0].attributes.headpose.yaw_angle) >= 8) {
        alert('얼굴 각도가 너무 틀어져있습니다. 정면을 바라본 이미지를 업로드 부탁드려요 :)');
        return false;
      } else {
        return true;
      }
    } else {
      alert('얼굴이 하나인 사진만 업로드 부탁드려요 :)');
      return false;
    }
  } catch (error) {
    console.error(error);
  }
}

export async function detectFace(imageUrl) {
  const apiKey = process.env.REACT_APP_API_KEY;
  const apiSecret = process.env.REACT_APP_API_SECRET;
  const apiUrl = 'https://api-us.faceplusplus.com/facepp/v1/face/thousandlandmark';

  const formData = new FormData();
  formData.append('api_key', apiKey);
  formData.append('api_secret', apiSecret);
  formData.append('image_base64', imageUrl.split(',')[1]);
  formData.append('return_landmark', 'all');
  formData.append('return_face_rectangle', 1);

  try {
    const response = await fetch(apiUrl, {
      method: 'POST',
      body: formData,
    });
    if (!response.ok) {
      alert('죄송합니다. 네트워크 오류가 발생했습니다. 이미지를 다시 선택부탁드려요.');
      throw new Error('Network response was not ok');
    }
    const data = await response.json();

    const landmarks = data.face;

    return landmarks;
  } catch (error) {
    console.log(error);
  }
}

export async function extractFace(imageUrl, face) {
  const image = new Image();
  return new Promise((resolve) => {
    image.onload = async () => {
      // crop image 생성 하는 함수
      const faceRectangle = face.face_rectangle;
      const top = face.landmark.face.face_hairline_72.y;
      const bottom = faceRectangle.top + faceRectangle.height;
      const left = Math.max(0, faceRectangle.left - 75);
      const right = Math.min(image.width, faceRectangle.left + faceRectangle.width + 75);
      const adjustedTop = Math.max(0, top - 75);
      const adjustedBottom = Math.min(image.height, bottom + 75);

      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      canvas.width = right - left;
      canvas.height = adjustedBottom - adjustedTop;

      ctx.drawImage(image, left, adjustedTop, canvas.width, canvas.height, 0, 0, canvas.width, canvas.height);

      const croppedImage = new Image();
      croppedImage.src = canvas.toDataURL();

      const croppedImageSize = 256;
      resolve(transformFace(croppedImage, croppedImageSize));
    };
    image.src = imageUrl;
  });
}

function transformFace(image, size = 512) {
  return new Promise((resolve) => {
    image.onload = function () {
      // Extract the face region
      const face = image;
      const faceHeight = face.height;
      const faceWidth = face.width;
      const faceAspectRatio = faceWidth / faceHeight;

      // Resize the image based on the aspect ratio of the face region
      const newHeight = size;
      const newWidth = Math.floor(newHeight * faceAspectRatio);

      const resizedFaceCanvas = document.createElement('canvas');
      resizedFaceCanvas.width = newWidth;
      resizedFaceCanvas.height = newHeight;
      const ctx = resizedFaceCanvas.getContext('2d');

      ctx.drawImage(face, 0, 0, faceWidth, faceHeight, 0, 0, newWidth, newHeight);

      const resizedFaceCanvasURL = resizedFaceCanvas.toDataURL();
      resolve(resizedFaceCanvasURL);
    };
  });
}
