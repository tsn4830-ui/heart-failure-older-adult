import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { Presentation, PresentationFile } from "@oai/artifact-tool";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const outDir = process.env.OUT_DIR ? path.resolve(process.env.OUT_DIR) : __dirname;
const imageDir = path.join(outDir, "origin_image");
const assetDir = path.join(outDir, "assets");

const W = 1280;
const H = 720;
const navy = "#0b2f59";
const blue = "#1b6ca8";
const teal = "#1f8a8a";
const red = "#b42318";
const amber = "#c77d0e";
const ink = "#182230";
const muted = "#667085";
const line = "#d0d7e2";
const paper = "#f7f9fc";

const sourceLine = "Source: Lewsey SC et al. Circulation. 2026. DOI: 10.1161/CIR.0000000000001437";
let sourceFigures = {};

const slides = [
  {
    kicker: "AHA Scientific Statement 2026",
    title: "高齡心衰竭照護最佳化",
    subtitle: "Strategies for Optimizing Heart Failure Care in the Older Adult",
    layout: "cover",
    tags: ["65歲以上", "HF", "醫師快速閱讀"],
    notes: [
      "這份 AHA scientific statement 聚焦 65 歲以上心衰竭病人的照護最佳化。",
      "核心訊息不是把年齡視為治療禁忌，而是在共病、衰弱、多重用藥、認知功能與社會支持之間，做出以病人目標為中心的治療排序。"
    ]
  },
  {
    kicker: "Why it matters",
    title: "高齡心衰竭是最大照護負擔之一",
    bullets: [
      "心衰竭盛行率隨年齡上升，住院與再住院主要集中在 65 歲以上族群。",
      "高齡病人常同時有衰弱、認知退化、腎功能下降、營養不良與社會孤立。",
      "臨床目標不只降低死亡率，也包含維持功能、減少住院、提升生活品質。"
    ],
    callout: "實務重點：不要只問「可不可以用 GDMT」，更要問「如何讓這位病人能安全且持續地用」。",
    notes: [
      "原文指出，心衰竭對高齡族群造成不成比例的負擔，且這群病人面臨治療取得、照護協調與系統導覽的困難。",
      "醫師在門診或住院照護時，需要同時評估醫療、功能、認知與社會面向。"
    ]
  },
  {
    kicker: "Evidence base",
    title: "GDMT：高齡不是自動排除條件",
    bullets: [
      "HFrEF 四大藥物：ARNI 或 ACEi/ARB、實證 beta blocker、MRA、SGLT2 inhibitor。",
      "重要試驗次分析顯示，ARNI、SGLT2 inhibitor、MRA 與 beta blocker 的治療效果在年齡分層大致一致。",
      "HFmrEF/HFpEF：SGLT2 inhibitor、MRA、利尿劑與特定情境下的 RAAS 相關治療，仍需依表現型與耐受性選擇。"
    ],
    callout: "高齡病人事件率高，絕對效益可能很重要；但副作用監測要更細。",
    notes: [
      "PARADIGM-HF、DAPA-HF、DELIVER、MRA individual patient meta-analysis 與 beta blocker meta-analysis 都支持治療效果在高齡分層中維持。",
      "安全性方面，低血壓、腎功能變化、體液不足與電解質異常要更密切追蹤。"
    ]
  },
  {
    kicker: "Therapeutic gap",
    title: "真正的問題：有效治療常被低度使用",
    bullets: [
      "登錄資料顯示，年齡越高，eBB、MRA、ARNI 或 RAASi 使用與劑量最佳化越少。",
      "女性高齡病人可能面臨更明顯的 GDMT 使用落差。",
      "常見原因：低血壓、腎功能、共病、多重用藥、費用、追蹤不易與臨床慣性。"
    ],
    callout: "處方策略：低劑量啟動、早期追蹤、主動處理副作用，而不是直接放棄治療。",
    notes: [
      "CHAMP-HF、Optum、CHECK-HF 與 SWEDEHF 等資料均顯示高齡與 GDMT 使用不足相關。",
      "statement 強調，在沒有禁忌時，仍應提供有證據支持的治療，同時納入共病、預期存活與照護目標。"
    ]
  },
  {
    kicker: "Devices",
    title: "CIED：ICD 與 CRT 要分開思考",
    bullets: [
      "ICD：初級預防在高齡與複雜共病族群的淨效益較不確定，需考量有意義存活超過 1 年、猝死風險與病人偏好。",
      "CRT：可改善症狀、生活品質、住院與存活；不應只因年齡而排除。",
      "裝置決策要納入併發症、回診負擔、電擊經驗、末期照護與去活化討論。"
    ],
    callout: "問法轉換：不是「幾歲還能裝」，而是「裝置對他的疾病歷程與在意的結果有沒有幫助」。",
    notes: [
      "ICD 在高齡特別是非缺血性心肌病變的資料較混雜，且許多試驗來自當代 GDMT 以前。",
      "CRT 的症狀改善可能在數天到數週出現，對仍有症狀且符合 QRS 條件的病人，年齡本身不是排除因素。"
    ]
  },
  {
    kicker: "Domain Management",
    title: "四大 domain：把心衰竭照護拉回整個人",
    layout: "matrix",
    cells: [
      ["Medical", "營養、鐵缺乏、腎功能、多重用藥、藥物交互作用"],
      ["Mind and emotion", "認知功能、憂鬱、服藥理解、家屬或照顧者協助"],
      ["Physical", "衰弱、跌倒、姿勢性低血壓、肌力、活動能力"],
      ["Social", "交通、費用、社會孤立、健康識能、視訊照護可近性"]
    ],
    notes: [
      "原文使用 Domain Management Approach，分成 medical、mind and emotion、physical、social 四個面向。",
      "這個架構適合門診快速檢核，也適合出院前照護計畫與跨科溝通。"
    ]
  },
  {
    kicker: "Prescribing in older adults",
    title: "多重用藥與營養：先找可修正因子",
    bullets: [
      "每次調整 GDMT 前後，重新核對藥物、血壓、體重、eGFR、鉀離子與症狀。",
      "避免同時忽略低營養、鐵缺乏、利尿劑過量、NSAID、alpha blocker 等影響耐受性的因素。",
      "deprescribing 不是少治療，而是移除低價值或高風險藥物，讓高價值治療留下來。"
    ],
    callout: "高齡處方的核心：不是單純加藥或減藥，而是提高整體 treatment fit。",
    notes: [
      "statement 提到營養不良、微量營養素缺乏與鐵缺乏在高齡心衰竭很常見，且會影響功能與症狀。",
      "用藥檢視與去處方可以降低不良藥物事件，並提高真正重要治療的持續性。"
    ]
  },
  {
    kicker: "Barriers and facilitators",
    title: "GDMT 卡住時：用多層次障礙拆解",
    layout: "three",
    columns: [
      ["病人層級", "症狀負擔、跌倒擔心、健康識能、藥費、交通、照顧者缺乏"],
      ["醫療團隊層級", "臨床慣性、副作用擔心、跨科訊息不一致、追蹤間隔太長"],
      ["系統層級", "給付限制、門診時間不足、藥師與護理資源不足、轉銜照護斷裂"]
    ],
    callout: "把「病人不配合」改寫成「哪一層障礙還沒被解決」。",
    notes: [
      "原文 Figure 2 強調 GDMT uptake 受到病人、用藥、臨床團隊與醫療系統多層次因素影響。",
      "若只把問題歸因於病人，常會錯過可介入的系統因素。"
    ]
  },
  {
    kicker: "SDM and ACP",
    title: "Shared decision-making：目標會變，必須反覆確認",
    bullets: [
      "先釐清 what matters most：壽命、功能、症狀、居家生活、避免住院、避免侵入性治療。",
      "討論治療效益時，也要說明負擔：抽血、回診、輸注、裝置併發症、住院天數、照顧者壓力。",
      "ACP 不是只在末期才談；晚期治療、LVAD、ICD 去活化與緩和醫療都需要預先對話。"
    ],
    callout: "SDM 不是把決定丟給病人，而是用醫療證據幫病人做符合價值的選擇。",
    notes: [
      "statement 強調 autonomy，但也指出醫師需要提供 nuanced、evidence-driven、value-focused counseling。",
      "病人的偏好可能隨疾病進展而改變，因此 shared decision-making 應是反覆進行的關係性流程。"
    ]
  },
  {
    kicker: "Implementation",
    title: "能提高 GDMT uptake 的做法",
    bullets: [
      "費用協助或給付改善：降低藥費可提升可近性，特別是固定收入的高齡族群。",
      "電子決策支持、病人啟動工具與藥物 titration protocol：減少臨床慣性。",
      "自我照護教育、遠距監測、出院轉銜照護、跨專業團隊：改善追蹤與持續性。"
    ],
    callout: "有些 intervention 改善處方率，有些改善照護銜接；不要期待單一工具解決所有問題。",
    notes: [
      "Table 2 整理多種 implementation strategies，包括 pharmacare、decision support、titration algorithms、self-care、telemedicine、transitional care 與 quality improvement。",
      "在台灣情境，可把這些概念轉成心衰竭照護門診、藥師協作、出院後早期回診與遠距追蹤。"
    ]
  },
  {
    kicker: "Palliative care",
    title: "緩和醫療：不是放棄治療，是減少不必要痛苦",
    bullets: [
      "高齡晚期心衰竭常見 refractory symptoms、反覆住院、GDMT 無法耐受與照顧負擔升高。",
      "緩和醫療可協助症狀控制、目標釐清、家庭溝通、ACP 與治療負擔評估。",
      "hospice 與 palliative care 不等同；早期轉介可與疾病治療並行。"
    ],
    callout: "對 refractory HF：早期心衰竭專科與緩和醫療共同照護，通常比最後一刻才會診更有價值。",
    notes: [
      "原文指出，把緩和醫療誤認為安寧照護可能造成病人太早拒絕服務。",
      "對症狀難以控制或無法耐受 GDMT 的病人，緩和醫療可以提供實質幫助。"
    ]
  },
  {
    kicker: "Clinic workflow",
    title: "門診可用的高齡 HF 五步驟",
    layout: "timeline",
    steps: [
      ["1", "定義 HF 類型", "EF 類型、症狀、ATTR-CM 可能性"],
      ["2", "啟動高價值治療", "依證據與耐受性安排 GDMT 或裝置評估"],
      ["3", "掃描 domain", "營養、認知、衰弱、跌倒、社會支持"],
      ["4", "拆解障礙", "費用、追蹤、藥物交互作用、照顧者與交通"],
      ["5", "重談目標", "每次病程轉折後更新 SDM 與 ACP"]
    ],
    notes: [
      "這張把 statement 轉成門診可用流程，讓醫師在有限時間內仍能做結構化評估。",
      "五步驟不是線性一次完成，而是在每次病況變化、出院後或治療不耐受時重新循環。"
    ]
  },
  {
    kicker: "Taiwan practice lens",
    title: "台灣臨床情境的落地提醒",
    bullets: [
      "把「藥物加不上去」記錄成具體原因：血壓、腎功能、鉀離子、症狀、費用、回診或照顧支持。",
      "出院後 7 到 14 天內安排追蹤，優先檢視利尿劑、腎功能、電解質與四大藥物缺口。",
      "善用護理師、藥師、營養師、復健與居家照護資源，避免心衰竭治療只剩單一醫師處方。"
    ],
    callout: "每次門診留下下一步：要加哪一類藥、何時抽血、何時回診、誰負責追蹤。",
    notes: [
      "這張是將原文 implementation 與 domain approach 轉為台灣門診與住院轉銜可用的工作提醒。",
      "重點是讓處方、監測、病人教育與團隊分工形成閉環。"
    ]
  },
  {
    kicker: "Take-home messages",
    title: "醫師版重點整理",
    bullets: [
      "高齡不是 GDMT 或 CRT 的自動排除條件，但需要更精細的安全監測與目標討論。",
      "ICD 初級預防在高齡複雜共病中要更重視淨效益、預期存活與病人偏好。",
      "高齡心衰竭照護要同時處理 medical、mind、physical、social domains。",
      "SDM、ACP 與緩和醫療應早期、反覆、以病人價值為核心。"
    ],
    callout: "最佳化不是追求每個人都滿劑量，而是讓每位病人得到最符合證據與目標的照護組合。",
    notes: [
      "最後收束成四個訊息：提供治療、監測風險、整合 domain、反覆確認目標。",
      "這也是原文從 evidence-based care 走向 patient-centered care 的主軸。"
    ]
  },
  {
    kicker: "References",
    title: "文獻來源與延伸閱讀",
    layout: "refs",
    refs: [
      "Lewsey SC, Martyn T, Blumer V, et al. Strategies for Optimizing Heart Failure Care in the Older Adult: A Scientific Statement From the American Heart Association. Circulation. 2026;153:e00-e00.",
      "DOI: 10.1161/CIR.0000000000001437",
      "AHA Journals: https://www.ahajournals.org/doi/10.1161/CIR.0000000000001437",
      "2022 AHA/ACC/HFSA Guideline for the Management of Heart Failure. DOI: 10.1161/CIR.0000000000001063"
    ],
    notes: [
      "本簡報依據 AHA 2026 scientific statement 製作，並以醫師快速閱讀為目的整理。",
      "用藥與裝置治療仍需依各院可近性、給付規範、藥品仿單、病人腎功能與臨床狀態判斷。"
    ]
  }
];

function addText(slide, text, left, top, width, height, style = {}) {
  const box = slide.shapes.add({
    geometry: "textbox",
    position: { left, top, width, height },
    fill: "none",
    line: { style: "solid", fill: "none", width: 0 }
  });
  box.text = text;
  box.text.style = {
    fontFamily: "Noto Sans TC",
    fontSize: style.fontSize ?? 24,
    color: style.color ?? ink,
    bold: style.bold ?? false,
    alignment: style.alignment ?? "left",
    ...style
  };
  return box;
}

function addRect(slide, left, top, width, height, fill, stroke = "none", radius = "rounded-lg") {
  return slide.shapes.add({
    geometry: "roundRect",
    position: { left, top, width, height },
    fill,
    line: { style: "solid", fill: stroke, width: stroke === "none" ? 0 : 1 },
    borderRadius: radius
  });
}

function addFooter(slide, index) {
  addText(slide, sourceLine, 58, 682, 760, 18, { fontSize: 10, color: "#7a8699" });
  addText(slide, `${index + 1}/${slides.length}`, 1130, 682, 70, 18, { fontSize: 11, color: "#7a8699", alignment: "right" });
  addRect(slide, 1010, 650, 192, 26, "rgba(255,255,255,0.72)", "#d7dee9", "rounded-full");
  addText(slide, "阿婷醫師的讀書筆記", 1030, 655, 150, 16, { fontSize: 10, color: "#526070", bold: true, alignment: "right" });
}

function addHeader(slide, s) {
  addText(slide, s.kicker, 58, 42, 470, 24, { fontSize: 13, color: blue, bold: true });
  addText(slide, s.title, 58, 76, 900, 62, { fontSize: 34, color: navy, bold: true });
  slide.shapes.add({
    geometry: "rect",
    position: { left: 58, top: 146, width: 1164, height: 2 },
    fill: line,
    line: { style: "solid", fill: "none", width: 0 }
  });
}

function addBullets(slide, bullets, left, top, width, fontSize = 23) {
  let y = top;
  for (const bullet of bullets) {
    addText(slide, "•", left, y + 2, 24, 30, { fontSize: fontSize + 4, color: blue, bold: true });
    addText(slide, bullet, left + 34, y, width - 34, 58, { fontSize, color: ink });
    y += 72;
  }
}

function drawDefault(slide, s) {
  addHeader(slide, s);
  addBullets(slide, s.bullets, 88, 184, 1040, 23);
  if (s.callout) {
    addRect(slide, 88, 552, 1040, 72, "#eef6fb", "#b8d7ec", "rounded-lg");
    addText(slide, s.callout, 116, 570, 984, 36, { fontSize: 22, color: navy, bold: true });
  }
}

function drawCover(slide, s) {
  slide.background.fill = "#f4f8fb";
  slide.shapes.add({
    geometry: "rect",
    position: { left: 0, top: 0, width: 1280, height: 720 },
    fill: "#f4f8fb",
    line: { style: "solid", fill: "none", width: 0 }
  });
  slide.shapes.add({
    geometry: "rect",
    position: { left: 0, top: 0, width: 1280, height: 112 },
    fill: navy,
    line: { style: "solid", fill: "none", width: 0 }
  });
  addText(slide, s.kicker, 72, 44, 520, 24, { fontSize: 16, color: "#d8e8f6", bold: true });
  addText(slide, s.title, 72, 178, 760, 84, { fontSize: 50, color: navy, bold: true });
  addText(slide, s.subtitle, 72, 282, 800, 84, { fontSize: 27, color: ink });
  addRect(slide, 72, 420, 760, 82, "#ffffff", "#ccd8e6", "rounded-lg");
  addText(slide, "AHA 2026 scientific statement | 台灣醫師閱讀版", 104, 442, 700, 28, { fontSize: 23, color: navy, bold: true });
  addText(slide, "整理重點：GDMT、裝置治療、共病與衰弱、shared decision-making、緩和醫療與照護落地", 104, 475, 690, 24, { fontSize: 16, color: muted });
  addRect(slide, 910, 174, 238, 238, "#ffffff", "#d6e1ec", "rounded-full");
  addText(slide, "HF", 962, 236, 132, 62, { fontSize: 54, color: red, bold: true, alignment: "center" });
  addText(slide, "Older Adult", 936, 310, 184, 32, { fontSize: 23, color: navy, bold: true, alignment: "center" });
  addText(slide, "阿婷醫師的讀書筆記", 860, 612, 310, 24, { fontSize: 18, color: "#526070", bold: true, alignment: "right" });
}

function drawMatrix(slide, s) {
  addHeader(slide, s);
  addText(slide, "原始圖表", 84, 184, 170, 26, { fontSize: 16, color: muted, bold: true });
  slide.images.add({
    blob: sourceFigures.domain,
    contentType: "image/png",
    alt: "AHA Scientific Statement Figure 1: Domain-based strategies to optimize care in older adults with heart failure",
    fit: "contain",
    position: { left: 78, top: 216, width: 610, height: 398 },
    geometry: "rect"
  });
  slide.shapes.add({ geometry: "rect", position: { left: 720, top: 188, width: 2, height: 430 }, fill: line, line: { style: "solid", fill: "none", width: 0 } });
  addText(slide, "臨床解讀", 754, 184, 200, 26, { fontSize: 16, color: muted, bold: true });
  s.cells.forEach((cell, i) => {
    const y = 224 + i * 94;
    const colors = [red, blue, teal, amber];
    slide.shapes.add({ geometry: "rect", position: { left: 754, top: y, width: 8, height: 58 }, fill: colors[i], line: { style: "solid", fill: "none", width: 0 } });
    addText(slide, cell[0], 782, y, 350, 28, { fontSize: 23, color: navy, bold: true });
    addText(slide, cell[1], 782, y + 34, 378, 48, { fontSize: 18, color: ink });
  });
  addText(slide, "Figure 1. Lewsey et al., Circulation 2026. 原圖保留英文標示以維持原始內容。", 84, 632, 970, 18, { fontSize: 11, color: muted });
}

function drawThree(slide, s) {
  addHeader(slide, s);
  slide.images.add({
    blob: sourceFigures.barriers,
    contentType: "image/png",
    alt: "AHA Scientific Statement Figure 2: Barriers and facilitators to GDMT uptake in older adults with heart failure",
    fit: "contain",
    position: { left: 72, top: 174, width: 610, height: 442 },
    geometry: "rect"
  });
  addText(slide, "用原圖快速定位問題，再回到可介入層級", 748, 188, 400, 34, { fontSize: 24, color: navy, bold: true });
  s.columns.forEach((col, i) => {
    const y = 250 + i * 95;
    const colors = [red, blue, teal];
    slide.shapes.add({ geometry: "rect", position: { left: 748, top: y, width: 10, height: 62 }, fill: colors[i], line: { style: "solid", fill: "none", width: 0 } });
    addText(slide, col[0], 780, y, 340, 27, { fontSize: 22, color: navy, bold: true });
    addText(slide, col[1], 780, y + 32, 350, 52, { fontSize: 17, color: ink });
  });
  slide.shapes.add({ geometry: "rect", position: { left: 748, top: 562, width: 390, height: 2 }, fill: amber, line: { style: "solid", fill: "none", width: 0 } });
  addText(slide, s.callout, 748, 578, 386, 48, { fontSize: 18, color: navy, bold: true });
  addText(slide, "Figure 2. Lewsey et al., Circulation 2026. 原圖保留英文標示以維持原始內容。", 72, 632, 970, 18, { fontSize: 11, color: muted });
}

function drawTimeline(slide, s) {
  addHeader(slide, s);
  const y = 202;
  s.steps.forEach((step, i) => {
    const x = 64 + i * 235;
    addRect(slide, x, y, 196, 298, "#ffffff", "#cdd8e5", "rounded-lg");
    addRect(slide, x + 22, y + 22, 48, 48, [red, blue, teal, amber, navy][i], "none", "rounded-full");
    addText(slide, step[0], x + 22, y + 31, 48, 25, { fontSize: 22, color: "#ffffff", bold: true, alignment: "center" });
    addText(slide, step[1], x + 22, y + 92, 152, 62, { fontSize: 24, color: navy, bold: true });
    addText(slide, step[2], x + 22, y + 172, 152, 72, { fontSize: 18, color: ink });
    if (i < s.steps.length - 1) {
      slide.shapes.add({
        geometry: "chevron",
        position: { left: x + 198, top: y + 132, width: 34, height: 34 },
        fill: "#d5e1ed",
        line: { style: "solid", fill: "none", width: 0 }
      });
    }
  });
}

function drawRefs(slide, s) {
  addHeader(slide, s);
  let y = 194;
  s.refs.forEach((ref, i) => {
    addText(slide, `${i + 1}.`, 88, y + 2, 38, 24, { fontSize: 21, color: blue, bold: true });
    addText(slide, ref, 132, y, 980, 56, { fontSize: 21, color: ink });
    y += 80;
  });
  addRect(slide, 88, 570, 1030, 56, "#f0f7f7", "#b7dada", "rounded-lg");
  addText(slide, "臨床使用提醒：本投影片為文獻閱讀整理，不能取代完整原文、藥品仿單、院內規範或個別病人評估。", 112, 586, 982, 24, { fontSize: 20, color: navy, bold: true });
}

async function writeBlob(filePath, blob) {
  await fs.writeFile(filePath, new Uint8Array(await blob.arrayBuffer()));
}

async function main() {
  await fs.mkdir(imageDir, { recursive: true });
  await fs.mkdir(assetDir, { recursive: true });
  sourceFigures = {
    domain: await fs.readFile(path.join(assetDir, "source-figures", "domain-management-figure.png")),
    barriers: await fs.readFile(path.join(assetDir, "source-figures", "gdmt-barriers-figure.png"))
  };
  const presentation = Presentation.create({ slideSize: { width: W, height: H } });

  slides.forEach((s, index) => {
    const slide = presentation.slides.add();
    slide.background.fill = paper;
    if (s.layout === "cover") drawCover(slide, s);
    else if (s.layout === "matrix") drawMatrix(slide, s);
    else if (s.layout === "three") drawThree(slide, s);
    else if (s.layout === "timeline") drawTimeline(slide, s);
    else if (s.layout === "refs") drawRefs(slide, s);
    else drawDefault(slide, s);
    addFooter(slide, index);
  });

  for (const [index, slide] of presentation.slides.items.entries()) {
    const stem = `slide_${String(index + 1).padStart(2, "0")}`;
    await writeBlob(path.join(imageDir, `${stem}.png`), await presentation.export({ slide, format: "png", scale: 2 }));
    await fs.writeFile(path.join(outDir, `${stem}.layout.json`), await (await slide.export({ format: "layout" })).text());
  }

  await writeBlob(path.join(assetDir, "og-image.png"), await presentation.export({ slide: presentation.slides.items[0], format: "png", scale: 2 }));
  const montage = await presentation.export({ format: "webp", montage: true, scale: 0.8 });
  await writeBlob(path.join(outDir, "deck-montage.webp"), montage);
  const pptx = await PresentationFile.exportPptx(presentation);
  await pptx.save(path.join(outDir, "heart-failure-older-adult.pptx"));
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
