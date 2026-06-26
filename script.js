const slides = [
  {
    title: "高齡心衰竭照護最佳化",
    notes: [
      "這份 AHA scientific statement 聚焦 65 歲以上心衰竭病人的照護最佳化。",
      "核心訊息不是把年齡視為治療禁忌，而是在共病、衰弱、多重用藥、認知功能與社會支持之間，做出以病人目標為中心的治療排序。"
    ],
    tags: ["AHA 2026", "65歲以上", "HF"]
  },
  {
    title: "高齡心衰竭是最大照護負擔之一",
    notes: [
      "心衰竭對高齡族群造成不成比例的負擔，住院與再住院主要集中在 65 歲以上病人。",
      "醫師需要同時評估醫療、功能、認知與社會面向；臨床目標也不只死亡率，還包括功能、生活品質與減少住院。"
    ],
    tags: ["照護負擔", "功能", "生活品質"]
  },
  {
    title: "GDMT：高齡不是自動排除條件",
    notes: [
      "HFrEF 四大藥物包含 ARNI 或 ACEi/ARB、實證 beta blocker、MRA、SGLT2 inhibitor。",
      "重要臨床試驗的年齡分層或次分析顯示，治療效果在高齡族群大致一致；但低血壓、腎功能變化、體液不足與電解質異常要更密切追蹤。"
    ],
    tags: ["GDMT", "HFrEF", "安全監測"]
  },
  {
    title: "真正的問題：有效治療常被低度使用",
    notes: [
      "登錄資料顯示，年齡越高，eBB、MRA、ARNI 或 RAASi 使用與劑量最佳化越少，女性高齡病人可能更明顯。",
      "可行策略是低劑量啟動、早期追蹤、主動處理副作用，而不是因為年齡直接放棄治療。"
    ],
    tags: ["低度使用", "劑量最佳化", "臨床慣性"]
  },
  {
    title: "CIED：ICD 與 CRT 要分開思考",
    notes: [
      "ICD 初級預防在高齡與複雜共病族群的淨效益較不確定，需考量有意義存活超過 1 年、猝死風險與病人偏好。",
      "CRT 可改善症狀、生活品質、住院與存活；符合條件時不應只因年齡而排除。"
    ],
    tags: ["ICD", "CRT", "裝置治療"]
  },
  {
    title: "四大 domain：把心衰竭照護拉回整個人",
    notes: [
      "Domain Management Approach 分成 medical、mind and emotion、physical、social 四個面向。",
      "這個架構適合門診快速檢核，也適合出院前照護計畫與跨科溝通。"
    ],
    tags: ["Domain", "共病", "跨專業"]
  },
  {
    title: "多重用藥與營養：先找可修正因子",
    notes: [
      "每次調整 GDMT 前後，重新核對藥物、血壓、體重、eGFR、鉀離子與症狀。",
      "deprescribing 不是少治療，而是移除低價值或高風險藥物，讓高價值治療留下來。"
    ],
    tags: ["多重用藥", "營養", "deprescribing"]
  },
  {
    title: "GDMT 卡住時：用多層次障礙拆解",
    notes: [
      "GDMT uptake 受到病人、醫療團隊與醫療系統多層次因素影響。",
      "把「病人不配合」改寫成「哪一層障礙還沒被解決」，比較能找到可介入的地方。"
    ],
    tags: ["障礙分析", "費用", "追蹤"]
  },
  {
    title: "Shared decision-making：目標會變，必須反覆確認",
    notes: [
      "先釐清病人在意的是壽命、功能、症狀、居家生活、避免住院，或避免侵入性治療。",
      "SDM 不是把決定丟給病人，而是用醫療證據幫病人做符合價值的選擇；ACP 也應在病程中早期、反覆討論。"
    ],
    tags: ["SDM", "ACP", "What matters most"]
  },
  {
    title: "能提高 GDMT uptake 的做法",
    notes: [
      "原文整理多種 implementation strategies，包括費用協助、電子決策支持、titration protocol、自我照護教育、遠距監測、出院轉銜照護與品質改善。",
      "在台灣情境，可轉成心衰竭照護門診、藥師協作、出院後早期回診與遠距追蹤。"
    ],
    tags: ["Implementation", "團隊照護", "轉銜照護"]
  },
  {
    title: "緩和醫療：不是放棄治療，是減少不必要痛苦",
    notes: [
      "高齡晚期心衰竭常見 refractory symptoms、反覆住院、GDMT 無法耐受與照顧負擔升高。",
      "緩和醫療可協助症狀控制、目標釐清、家庭溝通、ACP 與治療負擔評估；palliative care 不等同 hospice。"
    ],
    tags: ["緩和醫療", "晚期 HF", "症狀控制"]
  },
  {
    title: "門診可用的高齡 HF 五步驟",
    notes: [
      "五步驟是定義 HF 類型、啟動高價值治療、掃描 domain、拆解障礙、重談目標。",
      "這不是一次完成的線性流程，而是在每次病況變化、出院後或治療不耐受時重新循環。"
    ],
    tags: ["門診流程", "五步驟", "閉環"]
  },
  {
    title: "台灣臨床情境的落地提醒",
    notes: [
      "把「藥物加不上去」記錄成具體原因：血壓、腎功能、鉀離子、症狀、費用、回診或照顧支持。",
      "出院後 7 到 14 天內安排追蹤，優先檢視利尿劑、腎功能、電解質與四大藥物缺口。"
    ],
    tags: ["台灣情境", "出院追蹤", "團隊分工"]
  },
  {
    title: "醫師版重點整理",
    notes: [
      "高齡不是 GDMT 或 CRT 的自動排除條件，但需要更精細的安全監測與目標討論。",
      "最佳化不是追求每個人都滿劑量，而是讓每位病人得到最符合證據與目標的照護組合。"
    ],
    tags: ["Takeaway", "目標導向", "安全監測"]
  },
  {
    title: "文獻來源與延伸閱讀",
    notes: [
      "主要來源：Lewsey SC, Martyn T, Blumer V, et al. Strategies for Optimizing Heart Failure Care in the Older Adult. Circulation. 2026;153:e00-e00.",
      "DOI: 10.1161/CIR.0000000000001437。原文連結：https://www.ahajournals.org/doi/10.1161/CIR.0000000000001437"
    ],
    tags: ["References", "AHA Journals", "DOI"]
  }
];

const fullScript = [
  "這份投影片整理 AHA 2026 scientific statement：Strategies for Optimizing Heart Failure Care in the Older Adult。內容聚焦高齡心衰竭病人的 GDMT、CIED、共病與衰弱、多重用藥、shared decision-making、advance care planning、implementation 與緩和醫療。",
  "核心臨床訊息是：高齡本身不應成為有效治療的自動排除條件。真正需要做的是以病人目標為中心，評估治療效益、治療負擔、安全監測與可近性，並透過跨專業團隊讓治療可以持續。",
  "主要文獻來源：Lewsey SC et al. Circulation. 2026. DOI: 10.1161/CIR.0000000000001437。",
  "AHA Journals 原文連結：https://www.ahajournals.org/doi/10.1161/CIR.0000000000001437。"
];

let current = 0;
let mode = "notes";

const slideImage = document.getElementById("slideImage");
const thumbs = document.getElementById("thumbs");
const slideSelect = document.getElementById("slideSelect");
const slideCount = document.getElementById("slideCount");
const progress = document.getElementById("progress");
const notesContent = document.getElementById("notesContent");
const notesTab = document.getElementById("notesTab");
const fullTab = document.getElementById("fullTab");
const downloadNotice = document.getElementById("downloadNotice");

function pad(num) {
  return String(num).padStart(2, "0");
}

function slidePath(index) {
  return `origin_image/slide_${pad(index + 1)}.png`;
}

function linkify(text) {
  return text.replace(
    /(https:\/\/[^\s。]+)/g,
    '<a href="$1" target="_blank" rel="noopener">$1</a>'
  );
}

function renderThumbs() {
  thumbs.innerHTML = "";
  slideSelect.innerHTML = "";
  slides.forEach((slide, index) => {
    const li = document.createElement("li");
    const button = document.createElement("button");
    button.className = "thumb-button";
    button.type = "button";
    button.dataset.index = String(index);
    button.innerHTML = `
      <img src="${slidePath(index)}" alt="Slide ${index + 1} thumbnail" loading="lazy">
      <span class="thumb-title"><strong>${index + 1}</strong><span>${slide.title}</span></span>
    `;
    button.addEventListener("click", () => setSlide(index));
    li.appendChild(button);
    thumbs.appendChild(li);

    const option = document.createElement("option");
    option.value = String(index);
    option.textContent = `${index + 1}. ${slide.title}`;
    slideSelect.appendChild(option);
  });
}

function renderNotes() {
  if (mode === "full") {
    notesContent.innerHTML = `
      <h2>完整摘要</h2>
      ${fullScript.map((item) => `<p>${linkify(item)}</p>`).join("")}
    `;
    return;
  }

  const slide = slides[current];
  notesContent.innerHTML = `
    <h2>${current + 1}. ${slide.title}</h2>
    <div class="pill-row">${slide.tags.map((tag) => `<span class="pill">${tag}</span>`).join("")}</div>
    ${slide.notes.map((item) => `<p>${linkify(item)}</p>`).join("")}
  `;
}

function setSlide(index) {
  current = Math.max(0, Math.min(slides.length - 1, index));
  slideImage.src = slidePath(current);
  slideImage.alt = `Slide ${current + 1}: ${slides[current].title}`;
  slideCount.textContent = `${current + 1} / ${slides.length}`;
  progress.style.width = `${((current + 1) / slides.length) * 100}%`;
  slideSelect.value = String(current);

  document.querySelectorAll(".thumb-button").forEach((button) => {
    button.classList.toggle("active", Number(button.dataset.index) === current);
  });

  renderNotes();
}

document.getElementById("prevBtn").addEventListener("click", () => setSlide(current - 1));
document.getElementById("nextBtn").addEventListener("click", () => setSlide(current + 1));
slideSelect.addEventListener("change", (event) => setSlide(Number(event.target.value)));

notesTab.addEventListener("click", () => {
  mode = "notes";
  notesTab.classList.add("active");
  fullTab.classList.remove("active");
  renderNotes();
});

fullTab.addEventListener("click", () => {
  mode = "full";
  fullTab.classList.add("active");
  notesTab.classList.remove("active");
  renderNotes();
});

if (/FBAN|FBAV|FBIOS|FB_IAB|FB4A|Instagram/i.test(navigator.userAgent)) {
  downloadNotice.hidden = false;
}

window.addEventListener("keydown", (event) => {
  if (event.key === "ArrowRight" || event.key === "PageDown") setSlide(current + 1);
  if (event.key === "ArrowLeft" || event.key === "PageUp") setSlide(current - 1);
});

renderThumbs();
setSlide(0);
