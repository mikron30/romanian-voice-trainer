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

// Single-word vocabulary practice (introduced 2026-10-31).
// Filters complex phrases only during training. Original saved words and scores stay intact.
const singleWordPatches = [
  {
    "description": "New optional word-by-word mode defaults ON",
    "find": "Tt=11,Et={category:`הכול`,wordSetMode:`first`,",
    "replacement": "Tt=12,Et={category:`הכול`,wordSetMode:`first`,singleWordOnly:!0,",
    "count": 1
  },
  {
    "description": "Use a single Romanian token per card unless sentence practice was explicitly chosen",
    "find": "function __v12Set(e,t=`first`){if(!e)return!1;let n=e.practiceType===`sentence`||Number(e.batch)===3;if(t===`sentences`)return n;if(n)return!1;",
    "replacement": "function __v12Set(e,t=`first`,singleWordOnly=!1){if(!e)return!1;let n=e.practiceType===`sentence`||Number(e.batch)===3;if(t===`sentences`)return n;if(n)return!1;if(singleWordOnly&&/\\s/u.test(String(e.romanian||``).trim()))return!1;",
    "count": 1
  },
  {
    "description": "Adaptive practice checks mode",
    "find": "__v12Set(e,i.wordSetMode||`first`)",
    "replacement": "__v12Set(e,i.wordSetMode||`first`,i.singleWordOnly)",
    "count": 1
  },
  {
    "description": "History respects mode",
    "find": "__v12Set(t,s.wordSetMode||`first`)",
    "replacement": "__v12Set(t,s.wordSetMode||`first`,s.singleWordOnly)",
    "count": 1
  },
  {
    "description": "Stats and available counts respect mode",
    "find": "__v12Set(e,s.wordSetMode||`first`)",
    "replacement": "__v12Set(e,s.wordSetMode||`first`,s.singleWordOnly)",
    "count": 2
  },
  {
    "description": "Retry queue respects mode",
    "find": "__v12Set(a,N.current.wordSetMode||`first`)",
    "replacement": "__v12Set(a,N.current.wordSetMode||`first`,N.current.singleWordOnly)",
    "count": 1
  },
  {
    "description": "Sequential practice respects mode",
    "find": "__v12Set(t,n)",
    "replacement": "__v12Set(t,n,N.current.singleWordOnly)",
    "count": 1
  },
  {
    "description": "Voice statistics respect mode",
    "find": "__v12Set(r,N.current.wordSetMode||`first`)",
    "replacement": "__v12Set(r,N.current.wordSetMode||`first`,N.current.singleWordOnly)",
    "count": 1
  },
  {
    "description": "Adaptive selection receives mode",
    "find": "i={weakWordsMode:N.current.weakWordsMode===!0,wordSetMode:N.current.wordSetMode||`first`}",
    "replacement": "i={weakWordsMode:N.current.weakWordsMode===!0,wordSetMode:N.current.wordSetMode||`first`,singleWordOnly:N.current.singleWordOnly}",
    "count": 1
  },
  {
    "description": "History memo reacts to mode",
    "find": "[a,s.category,s.wordSetMode,Qe]",
    "replacement": "[a,s.category,s.wordSetMode,s.singleWordOnly,Qe]",
    "count": 1
  },
  {
    "description": "Stats memo reacts to mode",
    "find": "[r,$e,s.category,s.wordSetMode]",
    "replacement": "[r,$e,s.category,s.wordSetMode,s.singleWordOnly]",
    "count": 1
  },
  {
    "description": "Sequential position resets when mode changes",
    "find": "r=`${e}|${n}`;__seqScope.current",
    "replacement": "r=`${e}|${n}|${N.current.singleWordOnly}`;__seqScope.current",
    "count": 1
  },
  {
    "description": "Add one-word-only toggle in practice screen",
    "find": "(0,I.jsx)(`button`,{className:`secondary compact`,onClick:()=>Zt(),children:`🎤 בחר נושא בקול`})",
    "replacement": "s.wordSetMode!==`sentences`&&(0,I.jsx)(`button`,{className:`secondary compact`,\"aria-pressed\":!!s.singleWordOnly,onClick:()=>gt({singleWordOnly:!s.singleWordOnly}),children:s.singleWordOnly?`✓ מילה אחת בלבד`:`כולל גם ביטויים`}),(0,I.jsx)(`button`,{className:`secondary compact`,onClick:()=>Zt(),children:`🎤 בחר נושא בקול`})",
    "count": 1
  }
];
for (const patch of singleWordPatches) {
  const matches = source.split(patch.find).length - 1;
  if (matches !== patch.count) {
    throw new Error(`Unexpected Romanian bundle version for ${patch.description}: ${matches} matches, expected ${patch.count}`);
  }
  source = source.replaceAll(patch.find, patch.replacement);
}

// Accept spoken next-category commands without scoring them as word answers.
const nextTopicPatches = [
  {
    "description": "Recognize command in Hebrew commands mode",
    "find": "function pt(e,t){let n=F(e);if(!n)return{type:`unknown`,transcript:e};",
    "replacement": "function pt(e,t){let n=F(e);if(!n)return{type:`unknown`,transcript:e};if(__isNextCategorySpeech(e))return{type:`nextCategory`,transcript:e};"
  },
  {
    "description": "Recognize Hebrew/Romanian topic-switch utterances",
    "find": "function mt(){return`אפשר לומר:",
    "replacement": "function __isNextCategorySpeech(e){let t=F(e),n=ht(e);return /^(?:(?:עבור|תעבור|תעברי|תעבורי|נעבור|לעבור|תעביר אותי)\\s+)?ל?ה?נושא\\s+הבא(?:\\s+בבקשה)?$/u.test(t)||/^(?:(?:treci|mergi|trecem|poti sa treci)\\s+(?:la|spre)\\s+)?(?:urmatorul subiect|subiectul urmator|urmatoarea tema|tema urmatoare)(?:\\s+te rog)?$/u.test(n)||/^(?:schimba|schimbam|schimbati)\\s+(?:subiectul|tema)$/u.test(n)}function mt(){return`אפשר לומר:"
  },
  {
    "description": "Mention spoken topic command in help",
    "find": "דלג, חזור על המילה, חזור על התשובה, בחר נושא, רשימת נושאים",
    "replacement": "דלג, עבור לנושא הבא, חזור על המילה, חזור על התשובה, בחר נושא, רשימת נושאים"
  },
  {
    "description": "Move to next active category without grading current word",
    "find": "},Jt=async(e,t)=>{",
    "replacement": "},__nextCategory=async()=>{let cats=De.current.filter(cat=>cat!==`הכול`&&be.current.some(word=>word.enabled&&word.category===cat&&__v12Set(word,N.current.wordSetMode||`first`,N.current.singleWordOnly)));if(!cats.length||(cats.length===1&&cats[0]===N.current.category)){S(`אין נושא אחר זמין לתרגול.`);await Nt(`אין נושא אחר זמין לתרגול.`,`he-IL`,N.current.hebrewRate).catch(()=>{});return!1}let idx=cats.indexOf(N.current.category),next=cats[(idx+1)%cats.length];await qt();await gt({category:next,weakWordsMode:!1});__seqScope.current=``;__seqLast.current=null;S(`עובר לנושא: ${next}`);T(`נבחר הנושא הבא: ${next}`);await Nt(`הנושא הבא הוא ${next}`,`he-IL`,N.current.hebrewRate).catch(()=>{});return!0},Jt=async(e,t)=>{"
  },
  {
    "description": "Handle next category in Hebrew commands mode",
    "find": "case`skip`:return ke.current=!1,ce(!1),await qt(),await Wt(t),L(t);",
    "replacement": "case`nextCategory`:{ke.current=!1,ce(!1);let moved=await __nextCategory();if(moved){await Gt(t);return!1}return L(t)}case`skip`:return ke.current=!1,ce(!1),await qt(),await Wt(t),L(t);"
  },
  {
    "description": "Retain recognized utterances before answer scoring",
    "find": "try{let t=vt(await Ft(e=>ct(",
    "replacement": "try{let __spoken=await Ft(e=>ct("
  },
  {
    "description": "Handle command before scoring Romaninan answer",
    "find": "),e),n,N.current.threshold);return await f()",
    "replacement": "),e);if(__spoken.some(__item=>__isNextCategorySpeech(__item.transcript))){let __changed=await __nextCategory();if(e===null&&__changed)await Ht();return{categoryChanged:!0}}let t=vt(__spoken,n,N.current.threshold);return await f()"
  },
  {
    "description": "Skip retry after next category command",
    "find": "if(!L(e))return;if(o&&!o.correct&&N.current.retryIncorrectOnce)",
    "replacement": "if(!L(e))return;if(o?.categoryChanged)continue;if(o&&!o.correct&&N.current.retryIncorrectOnce)"
  },
  {
    "description": "Show Romanian command during voice practice",
    "find": "s.wordSetMode===`sentences`?`מיד המשפט הבא`:`מיד המילה הבאה`].map",
    "replacement": "s.wordSetMode===`sentences`?`מיד המשפט הבא`:`מיד המילה הבאה`,`נושא הבא: următorul subiect`].map"
  },
  {
    "description": "Document spoken phrase and language limitation",
    "find": "` לחץ על „בחר נושא בקול” כדי לעבור זמנית להאזנה לפקודות כמו `,mt()]",
    "replacement": "` לחץ על „בחר נושא בקול” כדי לעבור זמנית להאזנה לפקודות כמו `,mt(),` בזמן ההאזנה לתשובה ברומנית אפשר לומר „următorul subiect” כדי לעבור לנושא הבא בלי לרשום תשובה שגויה. אפשר לנסות גם „עבור לנושא הבא”, אך זיהוי עברית בזמן שהמיקרופון מוגדר לרומנית תלוי בדפדפן.`]"
  }
];
for (const patch of nextTopicPatches) {
  const matches = source.split(patch.find).length - 1;
  if (matches !== 1) {
    throw new Error(`Unexpected Romanian bundle for ${patch.description}: ${matches} matches`);
  }
  source = source.replace(patch.find, patch.replacement);
}

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
