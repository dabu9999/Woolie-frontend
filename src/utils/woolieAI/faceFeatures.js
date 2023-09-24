export function face_uml_analysis(imageUrl, landmarks) {
  // 상/중/하안부 비율
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

      const up_y = landmarks.landmark.face.face_hairline_72.y;
      const bottom_y = landmarks.landmark.face.face_contour_right_0.y;

      const eb_y = landmarks.landmark.right_eyebrow.right_eyebrow_32.y;
      const nose_y = landmarks.landmark.nose.nose_midline_52.y;

      const x_point = landmarks.landmark.nose.nose_midline_52.x;
      // get data

      const upper_length = eb_y - up_y;
      const mid_length = nose_y - eb_y;
      const lower_length = bottom_y - nose_y;

      const total_length = bottom_y - up_y;

      const up_y_point = up_y + upper_length / 2;
      const mid_y_point = eb_y + mid_length / 2;
      const bottom_y_point = nose_y + lower_length / 2;

      const upper_ratio = upper_length / total_length;
      const mid_ratio = mid_length / total_length;
      const lower_ratio = lower_length / total_length;

      // const mid_ratio_a = 1;

      const upper_ratio_adj = upper_ratio.toFixed(3);
      const mid_ratio_adj = mid_ratio.toFixed(3);
      const lower_ratio_adj = lower_ratio.toFixed(3);

      // 기준점

      const standard_h_u = 0.349556;
      const standard_m_u = 0.32492;

      const standard_h_m = 0.342319;
      const standard_m_m = 0.324538;

      const standard_h_l = 0.339985;
      const standard_m_l = 0.317591;
      // sentence data
      const item_title = '상/중/하안부 비율';
      let upper_sentence, mid_sentence, lower_sentence;
      let upper_type, mid_type, lower_type;

      if (upper_ratio > standard_h_u) {
        upper_sentence = `상안부 세로 길이 비율은 1:${upper_ratio_adj}로 긴 편이에요.`;
        upper_type = 'h';
      } else if (upper_ratio <= standard_h_u && upper_ratio > standard_m_u) {
        upper_sentence = `상안부 세로 길이 비율은 1:${upper_ratio_adj}로 균형이에요.`;
        upper_type = 'm';
      } else {
        upper_sentence = `상안부 세로 길이 비율은 1:${upper_ratio_adj}로 짧은 편이에요.`;
        upper_type = 'l';
      }
      if (mid_ratio > standard_h_m) {
        mid_sentence = `중안부 세로 길이 비율은 1:${mid_ratio_adj}로 긴 편이에요.`;
        mid_type = 'h';
      } else if (mid_ratio <= standard_h_m && mid_ratio > standard_m_m) {
        mid_sentence = `중안부 세로 길이 비율은 1:${mid_ratio_adj}로 균형이에요.`;
        mid_type = 'm';
      } else {
        mid_sentence = `중안부 세로 길이 비율은 1:${mid_ratio_adj}로 짧은 편이에요.`;
        mid_type = 'l';
      }
      if (lower_ratio > standard_h_l) {
        lower_sentence = `하안부 세로 길이 비율은 1:${lower_ratio_adj}로 긴 편이에요.`;
        lower_type = 'h';
      } else if (lower_ratio <= standard_h_l && lower_ratio > standard_m_l) {
        lower_sentence = `하안부 세로 길이 비율은 1:${lower_ratio_adj}로 균형이에요.`;
        lower_type = 'm';
      } else {
        lower_sentence = `하안부 세로 길이 비율은 1:${lower_ratio_adj}로 짧은 편이에요.`;
        lower_type = 'l';
      }

      const uml_sentence = `상안부:중안부:하안부 = ${upper_ratio_adj}:${mid_ratio_adj}:${lower_ratio_adj}`;
      context.globalAlpha = 1; // Default full opacity
      // 선 긋기
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

      context.setLineDash([3, 3]);
      context.beginPath();
      context.moveTo(left_x, eb_y);
      context.lineTo(right_x, eb_y);
      context.strokeStyle = 'white';
      context.stroke();
      context.closePath();

      context.setLineDash([3, 3]);
      context.beginPath();
      context.moveTo(left_x, nose_y);
      context.lineTo(right_x, nose_y);
      context.strokeStyle = 'white';
      context.stroke();
      context.closePath();

      context.font = '8pt "Noto Sans KR", sans-serif';
      context.fillStyle = 'white'; // Text color
      context.textAlign = 'center';
      const up_text = `상안부 비율 : 1:${upper_ratio_adj}`;
      const mid_text = `중안부 비율 : 1:${mid_ratio_adj}`;
      const bottom_text = `하안부 비율 : 1:${lower_ratio_adj}`;

      context.fillText(up_text, x_point, up_y_point);
      context.fillText(mid_text, x_point, mid_y_point);
      context.fillText(bottom_text, x_point, bottom_y_point);

      const canvasImageUrl = canvas.toDataURL('image/jpeg'); // 또는 "image/png" 등 다른 포맷으로 설정 가능

      const resultData = {
        type: '얼굴 특징',
        item_title,
        canvasImageUrl,
        rate_type1_data: [
          { item: '상안부', ratio: upper_ratio_adj, type: upper_type },
          { item: '중안부', ratio: mid_ratio_adj, type: mid_type },
          { item: '하안부', ratio: lower_ratio_adj, type: lower_type },
        ],
        explain_data: [
          { item: 'ratios', content: uml_sentence },
          { item: 'ratio', content: upper_sentence },
          { item: 'ratio', content: mid_sentence },
          { item: 'ratio', content: lower_sentence },
        ],
      };
      resolve(resultData);
    };
    imageElement.src = imageUrl;
  });
}

export function face_wh_analysis(imageUrl, landmarks) {
  // 가로/세로 비율
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

      // 특징점

      const left_x = landmarks.landmark.face.face_contour_left_63.x;
      const right_x = landmarks.landmark.face.face_contour_right_63.x;
      const mid_x = landmarks.landmark.nose.nose_midline_52.x;

      const up_y = landmarks.landmark.face.face_hairline_72.y;
      const bottom_y = landmarks.landmark.face.face_contour_right_0.y;
      const mid_y = landmarks.landmark.face.face_contour_right_63.y;

      // get data

      const width_length = right_x - left_x;
      const height_length = bottom_y - up_y;

      const wh_ratio = height_length / width_length;
      const wh_ratio_adj = wh_ratio.toFixed(3);

      // 기준점

      const standard_h = 1.404129;
      const standard_m = 1.351643;

      // sentence data
      const item_title = '가로/세로 비율';
      let wh_sentence;
      let wh_type;

      if (wh_ratio > standard_h) {
        wh_sentence = `얼굴의 가로 대비 세로 길이 비율은 1:${wh_ratio_adj}로 가로보다 세로가 긴 편이에요.`;
        wh_type = 'h';
      } else if (wh_ratio <= standard_h && wh_ratio > standard_m) {
        wh_sentence = `얼굴의 가로 대비 세로 길이 비율은 1:${wh_ratio_adj}로 균형이에요.`;
        wh_type = 'm';
      } else {
        wh_sentence = `얼굴의 가로 대비 세로 길이 비율은 1:${wh_ratio_adj}로 세로보다 가로가 넓은 편이에요.`;
        wh_type = 'l';
      }

      context.globalAlpha = 1; // Default full opacity
      // 선 긋기
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

      context.setLineDash([5, 5]); // 점선 스타일 설정

      context.beginPath();
      context.moveTo(right_x, mid_y);
      context.lineTo(left_x, mid_y);
      context.strokeStyle = 'white';
      context.stroke();
      context.closePath();

      context.beginPath();
      context.moveTo(mid_x, up_y);
      context.lineTo(mid_x, bottom_y);
      context.strokeStyle = 'white';
      context.stroke();
      context.closePath();

      context.setLineDash([]); // 점선 스타일 제거

      context.font = '8pt "Noto Sans KR", sans-serif';
      context.fillStyle = 'white'; // Text color
      context.textAlign = 'center';

      const wh_text = `가로 대비 세로 비율 :\n1:${wh_ratio_adj}`;

      context.fillText(wh_text, mid_x, mid_y - 10);
      const canvasImageUrl = canvas.toDataURL('image/jpeg'); // 또는 "image/png" 등 다른 포맷으로 설정 가능

      const resultData = {
        type: '얼굴 특징',
        item_title,
        canvasImageUrl,
        rate_type1_data: [{ item: '', ratio: wh_ratio_adj, type: wh_type }],
        rate_type2_data: [
          { item: '평균', ratio: '1:1.377' },
          { item: '중앙값', ratio: '1:1.379' },
        ],
        explain_data: [{ item: 'ratio', content: wh_sentence }],
      };
      resolve(resultData);
    };
    imageElement.src = imageUrl;
  });
}

export function face_sym_analysis(imageUrl, landmarks) {
  // 대칭 비율
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

      const x_point = landmarks.landmark.nose.nose_midline_52.x;
      const r_x_point = landmarks.landmark.face.face_contour_right_63.x;
      const l_x_point = landmarks.landmark.face.face_contour_left_63.x;

      const rc_x_point = landmarks.landmark.face.face_contour_right_34.x;
      const lc_x_point = landmarks.landmark.face.face_contour_left_34.x;
      const y_point = landmarks.landmark.face.face_contour_right_63.y;
      const y_point_2 = landmarks.landmark.face.face_contour_right_34.y;
      const y_point_3 = y_point - 5;
      const y_point_4 = y_point + 5;
      const y_point_5 = y_point_2 - 5;
      const y_point_6 = y_point_2 + 5;

      const r_length = r_x_point - x_point;
      const l_length = x_point - l_x_point;
      const rc_length = rc_x_point - x_point;
      const lc_length = x_point - lc_x_point;

      const text_x_1 = x_point - r_length / 2;
      const text_x_2 = x_point + r_length / 2;

      const sy_ratio = r_length / l_length;
      const sy_ratio_2 = rc_length / lc_length;

      const sy_adj = sy_ratio.toFixed(3);
      const sy_2_adj = sy_ratio_2.toFixed(3);

      const sy_text = `광대 대칭 비율 1:${sy_adj}`;
      const sy_2_text = `턱 대칭 비율 1:${sy_2_adj}`;

      const sy_sta_h = 1.095511;
      const sy_sta_m = 0.929181;
      const sy_2_sta_h = 1.1131;
      const sy_2_sta_m = 0.919158;

      let item_title = '대칭 비율';
      let sy_sentence, sy_2_sentence;

      if (sy_ratio > sy_sta_h) {
        sy_sentence = `광대쪽 대칭 비율 1:${sy_adj}로 비대칭이 있는 편이에요.`;
      } else if (sy_ratio <= sy_sta_h && sy_ratio > sy_sta_m) {
        sy_sentence = `광대쪽 대칭 비율 1:${sy_adj}로 대칭이에요.`;
      } else {
        sy_sentence = `광대쪽 비율은 1:${sy_adj}로 비대칭이 있는 편이에요.`;
      }

      if (sy_ratio_2 > sy_2_sta_h) {
        sy_2_sentence = `턱쪽 대칭 비율 1:${sy_2_adj}로 비대칭이 있는 편이에요.`;
      } else if (sy_ratio_2 <= sy_2_sta_h && sy_ratio_2 > sy_2_sta_m) {
        sy_2_sentence = `턱쪽 대칭 비율 1:${sy_2_adj}로 대칭이에요.`;
      } else {
        sy_2_sentence = `턱쪽 대칭 비율 1:${sy_2_adj}로 비대칭이 있는 편이에요.`;
      }

      // Append the canvas to your HTML to display the image with the line
      context.globalAlpha = 1; // Default full opacity

      // 선 긋기
      // 선 스타일 설정 (점선)

      context.beginPath();
      context.moveTo(r_x_point, y_point_3);
      context.lineTo(r_x_point, y_point_4);
      context.strokeStyle = 'white';
      context.stroke();
      context.closePath();

      context.beginPath();
      context.moveTo(x_point + 10, y_point_3);
      context.lineTo(x_point + 10, y_point_4);
      context.strokeStyle = 'white';
      context.stroke();
      context.closePath();

      context.beginPath();
      context.moveTo(x_point - 10, y_point_3);
      context.lineTo(x_point - 10, y_point_4);
      context.strokeStyle = 'white';
      context.stroke();
      context.closePath();

      context.beginPath();
      context.moveTo(l_x_point, y_point_3);
      context.lineTo(l_x_point, y_point_4);
      context.strokeStyle = 'white';
      context.stroke();
      context.closePath();

      context.beginPath();
      context.moveTo(rc_x_point, y_point_5);
      context.lineTo(rc_x_point, y_point_6);
      context.strokeStyle = 'white';
      context.stroke();
      context.closePath();

      context.beginPath();
      context.moveTo(x_point + 10, y_point_5);
      context.lineTo(x_point + 10, y_point_6);
      context.strokeStyle = 'white';
      context.stroke();
      context.closePath();

      context.beginPath();
      context.moveTo(x_point - 10, y_point_5);
      context.lineTo(x_point - 10, y_point_6);
      context.strokeStyle = 'white';
      context.stroke();
      context.closePath();

      context.beginPath();
      context.moveTo(lc_x_point, y_point_5);
      context.lineTo(lc_x_point, y_point_6);
      context.strokeStyle = 'white';
      context.stroke();
      context.closePath();

      context.setLineDash([1, 1]);
      context.beginPath();
      context.moveTo(x_point + 10, y_point);
      context.lineTo(r_x_point, y_point);
      context.strokeStyle = 'white';
      context.stroke();
      context.closePath();

      context.setLineDash([1, 1]);
      context.beginPath();
      context.moveTo(x_point - 10, y_point);
      context.lineTo(l_x_point, y_point);
      context.strokeStyle = 'white';
      context.stroke();
      context.closePath();

      context.setLineDash([1, 1]);
      context.beginPath();
      context.moveTo(x_point + 10, y_point_2);
      context.lineTo(rc_x_point, y_point_2);
      context.strokeStyle = 'white';
      context.stroke();
      context.closePath();

      context.setLineDash([1, 1]);
      context.beginPath();
      context.moveTo(x_point - 10, y_point_2);
      context.lineTo(lc_x_point, y_point_2);
      context.strokeStyle = 'white';
      context.stroke();
      context.closePath();

      context.font = '8pt "Noto Sans KR", sans-serif';
      context.fillStyle = 'white'; // Text color
      context.textAlign = 'center';

      context.fillText(sy_text, x_point, y_point + 20);
      context.fillText(sy_2_text, x_point, y_point_2 + 20);
      context.fillText(l_length, text_x_1, y_point - 10);
      context.fillText(r_length, text_x_2, y_point - 10);
      context.fillText(lc_length, text_x_1, y_point_2 - 10);
      context.fillText(rc_length, text_x_2, y_point_2 - 10);

      const canvasImageUrl = canvas.toDataURL('image/jpeg'); // 또는 "image/png" 등 다른 포맷으로 설정 가능

      const symRatio1 = '광대 대칭 비율 범위:0.929~1.095';
      const symRatio2 = '턱 대칭 비율 범위:0.919~1.113 ';
      // rate_type2_data 디테일 누락, 설명 누락
      const resultData = {
        type: '얼굴 특징',
        item_title,
        canvasImageUrl,
        rate_type2_data: [
          { item: '광대 대칭', ratio: '1:1.000', length: { item: '광대', right: r_length, left: l_length } },
          { item: '턱 대칭', ratio: '1:0.981', length: { item: '턱', right: rc_length, left: lc_length } },
        ],
        explain_data: [
          { item: 'example', content: symRatio1 },
          { item: 'example', content: symRatio2 },
          { item: 'ratio', content: sy_sentence },
          { item: 'ratio', content: sy_2_sentence },
        ],
      };
      resolve(resultData);
    };
    imageElement.src = imageUrl;
  });
}
