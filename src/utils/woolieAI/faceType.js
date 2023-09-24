/* eslint-disable @typescript-eslint/no-unused-vars */
import { face_type_datas } from './parsed_data';
export function face_type_analysis(imageUrl, landmarks) {
  // 얼굴형 ??
  const imageElement = new Image();
  return new Promise((resolve) => {
    imageElement.onload = async function () {
      const canvas = document.createElement('canvas');
      canvas.width = imageElement.width;
      canvas.height = imageElement.height;

      const context = canvas.getContext('2d');
      context.drawImage(imageElement, 0, 0);

      // 특징점 정의하기

      // 특징점

      const left_x = landmarks.landmark.face.face_contour_left_63.x;
      const right_x = landmarks.landmark.face.face_contour_right_63.x;
      const left_c_x = landmarks.landmark.face.face_contour_left_34.x;
      const right_c_x = landmarks.landmark.face.face_contour_right_34.x;

      const mid_x = landmarks.landmark.nose.nose_midline_52.x;
      const clow_y = landmarks.landmark.face.face_contour_left_63.y;
      const chin_y = landmarks.landmark.face.face_contour_left_34.y;

      const up_y = landmarks.landmark.face.face_hairline_72.y;
      const bottom_y = landmarks.landmark.face.face_contour_right_0.y;
      const mid_y = landmarks.landmark.face.face_contour_right_63.y;
      const eye_x = landmarks.landmark.left_eye.left_eye_0.x;

      // get data
      const face_width = right_x - left_x;
      const clown_length = eye_x - left_x;
      const chin_length = mid_x - left_c_x;
      const chin_width = right_c_x - left_c_x;
      const face_height = bottom_y - up_y;
      const chin_length_front = eye_x - left_c_x;

      const clown_ratio = clown_length / (face_width / 2);
      const chin_ratio = chin_length / (face_width / 2);
      const wh_ratio = face_height / face_width;
      const clown_ratio_adj = clown_ratio.toFixed(3);
      const chin_ratio_adj = chin_ratio.toFixed(3);
      const wh_ratio_adj = wh_ratio.toFixed(3);
      const chin_ratio_front = chin_length_front / (face_width / 2);
      const chin_ratio_front_adj = chin_ratio_front.toFixed(3);

      // 기준점

      const standard_h_clown = 0.390933;
      const standard_m_clown = 0.321395;
      const standard_h_chin = 0.808501;
      const standard_m_chin = 0.760126;
      const standard_h_wh = 1.404129;
      const standard_m_wh = 1.351643;

      // sentence data
      const item_title = '얼굴형';
      let first_sentence, second_sentence, third_sentence, fourth_sentence;
      let clown_type, chin_type, wh_type, face_type;

      if (clown_ratio > standard_h_clown) {
        second_sentence = `광대 비율이 1:${clown_ratio_adj}로 광대가 있는 편이고,`;
        clown_type = 'h';
      } else if (clown_ratio <= standard_h_clown && clown_ratio > standard_m_clown) {
        second_sentence = `광대 비율이 1:${clown_ratio_adj}로 광대가 균형인 편이고,`;
        clown_type = 'm';
      } else {
        second_sentence = `광대 비율이 1:${clown_ratio_adj}로 광대가 없는 편이고,`;
        clown_type = 'l';
      }

      if (chin_ratio > standard_h_chin) {
        third_sentence = `턱 비율이 1:${chin_ratio_front_adj}로 턱이 있는 편이고,`;
        chin_type = 'h';
      } else if (chin_ratio <= standard_h_chin && chin_ratio > standard_m_chin) {
        third_sentence = `턱 비율이 1:${chin_ratio_front_adj}로 균형인 편이고,`;
        chin_type = 'm';
      } else {
        third_sentence = `턱 비율이 1:${chin_ratio_front_adj}로 턱이 없는 편이고,`;
        chin_type = 'l';
      }

      if (wh_ratio > standard_h_wh) {
        fourth_sentence = `얼굴 가로 대비 세로 길이 비율이 1:${wh_ratio_adj}로 얼굴이 긴 편이에요.`;
        wh_type = 'h';
      } else if (wh_ratio <= standard_h_wh && wh_ratio > standard_m_wh) {
        fourth_sentence = `얼굴 가로 대비 세로 길이 비율이 1:${wh_ratio_adj}로 균형이에요.`;
        wh_type = 'm';
      } else {
        fourth_sentence = `얼굴 가로 대비 세로 길이 비율이 1:${wh_ratio_adj}로 얼굴이 짧은 편이에요.`;
        wh_type = 'l';
      }

      face_type = clown_type.concat(chin_type, wh_type);

      const canvasFunctions = {
        계란형: draw_canvas_계란형,
        사각형: draw_canvas_사각형,
        하트형: draw_canvas_하트형,
        역삼각형: draw_canvas_역삼각형,
        육각형: draw_canvas_육각형,
        마름모형: draw_canvas_마름모형,
      };

      const face_type_data = face_type_datas.find((item, idx) => {
        if (item.face_type === face_type) {
          return item;
        }
      });

      /**
       *@type {keyof typeof canvasFunctions}
       */
      const face_type_canvas = face_type_data.canvas;
      const face_type_exp = face_type_data.type;
      const face_explain = face_type_data.describe;
      const selectedFunction = canvasFunctions[face_type_canvas];

      let canvasImageUrl;
      if (selectedFunction) {
        canvasImageUrl = await selectedFunction(imageUrl, landmarks);
      } else {
        // Handle the case where the canvas type is not found
        console.error(`Function for canvas type '${face_type_canvas}' not found`);
      }
      const resultData = {
        type: '얼굴형',
        item_title,
        item_title_detail: face_type_exp,
        canvasImageUrl,
        rate_type1_data: [
          { item: '광대', ratio: clown_ratio_adj, type: clown_type },
          { item: '턱', ratio: chin_ratio_front_adj, type: chin_type },
          { item: '얼굴', ratio: wh_ratio_adj, type: wh_type },
        ],
        explain_data: [{ item: 'ratio', content: face_explain }],
      };
      resolve(resultData);
    };
    imageElement.src = imageUrl;
  });
}

function draw_canvas_계란형(imageUrl, landmarks) {
  const imageElement = new Image();
  return new Promise((resolve) => {
    imageElement.onload = function () {
      const canvas = document.createElement('canvas');
      canvas.width = imageElement.width;
      canvas.height = imageElement.height;

      const context = canvas.getContext('2d');
      context.drawImage(imageElement, 0, 0);
      context.fillStyle = 'rgba(0, 0, 0, 0.2)';
      context.fillRect(0, 0, canvas.width, canvas.height);
      // 특징점 정의하기

      // 특징점

      const left_x = landmarks.landmark.face.face_contour_left_63.x; // 33
      const right_x = landmarks.landmark.face.face_contour_right_63.x; // 176
      const left_y = landmarks.landmark.face.face_contour_left_63.y; // 115
      const right_y = landmarks.landmark.face.face_contour_right_63.y;

      const mid_x = landmarks.landmark.nose.nose_midline_52.x; // 104
      const clow_y = landmarks.landmark.face.face_contour_left_63.y;
      const chin_y = landmarks.landmark.face.face_contour_left_34.y;

      const up_y = landmarks.landmark.face.face_hairline_72.y; // 22
      const bottom_y = landmarks.landmark.face.face_contour_right_0.y; // 223
      const mid_y = landmarks.landmark.face.face_contour_right_63.y;

      // 시작점을 설정
      const horizontalRadius = (right_x - left_x) / 2;
      const verticalRadius = (bottom_y - up_y) / 2;
      context.globalAlpha = 1; // Default full opacity

      context.beginPath();
      context.ellipse(mid_x, mid_y, horizontalRadius, verticalRadius, 0, 0, 2 * Math.PI); // 타원 그리기
      context.strokeStyle = 'white'; // 타원의 테두리 색상 설정
      context.lineWidth = 2; // 타원의 테두리 두께 설정
      context.stroke(); // 타원 그리기
      context.closePath();

      const canvasImageUrl = canvas.toDataURL('image/jpeg'); // 또는 "image/png" 등 다른 포맷으로 설정 가능
      resolve(canvasImageUrl);
    };
    imageElement.src = imageUrl;
  });
}

function draw_canvas_사각형(imageUrl, landmarks) {
  const imageElement = new Image();
  return new Promise((resolve) => {
    imageElement.onload = function () {
      const canvas = document.createElement('canvas');
      canvas.width = imageElement.width;
      canvas.height = imageElement.height;

      const context = canvas.getContext('2d');
      context.drawImage(imageElement, 0, 0);
      context.fillStyle = 'rgba(0, 0, 0, 0.2)';
      context.fillRect(0, 0, canvas.width, canvas.height);
      // 특징점 정의하기

      // 특징점

      const left_x = landmarks.landmark.face.face_contour_left_63.x;
      const right_x = landmarks.landmark.face.face_contour_right_63.x;

      const mid_x = landmarks.landmark.nose.nose_midline_52.x; // 104
      const clow_y = landmarks.landmark.face.face_contour_left_63.y;
      const chin_y = landmarks.landmark.face.face_contour_left_34.y;

      const up_y = landmarks.landmark.face.face_hairline_72.y; // 22
      const bottom_y = landmarks.landmark.face.face_contour_right_0.y; // 223
      const mid_y = landmarks.landmark.face.face_contour_right_63.y;

      context.beginPath();
      context.moveTo(left_x, up_y);
      context.lineTo(left_x, bottom_y);
      context.strokeStyle = 'white';
      context.stroke();
      context.closePath();

      context.beginPath();
      context.moveTo(left_x, up_y);
      context.lineTo(right_x, up_y);
      context.strokeStyle = 'white';
      context.stroke();
      context.closePath();

      context.beginPath();
      context.moveTo(right_x, up_y);
      context.lineTo(right_x, bottom_y);
      context.strokeStyle = 'white';
      context.stroke();
      context.closePath();

      context.beginPath();
      context.moveTo(right_x, bottom_y);
      context.lineTo(left_x, bottom_y);
      context.strokeStyle = 'white';
      context.stroke();
      context.closePath();

      const canvasImageUrl = canvas.toDataURL('image/jpeg'); // 또는 "image/png" 등 다른 포맷으로 설정 가능
      resolve(canvasImageUrl);
    };
    imageElement.src = imageUrl;
  });
}

function draw_canvas_마름모형(imageUrl, landmarks) {
  const imageElement = new Image();
  return new Promise((resolve) => {
    imageElement.onload = function () {
      const canvas = document.createElement('canvas');
      canvas.width = imageElement.width;
      canvas.height = imageElement.height;

      const context = canvas.getContext('2d');
      context.drawImage(imageElement, 0, 0);
      context.fillStyle = 'rgba(0, 0, 0, 0.2)';
      context.fillRect(0, 0, canvas.width, canvas.height);
      // 특징점 정의하기

      // 특징점

      const left_x = landmarks.landmark.face.face_contour_left_63.x;
      const right_x = landmarks.landmark.face.face_contour_right_63.x;

      const mid_x = landmarks.landmark.nose.nose_midline_52.x; // 104
      const clow_y = landmarks.landmark.face.face_contour_left_63.y;
      const chin_y = landmarks.landmark.face.face_contour_left_34.y;

      const up_y = landmarks.landmark.face.face_hairline_72.y; // 22
      const bottom_y = landmarks.landmark.face.face_contour_right_0.y; // 223
      const mid_y = landmarks.landmark.face.face_contour_right_63.y;

      context.beginPath();
      context.moveTo(left_x, clow_y);
      context.lineTo(mid_x, bottom_y);
      context.strokeStyle = 'white';
      context.stroke();
      context.closePath();

      context.beginPath();
      context.moveTo(mid_x, bottom_y);
      context.lineTo(right_x, clow_y);
      context.strokeStyle = 'white';
      context.stroke();
      context.closePath();

      context.beginPath();
      context.moveTo(right_x, clow_y);
      context.lineTo(mid_x, up_y);
      context.strokeStyle = 'white';
      context.stroke();
      context.closePath();

      context.beginPath();
      context.moveTo(mid_x, up_y);
      context.lineTo(left_x, clow_y);
      context.strokeStyle = 'white';
      context.stroke();
      context.closePath();

      const canvasImageUrl = canvas.toDataURL('image/jpeg'); // 또는 "image/png" 등 다른 포맷으로 설정 가능
      resolve(canvasImageUrl);
    };
    imageElement.src = imageUrl;
  });
}
function draw_canvas_하트형(imageUrl, landmarks) {
  const imageElement = new Image();
  return new Promise((resolve) => {
    imageElement.onload = function () {
      const canvas = document.createElement('canvas');
      canvas.width = imageElement.width;
      canvas.height = imageElement.height;

      const context = canvas.getContext('2d');
      context.drawImage(imageElement, 0, 0);
      context.fillStyle = 'rgba(0, 0, 0, 0.2)';
      context.fillRect(0, 0, canvas.width, canvas.height);
      // 특징점 정의하기

      // 특징점

      const left_x = landmarks.landmark.face.face_contour_left_63.x;
      const right_x = landmarks.landmark.face.face_contour_right_63.x;

      const mid_x = landmarks.landmark.nose.nose_midline_52.x;
      const clow_y = landmarks.landmark.face.face_contour_left_63.y;
      const eb_y = landmarks.landmark.right_eyebrow.right_eyebrow_32.y;

      const up_y = landmarks.landmark.face.face_hairline_72.y;
      const bottom_y = landmarks.landmark.face.face_contour_right_0.y;
      const mid_y = landmarks.landmark.face.face_contour_right_63.y;
      const heart_height = bottom_y - up_y;
      const heart_width = right_x - left_x;
      const x_point = left_x;
      const y_point = eb_y - 20;

      var w = heart_width,
        h = heart_height;
      context.strokeStyle = 'white';
      context.strokeWeight = 1;
      context.lineWidth = 2.0;
      context.fillStyle = 'rgba(0, 0, 0, 0.2)';

      var d = Math.min(w, h);

      context.moveTo(x_point, y_point + d / 4);
      context.quadraticCurveTo(x_point, y_point, x_point + d / 4, y_point);
      context.quadraticCurveTo(x_point + d / 2, y_point, x_point + d / 2, y_point + d / 4);
      context.quadraticCurveTo(x_point + d / 2, y_point, x_point + (d * 3) / 4, y_point);
      context.quadraticCurveTo(x_point + d, y_point, x_point + d, y_point + d / 4);
      context.quadraticCurveTo(x_point + d, y_point + d / 2, x_point + (d * 3) / 4, y_point + (d * 3) / 4);
      context.lineTo(x_point + d / 2, y_point + d);
      context.lineTo(x_point + d / 4, y_point + (d * 3) / 4);
      context.quadraticCurveTo(x_point, y_point + d / 2, x_point, y_point + d / 4);
      context.stroke();
      context.fill();

      const canvasContainer = document.querySelector('#type_image');
      canvasContainer.style.height = '256px';
      canvasContainer.appendChild(canvas);
      const canvasImageUrl = canvas.toDataURL('image/jpeg'); // 또는 "image/png" 등 다른 포맷으로 설정 가능

      resolve(canvasImageUrl);
    };
    imageElement.src = imageUrl;
  });
}
function draw_canvas_역삼각형(imageUrl, landmarks) {
  const imageElement = new Image();
  return new Promise((resolve) => {
    imageElement.onload = function () {
      const canvas = document.createElement('canvas');
      canvas.width = imageElement.width;
      canvas.height = imageElement.height;

      const context = canvas.getContext('2d');
      context.drawImage(imageElement, 0, 0);
      context.fillStyle = 'rgba(0, 0, 0, 0.2)';
      context.fillRect(0, 0, canvas.width, canvas.height);
      // 특징점 정의하기

      // 특징점

      const left_x = landmarks.landmark.face.face_contour_left_63.x;
      const right_x = landmarks.landmark.face.face_contour_right_63.x;

      const mid_x = landmarks.landmark.nose.nose_midline_52.x; //
      const up_y = landmarks.landmark.face.face_hairline_72.y; // 22
      const bottom_y = landmarks.landmark.face.face_contour_right_0.y; // 223

      context.beginPath();
      context.moveTo(left_x, up_y);
      context.lineTo(mid_x, bottom_y);
      context.strokeStyle = 'white';
      context.stroke();
      context.closePath();

      context.beginPath();
      context.moveTo(left_x, up_y);
      context.lineTo(right_x, up_y);
      context.strokeStyle = 'white';
      context.stroke();
      context.closePath();

      context.beginPath();
      context.moveTo(right_x, up_y);
      context.lineTo(mid_x, bottom_y);
      context.strokeStyle = 'white';
      context.stroke();
      context.closePath();

      const canvasContainer = document.querySelector('#type_image');
      canvasContainer.style.height = '256px';
      canvasContainer.appendChild(canvas);
      const canvasImageUrl = canvas.toDataURL('image/jpeg'); // 또는 "image/png" 등 다른 포맷으로 설정 가능

      resolve(canvasImageUrl);
    };
    imageElement.src = imageUrl;
  });
}
function draw_canvas_육각형(imageUrl, landmarks) {
  const imageElement = new Image();
  return new Promise((resolve) => {
    imageElement.onload = function () {
      const canvas = document.createElement('canvas');
      canvas.width = imageElement.width;
      canvas.height = imageElement.height;

      const context = canvas.getContext('2d');
      context.drawImage(imageElement, 0, 0);
      context.fillStyle = 'rgba(0, 0, 0, 0.2)';
      context.fillRect(0, 0, canvas.width, canvas.height);
      // 특징점 정의하기

      // 특징점

      const left_x = landmarks.landmark.face.face_contour_left_63.x;
      const right_x = landmarks.landmark.face.face_contour_right_63.x;
      const left_y = landmarks.landmark.face.face_contour_left_63.y;
      const right_y = landmarks.landmark.face.face_contour_right_63.y;

      const left_c_x = landmarks.landmark.face.face_contour_left_34.x;
      const right_c_x = landmarks.landmark.face.face_contour_right_34.x;
      const left_c_y = landmarks.landmark.face.face_contour_left_34.y;
      const right_c_y = landmarks.landmark.face.face_contour_right_34.y;

      const mid_x = landmarks.landmark.nose.nose_midline_52.x; //
      const up_y = landmarks.landmark.face.face_hairline_72.y; // 22
      const bottom_y = landmarks.landmark.face.face_contour_right_0.y; // 223

      context.beginPath();
      context.moveTo(mid_x, up_y);
      context.lineTo(left_x, left_y);
      context.strokeStyle = 'white';
      context.stroke();
      context.closePath();

      context.beginPath();
      context.moveTo(left_x, left_y);
      context.lineTo(left_c_x, left_c_y);
      context.strokeStyle = 'white';
      context.stroke();
      context.closePath();

      context.beginPath();
      context.moveTo(left_c_x, left_c_y);
      context.lineTo(mid_x, bottom_y);
      context.strokeStyle = 'white';
      context.stroke();
      context.closePath();

      context.beginPath();
      context.moveTo(mid_x, up_y);
      context.lineTo(right_x, right_y);
      context.strokeStyle = 'white';
      context.stroke();
      context.closePath();

      context.beginPath();
      context.moveTo(right_x, right_y);
      context.lineTo(right_c_x, right_c_y);
      context.strokeStyle = 'white';
      context.stroke();
      context.closePath();

      context.beginPath();
      context.moveTo(right_c_x, right_c_y);
      context.lineTo(mid_x, bottom_y);
      context.strokeStyle = 'white';
      context.stroke();
      context.closePath();
      const canvasContainer = document.querySelector('#type_image');
      canvasContainer.style.height = '256px';
      canvasContainer.appendChild(canvas);
      const canvasImageUrl = canvas.toDataURL('image/jpeg'); // 또는 "image/png" 등 다른 포맷으로 설정 가능

      resolve(canvasImageUrl);
    };
    imageElement.src = imageUrl;
  });
}
