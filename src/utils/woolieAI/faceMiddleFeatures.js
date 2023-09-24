export function face_mig_analysis(imageUrl, landmarks) {
  // 미간 비율
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

      const right_eb_x = landmarks.landmark.right_eyebrow.right_eyebrow_32.x;
      const left_eb_x = landmarks.landmark.left_eyebrow.left_eyebrow_32.x;
      const nose_l_x = landmarks.landmark.nose.nose_left_46.x;
      const nose_mid_x = landmarks.landmark.nose.nose_midline_52.x;
      const nose_x = Math.round((nose_mid_x + nose_l_x) / 2);
      const nose_left_x = nose_mid_x - (nose_mid_x - nose_x);
      const nose_right_x = nose_mid_x + (nose_mid_x - nose_x);

      const eb_y = landmarks.landmark.right_eyebrow.right_eyebrow_32.y;
      const nose_mid_y = landmarks.landmark.nose.nose_midline_52.y;

      // get data

      const mig_length = right_eb_x - left_eb_x;
      const nose_length = nose_right_x - nose_left_x;

      const mig_ratio = mig_length / nose_length;
      const mig_ratio_adj = mig_ratio.toFixed(3);

      // 기준점

      const standard_h = 2.269697;
      const standard_m = 1.930952;

      // sentence data
      const item_title = '미간 비율';
      let mig_sentence;
      let mig_type;
      if (mig_ratio > standard_h) {
        mig_sentence = `코볼 가로 길이 대비 미간 가로 길이 비율은 1:${mig_ratio_adj}(으)로 미간이 넓은 편이에요.`;
        mig_type = 'h';
      } else if (mig_ratio <= standard_h && mig_ratio > standard_m) {
        mig_sentence = `코볼 가로 길이 대비 미간 가로 길이 비율은 1:${mig_ratio_adj}로 미간 비율이 균형이에요.`;
        mig_type = 'm';
      } else {
        mig_sentence = `코볼 가로 길이 대비 미간 가로 길이 비율은 1:${mig_ratio_adj}로 미간이 좁은 편이에요.`;
        mig_type = 'l';
      }

      context.globalAlpha = 1; // Default full opacity
      // 선 긋기
      context.beginPath();
      context.moveTo(right_eb_x, eb_y);
      context.lineTo(left_eb_x, eb_y);
      context.strokeStyle = 'white';
      context.stroke();
      context.closePath();

      context.beginPath();
      context.moveTo(nose_left_x, nose_mid_y);
      context.lineTo(nose_right_x, nose_mid_y);
      context.strokeStyle = 'white';
      context.stroke();
      context.closePath();

      context.setLineDash([5, 5]);
      context.beginPath();
      context.moveTo(nose_left_x, nose_mid_y);
      context.lineTo(left_eb_x, eb_y);
      context.strokeStyle = 'white';
      context.stroke();
      context.closePath();

      context.setLineDash([5, 5]);
      context.beginPath();
      context.moveTo(nose_right_x, nose_mid_y);
      context.lineTo(right_eb_x, eb_y);
      context.strokeStyle = 'white';
      context.stroke();
      context.closePath();
      const mig_text = `미간 비율 : 1:${mig_ratio_adj}`;

      context.font = '8pt "Noto Sans KR", sans-serif';
      context.fillStyle = 'white'; // Text color
      context.textAlign = 'center';
      context.fillText(mig_text, nose_mid_x, eb_y - 10);

      const canvasImageUrl = canvas.toDataURL('image/jpeg'); // 또는 "image/png" 등 다른 포맷으로 설정 가능

      const resultData = {
        type: '중안부 특징',
        item_title,
        canvasImageUrl,
        rate_type1_data: [{ item: '', ratio: mig_ratio_adj, type: mig_type }],
        rate_type2_data: [
          { item: '평균', ratio: '1:2.122' },
          { item: '중앙값', ratio: '1:2.125' },
        ],
        explain_data: [{ item: 'ratio', content: mig_sentence }],
      };
      resolve(resultData);
    };
    imageElement.src = imageUrl;
  });
}

export function face_eh_analysis(imageUrl, landmarks) {
  // 눈 세로 길이
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
      // 특징점 정의하기(right_eyebrow_y, nose_y, right_up, down xy

      const eye_up_x = landmarks.landmark.right_eye.right_eye_16.x;
      const x_point = landmarks.landmark.right_eye.right_eye_16.x + 15;

      const right_eb_y = landmarks.landmark.right_eyebrow.right_eyebrow_32.y;
      const eye_up_y = landmarks.landmark.right_eye.right_eye_16.y;
      const eye_bottom_y = landmarks.landmark.right_eye.right_eye_47.y;
      const nose_mid_y = landmarks.landmark.nose.nose_midline_52.y;
      const text_x = landmarks.landmark.nose.nose_midline_52.x;

      const text_y = right_eb_y - 10;

      // get data

      const eh_length = eye_bottom_y - eye_up_y;
      const f_mid_length = nose_mid_y - right_eb_y;

      const eh_ratio = eh_length / f_mid_length;
      const eh_ratio_adj = eh_ratio.toFixed(3);

      // 기준점

      const standard_h = 0.177419;
      const standard_m = 0.156863;

      // sentence data
      const item_title = '눈 세로 길이';
      let eh_sentence;
      let eh_type;

      if (eh_ratio > standard_h) {
        eh_sentence = `중안부 세로 길이 대비 눈의 세로 길이 비율은 1:${eh_ratio_adj}(으)로 큰 편이에요.`;
        eh_type = 'h';
      } else if (eh_ratio <= standard_h && eh_ratio > standard_m) {
        eh_sentence = `중안부 세로 길이 대비 눈의 세로 길이 비율은 1:${eh_ratio_adj}(으)로 보통인 편이에요.`;
        eh_type = 'h';
      } else {
        eh_sentence = `중안부 세로 길이 대비 눈의 세로 길이 비율은 1:${eh_ratio_adj}(으)로 작은 편이에요.`;
        eh_type = 'l';
      }
      context.globalAlpha = 1; // Default full opacity
      context.beginPath();
      context.arc(eye_up_x, eye_up_y, 1, 0, 2 * Math.PI);
      context.fillStyle = 'white';
      context.fill();
      context.closePath();

      context.beginPath();
      context.arc(eye_up_x, eye_bottom_y, 1, 0, 2 * Math.PI);
      context.fillStyle = 'white';
      context.fill();
      context.closePath();

      // 선 긋기
      context.beginPath();
      context.moveTo(eye_up_x, right_eb_y);
      context.lineTo(x_point, right_eb_y);
      context.strokeStyle = 'white';
      context.stroke();
      context.closePath();

      context.beginPath();
      context.moveTo(x_point, right_eb_y);
      context.lineTo(x_point, nose_mid_y);
      context.strokeStyle = 'white';
      context.stroke();
      context.closePath();

      context.beginPath();
      context.moveTo(x_point, nose_mid_y);
      context.lineTo(eye_up_x, nose_mid_y);
      context.strokeStyle = 'white';
      context.stroke();
      context.closePath();

      context.setLineDash([1, 1]);
      context.beginPath();
      context.moveTo(eye_up_x, eye_up_y);
      context.lineTo(x_point, eye_up_y);
      context.strokeStyle = 'white';
      context.stroke();
      context.closePath();

      context.setLineDash([1, 1]);
      context.beginPath();
      context.moveTo(eye_up_x, eye_bottom_y);
      context.lineTo(x_point, eye_bottom_y);
      context.strokeStyle = 'white';
      context.stroke();
      context.closePath();

      const eyeh_text = `눈 세로 길이 비율:${eh_ratio_adj}`;
      context.font = '8pt "Noto Sans KR", sans-serif';
      context.fillStyle = 'white'; // Text color
      context.textAlign = 'center';
      context.fillText(eyeh_text, text_x, text_y);

      const canvasImageUrl = canvas.toDataURL('image/jpeg'); // 또는 "image/png" 등 다른 포맷으로 설정 가능

      const resultData = {
        type: '중안부 특징',
        item_title,
        canvasImageUrl,
        rate_type1_data: [{ item: '', ratio: eh_ratio_adj, type: eh_type }],
        rate_type2_data: [
          { item: '평균', ratio: '1:0.167' },
          { item: '중앙값', ratio: '1:0.166' },
        ],
        explain_data: [{ item: 'ratio', content: eh_sentence }],
      };
      resolve(resultData);
    };
    imageElement.src = imageUrl;
  });
}

export function face_ete_analysis(imageUrl, landmarks) {
  // 눈 사이 길이
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
      // 특징점 정의하기(오른쪽 눈끝, 시작점, 왼쪽 눈끝/시작점 x,

      const eye_right_s_x = landmarks.landmark.right_eye.right_eye_31.x;
      const eye_right_e_x = landmarks.landmark.right_eye.right_eye_0.x;
      const eye_left_s_x = landmarks.landmark.left_eye.left_eye_31.x;
      const eye_left_e_x = landmarks.landmark.left_eye.left_eye_0.x;
      const y_point = landmarks.landmark.right_eye.right_eye_31.y;
      const x_point = landmarks.landmark.nose.nose_midline_52.x;
      // get data

      const ete_length = eye_right_s_x - eye_left_s_x;
      const eye_length = eye_right_e_x - eye_right_s_x;

      const ete_ratio = ete_length / eye_length;
      const ete_ratio_adj = ete_ratio.toFixed(3);

      // 기준점

      const standard_h = 1.909091;
      const standard_m = 1.717143;

      // sentence data
      const item_title = '눈 사이 길이';
      let ete_sentence;
      let ete_type;

      if (ete_ratio > standard_h) {
        ete_sentence = `눈 가로 길이 대비 눈 사이 가로 길이 비율은 1:${ete_ratio_adj}(으)로 넓은 편이에요.`;
        ete_type = 'h';
      } else if (ete_ratio <= standard_h && ete_ratio > standard_m) {
        ete_sentence = `눈 가로 길이 대비 눈 사이 가로 길이 비율은 1:${ete_ratio_adj}(으)로 균형이에요.`;
        ete_type = 'm';
      } else {
        ete_sentence = `눈 가로 길이 대비 눈 사이 가로 길이 비율은 1:${ete_ratio_adj}(으)로 좁은 편이에요.`;
        ete_type = 'l';
      }

      context.globalAlpha = 1; // Default full opacity
      // 선 긋기
      context.beginPath();
      context.moveTo(eye_right_e_x, y_point - 5);
      context.lineTo(eye_right_e_x, y_point + 5);
      context.strokeStyle = 'white';
      context.stroke();
      context.closePath();

      context.beginPath();
      context.moveTo(eye_left_e_x, y_point - 5);
      context.lineTo(eye_left_e_x, y_point + 5);
      context.strokeStyle = 'white';
      context.stroke();
      context.closePath();

      context.beginPath();
      context.moveTo(eye_left_s_x, y_point - 5);
      context.lineTo(eye_left_s_x, y_point + 5);
      context.strokeStyle = 'white';
      context.stroke();
      context.closePath();

      context.beginPath();
      context.moveTo(eye_right_s_x, y_point - 5);
      context.lineTo(eye_right_s_x, y_point + 5);
      context.strokeStyle = 'white';
      context.stroke();
      context.closePath();

      context.setLineDash([3, 3]);
      context.beginPath();
      context.moveTo(eye_right_e_x, y_point);
      context.lineTo(eye_left_e_x, y_point);
      context.strokeStyle = 'white';
      context.stroke();
      context.closePath();

      const ete_exp_text = `눈 사이 비율: 1:${ete_ratio_adj}`;

      context.font = '8pt "Noto Sans KR", sans-serif';
      context.fillStyle = 'white'; // Text color
      context.textAlign = 'center';
      context.fillText(ete_exp_text, x_point, y_point + 20);
      const canvasImageUrl = canvas.toDataURL('image/jpeg'); // 또는 "image/png" 등 다른 포맷으로 설정 가능

      const resultData = {
        type: '중안부 특징',
        item_title,
        canvasImageUrl,
        rate_type1_data: [{ item: '', ratio: ete_ratio_adj, type: ete_type }],
        rate_type2_data: [
          { item: '평균', ratio: '1:1.814' },
          { item: '중앙값', ratio: '1:1.809' },
        ],
        explain_data: [{ item: 'ratio', content: ete_sentence }],
      };
      resolve(resultData);
    };
    imageElement.src = imageUrl;
  });
}

export function face_nose_analysis(imageUrl, landmarks) {
  // 코 가로 길이
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
      // 특징점 정의하기(오른쪽 눈끝, 시작점, 왼쪽 눈끝/시작점 x,

      const nose_right_x = landmarks.landmark.nose.nose_right_46.x;
      const nose_left_x = landmarks.landmark.nose.nose_left_46.x;
      const chin_right_x = landmarks.landmark.face.face_contour_right_47.x;
      const chin_left_x = landmarks.landmark.face.face_contour_left_47.x;
      const y_point = landmarks.landmark.nose.nose_midline_52.y;
      const x_point = landmarks.landmark.nose.nose_midline_52.x;

      // get data

      const nose_length = nose_right_x - nose_left_x;
      const chin_length = chin_right_x - chin_left_x;
      const nose_ratio = nose_length / chin_length;
      const nose_ratio_adj = nose_ratio.toFixed(3);

      // 기준점

      const standard_h = 0.238872;
      const standard_m = 0.225;

      // sentence data
      const item_title = '코 가로 길이';
      let nose_sentence;
      let nose_type;

      if (nose_ratio > standard_h) {
        nose_sentence = `턱 가로 길이 대비 코 가로 길이 비율은 1:${nose_ratio_adj}(으)로 넓은 편이에요.`;
        nose_type = 'h';
      } else if (nose_ratio <= standard_h && nose_ratio > standard_m) {
        nose_sentence = `턱 가로 길이 대비 코 가로 길이 비율은 1:${nose_ratio_adj}(으)로 균형이에요.`;
        nose_type = 'm';
      } else {
        nose_sentence = `턱 가로 길이 대비 코 가로 길이 비율은은 1:${nose_ratio_adj}(으)로 좁은 편이에요.`;
        nose_type = 'l';
      }

      context.globalAlpha = 1; // Default full opacity
      // 선 긋기
      context.beginPath();
      context.moveTo(nose_right_x, y_point - 5);
      context.lineTo(nose_right_x, y_point + 5);
      context.strokeStyle = 'white';
      context.stroke();
      context.closePath();

      context.beginPath();
      context.moveTo(nose_left_x, y_point - 5);
      context.lineTo(nose_left_x, y_point + 5);
      context.strokeStyle = 'white';
      context.stroke();
      context.closePath();

      context.beginPath();
      context.moveTo(chin_right_x, y_point - 5);
      context.lineTo(chin_right_x, y_point + 5);
      context.strokeStyle = 'white';
      context.stroke();
      context.closePath();

      context.beginPath();
      context.moveTo(chin_left_x, y_point - 5);
      context.lineTo(chin_left_x, y_point + 5);
      context.strokeStyle = 'white';
      context.stroke();
      context.closePath();

      context.setLineDash([3, 3]);
      context.beginPath();
      context.moveTo(chin_right_x, y_point);
      context.lineTo(chin_left_x, y_point);
      context.strokeStyle = 'white';
      context.stroke();
      context.closePath();

      context.font = '8pt "Noto Sans KR", sans-serif';
      context.fillStyle = 'white'; // Text color
      context.textAlign = 'center';
      const nose_text = `코 가로 비율 : 1:${nose_ratio_adj}`;
      context.fillText(nose_text, x_point, y_point - 10);

      const canvasImageUrl = canvas.toDataURL('image/jpeg'); // 또는 "image/png" 등 다른 포맷으로 설정 가능

      // 비율, 평균, 중앙값 누락
      const resultData = {
        type: '중안부 특징',
        item_title,
        canvasImageUrl,
        rate_type1_data: [{ item: '', ratio: nose_ratio_adj, type: nose_type }],
        rate_type2_data: [
          { item: '평균', ratio: '1:0.232' },
          { item: '중앙값', ratio: '1:0.232' },
        ],
        explain_data: [{ item: 'ratio', content: nose_sentence }],
      };
      resolve(resultData);
    };
    imageElement.src = imageUrl;
  });
}
