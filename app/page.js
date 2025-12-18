"use client";

import React, { useState } from 'react';

// ============================================
// HARDCODED DATA
// ============================================

const CAREER_OPTIONS = [
  {
    id: 'hr-adviseur',
    name: 'HR-adviseur',
    sector: 'Zakelijke dienstverlening',
    description: 'Adviseren over personeelszaken, begeleiding van medewerkers, werving & selectie ondersteunen.',
    requiredSkills: ['organizing', 'communicating', 'advising'],
    preferredSkills: ['analyzing', 'presenting'],
    energyMatch: ['helping_people', 'structure'],
    salaryEntry: [2600, 3000],
    salaryMid: [3200, 3800],
    salarySenior: [4000, 4800],
    salarySource: 'CBS StatLine 2023, sector Zakelijke dienstverlening',
    stressScore: 2,
    stressFactors: { deadlines: 2, clientContact: 3, responsibility: 2, unpredictability: 2 },
    stressExplanation: 'Regelmatige werkdruk met af en toe pieken rond reorganisaties of werving.',
    aiRiskScore: 2,
    aiAnalysis: { routinePercentage: 35, judgmentPercentage: 65, trend: 'augmentation', explanation: 'AI gaat administratieve HR-taken overnemen. Gesprekken en adviseren blijft mensenwerk.' },
    requirements: [],
    recommendations: ['SHRM certificering', 'Coaching opleiding'],
    remoteOption: 'partial',
    schedule: 'office',
    growthPotential: 'medium',
    marketDemand: 'high'
  },
  {
    id: 'projectmanager',
    name: 'Projectmanager',
    sector: 'IT / Zakelijke dienstverlening',
    description: 'Projecten coördineren, teams aansturen, budget en planning bewaken.',
    requiredSkills: ['organizing', 'communicating', 'leading'],
    preferredSkills: ['analyzing', 'technical'],
    energyMatch: ['problem_solving', 'variety', 'structure'],
    salaryEntry: [3000, 3500],
    salaryMid: [3800, 4500],
    salarySenior: [4500, 6000],
    salarySource: 'CBS StatLine 2023, sector Informatie en communicatie',
    stressScore: 3,
    stressFactors: { deadlines: 4, clientContact: 4, responsibility: 4, unpredictability: 3 },
    stressExplanation: 'Pieken rond deadlines. Je bent verantwoordelijk voor resultaat van anderen.',
    aiRiskScore: 2,
    aiAnalysis: { routinePercentage: 30, judgmentPercentage: 70, trend: 'augmentation', explanation: 'AI helpt met planning en rapportages. Mensen aansturen blijft mensenwerk.' },
    requirements: [],
    recommendations: ['PRINCE2 Foundation', 'Agile/Scrum certificering'],
    remoteOption: 'partial',
    schedule: 'office',
    growthPotential: 'high',
    marketDemand: 'high'
  },
  {
    id: 'data-analyst',
    name: 'Data Analyst',
    sector: 'IT / Diverse sectoren',
    description: 'Data verzamelen, analyseren en visualiseren. Inzichten vertalen naar adviezen.',
    requiredSkills: ['analyzing', 'technical'],
    preferredSkills: ['communicating', 'presenting'],
    energyMatch: ['problem_solving', 'expertise', 'creating'],
    salaryEntry: [2800, 3300],
    salaryMid: [3500, 4200],
    salarySenior: [4500, 5500],
    salarySource: 'CBS StatLine 2023, sector Informatie en communicatie',
    stressScore: 2,
    stressFactors: { deadlines: 3, clientContact: 2, responsibility: 3, unpredictability: 2 },
    stressExplanation: 'Projectmatige druk, maar vaak goed planbaar.',
    aiRiskScore: 3,
    aiAnalysis: { routinePercentage: 45, judgmentPercentage: 55, trend: 'transformation', explanation: 'AI verandert dit vak snel. De toekomst ligt in complexe vraagstukken en storytelling.' },
    requirements: [],
    recommendations: ['SQL kennis', 'Python of R basis', 'Power BI / Tableau'],
    remoteOption: 'full',
    schedule: 'office',
    growthPotential: 'high',
    marketDemand: 'high'
  },
  {
    id: 'accountmanager',
    name: 'Accountmanager',
    sector: 'Zakelijke dienstverlening / Sales',
    description: 'Klantrelaties onderhouden, nieuwe business genereren, onderhandelen.',
    requiredSkills: ['communicating', 'sales', 'advising'],
    preferredSkills: ['organizing', 'presenting'],
    energyMatch: ['helping_people', 'variety', 'problem_solving'],
    salaryEntry: [2800, 3200],
    salaryMid: [3500, 4500],
    salarySenior: [4500, 7000],
    salarySource: 'CBS StatLine 2023, inclusief variabele beloning',
    stressScore: 4,
    stressFactors: { deadlines: 4, clientContact: 5, responsibility: 4, unpredictability: 4 },
    stressExplanation: 'Targets en commissiedruk. Hoge highs, stress als het achterblijft.',
    aiRiskScore: 2,
    aiAnalysis: { routinePercentage: 25, judgmentPercentage: 75, trend: 'augmentation', explanation: 'Relaties bouwen en onderhandelen blijft mensenwerk.' },
    requirements: ['drivers_license'],
    recommendations: ['NIMA Sales certificering'],
    remoteOption: 'partial',
    schedule: 'flexible',
    growthPotential: 'high',
    marketDemand: 'high'
  },
  {
    id: 'ux-designer',
    name: 'UX Designer',
    sector: 'IT / Design',
    description: 'Gebruikerservaring ontwerpen, interfaces prototypen, gebruikersonderzoek.',
    requiredSkills: ['creating', 'analyzing', 'communicating'],
    preferredSkills: ['technical', 'presenting'],
    energyMatch: ['creating', 'problem_solving', 'helping_people'],
    salaryEntry: [2600, 3200],
    salaryMid: [3400, 4200],
    salarySenior: [4200, 5500],
    salarySource: 'Glassdoor/Indeed indicatie 2023, NL markt',
    stressScore: 2,
    stressFactors: { deadlines: 3, clientContact: 3, responsibility: 2, unpredictability: 2 },
    stressExplanation: 'Creatief werk met projectdeadlines. Over het algemeen goed planbaar.',
    aiRiskScore: 3,
    aiAnalysis: { routinePercentage: 40, judgmentPercentage: 60, trend: 'transformation', explanation: 'AI genereert ontwerpen. UX blijft waardevol door onderzoek en strategie.' },
    requirements: [],
    recommendations: ['Figma beheersing', 'UX certificering'],
    remoteOption: 'full',
    schedule: 'office',
    growthPotential: 'medium',
    marketDemand: 'medium'
  },
  {
    id: 'zorg-coordinator',
    name: 'Zorgcoördinator',
    sector: 'Zorg & Welzijn',
    description: 'Zorg organiseren voor cliënten, roosters maken, afstemmen met zorgverleners.',
    requiredSkills: ['organizing', 'communicating', 'advising'],
    preferredSkills: ['leading'],
    energyMatch: ['helping_people', 'structure', 'variety'],
    salaryEntry: [2600, 3000],
    salaryMid: [3100, 3600],
    salarySenior: [3500, 4200],
    salarySource: 'CAO VVT 2023, FWG 50-55',
    stressScore: 3,
    stressFactors: { deadlines: 3, clientContact: 4, responsibility: 4, unpredictability: 4 },
    stressExplanation: 'Veel ballen in de lucht. Emotioneel betrokken bij cliënten.',
    aiRiskScore: 1,
    aiAnalysis: { routinePercentage: 20, judgmentPercentage: 80, trend: 'augmentation', explanation: 'Zorgcoördinatie is mensenwerk. AI helpt met roostering en administratie.' },
    requirements: ['mbo4_health'],
    recommendations: ['HBO-V of zorgmanagement opleiding'],
    remoteOption: 'none',
    schedule: 'office',
    growthPotential: 'medium',
    marketDemand: 'high'
  },
  {
    id: 'marketing-specialist',
    name: 'Marketing Specialist',
    sector: 'Marketing & Communicatie',
    description: 'Marketingcampagnes opzetten, content creëren, resultaten analyseren.',
    requiredSkills: ['creating', 'communicating', 'analyzing'],
    preferredSkills: ['technical', 'organizing'],
    energyMatch: ['creating', 'variety', 'problem_solving'],
    salaryEntry: [2500, 3000],
    salaryMid: [3200, 4000],
    salarySenior: [4000, 5000],
    salarySource: 'CBS StatLine 2023',
    stressScore: 3,
    stressFactors: { deadlines: 4, clientContact: 3, responsibility: 3, unpredictability: 3 },
    stressExplanation: 'Campagnedeadlines en lanceerdruk. Resultaten worden gemeten.',
    aiRiskScore: 4,
    aiAnalysis: { routinePercentage: 55, judgmentPercentage: 45, trend: 'transformation', explanation: 'AI schrijft copy en maakt visuals. Rol verschuift naar strategie.' },
    requirements: [],
    recommendations: ['Google Analytics', 'HubSpot certificering'],
    remoteOption: 'partial',
    schedule: 'office',
    growthPotential: 'medium',
    marketDemand: 'medium'
  },
  {
    id: 'technisch-specialist',
    name: 'Technisch Specialist / Monteur',
    sector: 'Techniek / Installatie',
    description: 'Installaties monteren, onderhouden en repareren. Storingen oplossen.',
    requiredSkills: ['technical'],
    preferredSkills: ['communicating', 'organizing'],
    energyMatch: ['problem_solving', 'creating', 'variety'],
    salaryEntry: [2400, 2900],
    salaryMid: [3000, 3600],
    salarySenior: [3600, 4500],
    salarySource: 'CBS StatLine 2023, sector Installatie',
    stressScore: 2,
    stressFactors: { deadlines: 3, clientContact: 3, responsibility: 3, unpredictability: 3 },
    stressExplanation: 'Fysiek werk, soms onder tijdsdruk. Voldoening van tastbaar resultaat.',
    aiRiskScore: 1,
    aiAnalysis: { routinePercentage: 15, judgmentPercentage: 85, trend: 'augmentation', explanation: 'Handenwerk is moeilijk te automatiseren. Vraag blijft groot.' },
    requirements: ['drivers_license'],
    recommendations: ['VCA certificaat', 'Specialisatie warmtepomp/zonnepanelen'],
    remoteOption: 'none',
    schedule: 'flexible',
    growthPotential: 'high',
    marketDemand: 'high'
  }
];

const SKILLS_OPTIONS = [
  { id: 'analyzing', label: 'Analyseren / met cijfers werken', icon: '📊' },
  { id: 'communicating', label: 'Schrijven / communiceren', icon: '✍️' },
  { id: 'sales', label: 'Klantcontact / verkoop', icon: '🤝' },
  { id: 'organizing', label: 'Organiseren / coördineren', icon: '📋' },
  { id: 'technical', label: 'Technisch / hands-on werk', icon: '🔧' },
  { id: 'creating', label: 'Creëren / ontwerpen', icon: '🎨' },
  { id: 'leading', label: 'Leidinggeven', icon: '👥' },
  { id: 'advising', label: 'Adviseren / coachen', icon: '💡' }
];

const ENERGY_OPTIONS = [
  { id: 'helping_people', label: 'Mensen helpen', icon: '❤️' },
  { id: 'problem_solving', label: 'Problemen oplossen', icon: '🧩' },
  { id: 'creating', label: 'Iets maken / creëren', icon: '✨' },
  { id: 'structure', label: 'Structuur & overzicht', icon: '📐' },
  { id: 'variety', label: 'Afwisseling & dynamiek', icon: '🔄' },
  { id: 'expertise', label: 'Verdieping & expertise', icon: '🎯' }
];

const VALUES_OPTIONS = [
  { id: 'security', label: 'Zekerheid', desc: 'Vast contract, stabiele sector' },
  { id: 'income', label: 'Inkomen', desc: 'Hoog salaris en groei' },
  { id: 'autonomy', label: 'Autonomie', desc: 'Zelf bepalen hoe en wanneer' },
  { id: 'meaning', label: 'Betekenis', desc: 'Bijdragen aan iets groters' },
  { id: 'status', label: 'Status', desc: 'Erkende functie, aanzien' },
  { id: 'balance', label: 'Balans', desc: 'Werk past om je leven heen' }
];

const EDUCATION_LEVELS = [
  { id: 'vmbo', label: 'VMBO', level: 1 },
  { id: 'havo', label: 'HAVO', level: 2 },
  { id: 'vwo', label: 'VWO', level: 2 },
  { id: 'mbo', label: 'MBO', level: 3 },
  { id: 'hbo', label: 'HBO', level: 4 },
  { id: 'wo_bachelor', label: 'WO Bachelor', level: 5 },
  { id: 'wo_master', label: 'WO Master', level: 6 }
];

const SECTORS = [
  'Zakelijke dienstverlening', 'IT / Tech', 'Zorg & Welzijn', 'Onderwijs',
  'Overheid', 'Financiële dienstverlening', 'Retail / Horeca',
  'Industrie / Productie', 'Transport & Logistiek', 'Bouw / Techniek',
  'Marketing / Communicatie', 'Anders'
];

// ============================================
// SCORING FUNCTIONS
// ============================================

function calculateMatchScore(profile, career) {
  const userSkills = new Set(profile.skills);
  const requiredSkills = new Set(career.requiredSkills);
  const preferredSkills = new Set(career.preferredSkills);
  
  const requiredOverlap = [...requiredSkills].filter(s => userSkills.has(s)).length / requiredSkills.size;
  const preferredOverlap = preferredSkills.size > 0 
    ? [...preferredSkills].filter(s => userSkills.has(s)).length / preferredSkills.size : 0;
  const skillScore = (requiredOverlap * 0.7 + preferredOverlap * 0.3) * 100;

  const userEnergy = new Set(profile.energy);
  const careerEnergy = new Set(career.energyMatch);
  const energyOverlap = careerEnergy.size > 0 
    ? [...careerEnergy].filter(e => userEnergy.has(e)).length / careerEnergy.size : 0;
  const energyScore = energyOverlap * 100;

  let valuesScore = 50;
  if (profile.values.includes('security') && career.marketDemand === 'high') valuesScore += 15;
  if (profile.values.includes('income') && career.salaryMid[1] > 4000) valuesScore += 15;
  if (profile.values.includes('autonomy') && career.remoteOption !== 'none') valuesScore += 15;
  if (profile.values.includes('balance') && career.stressScore <= 2) valuesScore += 15;
  valuesScore = Math.min(valuesScore, 100);

  return Math.round(skillScore * 0.4 + energyScore * 0.3 + valuesScore * 0.3);
}

function calculateConstraintScore(profile, career) {
  let score = 100;
  const issues = [];

  if (career.salaryEntry[1] < profile.minSalary) {
    const gap = profile.minSalary - career.salaryEntry[1];
    if (gap > 500) {
      score -= 50;
      issues.push(`Startsalaris ligt onder je minimum`);
    } else {
      score -= 20;
      issues.push(`Startsalaris zit krap`);
    }
  }

  if (profile.remotePreference === 'required' && career.remoteOption === 'none') {
    score -= 40;
    issues.push('Thuiswerken niet mogelijk');
  }

  if (career.requirements.includes('drivers_license') && !profile.hasDriversLicense) {
    score -= 30;
    issues.push('Rijbewijs vereist');
  }

  return { score: Math.max(0, score), issues };
}

function calculateRealismScore(profile, career) {
  let score = 70;
  if (profile.yearsExperience >= 3) score += 10;
  if (profile.yearsExperience >= 7) score += 5;
  if (career.marketDemand === 'high') score += 10;
  if (career.marketDemand === 'low') score -= 15;
  if (career.requirements.length > 0) score -= 10;
  return Math.min(100, Math.max(0, score));
}

function scoreAndRankCareers(profile) {
  const scored = CAREER_OPTIONS.map(career => {
    const matchScore = calculateMatchScore(profile, career);
    const constraintResult = calculateConstraintScore(profile, career);
    const realismScore = calculateRealismScore(profile, career);
    const totalScore = matchScore * 0.4 + constraintResult.score * 0.3 + realismScore * 0.3;
    
    return { career, matchScore, constraintScore: constraintResult.score, 
             constraintIssues: constraintResult.issues, realismScore, totalScore };
  }).filter(item => item.constraintScore > 20);

  const sortedByRealism = [...scored].sort((a, b) => (b.realismScore + b.constraintScore) - (a.realismScore + a.constraintScore));
  const sortedByBalance = [...scored].sort((a, b) => b.totalScore - a.totalScore);
  const sortedByGrowth = [...scored].sort((a, b) => {
    const aGrowth = a.career.salaryMid[1] + (a.career.growthPotential === 'high' ? 1000 : 0);
    const bGrowth = b.career.salaryMid[1] + (b.career.growthPotential === 'high' ? 1000 : 0);
    return bGrowth - aGrowth;
  });

  const routeA = sortedByRealism[0];
  let routeB = sortedByBalance.find(item => item.career.id !== routeA?.career.id);
  let routeC = sortedByGrowth.find(item => item.career.id !== routeA?.career.id && item.career.id !== routeB?.career.id);

  if (!routeB) routeB = sortedByBalance[1] || sortedByRealism[1];
  if (!routeC) routeC = sortedByGrowth[2] || sortedByBalance[2];

  return { A: routeA, B: routeB, C: routeC };
}

// ============================================
// COMPONENTS
// ============================================

function StressBar({ score }) {
  const labels = ['', 'Laag', 'Laag-gem', 'Gemiddeld', 'Gem-hoog', 'Hoog'];
  return (
    <div className="flex items-center gap-2">
      <div className="flex gap-0.5">
        {[1,2,3,4,5].map(i => (
          <div key={i} className={`w-3 h-4 rounded-sm ${i <= score ? 'bg-amber-500' : 'bg-gray-200'}`} />
        ))}
      </div>
      <span className="text-sm text-slate-600">{labels[score]}</span>
    </div>
  );
}

function AIRiskBar({ score }) {
  const labels = ['', 'Laag', 'Laag-gem', 'Gemiddeld', 'Gem-hoog', 'Hoog'];
  const colors = ['', 'bg-green-500', 'bg-green-400', 'bg-yellow-500', 'bg-orange-500', 'bg-red-500'];
  return (
    <div className="flex items-center gap-2">
      <div className="flex gap-0.5">
        {[1,2,3,4,5].map(i => (
          <div key={i} className={`w-3 h-4 rounded-sm ${i <= score ? colors[score] : 'bg-gray-200'}`} />
        ))}
      </div>
      <span className="text-sm text-slate-600">{labels[score]}</span>
    </div>
  );
}

function ProgressBar({ step, total }) {
  return (
    <div className="w-full">
      <div className="flex justify-between text-sm text-slate-500 mb-1">
        <span>Stap {step} van {total}</span>
        <span>{Math.round((step / total) * 100)}%</span>
      </div>
      <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
        <div className="h-full bg-blue-600 transition-all duration-300" style={{ width: `${(step / total) * 100}%` }} />
      </div>
    </div>
  );
}

function LandingPage({ onStart }) {
  return (
    <div className="min-h-screen bg-stone-50 flex flex-col">
      <header className="p-4 border-b border-gray-200 bg-white">
        <div className="max-w-4xl mx-auto flex justify-between items-center">
          <h1 className="text-xl font-semibold text-slate-800">SwitchCoach</h1>
        </div>
      </header>
      <main className="flex-1 flex items-center justify-center p-6">
        <div className="max-w-2xl text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-slate-800 mb-6">Kies. Niet gokken.</h2>
          <p className="text-xl text-slate-600 mb-8">
            Je krijgt 3 concrete carrière-opties met eerlijke trade-offs.<br />
            Geen vage inspiratie. In 2 minuten weet je waar je aan toe bent.
          </p>
          <button onClick={onStart} className="bg-blue-800 hover:bg-blue-900 text-white px-8 py-4 rounded-lg text-lg font-medium transition-colors">
            Start intake →
          </button>
          <div className="mt-16 grid md:grid-cols-3 gap-6 text-left">
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
              <div className="text-2xl mb-2">📊</div>
              <h3 className="font-semibold text-slate-800 mb-1">Salarisranges met bronnen</h3>
              <p className="text-sm text-slate-500">Gebaseerd op CBS en UWV data.</p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
              <div className="text-2xl mb-2">⚡</div>
              <h3 className="font-semibold text-slate-800 mb-1">Werkdruk per rol</h3>
              <p className="text-sm text-slate-500">Je weet vooraf wat je te wachten staat.</p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
              <div className="text-2xl mb-2">🤖</div>
              <h3 className="font-semibold text-slate-800 mb-1">AI-risico eerlijk beoordeeld</h3>
              <p className="text-sm text-slate-500">Welke banen veranderen, welke blijven.</p>
            </div>
          </div>
        </div>
      </main>
      <footer className="p-4 border-t border-gray-200 bg-white">
        <div className="max-w-4xl mx-auto text-center text-sm text-slate-500">
          Bronnen: CBS, UWV, Beroepeninfo
        </div>
      </footer>
    </div>
  );
}

function IntakeWizard({ onComplete, onBack }) {
  const [step, setStep] = useState(1);
  const [profile, setProfile] = useState({
    education: 'hbo', yearsExperience: 5, sector: 'Zakelijke dienstverlening',
    skills: [], energy: [], minSalary: 2500, remotePreference: 'partial',
    values: [], hasDriversLicense: true
  });

  const totalSteps = 5;
  const updateProfile = (key, value) => setProfile(prev => ({ ...prev, [key]: value }));
  const toggleArrayItem = (key, item) => {
    setProfile(prev => {
      const arr = prev[key];
      return { ...prev, [key]: arr.includes(item) ? arr.filter(i => i !== item) : [...arr, item] };
    });
  };

  const nextStep = () => step < totalSteps ? setStep(step + 1) : onComplete(profile);
  const prevStep = () => step > 1 ? setStep(step - 1) : onBack();

  return (
    <div className="min-h-screen bg-stone-50 flex flex-col">
      <header className="p-4 border-b border-gray-200 bg-white">
        <div className="max-w-2xl mx-auto flex justify-between items-center">
          <h1 className="text-xl font-semibold text-slate-800">SwitchCoach</h1>
          <button onClick={onBack} className="text-slate-500 hover:text-slate-700">✕</button>
        </div>
      </header>
      <div className="p-4 bg-white border-b border-gray-200">
        <div className="max-w-2xl mx-auto"><ProgressBar step={step} total={totalSteps} /></div>
      </div>
      <main className="flex-1 p-6">
        <div className="max-w-2xl mx-auto">
          {step === 1 && (
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-bold text-slate-800 mb-2">Eerst de basis.</h2>
                <p className="text-slate-500">Dit bepaalt welke overstappen realistisch zijn.</p>
              </div>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Hoogste opleiding</label>
                  <select value={profile.education} onChange={(e) => updateProfile('education', e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-lg">
                    {EDUCATION_LEVELS.map(edu => <option key={edu.id} value={edu.id}>{edu.label}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Jaren werkervaring: <span className="font-bold">{profile.yearsExperience}</span>
                  </label>
                  <input type="range" min="0" max="30" value={profile.yearsExperience}
                    onChange={(e) => updateProfile('yearsExperience', parseInt(e.target.value))} className="w-full" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Huidige sector</label>
                  <select value={profile.sector} onChange={(e) => updateProfile('sector', e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-lg">
                    {SECTORS.map(s => <option key={s} value={s}>{s}</option>)}
                  </select>
                </div>
              </div>
            </div>
          )}
          {step === 2 && (
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-bold text-slate-800 mb-2">Wat doe je het meest?</h2>
                <p className="text-slate-500">Kies maximaal 5 vaardigheden.</p>
              </div>
              <div className="grid gap-3">
                {SKILLS_OPTIONS.map(skill => (
                  <button key={skill.id} onClick={() => (profile.skills.length < 5 || profile.skills.includes(skill.id)) && toggleArrayItem('skills', skill.id)}
                    className={`p-4 rounded-lg border text-left flex items-center gap-3 ${profile.skills.includes(skill.id) ? 'border-blue-500 bg-blue-50' : 'border-gray-200 bg-white hover:border-gray-300'}`}>
                    <span className="text-xl">{skill.icon}</span>
                    <span>{skill.label}</span>
                    {profile.skills.includes(skill.id) && <span className="ml-auto">✓</span>}
                  </button>
                ))}
              </div>
            </div>
          )}
          {step === 3 && (
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-bold text-slate-800 mb-2">Waar krijg je energie van?</h2>
                <p className="text-slate-500">Kies 2 of 3.</p>
              </div>
              <div className="grid gap-3">
                {ENERGY_OPTIONS.map(item => (
                  <button key={item.id} onClick={() => toggleArrayItem('energy', item.id)}
                    className={`p-4 rounded-lg border text-left flex items-center gap-3 ${profile.energy.includes(item.id) ? 'border-blue-500 bg-blue-50' : 'border-gray-200 bg-white hover:border-gray-300'}`}>
                    <span className="text-xl">{item.icon}</span>
                    <span>{item.label}</span>
                    {profile.energy.includes(item.id) && <span className="ml-auto">✓</span>}
                  </button>
                ))}
              </div>
            </div>
          )}
          {step === 4 && (
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-bold text-slate-800 mb-2">Wat zijn je grenzen?</h2>
                <p className="text-slate-500">Opties die hier niet aan voldoen, filteren we eruit.</p>
              </div>
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Minimaal salaris: <span className="font-bold">€{profile.minSalary.toLocaleString()}</span>
                  </label>
                  <input type="range" min="1500" max="6000" step="100" value={profile.minSalary}
                    onChange={(e) => updateProfile('minSalary', parseInt(e.target.value))} className="w-full" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-3">Thuiswerken</label>
                  <div className="grid grid-cols-2 gap-2">
                    {[{ id: 'required', label: 'Moet kunnen' }, { id: 'partial', label: 'Fijn als het kan' },
                      { id: 'none', label: 'Maakt niet uit' }].map(opt => (
                      <button key={opt.id} onClick={() => updateProfile('remotePreference', opt.id)}
                        className={`p-3 rounded-lg border text-sm ${profile.remotePreference === opt.id ? 'border-blue-500 bg-blue-50' : 'border-gray-200 bg-white'}`}>
                        {opt.label}
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-3">Rijbewijs?</label>
                  <div className="flex gap-2">
                    <button onClick={() => updateProfile('hasDriversLicense', true)}
                      className={`px-6 py-3 rounded-lg border ${profile.hasDriversLicense ? 'border-blue-500 bg-blue-50' : 'border-gray-200'}`}>Ja</button>
                    <button onClick={() => updateProfile('hasDriversLicense', false)}
                      className={`px-6 py-3 rounded-lg border ${!profile.hasDriversLicense ? 'border-blue-500 bg-blue-50' : 'border-gray-200'}`}>Nee</button>
                  </div>
                </div>
              </div>
            </div>
          )}
          {step === 5 && (
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-bold text-slate-800 mb-2">Wat weegt het zwaarst?</h2>
                <p className="text-slate-500">Kies je top 2-3.</p>
              </div>
              <div className="grid gap-3">
                {VALUES_OPTIONS.map(item => (
                  <button key={item.id} onClick={() => toggleArrayItem('values', item.id)}
                    className={`p-4 rounded-lg border text-left ${profile.values.includes(item.id) ? 'border-blue-500 bg-blue-50' : 'border-gray-200 bg-white'}`}>
                    <div className="font-medium">{item.label}</div>
                    <div className="text-sm text-slate-500">{item.desc}</div>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </main>
      <footer className="p-4 border-t border-gray-200 bg-white">
        <div className="max-w-2xl mx-auto flex justify-between">
          <button onClick={prevStep} className="text-slate-600 hover:text-slate-800 px-4 py-2">← Vorige</button>
          <button onClick={nextStep} className="px-6 py-2 rounded-lg font-medium bg-blue-800 hover:bg-blue-900 text-white">
            {step === totalSteps ? 'Bekijk resultaten →' : 'Volgende →'}
          </button>
        </div>
      </footer>
    </div>
  );
}

function ResultsPage({ results, onSelectOption, onBack }) {
  const RouteCard = ({ route, data, label }) => {
    if (!data) return null;
    const colors = { A: 'bg-green-100 text-green-800', B: 'bg-blue-100 text-blue-800', C: 'bg-amber-100 text-amber-800' };
    return (
      <div className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-lg transition-shadow">
        <div className="flex justify-between items-start mb-4">
          <div>
            <span className={`inline-block px-2 py-1 rounded text-xs font-medium mb-2 ${colors[route]}`}>{label}</span>
            <h3 className="text-xl font-bold text-slate-800">{data.career.name}</h3>
            <p className="text-slate-500 text-sm">{data.career.sector}</p>
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold text-blue-800">{data.matchScore}%</div>
            <div className="text-xs text-slate-500">match</div>
          </div>
        </div>
        <p className="text-slate-600 text-sm mb-4">{data.career.description}</p>
        <div className="space-y-2 mb-4">
          <div className="flex justify-between text-sm">
            <span className="text-slate-500">Startsalaris</span>
            <span className="font-medium">€{data.career.salaryEntry[0]} – €{data.career.salaryEntry[1]}</span>
          </div>
          <div className="flex justify-between items-center text-sm">
            <span className="text-slate-500">Werkdruk</span>
            <StressBar score={data.career.stressScore} />
          </div>
          <div className="flex justify-between items-center text-sm">
            <span className="text-slate-500">AI-risico</span>
            <AIRiskBar score={data.career.aiRiskScore} />
          </div>
        </div>
        {data.constraintIssues.length > 0 && (
          <div className="bg-amber-50 border border-amber-200 rounded-lg p-3 mb-4 text-sm text-amber-800">
            ⚠️ {data.constraintIssues[0]}
          </div>
        )}
        <button onClick={() => onSelectOption(route, data)}
          className="w-full py-3 bg-slate-100 hover:bg-slate-200 rounded-lg text-slate-700 font-medium">
          Bekijk details →
        </button>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-stone-50">
      <header className="p-4 border-b border-gray-200 bg-white">
        <div className="max-w-5xl mx-auto flex justify-between items-center">
          <h1 className="text-xl font-semibold text-slate-800">SwitchCoach</h1>
          <button onClick={onBack} className="text-slate-500 hover:text-slate-700 text-sm">← Opnieuw</button>
        </div>
      </header>
      <main className="p-6">
        <div className="max-w-5xl mx-auto">
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-slate-800 mb-2">Jouw 3 carrière-opties</h2>
            <p className="text-slate-500">Elke optie heeft andere trade-offs — er is geen "beste" keuze.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            <RouteCard route="A" data={results.A} label="A: Veiligste route" />
            <RouteCard route="B" data={results.B} label="B: Beste balans" />
            <RouteCard route="C" data={results.C} label="C: Groeiroute" />
          </div>
        </div>
      </main>
    </div>
  );
}

function DetailPage({ route, data, profile, onBack, onSave }) {
  const career = data.career;
  const labels = { A: 'Veiligste route', B: 'Beste balans', C: 'Groeiroute' };
  const colors = { A: 'bg-green-100 text-green-800', B: 'bg-blue-100 text-blue-800', C: 'bg-amber-100 text-amber-800' };

  return (
    <div className="min-h-screen bg-stone-50">
      <header className="p-4 border-b border-gray-200 bg-white sticky top-0">
        <div className="max-w-3xl mx-auto flex justify-between items-center">
          <button onClick={onBack} className="text-slate-600">← Terug</button>
          <button onClick={() => onSave(route, data)} className="text-blue-600 font-medium">♡ Opslaan</button>
        </div>
      </header>
      <main className="p-6">
        <div className="max-w-3xl mx-auto space-y-6">
          <div className="bg-white rounded-xl border p-6">
            <span className={`inline-block px-2 py-1 rounded text-xs font-medium mb-3 ${colors[route]}`}>{route}: {labels[route]}</span>
            <h1 className="text-3xl font-bold text-slate-800 mb-1">{career.name}</h1>
            <p className="text-slate-500 mb-4">{career.sector}</p>
            <div className="flex items-center gap-4">
              <span className="text-3xl font-bold text-blue-800">{data.matchScore}%</span>
              <div className="flex-1 bg-gray-200 rounded-full h-3">
                <div className="bg-blue-600 h-3 rounded-full" style={{ width: `${data.matchScore}%` }} />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl border p-6">
            <h2 className="font-bold text-slate-800 mb-3">Salaris</h2>
            <div className="space-y-2">
              <div className="flex justify-between"><span className="text-slate-500">Instap</span><span className="font-medium">€{career.salaryEntry[0]} – €{career.salaryEntry[1]}</span></div>
              <div className="flex justify-between"><span className="text-slate-500">Na 2-3 jaar</span><span className="font-medium">€{career.salaryMid[0]} – €{career.salaryMid[1]}</span></div>
              <div className="flex justify-between"><span className="text-slate-500">Senior</span><span className="font-medium">€{career.salarySenior[0]} – €{career.salarySenior[1]}</span></div>
            </div>
            <p className="text-xs text-slate-400 mt-3">Bron: {career.salarySource}</p>
          </div>

          <div className="bg-white rounded-xl border p-6">
            <h2 className="font-bold text-slate-800 mb-3">Werkdruk</h2>
            <StressBar score={career.stressScore} />
            <p className="text-slate-600 text-sm mt-3">{career.stressExplanation}</p>
          </div>

          <div className="bg-white rounded-xl border p-6">
            <h2 className="font-bold text-slate-800 mb-3">AI-risico</h2>
            <AIRiskBar score={career.aiRiskScore} />
            <div className="grid grid-cols-2 gap-4 my-4">
              <div className="bg-slate-50 rounded-lg p-3 text-center">
                <div className="text-xl font-bold">{career.aiAnalysis.routinePercentage}%</div>
                <div className="text-xs text-slate-500">Automatiseerbaar</div>
              </div>
              <div className="bg-slate-50 rounded-lg p-3 text-center">
                <div className="text-xl font-bold">{career.aiAnalysis.judgmentPercentage}%</div>
                <div className="text-xs text-slate-500">Mensenwerk</div>
              </div>
            </div>
            <p className="text-slate-600 text-sm">{career.aiAnalysis.explanation}</p>
          </div>

          <div className="bg-white rounded-xl border p-6">
            <h2 className="font-bold text-slate-800 mb-3">Aanbevolen stappen</h2>
            <ul className="space-y-2">
              {career.recommendations.map((rec, i) => (
                <li key={i} className="flex items-center gap-2 text-slate-600">
                  <span className="text-blue-500">○</span> {rec}
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-slate-800 text-white rounded-xl p-6">
            <h2 className="font-bold mb-3">⚡ Reality check</h2>
            <p className="text-slate-300 text-sm">
              Een carrièreswitch kost tijd en energie. Je start mogelijk lager dan je gewend bent. 
              Reken op 6-12 maanden voordat je op niveau zit.
            </p>
          </div>

          <button onClick={() => onSave(route, data)}
            className="w-full py-4 bg-blue-800 hover:bg-blue-900 text-white rounded-lg font-medium">
            ♡ Opslaan in Mijn Plan
          </button>
        </div>
      </main>
    </div>
  );
}

function SavedPage({ savedItem, onBack }) {
  return (
    <div className="min-h-screen bg-stone-50">
      <header className="p-4 border-b border-gray-200 bg-white">
        <div className="max-w-3xl mx-auto flex justify-between items-center">
          <h1 className="text-xl font-semibold text-slate-800">SwitchCoach</h1>
          <button onClick={onBack} className="text-slate-500">← Terug</button>
        </div>
      </header>
      <main className="p-6">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold text-slate-800 mb-6">Mijn Plan</h2>
          <div className="bg-white rounded-xl border p-6 mb-6">
            <h3 className="font-bold text-xl">{savedItem.data.career.name}</h3>
            <p className="text-slate-500">{savedItem.data.career.sector}</p>
            <p className="text-sm mt-2">Match: {savedItem.data.matchScore}%</p>
          </div>
          <div className="bg-green-50 border border-green-200 rounded-xl p-6">
            <h3 className="font-bold text-green-800">✓ Plan opgeslagen</h3>
            <p className="text-green-700 text-sm mt-2">
              Volgende versie: voortgang bijhouden en delen met anderen.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}

// ============================================
// MAIN APP
// ============================================

export default function Home() {
  const [screen, setScreen] = useState('landing');
  const [profile, setProfile] = useState(null);
  const [results, setResults] = useState(null);
  const [selectedOption, setSelectedOption] = useState(null);
  const [savedPlan, setSavedPlan] = useState(null);

  const handleStart = () => setScreen('intake');
  const handleIntakeComplete = (p) => { setProfile(p); setResults(scoreAndRankCareers(p)); setScreen('results'); };
  const handleSelectOption = (route, data) => { setSelectedOption({ route, data }); setScreen('detail'); };
  const handleSave = (route, data) => { setSavedPlan({ route, data }); setScreen('saved'); };
  const handleBack = () => { setScreen('landing'); setProfile(null); setResults(null); setSelectedOption(null); };
  const handleBackToResults = () => { setScreen('results'); setSelectedOption(null); };

  return (
    <>
      {screen === 'landing' && <LandingPage onStart={handleStart} />}
      {screen === 'intake' && <IntakeWizard onComplete={handleIntakeComplete} onBack={handleBack} />}
      {screen === 'results' && <ResultsPage results={results} onSelectOption={handleSelectOption} onBack={handleBack} />}
      {screen === 'detail' && <DetailPage route={selectedOption.route} data={selectedOption.data} profile={profile} onBack={handleBackToResults} onSave={handleSave} />}
      {screen === 'saved' && <SavedPage savedItem={savedPlan} onBack={handleBackToResults} />}
    </>
  );
}