export const LESSON_LEVELS = [
  {
    level: 1,
    progressPercent: 0,
    bubbles: [
      'I Platons historie sidder en gruppe mennesker i en mørk hule. De er bundet fast og kan kun se skygger på væggen foran dem.',
      'De har aldrig set andet. Skyggerne er det eneste de kender, og derfor tror de at skyggerne er den virkelige verden.',
      'Tænk over det: hvis du aldrig havde set andet end skygger, ville du så vide at der fandtes en virkelighed bag dem?',
    ],
  },
  {
    level: 2,
    progressPercent: 14,
    bubbles: [
      'En dag river en huleboer sig løs og kæmper sig ud af hulen. Udenfor ser han naturen, solen og den virkelige verden for første gang.',
      'Han er chokeret over hvor smuk og ægte alt er sammenlignet med skyggerne derinde.',
      'Tænk på det som at spille et spil i mange år og så pludselig prøve det i virkeligheden. En der kun har spillet fodbold på PlayStation og så prøver at spille en rigtig kamp.',
    ],
  },
  {
    level: 3,
    progressPercent: 29,
    bubbles: [
      'Manden der kom ud af hulen ville gerne fortælle de andre om alt det fantastiske han havde set. Men da han gik tilbage, troede ingen på ham.',
      'Huleboerne pegede på væggen og sagde: det vi ser her, det er virkelighed. De kendte ikke til noget andet og ville ikke ændre mening.',
      'Kender du det fra din hverdag? Har du nogensinde prøvet at fortælle nogen noget de ikke ville tro på?',
    ],
  },
  {
    level: 4,
    progressPercent: 43,
    bubbles: [
      'Manden der kom ud af hulen var den eneste der vidste at der fandtes noget bedre end skygger. De andre huleboere syntes han var mærkelig og til sidst farlig. De ville ikke høre på ham.',
      'Det kræver faktisk en del mod at sige noget som de fleste ikke tror på, eller at stille spørgsmål som ingen andre stiller. Filosoffer som Platon og hans lærer Sokrates gjorde netop det.',
    ],
  },
  {
    level: 5,
    progressPercent: 57,
    bubbles: [
      'Platon mente at der er to slags verden. Den ene verden er den vi kan se og røre ved, altså alt det vi møder i hverdagen.',
      'Den anden verden er den perfekte og ægte version af tingene, som kun fornuften og tankerne kan nå frem til.',
      'Tænk på det sådan her: en tegning af en hund og en rigtig hund. Tegningen er en kopi. Den rigtige hund er originalen.',
    ],
  },
  {
    level: 6,
    progressPercent: 71,
    bubbles: [
      'Forestil dig at du sidder i en biograf og ser en film om havet. Det ser flot ud. Men det er ikke det samme som at stå ved havet og mærke vinden, lugten og lyden af bølgerne. Filmen er god, men den er bare en kopi.',
      'Platon mente at hele vores liv er lidt ligesom at sidde i biografen. Vi oplever kopier af virkeligheden, men den dybeste sandhed kræver at vi tænker selv og stiller spørgsmål.',
    ],
  },
  {
    level: 7,
    progressPercent: 86,
    bubbles: [
      'Nu har du lært om Platons hulelignelse. En mand kæmpede sig fri af en hule fuld af skygger og opdagede den virkelige verden.',
      'Da han forsøgte at dele sin viden, ville ingen tro på ham.',
      'Platon fortalte denne historie for at sige noget om os alle sammen. Vi er alle huleboere på en måde. Vi tror vi kender verden, men måske er der meget mere vi endnu ikke har opdaget.',
    ],
  },
];

export const QUIZ_QUESTIONS = [
  {
    question: 'Hvad fortæller huleboernes situation os om mennesker generelt?',
    options: [
      'At mennesker er dumme',
      'At huler er farlige steder at bo',
      'Vi tror på det, vi kender.',
      'At man altid skal sidde med ryggen mod væggen',
    ],
    correct: 2,
  },
  {
    question: 'Hvad siger Platon om mennesker der ikke vil lytte?',
    options: [
      'Det er svært at se verden på en ny måde, hvis man kun kender én måde.',
      'At de er onde',
      'At de er bange for det mørke',
      'At de burde læse flere bøger',
    ],
    correct: 0,
  },
  {
    question: 'Hvad er Platons pointe med de to verdener?',
    options: [
      'At tegninger er ubrugelige',
      'At det vi ser i hverdagen kun er kopier af noget ægte',
      'At dyr er vigtigere end kunst',
      'At man skal have en rigtig hund og ikke bare et billede',
    ],
    correct: 1,
  },
  {
    question: 'Hvad kan du gøre for at komme tættere på sandheden ifølge Platon?',
    options: [
      'Se flere film og læse mere',
      'Rejse til havet',
      'Lukke øjnene og lytte',
      'Tænke selv og stille spørgsmål frem for bare at acceptere det du ser',
    ],
    correct: 3,
  },
  {
    question: 'Hvad kræver det ifølge Platon at søge sandheden?',
    options: [
      'At man er meget klog og har læst mange bøger',
      'At man har de rigtige venner',
      'Mod til at stille spørgsmål og tænke selv, selvom andre ikke forstår det',
      'At man er god til matematik',
    ],
    correct: 2,
  },
  {
    question: 'Hvad fortæller huleboernes situation os om mennesker generelt?',
    options: [
      'Naturen er smukkere end huler',
      'Man skal ikke sidde indenfor for længe',
      'Lys er godt for øjnene',
      'Den virkelige verden er smukkere end skygger',
    ],
    correct: 3,
  },
  {
    question: 'Hvad er den vigtigste lektie fra Platons hulelignelse?',
    options: [
      'At huler er farlige steder',
      'At man altid skal gøre hvad de andre gør',
      'At det er vigtigt at turde tænke selv og stille spørgsmål',
      'At filosoffer altid har ret',
    ],
    correct: 2,
  },
];

export const CHARACTERS = [
  { id: 'dog', label: 'Hund', emoji: '🐶' },
  { id: 'gingerbread', label: 'Peberkage', emoji: '🍪' },
  { id: 'owl', label: 'Ugle', emoji: '🦉' },
  { id: 'caveboy', label: 'Huleboer', emoji: '🧒' },
  { id: 'unicorn', label: 'Enhjørning', emoji: '🦄' },
  { id: 'compass', label: 'Kompas', emoji: '🧭' },
];

export const CHAPTERS = [
  { id: 'cave', title: 'Vejen op fra hulens mørke', active: true, colors: ['#0D1B3E', '#1A3560', '#2D5A8E'] },
  { id: 'akademi', title: 'Platons Akademi', active: false, colors: ['#1A3A1A', '#2D6B2D', '#3A8A3A'] },
  { id: 'eternal', title: 'Det evige', active: false, colors: ['#3A2A0A', '#6A4A10', '#8A6A20'] },
  { id: 'ideas', title: 'Ideernes verden', active: false, colors: ['#0A2A3A', '#1A4A6A', '#2A6A8A'] },
  { id: 'soul', title: 'En udødelig sjæl', active: false, colors: ['#2A0A3A', '#4A1A6A', '#6A2A8A'] },
  { id: 'knowledge', title: 'Sikker viden', active: false, colors: ['#1A2A0A', '#2A4A10', '#3A6A20'] },
  { id: 'state', title: 'Filosofistaten', active: false, colors: ['#2A1A0A', '#4A2A10', '#6A3A20'] },
];

export const SCOREBOARD = [
  { username: 'xXDarkWolfXx', xp: 360 },
  { username: 'NinjaKat2014', xp: 280 },
  { username: 'ProGamer_Luca', xp: 280 },
  { username: 'MinecraftKing7', xp: 240 },
  { username: 'CoolDragon99', xp: 200 },
];

export const FRIENDS = [
  { username: 'CoolDragon99', xp: 200, emoji: '🐱' },
  { username: 'NinjaKat2014', xp: 280, emoji: '🐶' },
  { username: 'ProGamer_Luca', xp: 280, emoji: '🦊' },
  { username: 'xXDarkWolfXx', xp: 360, emoji: '🐺' },
];

export const INVITE_USERS = [
  { username: 'SuperSofie123', emoji: '🍪' },
  { username: 'GamerPigen_Fre', emoji: '🦉' },
  { username: 'NoobSlayer2000', emoji: '🧒' },
];

export const FRIEND_REQUESTS_DATA = [
  { username: 'PizzaLover_Max', emoji: '🐶' },
  { username: 'LegendaryHero77', emoji: '🐶' },
  { username: 'SkateKing_Noah', emoji: '🐶' },
];
