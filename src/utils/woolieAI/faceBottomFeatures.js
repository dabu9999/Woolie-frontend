export function face_lower_analysis(imageUrl, landmarks) {
  //하안부 특징 - 인중/입술/턱 비율
  const imageElement = new Image();
  return new Promise((resolve) => {
    imageElement.onload = () => {
      const canvas = document.createElement('canvas');
      canvas.width = imageElement.width;
      canvas.height = imageElement.height;

      const context = canvas.getContext('2d');
      context.drawImage(imageElement, 0, 0);
      context.fillStyle = 'rgba(0, 0, 0, 0.2)';
      context.fillRect(0, 0, canvas.width, canvas.height);

      const x_point = landmarks.landmark.nose.nose_midline_52.x;

      const nose_y = landmarks.landmark.nose.nose_midline_52.y;
      const upper_lip_y = landmarks.landmark.mouth.upper_lip_15.y;
      const lower_lip_y = landmarks.landmark.mouth.lower_lip_15.y;
      const f_low_y = landmarks.landmark.face.face_contour_right_0.y;
      const f_low_text_y = lower_lip_y + (lower_lip_y - upper_lip_y);
      const phil_length = upper_lip_y - nose_y;
      const mouth_length = lower_lip_y - upper_lip_y;
      const f_low_length = f_low_y - lower_lip_y;

      const total_length = f_low_y - nose_y;

      const phil_ratio = phil_length / total_length;
      const mouth_ratio = mouth_length / total_length;
      const f_low_ratio = f_low_length / total_length;

      const phil_ratio_adjust = phil_ratio.toFixed(3);
      const mouth_ratio_adjust = mouth_ratio.toFixed(3);
      // 데이터 보낼때는 6자리, 사용자에게는 3자리
      const f_low_ratio_adjust = f_low_ratio.toFixed(3);

      const phil_text = `인중 비율: 1:${phil_ratio_adjust}`;
      const mouth_text = `입술 비율: 1:${mouth_ratio_adjust}`;
      const f_low_text = `턱 비율: 1:${f_low_ratio_adjust}`;

      const ph_sta_h = 0.266667;
      const ph_sta_m = 0.236364;
      const m_sta_h = 0.333333;
      const m_sta_m = 0.280625;
      const c_sta_h = 0.46875;
      const c_sta_m = 0.415881;
      let item_title = '인중/입술/턱 비율';
      let f_low_sentence = `인중 : 입술 : 턱 = ${phil_ratio_adjust}:${mouth_ratio_adjust}:${f_low_ratio_adjust}`;
      let phil_sentence, mou_sentence, chin_sentence;
      let phil_type, mou_type, chin_type;

      if (phil_ratio > ph_sta_h) {
        phil_sentence = `인중 비율은 1:${phil_ratio_adjust}로 긴 편이에요.`;
        phil_type = 'h';
      } else if (phil_ratio <= ph_sta_h && phil_ratio > ph_sta_m) {
        phil_sentence = `인중 비율은 1:${phil_ratio_adjust}로 균형이에요.`;
        phil_type = 'm';
      } else {
        phil_sentence = `인중 비율은 1:${phil_ratio_adjust}로 짧은 편이에요.`;
        phil_type = 'l';
      }

      if (mouth_ratio > m_sta_h) {
        mou_sentence = `입 비율은 1:${mouth_ratio_adjust}로 긴 편이에요.`;
        mou_type = 'h';
      } else if (mouth_ratio <= m_sta_h && mouth_ratio > m_sta_m) {
        mou_sentence = `입 비율은 1:${mouth_ratio_adjust}로 균형이에요.`;
        mou_type = 'm';
      } else {
        mou_sentence = `입 비율은 1:${mouth_ratio_adjust}로 짧은 편이에요.`;
        mou_type = 'l';
      }

      if (f_low_ratio > c_sta_h) {
        chin_sentence = `턱 비율은 1:${f_low_ratio_adjust}로 긴 편이에요.`;
        chin_type = 'h';
      } else if (f_low_ratio <= c_sta_h && f_low_ratio > c_sta_m) {
        chin_sentence = `턱 비율은 1:${f_low_ratio_adjust}로 균형이에요.`;
        chin_type = 'm';
      } else {
        chin_sentence = `턱 비율은 1:${f_low_ratio_adjust}로 짧은 편이에요.`;
        chin_type = 'l';
      }

      // Append the canvas to your HTML to display the image with the line
      context.globalAlpha = 1; // Default full opacity

      // Circle 그리기
      context.beginPath();
      context.arc(x_point, nose_y, 3, 0, 2 * Math.PI);
      context.fillStyle = 'white';
      context.fill();
      context.closePath();

      context.beginPath();
      context.arc(x_point, upper_lip_y, 3, 0, 2 * Math.PI);
      context.fillStyle = 'white';
      context.fill();
      context.closePath();

      context.beginPath();
      context.arc(x_point, lower_lip_y, 3, 0, 2 * Math.PI);
      context.fillStyle = 'white';
      context.fill();
      context.closePath();

      context.beginPath();
      context.arc(x_point, f_low_y, 3, 0, 2 * Math.PI);
      context.fillStyle = 'white';
      context.fill();
      context.closePath();

      // 선 긋기
      context.beginPath();
      context.moveTo(x_point, nose_y);
      context.lineTo(x_point, f_low_y);
      context.strokeStyle = 'white';
      context.stroke();
      context.closePath();

      context.font = '8pt "Noto Sans KR", sans-serif';
      context.fillStyle = 'white'; // Text color
      context.textAlign = 'center';

      context.fillText(phil_text, x_point + 50, upper_lip_y);
      context.fillText(mouth_text, x_point + 50, lower_lip_y);
      context.fillText(f_low_text, x_point + 50, f_low_text_y);
      const canvasImageUrl = canvas.toDataURL('image/jpeg'); // 또는 "image/png" 등 다른 포맷으로 설정 가능

      const resultData = {
        type: '하안부 특징',
        item_title,
        canvasImageUrl,
        rate_type1_data: [
          { item: '입술', ratio: phil_ratio_adjust, type: phil_type },
          { item: '입', ratio: mouth_ratio_adjust, type: mou_type },
          { item: '턱', ratio: f_low_ratio_adjust, type: chin_type },
        ],
        explain_data: [
          { item: 'ratios', content: f_low_sentence },
          { item: 'ratio', content: phil_sentence },
          { item: 'ratio', content: mou_sentence },
          { item: 'ratio', content: chin_sentence },
        ],
      };
      resolve(resultData);
    };
    imageElement.src = imageUrl;
  });
}
