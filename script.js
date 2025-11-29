// 設定年份
document.getElementById('year').textContent = new Date().getFullYear();

const form = document.getElementById('quiz-form');
const submitBtn = document.getElementById('submit-btn');
const resetBtn = document.getElementById('reset-btn');
const resultBox = document.getElementById('result');
const options = Array.from(document.querySelectorAll('.option'));
const radios = Array.from(document.querySelectorAll('input[name="answer"]'));

// 當點選整個 label 時，同步選取 radio 並標示 selected 樣式
options.forEach(opt => {
  opt.addEventListener('click', () => {
    const input = opt.querySelector('input[type="radio"]');
    if (!input) return;
    input.checked = true;
    updateSelectedStyle();
    // 將焦點回到送出按鈕，改善鍵盤使用感
    submitBtn.focus();
  });
});

// 更新選中樣式
function updateSelectedStyle() {
  options.forEach(opt => {
    const input = opt.querySelector('input[type="radio"]');
    if (input && input.checked) {
      opt.classList.add('selected');
    } else {
      opt.classList.remove('selected');
    }
  });
}

// 初始一次（若使用鍵盤或預設有選）
updateSelectedStyle();

// 提交按鈕行為
submitBtn.addEventListener('click', () => {
  const selected = radios.find(r => r.checked);
  if (!selected) {
    // 未選任何項目
    resultBox.hidden = false;
    resultBox.innerHTML = `<h3>請選擇一個選項</h3><p>請先選擇 A、B、C 或 D，再點送出。</p>`;
    resultBox.scrollIntoView({behavior:'smooth', block:'center'});
    return;
  }

  // 依選項顯示解說文字（你可以自行修改或擴充）
  const interpretations = {
    A: {
      title: 'A — 直接行動派',
      text: '你偏好立即上手、透過嘗試學習。遇到新事物會先動手，邊做邊調整，適合需要快速試錯或創新的情境。'
    },
    B: {
      title: 'B — 觀察計畫派',
      text: '你喜歡先蒐集資訊、分析情況，做足準備再行動。這種風格在複雜或風險較高的任務中特別有利。'
    },
    C: {
      title: 'C — 審慎準備派',
      text: '你會有些猶豫但會做部分準備以降低風險，屬於折衷型：不會冒進但也不會完全停滯。'
    },
    D: {
      title: 'D — 支援協同派',
      text: '你擅長與人合作，願意當支援或配合者，重視團隊與協調，適合協作導向的任務。'
    }
  };

  const sel = selected.value;
  const info = interpretations[sel] || { title: '未定義', text: '' };

  resultBox.hidden = false;
  resultBox.innerHTML = `
    <h3>${info.title}</h3>
    <p>${info.text}</p>
    <p style="margin-top:10px;color:#374151;font-size:0.95rem">你選的是 <strong>${sel}</strong>。</p>
  `;
  resultBox.scrollIntoView({behavior:'smooth', block:'center'});
});

// 重設按鈕
resetBtn.addEventListener('click', () => {
  radios.forEach(r => r.checked = false);
  updateSelectedStyle();
  resultBox.hidden = true;
});
