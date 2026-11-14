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

// Bilingual spoken controls during Romanian practice.
const bilingualVoicePatches = [
  {
    "description": "Bilingual speech intent recognition and topic aliases",
    "find": "function mt(){return`אפשר לומר:",
    "replacement": "\nconst __roTopics={\"הכול\":[\"toate\",\"toate subiectele\"],\"ברכות\":[\"salutari\"],\"בסיס\":[\"baza\"],\"משפטים\":[\"propozitii\"],\"כינויי גוף\":[\"pronume\"],\"שאלות\":[\"intrebari\"],\"מספרים\":[\"numere\"],\"זמן\":[\"timp\"],\"ימים\":[\"zile\"],\"משפחה\":[\"familie\"],\"אנשים\":[\"oameni\"],\"אוכל\":[\"mancare\"],\"בית\":[\"casa\"],\"חפצים\":[\"obiecte\"],\"נסיעות\":[\"calatorii\",\"transport\"],\"פעלים\":[\"verbe\"],\"תארים\":[\"adjective\"],\"צבעים\":[\"culori\"],\"גוף\":[\"corp\"],\"חיות\":[\"animale\"],\"טבע\":[\"natura\"],\"לימודים\":[\"studii\"],\"עבודה\":[\"munca\"],\"שיחה יומיומית\":[\"conversatie zilnica\",\"conversatie de zi cu zi\"]};\nfunction __spokenCategory(raw,all){\n  const he=F(raw).replace(/^(?:בחר|תבחר|תבחרי)\\s+(?:(?:לי|את)\\s+)?(?:ה)?נושא\\s+/u,'').replace(/^(?:ה)?נושא\\s+/u,'').trim();\n  const ro=ht(raw).replace(/^(?:alege|selecteaza)\\s+(?:(?:un|o)\\s+)?(?:subiectul|subiect|tema)\\s+/u,'').replace(/^(?:subiectul|subiect|tema)\\s+/u,'').trim();\n  const matches=all.map(category=>{\n    let score=0;\n    for(const name of [category,...(ut[category]||[]),...(__roTopics[category]||[])]){\n      const a=F(name),b=ht(name);\n      if((a&&a===he)||(b&&b===ro))score=Math.max(score,100+name.length);\n      else if((a.length>=4&&he.includes(a))||(b.length>=4&&ro.includes(b)))score=Math.max(score,60+name.length);\n    }\n    return{category,score};\n  }).sort((a,b)=>b.score-a.score);\n  return matches[0]?.score>0?matches[0].category:null;\n}\nfunction __voiceDistance(a,b){const row=Array.from({length:b.length+1},(_,i)=>i);for(let i=1;i<=a.length;i++){let prev=row[0];row[0]=i;for(let j=1;j<=b.length;j++){const old=row[j];row[j]=Math.min(row[j]+1,row[j-1]+1,prev+(a[i-1]===b[j-1]?0:1));prev=old}}return row[b.length]}\nfunction __fuzzyVoiceIntent(raw){\n  const heard=ht(raw).split(/\\s+/u).filter(Boolean);\n  if(heard.length<2||heard.length>5)return null;\n  const patterns=[\n    ['nextCategory','urmatorul subiect'],['nextCategory','un manual subiect'],\n    ['chooseTopic','alege subiect'],['chooseTopic','selecteaza subiect'],\n    ['regularMode','selectie normala'],['regularMode','mod normal'],\n    ['sequentialMode','toate cuvintele pe rand'],['sequentialMode','cuvintele pe rand'],\n    ['stopVoice','opreste modul vocal']\n  ];\n  const scores=[];\n  for(const [type,phrase] of patterns){\n    const target=phrase.split(' ');\n    if(Math.abs(target.length-heard.length)>1)continue;\n    const score=(x,y)=>{const d=__voiceDistance(x,y);return d===0?1:d<=Math.max(1,Math.floor(Math.max(x.length,y.length)*0.38))?0.7:0};\n    let best=0;\n    // Permit one extra or missing ASR token, without matching unrelated speech.\n    for(let offset=-1;offset<=1;offset++){let matched=0,strong=0,total=0;for(let i=0;i<target.length;i++){const j=i+offset;if(j<0||j>=heard.length)continue;const sim=score(target[i],heard[j]);if(sim>=0.7){matched++;if(sim===1)strong++}total+=sim}\n      if(matched>=2&&(strong>=1||matched>=3))best=Math.max(best,total/Math.max(target.length,heard.length));\n    }\n    if(best>=0.58)scores.push({type,score:best});\n  }\n  scores.sort((a,b)=>b.score-a.score);\n  if(!scores.length||scores[1]&&scores[0].score-scores[1].score<0.12&&scores[0].type!==scores[1].type)return null;\n  return scores[0].type;\n}\nfunction __voiceIntent(raw,categories=[]){\n  const h=F(raw),r=ht(raw);\n  if(!h&&!r)return{type:'unknown',transcript:raw};\n  // Common Romanian ASR near-misses for 'alege subiect'.\n  if(/^(?:alegre|alege|alegeri|allege|alege?re)\\s+(?:sabiesc|subiesc|subiect|subiectul|subiec|subiecte)$/u.test(r))return{type:'chooseTopic',transcript:raw};\n  if(/^(?:schimba|schimbam|schimbati)\\s+(?:subiesc|subiect|subiectul|sabiesc)$/u.test(r))return{type:'nextCategory',transcript:raw};\n  // Android Romanian ASR sometimes renders 'următorul subiect' as 'un manual subiect'.\n  if(/^(?:un manual|urmatorul|urmato rul|urmatoru|urmatoare|un urmator)\\s+(?:subiect|subiectul|subiesc|sabiesc)$/u.test(r))return{type:'nextCategory',transcript:raw};\n  // Romanian ASR often splits urmatorul into 'un matual' or 'un manual'.\n  if(/^un\\s+(?:matual|manual|matural|matuel|matu al)\\s+(?:subiect|subiectul|subiesc|sabiesc)$/u.test(r))return{type:'nextCategory',transcript:raw};\n  if(/^(?:עצור|תעצור|הפסק|תפסיק|כבה|סיים)\\s+(?:את\\s+)?(?:הרצף הקולי|רצף קולי|התרגול הקולי|תרגול קולי|ההאזנה|מצב קולי)$/u.test(h)||/^(?:opreste|opriti|inchide|termina)(?:\\s+(?:modul vocal|exercitiul vocal|antrenamentul vocal|ascultarea|seria vocala|exercitiul))?$/u.test(r))return{type:'stopVoice',transcript:raw};\n  if(/^(?:בחר|תבחר|תבחרי)\\s+(?:(?:לי|את)\\s+)?(?:ה)?נושא$/u.test(h)||/^(?:alege|selecteaza)\\s+(?:(?:un|o)\\s+)?(?:subiect|subiectul|tema)$/u.test(r))return{type:'chooseTopic',transcript:raw};\n  if(/^(?:בחירה רגילה|בחר בחירה רגילה|בחירת מילים רגילה|מצב רגיל|בחר רגיל)$/u.test(h)||/^(?:selectie normala|alegere normala|mod normal|modul normal|selectie obisnuita)$/u.test(r))return{type:'regularMode',transcript:raw};\n  if(/^(?:כל המילים ברצף|כל המילים לפי הסדר|מילים ברצף|מילים לפי הסדר|בחר כל המילים ברצף|מצב רציף)$/u.test(h)||/^(?:toate cuvintele pe rand|toate cuvintele in ordine|cuvintele pe rand|cuvintele in ordine|mod secvential|modul secvential|selectie secventiala)$/u.test(r))return{type:'sequentialMode',transcript:raw};\n  if(__isNextCategorySpeech(raw))return{type:'nextCategory',transcript:raw};\n  if(/^(?:בחר|תבחר|תבחרי)\\s+(?:(?:לי|את)\\s+)?(?:ה)?נושא\\s+/u.test(h)||/^(?:alege|selecteaza)\\s+(?:(?:un|o)\\s+)?(?:subiectul|subiect|tema)\\s+/u.test(r)){\n    const cat=__spokenCategory(raw,categories);\n    return cat?{type:'selectCategory',category:cat,transcript:raw}:{type:'chooseTopic',transcript:raw};\n  }\n  const fuzzy=__fuzzyVoiceIntent(raw);if(fuzzy)return{type:fuzzy,transcript:raw};\n  return{type:'unknown',transcript:raw};\n}\nfunction mt(){return`אפשר לומר:"
  },
  {
    "description": "Use intent detector before Hebrew command parser",
    "find": "if(__isNextCategorySpeech(e))return{type:`nextCategory`,transcript:e};",
    "replacement": "let __intent=__voiceIntent(e,t);if(__intent.type!==`unknown`)return __intent;"
  },
  {
    "description": "Describe new speech options",
    "find": "אפשר לומר: תמשיך, עצור, דלג, עבור לנושא הבא, חזור על המילה, חזור על התשובה, בחר נושא, רשימת נושאים, סטטיסטיקה, או כבה הקשבה.",
    "replacement": "אפשר לומר: תמשיך, עצור את הרצף הקולי, בחר נושא ואז שם הנושא, עבור לנושא הבא, בחירה רגילה, כל המילים ברצף, דלג, חזור על המילה, חזור על התשובה, רשימת נושאים, סטטיסטיקה, או כבה הקשבה. ברומנית: alege subiect, oprește, selecție normală, toate cuvintele pe rând."
  },
  {
    "description": "Add topic dialogue and mode changes",
    "find": "},Jt=async(e,t)=>{",
    "replacement": "},\n__chooseTopic=async(session,phrase)=>{\n  await qt();\n  const language=/[\\u0590-\\u05FF]/u.test(phrase)?'he-IL':'ro-RO';\n  for(let turn=0;turn<4&&L(session);turn++){\n    const lang=turn%2===0?language:(language==='he-IL'?'ro-RO':'he-IL');\n    T(lang==='he-IL'?'מקשיב לשם הנושא בעברית':'Ascult numele subiectului');\n    await Nt(lang==='he-IL'?'איזה נושא לבחור?':'Ce subiect alegi?',lang,lang==='he-IL'?N.current.hebrewRate:N.current.romanianRate).catch(()=>{});\n    if(!L(session))return false;\n    try{\n      const heard=await Ft(opts=>st({...opts,language:lang,timeoutMs:13e3,maxAlternatives:5}),session);\n      if(!L(session))return false;\n      if(heard.some(item=>__voiceIntent(item.transcript,De.current).type==='stopVoice')){Qt();return false}\n      const name=heard.map(item=>__spokenCategory(item.transcript,De.current)).find(Boolean);\n      if(name){\n        await gt({category:name,weakWordsMode:!1});\n        __seqScope.current='';__seqLast.current=null;\n        S('נבחר נושא: '+name);\n        T('נבחר נושא: '+name);\n        await Nt('נבחר נושא '+name,'he-IL',N.current.hebrewRate).catch(()=>{});\n        return true;\n      }\n    }catch(err){\n      if(!L(session)||err.code==='aborted')return false;\n      if(!['no-speech','timeout','nomatch'].includes(err.code))T(err.message||'לא זוהה נושא');\n    }\n  }\n  if(L(session)){S('לא זוהה נושא. אמור בחר נושא כדי לנסות שוב.');await Nt('לא זיהיתי נושא','he-IL',N.current.hebrewRate).catch(()=>{})}\n  return false;\n},\n__doVoiceIntent=async(action,session)=>{\n  switch(action.type){\n    case 'stopVoice':await qt();Qt();return true;\n    case 'chooseTopic':await __chooseTopic(session,action.transcript||'');return true;\n    case 'selectCategory':\n      await qt();await gt({category:action.category,weakWordsMode:!1});\n      __seqScope.current='';__seqLast.current=null;\n      S('נבחר נושא: '+action.category);\n      await Nt('נבחר נושא '+action.category,'he-IL',N.current.hebrewRate).catch(()=>{});\n      return true;\n    case 'regularMode':\n    case 'sequentialMode':{\n      await qt();\n      const sequential=action.type==='sequentialMode';\n      await gt({weakWordsMode:!1,sequentialWordsMode:sequential,...(sequential?{wordSetMode:'all'}:{})});\n      __seqScope.current='';__seqLast.current=null;\n      S(sequential?'כל המילים ברצף':'בחירה רגילה');\n      await Nt(sequential?'כל המילים ברצף':'בחירה רגילה','he-IL',N.current.hebrewRate).catch(()=>{});\n      return true;\n    }\n    case 'nextCategory':await __nextCategory();return true;\n    default:return false;\n  }\n},Jt=async(e,t)=>{"
  },
  {
    "description": "Process spoken command before answer score",
    "find": "if(__spoken.some(__item=>__isNextCategorySpeech(__item.transcript))){let __changed=await __nextCategory();if(e===null&&__changed)await Ht();return{categoryChanged:!0}}",
    "replacement": "let __intent=__spoken.map(item=>__voiceIntent(item.transcript,De.current)).find(a=>a.type!==`unknown`);if(__intent){await __doVoiceIntent(__intent,e);return{categoryChanged:!0}}"
  },
  {
    "description": "Declare retry voice command result",
    "find": "if(o&&!o.correct&&N.current.retryIncorrectOnce){",
    "replacement": "let __second=null;if(o&&!o.correct&&N.current.retryIncorrectOnce){"
  },
  {
    "description": "Handle voice intent even during a second attempt",
    "find": "await Ut(e,{responseWindowMs:__responseWindow,adaptiveListening:a,maxListeningMs:2e4,speakResult:!1,speakTranslation:!0,throwOnFatal:!0,deferCycleCompletion:!0});if(!L(e))return}Bt()",
    "replacement": "__second=await Ut(e,{responseWindowMs:__responseWindow,adaptiveListening:a,maxListeningMs:2e4,speakResult:!1,speakTranslation:!0,throwOnFatal:!0,deferCycleCompletion:!0});if(!L(e))return;if(__second?.categoryChanged)continue}Bt()"
  },
  {
    "description": "Add stop and selection into Hebrew voice mode",
    "find": "case`nextCategory`:{ke.current=!1,ce(!1);let moved=await __nextCategory();if(moved){await Gt(t);return!1}return L(t)}",
    "replacement": "case`stopVoice`:await __doVoiceIntent(e,t);return!1;case`chooseTopic`:case`regularMode`:case`sequentialMode`:{await __doVoiceIntent(e,t);if(L(t))await Gt(t);return!1}case`nextCategory`:{ke.current=!1,ce(!1);let moved=await __nextCategory();if(moved){await Gt(t);return!1}return L(t)}"
  },
  {
    "description": "Show supported Romanian/Hebrew commands in practice",
    "find": "`נושא הבא: următorul subiect`].map",
    "replacement": "`נושא הבא: următorul subiect`,`בחר נושא: alege subiect`,`עצור: oprește`,`בחירה רגילה: selecție normală`,`כל המילים ברצף: toate cuvintele pe rând`].map"
  },
  {
    "description": "Explain bilingual commands in settings",
    "find": "אפשר לנסות גם „עבור לנושא הבא”, אך זיהוי עברית בזמן שהמיקרופון מוגדר לרומנית תלוי בדפדפן.",
    "replacement": "אפשר לומר „בחר נושא” / „alege subiect” ואז את שם הנושא; „עצור את הרצף הקולי” / „oprește”; „בחירה רגילה” / „selecție normală”; או „כל המילים ברצף” / „toate cuvintele pe rând”. בזמן תשובות ברומנית זיהוי פקודות בעברית תלוי בדפדפן. בחירת נושא מפעילה זיהוי בשתי השפות בתורות."
  }
];
for (const patch of bilingualVoicePatches) {
 const count = source.split(patch.find).length - 1;
 if (count !== 1) throw new Error(`Cannot apply ${patch.description}: expected 1, got ${count}`);
 source = source.replace(patch.find,patch.replacement);
}

// Prevent the running voice practice loop from cancelling command pronunciation.
// Nt normally aborts the previous utterance on every call.
const audioLockAnchor="Nt=async(e,t,n)=>{Ye(),await at(e,t,n)}";
if(source.split(audioLockAnchor).length!==2)throw new Error('Audio lock anchor changed');
source=source.replace(audioLockAnchor,"__guideAudioLocked=!1,Nt=async(e,t,n)=>{if(__guideAudioLocked)return;Ye();await at(e,t,n)}");

// Display bilingual voice commands directly beside the active listening controls.
// Make the visible command guide actionable. Reuse the same command executor as speech.
const clickableGuidePatches = [
  {
    description: "Add a safe click handler that pronounces the Romanian command before executing it",
    find: "},Jt=async(e,t)=>{",
    replacement: `},
__clickVoiceGuide=async(entry)=>{
  const types={'בחר נושא':'chooseTopic','עבור לנושא הבא':'nextCategory','עצור את הרצף הקולי':'stopVoice','בחירה רגילה':'regularMode','כל המילים ברצף':'sequentialMode'};
  const type=types[entry.he];
  if(!type)return;
  const session=ve.current;
  // Hold all competing practice audio until the command has fully finished.
  __guideAudioLocked=true;
  await qt();
  try{
    // Speak the command independently; do not start the topic announcement
    // until the browser reports the Romanian utterance has actually ended.
    if(window.speechSynthesis&&window.SpeechSynthesisUtterance){
      await new Promise(resolve=>{
        const synth=window.speechSynthesis;
        const utterance=new SpeechSynthesisUtterance(entry.ro);
        utterance.lang='ro-RO';
        utterance.rate=Math.max(0.65,Math.min(1.2,Number(N.current.romanianRate)||0.85));
        let finished=false;
        const done=()=>{if(finished)return;finished=true;clearTimeout(watchdog);resolve()};
        utterance.onend=done;
        utterance.onerror=done;
        const watchdog=setTimeout(done,12000);
        synth.cancel();
        synth.speak(utterance);
        // Mobile browsers can pause speech synthesis while the tab is inactive.
        try{synth.resume()}catch(_){}
      });
    }else{
      await Nt(entry.ro,'ro-RO',N.current.romanianRate);
    }
    // A full two-second pause AFTER speech, not from the moment it starts.
    await new Promise(resolve=>setTimeout(resolve,2000));
  }catch(err){console.warn('Romanian pronunciation unavailable',err);await new Promise(resolve=>setTimeout(resolve,2000))}
  __guideAudioLocked=false;
  if(type==='chooseTopic'&&!L(session)){S('הפעל רצף קולי כדי לבחור נושא בקול');return}
  await __doVoiceIntent({type,transcript:entry.he},session);
},
Jt=async(e,t)=>{`
  },
  {
    description: "Turn the guide rows into accessible action buttons",
    find: "(0,I.jsxs)(`div`,{className:`voice-command-pair`,children:[",
    replacement: "(0,I.jsxs)(`button`,{type:`button`,className:`voice-command-pair`,onClick:()=>__clickVoiceGuide(entry),title:`השמע ברומנית והפעל: ${entry.he}`,style:{cursor:`pointer`,font:`inherit`,width:`100%`,textAlign:`inherit`},children:["
  }
];
const voiceGuidePatches = [
  {
    "description": "Show all supported bilingual spoken commands on the practice screen",
    "find": "ae&&(0,I.jsx)(`div`,{className:`command-strip`",
    "replacement": "(0,I.jsxs)(`div`,{className:`voice-commands-guide`,children:[\n(0,I.jsx)(`strong`,{className:`voice-commands-title`,children:`🎙️ פקודות שאפשר לומר בזמן התרגול`}),\n(0,I.jsx)(`p`,{className:`voice-commands-lead`,children:`אפשר לומר אחת מהפקודות בעברית או ברומנית כשהאפליקציה מקשיבה לתשובה:`}),\n(0,I.jsx)(`div`,{className:`voice-commands-grid`,children:[\n{he:`בחר נושא`,ro:`Alege subiect`},\n{he:`עבור לנושא הבא`,ro:`Următorul subiect`},\n{he:`עצור את הרצף הקולי`,ro:`Oprește`},\n{he:`בחירה רגילה`,ro:`Selecție normală`},\n{he:`כל המילים ברצף`,ro:`Toate cuvintele pe rând`}\n].map(entry=>(0,I.jsxs)(`div`,{className:`voice-command-pair`,children:[\n(0,I.jsx)(`span`,{className:`voice-command-he`,dir:`rtl`,children:entry.he}),\n(0,I.jsx)(`span`,{className:`voice-command-ro`,dir:`ltr`,lang:`ro`,children:entry.ro})\n]},entry.he))}),\n(0,I.jsx)(`p`,{className:`voice-commands-note`,children:`אחרי ״בחר נושא״ אמרו את שם הנושא, למשל ״משפחה״ / „Familie” או ״אוכל״ / „Mâncare”. בזמן ההאזנה לתשובה ברומנית עדיף להשתמש בפקודות ברומנית.`})\n]}),ae&&(0,I.jsx)(`div`,{className:`command-strip`"
  },
  {
    "description": "Keep the narrow spoken word flow strip focused on progress, instead of repeating commands",
    "find": ",`נושא הבא: următorul subiect`,`בחר נושא: alege subiect`,`עצור: oprește`,`בחירה רגילה: selecție normală`,`כל המילים ברצף: toate cuvintele pe rând`].map",
    "replacement": "].map"
  }
];
for (const patch of voiceGuidePatches) {
  const count = source.split(patch.find).length - 1;
  if (count !== 1) throw new Error(`Could not apply ${patch.description}; found ${count} matches`);
  source = source.replace(patch.find,patch.replacement);
}

for (const patch of clickableGuidePatches) {
 const count=source.split(patch.find).length-1;
 if(count!==1)throw new Error('Cannot add clickable commands: '+patch.description+' ('+count+')');
 source=source.replace(patch.find,patch.replacement);
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
