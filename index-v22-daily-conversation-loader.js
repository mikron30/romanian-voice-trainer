const CATEGORY = 'שיחה יומיומית';

const additions = [
  { id: 'starter-b1daily-0001', hebrew: 'בטח / בוודאי', romanian: 'sigur', category: CATEGORY, alternatives: [], batch: 1, orderInCategory: 1, enabled: true, source: 'starter' },
  { id: 'starter-b1daily-0002', hebrew: 'אנחנו יכולים', romanian: 'putem', category: CATEGORY, alternatives: [], batch: 1, orderInCategory: 2, enabled: true, source: 'starter' },
  { id: 'starter-b1daily-0003', hebrew: 'אבל', romanian: 'dar', category: CATEGORY, alternatives: [], batch: 1, orderInCategory: 3, enabled: true, source: 'starter' },
  { id: 'starter-b1daily-0004', hebrew: 'אני עונה', romanian: 'răspund', category: CATEGORY, alternatives: [], batch: 1, orderInCategory: 4, enabled: true, source: 'starter' },
  { id: 'starter-b1daily-0005', hebrew: 'אני נח', romanian: 'mă odihnesc', category: CATEGORY, alternatives: [], batch: 1, orderInCategory: 5, enabled: true, source: 'starter' },
  { id: 'starter-b1daily-0006', hebrew: 'אני אוהב', romanian: 'îmi place', category: CATEGORY, alternatives: [], batch: 1, orderInCategory: 6, enabled: true, source: 'starter' },
  { id: 'starter-b1daily-0007', hebrew: 'ללמוד', romanian: 'să învăț', category: CATEGORY, alternatives: [], batch: 1, orderInCategory: 7, enabled: true, source: 'starter' },

  { id: 'starter-b1daily-0008', hebrew: 'כי / מפני ש', romanian: 'pentru că', category: CATEGORY, alternatives: [], batch: 2, orderInCategory: 8, enabled: true, source: 'starter' },
  { id: 'starter-b1daily-0009', hebrew: 'טוב יותר', romanian: 'mai bine', category: CATEGORY, alternatives: [], batch: 2, orderInCategory: 9, enabled: true, source: 'starter' },
  { id: 'starter-b1daily-0010', hebrew: 'בדרך כלל', romanian: 'de obicei', category: CATEGORY, alternatives: [], batch: 2, orderInCategory: 10, enabled: true, source: 'starter' },
  { id: 'starter-b1daily-0011', hebrew: 'לפני', romanian: 'înainte', category: CATEGORY, alternatives: [], batch: 2, orderInCategory: 11, enabled: true, source: 'starter' },
  { id: 'starter-b1daily-0012', hebrew: 'לצאת / שאני יוצא', romanian: 'să plec', category: CATEGORY, alternatives: [], batch: 2, orderInCategory: 12, enabled: true, source: 'starter' },
  { id: 'starter-b1daily-0013', hebrew: 'אם', romanian: 'dacă', category: CATEGORY, alternatives: [], batch: 2, orderInCategory: 13, enabled: true, source: 'starter' },
  { id: 'starter-b1daily-0014', hebrew: 'לטיול / להליכה', romanian: 'la plimbare', category: CATEGORY, alternatives: [], batch: 2, orderInCategory: 14, enabled: true, source: 'starter' },

  { id: 'sentence-b1daily-01', hebrew: 'אנחנו יכולים לדבר ברומנית.', romanian: 'Putem vorbi în română.', category: CATEGORY, alternatives: [], batch: 3, orderInCategory: 1, enabled: true, source: 'starter', practiceType: 'sentence' },
  { id: 'sentence-b1daily-02', hebrew: 'אני מדבר קצת רומנית.', romanian: 'Eu vorbesc puțin românește.', category: CATEGORY, alternatives: [], batch: 3, orderInCategory: 2, enabled: true, source: 'starter', practiceType: 'sentence' },
  { id: 'sentence-b1daily-03', hebrew: 'אני מבין את השאלה, אבל עונה לאט.', romanian: 'Înțeleg întrebarea, dar răspund încet.', category: CATEGORY, alternatives: [], batch: 3, orderInCategory: 3, enabled: true, source: 'starter', practiceType: 'sentence' },
  { id: 'sentence-b1daily-04', hebrew: 'מחר אני הולך לעבודה, אבל בערב אני נח.', romanian: 'Mâine merg la lucru, dar seara mă odihnesc.', category: CATEGORY, alternatives: [], batch: 3, orderInCategory: 4, enabled: true, source: 'starter', practiceType: 'sentence' },
  { id: 'sentence-b1daily-05', hebrew: 'אני אוהב ללמוד רומנית כי אני רוצה לדבר טוב יותר.', romanian: 'Îmi place să învăț româna pentru că vreau să vorbesc mai bine.', category: CATEGORY, alternatives: [], batch: 3, orderInCategory: 5, enabled: true, source: 'starter', practiceType: 'sentence' },
  { id: 'sentence-b1daily-06', hebrew: 'בדרך כלל אני שותה קפה בבוקר לפני שאני יוצא מהבית.', romanian: 'De obicei, beau cafea dimineața înainte să plec de acasă.', category: CATEGORY, alternatives: [], batch: 3, orderInCategory: 6, enabled: true, source: 'starter', practiceType: 'sentence' },
  { id: 'sentence-b1daily-07', hebrew: 'אם יש לי זמן, אני יוצא לטיול אחרי העבודה.', romanian: 'Dacă am timp, merg la plimbare după serviciu.', category: CATEGORY, alternatives: [], batch: 3, orderInCategory: 7, enabled: true, source: 'starter', practiceType: 'sentence' },
];

const baseBundleUrl = '/romanian-voice-trainer/index-v21-build-fix.js';
const response = await fetch(baseBundleUrl, { cache: 'no-store' });
if (!response.ok) {
  throw new Error(`Failed to load base Romanian trainer bundle: ${response.status}`);
}

let source = await response.text();
const anchor = '}],m=n({addAttempt:()=>ne';
const firstAnchor = source.indexOf(anchor);
const secondAnchor = firstAnchor < 0 ? -1 : source.indexOf(anchor, firstAnchor + anchor.length);

if (firstAnchor < 0 || secondAnchor >= 0) {
  throw new Error('Could not safely locate the starter-data insertion point in the base bundle.');
}

const serializedAdditions = JSON.stringify(additions).slice(1, -1);
source = `${source.slice(0, firstAnchor + 1)},${serializedAdditions}${source.slice(firstAnchor + 1)}`;

const blobUrl = URL.createObjectURL(new Blob([source], { type: 'text/javascript' }));
try {
  await import(blobUrl);
} finally {
  URL.revokeObjectURL(blobUrl);
}
