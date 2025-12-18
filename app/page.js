"use client";

import React, { useState } from 'react';
import jsPDF from 'jspdf';

// ============================================
// CAREER DATA - 25+ KANSRIJKE BEROEPEN
// ============================================

const CAREER_OPTIONS = [
  // TECH & IT
  {
    id: 'software-developer',
    name: 'Software Developer',
    sector: 'IT / Tech',
    description: 'Software en applicaties bouwen, code schrijven, technische problemen oplossen in een team.',
    requiredSkills: ['technical', 'analyzing'],
    preferredSkills: ['communicating', 'organizing'],
    energyMatch: ['problem_solving', 'creating', 'expertise'],
    salaryEntry: [3000, 3800],
    salaryMid: [4000, 5000],
    salarySenior: [5000, 7000],
    salarySource: 'CBS StatLine 2023, sector Informatie en communicatie',
    stressScore: 2,
    stressFactors: { deadlines: 3, clientContact: 2, responsibility: 3, unpredictability: 2 },
    stressExplanation: 'Projectdruk rond releases, maar vaak goed planbaar. Veel autonomie en focus-tijd.',
    aiRiskScore: 2,
    aiAnalysis: { routinePercentage: 25, judgmentPercentage: 75, trend: 'augmentation', explanation: 'AI helpt met code schrijven, maar architectuur, debugging en complexe problemen blijven mensenwerk. Vraag naar developers blijft hoog.' },
    requirements: [],
    recommendations: ['Portfolio met projecten', 'Kennis van moderne frameworks'],
    remoteOption: 'full',
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
    stressExplanation: 'Projectmatige druk, maar vaak goed planbaar. Concentratiewerk.',
    aiRiskScore: 3,
    aiAnalysis: { routinePercentage: 45, judgmentPercentage: 55, trend: 'transformation', explanation: 'AI verandert dit vak snel. Routine-analyses worden geautomatiseerd. Toekomst ligt in complexe vraagstukken en storytelling.' },
    requirements: [],
    recommendations: ['SQL kennis', 'Python of R basis', 'Power BI / Tableau'],
    remoteOption: 'full',
    schedule: 'office',
    growthPotential: 'high',
    marketDemand: 'high'
  },
  {
    id: 'it-projectmanager',
    name: 'IT Projectmanager',
    sector: 'IT / Tech',
    description: 'IT-projecten leiden, teams aansturen, planning en budget bewaken, stakeholders managen.',
    requiredSkills: ['organizing', 'communicating', 'leading'],
    preferredSkills: ['technical', 'analyzing'],
    energyMatch: ['problem_solving', 'variety', 'structure'],
    salaryEntry: [3500, 4200],
    salaryMid: [4500, 5500],
    salarySenior: [5500, 7500],
    salarySource: 'CBS StatLine 2023, sector Informatie en communicatie',
    stressScore: 3,
    stressFactors: { deadlines: 4, clientContact: 4, responsibility: 4, unpredictability: 3 },
    stressExplanation: 'Deadlinedruk en verantwoordelijkheid voor teamresultaat. Veel schakelen.',
    aiRiskScore: 2,
    aiAnalysis: { routinePercentage: 25, judgmentPercentage: 75, trend: 'augmentation', explanation: 'AI helpt met rapportages en planning. Mensen leiden en stakeholders managen blijft mensenwerk.' },
    requirements: [],
    recommendations: ['PRINCE2 of Agile certificering', 'Technische affiniteit'],
    remoteOption: 'partial',
    schedule: 'office',
    growthPotential: 'high',
    marketDemand: 'high'
  },
  {
    id: 'cybersecurity-specialist',
    name: 'Cybersecurity Specialist',
    sector: 'IT / Tech',
    description: 'Systemen beveiligen, dreigingen analyseren, security audits uitvoeren.',
    requiredSkills: ['technical', 'analyzing'],
    preferredSkills: ['communicating', 'advising'],
    energyMatch: ['problem_solving', 'expertise', 'structure'],
    salaryEntry: [3200, 4000],
    salaryMid: [4200, 5200],
    salarySenior: [5500, 7500],
    salarySource: 'CBS StatLine 2023, sector Informatie en communicatie',
    stressScore: 3,
    stressFactors: { deadlines: 3, clientContact: 2, responsibility: 5, unpredictability: 4 },
    stressExplanation: 'Hoge verantwoordelijkheid. Bij incidenten kan het stressvol worden.',
    aiRiskScore: 2,
    aiAnalysis: { routinePercentage: 30, judgmentPercentage: 70, trend: 'augmentation', explanation: 'AI helpt bij threat detection. Strategisch security-denken en incident response blijft mensenwerk. Vraag groeit enorm.' },
    requirements: [],
    recommendations: ['Security certificeringen (CISSP, CEH)', 'Technische achtergrond'],
    remoteOption: 'partial',
    schedule: 'office',
    growthPotential: 'high',
    marketDemand: 'high'
  },
  {
    id: 'cloud-engineer',
    name: 'Cloud Engineer',
    sector: 'IT / Tech',
    description: 'Cloud-infrastructuur ontwerpen, beheren en optimaliseren (AWS, Azure, GCP).',
    requiredSkills: ['technical', 'analyzing'],
    preferredSkills: ['organizing', 'communicating'],
    energyMatch: ['problem_solving', 'expertise', 'creating'],
    salaryEntry: [3200, 4000],
    salaryMid: [4200, 5200],
    salarySenior: [5500, 7000],
    salarySource: 'CBS StatLine 2023, sector Informatie en communicatie',
    stressScore: 2,
    stressFactors: { deadlines: 3, clientContact: 2, responsibility: 4, unpredictability: 3 },
    stressExplanation: 'Verantwoordelijk voor uptime. Incidenten kunnen buiten werktijd komen.',
    aiRiskScore: 2,
    aiAnalysis: { routinePercentage: 30, judgmentPercentage: 70, trend: 'augmentation', explanation: 'AI automatiseert basis taken. Architectuur en complexe migraties blijven mensenwerk.' },
    requirements: [],
    recommendations: ['AWS/Azure/GCP certificering', 'Linux kennis'],
    remoteOption: 'full',
    schedule: 'office',
    growthPotential: 'high',
    marketDemand: 'high'
  },

  // ZORG
  {
    id: 'verpleegkundige',
    name: 'Verpleegkundige',
    sector: 'Zorg & Welzijn',
    description: 'Patiënten verzorgen, medische handelingen uitvoeren, zorgplannen opstellen.',
    requiredSkills: ['communicating', 'organizing', 'advising'],
    preferredSkills: ['leading'],
    energyMatch: ['helping_people', 'variety', 'problem_solving'],
    salaryEntry: [2600, 3100],
    salaryMid: [3200, 3800],
    salarySenior: [3800, 4500],
    salarySource: 'CAO Ziekenhuizen 2023, FWG 50-55',
    stressScore: 4,
    stressFactors: { deadlines: 3, clientContact: 5, responsibility: 5, unpredictability: 4 },
    stressExplanation: 'Emotioneel belastend, fysiek zwaar. Personeelstekort maakt het drukker.',
    aiRiskScore: 1,
    aiAnalysis: { routinePercentage: 15, judgmentPercentage: 85, trend: 'augmentation', explanation: 'Zorg is mensenwerk. AI helpt met administratie. Direct patiëntcontact blijft essentieel.' },
    requirements: ['nursing_diploma'],
    recommendations: ['BIG-registratie verplicht', 'Specialisatie mogelijkheden'],
    remoteOption: 'none',
    schedule: 'shifts',
    growthPotential: 'medium',
    marketDemand: 'high'
  },
  {
    id: 'verzorgende-ig',
    name: 'Verzorgende IG',
    sector: 'Zorg & Welzijn',
    description: 'Dagelijkse verzorging van cliënten, medicatie toedienen, signaleren van veranderingen.',
    requiredSkills: ['communicating', 'organizing'],
    preferredSkills: ['advising'],
    energyMatch: ['helping_people', 'structure', 'variety'],
    salaryEntry: [2200, 2600],
    salaryMid: [2600, 3000],
    salarySenior: [3000, 3400],
    salarySource: 'CAO VVT 2023, FWG 35-40',
    stressScore: 3,
    stressFactors: { deadlines: 2, clientContact: 5, responsibility: 4, unpredictability: 3 },
    stressExplanation: 'Fysiek werk, emotionele betrokkenheid. Werkdruk door personeelstekort.',
    aiRiskScore: 1,
    aiAnalysis: { routinePercentage: 10, judgmentPercentage: 90, trend: 'augmentation', explanation: 'Persoonlijke zorg is niet te automatiseren. Enorme vraag naar verzorgenden.' },
    requirements: ['mbo3_care'],
    recommendations: ['MBO-3 Verzorgende IG diploma'],
    remoteOption: 'none',
    schedule: 'shifts',
    growthPotential: 'medium',
    marketDemand: 'high'
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
    id: 'praktijkondersteuner',
    name: 'Praktijkondersteuner Huisarts',
    sector: 'Zorg & Welzijn',
    description: 'Chronisch zieken begeleiden, spreekuren draaien, preventie en voorlichting.',
    requiredSkills: ['communicating', 'advising', 'organizing'],
    preferredSkills: ['analyzing'],
    energyMatch: ['helping_people', 'expertise', 'structure'],
    salaryEntry: [2800, 3200],
    salaryMid: [3300, 3800],
    salarySenior: [3800, 4300],
    salarySource: 'CAO Huisartsenzorg 2023',
    stressScore: 2,
    stressFactors: { deadlines: 2, clientContact: 4, responsibility: 4, unpredictability: 2 },
    stressExplanation: 'Zelfstandig werken met eigen patiëntenpopulatie. Goede werk-privé balans.',
    aiRiskScore: 1,
    aiAnalysis: { routinePercentage: 20, judgmentPercentage: 80, trend: 'augmentation', explanation: 'Persoonlijk contact en klinisch redeneren blijft essentieel. AI ondersteunt administratie.' },
    requirements: ['poh_diploma'],
    recommendations: ['HBO-V + POH opleiding'],
    remoteOption: 'none',
    schedule: 'office',
    growthPotential: 'medium',
    marketDemand: 'high'
  },
  {
    id: 'ggz-agoog',
    name: 'GGZ Agoog',
    sector: 'Zorg & Welzijn',
    description: 'Mensen met psychische problemen begeleiden in hun dagelijks leven en herstel.',
    requiredSkills: ['communicating', 'advising'],
    preferredSkills: ['organizing', 'analyzing'],
    energyMatch: ['helping_people', 'problem_solving', 'expertise'],
    salaryEntry: [2500, 2900],
    salaryMid: [3000, 3500],
    salarySenior: [3500, 4000],
    salarySource: 'CAO GGZ 2023',
    stressScore: 3,
    stressFactors: { deadlines: 2, clientContact: 5, responsibility: 4, unpredictability: 4 },
    stressExplanation: 'Emotioneel intensief werk. Crisismomenten kunnen voorkomen.',
    aiRiskScore: 1,
    aiAnalysis: { routinePercentage: 10, judgmentPercentage: 90, trend: 'augmentation', explanation: 'Menselijke begeleiding en relatie is de kern. Niet automatiseerbaar.' },
    requirements: ['hbo_social'],
    recommendations: ['HBO Social Work of SPH'],
    remoteOption: 'none',
    schedule: 'flexible',
    growthPotential: 'medium',
    marketDemand: 'high'
  },

  // TECHNIEK & BOUW
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
  },
  {
    id: 'werkvoorbereider-bouw',
    name: 'Werkvoorbereider Bouw',
    sector: 'Bouw / Techniek',
    description: 'Bouwprojecten voorbereiden, materialen plannen, tekeningen bestuderen, calculaties maken.',
    requiredSkills: ['organizing', 'analyzing', 'technical'],
    preferredSkills: ['communicating'],
    energyMatch: ['structure', 'problem_solving', 'expertise'],
    salaryEntry: [2800, 3300],
    salaryMid: [3400, 4000],
    salarySenior: [4000, 4800],
    salarySource: 'CBS StatLine 2023, sector Bouwnijverheid',
    stressScore: 3,
    stressFactors: { deadlines: 4, clientContact: 3, responsibility: 4, unpredictability: 3 },
    stressExplanation: 'Strakke deadlines en afhankelijkheden. Fouten in voorbereiding zijn kostbaar.',
    aiRiskScore: 2,
    aiAnalysis: { routinePercentage: 35, judgmentPercentage: 65, trend: 'augmentation', explanation: 'AI helpt met calculaties en planning. Praktijkkennis en coördinatie blijft mensenwerk.' },
    requirements: ['drivers_license'],
    recommendations: ['MBO4/HBO Bouwkunde', 'Kennis van bouwsoftware'],
    remoteOption: 'partial',
    schedule: 'office',
    growthPotential: 'medium',
    marketDemand: 'high'
  },
  {
    id: 'elektromonteur',
    name: 'Elektromonteur',
    sector: 'Techniek / Installatie',
    description: 'Elektrische installaties aanleggen, onderhouden en repareren.',
    requiredSkills: ['technical'],
    preferredSkills: ['organizing', 'communicating'],
    energyMatch: ['problem_solving', 'creating', 'variety'],
    salaryEntry: [2400, 2900],
    salaryMid: [3000, 3600],
    salarySenior: [3600, 4400],
    salarySource: 'CBS StatLine 2023, sector Installatie',
    stressScore: 2,
    stressFactors: { deadlines: 3, clientContact: 3, responsibility: 4, unpredictability: 3 },
    stressExplanation: 'Afwisselend werk. Verantwoordelijkheid voor veiligheid.',
    aiRiskScore: 1,
    aiAnalysis: { routinePercentage: 15, judgmentPercentage: 85, trend: 'augmentation', explanation: 'Elektrotechnisch werk vereist handenarbeid en vakkennis. Energietransitie zorgt voor enorme vraag.' },
    requirements: ['drivers_license'],
    recommendations: ['MBO Elektrotechniek', 'VCA certificaat'],
    remoteOption: 'none',
    schedule: 'flexible',
    growthPotential: 'high',
    marketDemand: 'high'
  },
  {
    id: 'installateur-warmtepompen',
    name: 'Installateur Warmtepompen',
    sector: 'Techniek / Installatie',
    description: 'Warmtepompen installeren, onderhouden en repareren bij woningen en bedrijven.',
    requiredSkills: ['technical'],
    preferredSkills: ['communicating', 'organizing'],
    energyMatch: ['problem_solving', 'creating', 'variety'],
    salaryEntry: [2600, 3200],
    salaryMid: [3300, 4000],
    salarySenior: [4000, 5000],
    salarySource: 'Techniek Nederland 2023',
    stressScore: 2,
    stressFactors: { deadlines: 3, clientContact: 3, responsibility: 3, unpredictability: 2 },
    stressExplanation: 'Groeiende sector, veel werk. Fysiek maar voldoening van duurzaam werk.',
    aiRiskScore: 1,
    aiAnalysis: { routinePercentage: 10, judgmentPercentage: 90, trend: 'augmentation', explanation: 'Installatie is handwerk. Vraag explodeert door energietransitie. Toekomstbestendig beroep.' },
    requirements: ['drivers_license'],
    recommendations: ['F-gassen certificaat', 'Warmtepomp opleiding'],
    remoteOption: 'none',
    schedule: 'flexible',
    growthPotential: 'high',
    marketDemand: 'high'
  },
  {
    id: 'servicemonteur',
    name: 'Servicemonteur',
    sector: 'Techniek / Installatie',
    description: 'Storingen verhelpen, preventief onderhoud uitvoeren, klanten adviseren.',
    requiredSkills: ['technical', 'communicating'],
    preferredSkills: ['organizing'],
    energyMatch: ['problem_solving', 'variety', 'helping_people'],
    salaryEntry: [2400, 2900],
    salaryMid: [3000, 3500],
    salarySenior: [3500, 4200],
    salarySource: 'CBS StatLine 2023, sector Installatie',
    stressScore: 2,
    stressFactors: { deadlines: 3, clientContact: 4, responsibility: 3, unpredictability: 4 },
    stressExplanation: 'Afwisselende dagen, elke storing is anders. Soms tijdsdruk.',
    aiRiskScore: 1,
    aiAnalysis: { routinePercentage: 15, judgmentPercentage: 85, trend: 'augmentation', explanation: 'Storingen oplossen vereist creativiteit en handvaardigheid. AI kan helpen met diagnose.' },
    requirements: ['drivers_license'],
    recommendations: ['MBO Techniek', 'VCA certificaat'],
    remoteOption: 'none',
    schedule: 'flexible',
    growthPotential: 'medium',
    marketDemand: 'high'
  },

  // ZAKELIJK
  {
    id: 'projectmanager',
    name: 'Projectmanager',
    sector: 'Zakelijke dienstverlening',
    description: 'Projecten coördineren, teams aansturen, budget en planning bewaken.',
    requiredSkills: ['organizing', 'communicating', 'leading'],
    preferredSkills: ['analyzing', 'technical'],
    energyMatch: ['problem_solving', 'variety', 'structure'],
    salaryEntry: [3000, 3500],
    salaryMid: [3800, 4500],
    salarySenior: [4500, 6000],
    salarySource: 'CBS StatLine 2023, sector Zakelijke dienstverlening',
    stressScore: 3,
    stressFactors: { deadlines: 4, clientContact: 4, responsibility: 4, unpredictability: 3 },
    stressExplanation: 'Pieken rond deadlines. Verantwoordelijk voor resultaat van anderen.',
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
    id: 'hr-adviseur',
    name: 'HR-adviseur',
    sector: 'Zakelijke dienstverlening',
    description: 'Adviseren over personeelszaken, begeleiding van medewerkers, werving ondersteunen.',
    requiredSkills: ['organizing', 'communicating', 'advising'],
    preferredSkills: ['analyzing', 'presenting'],
    energyMatch: ['helping_people', 'structure'],
    salaryEntry: [2600, 3000],
    salaryMid: [3200, 3800],
    salarySenior: [4000, 4800],
    salarySource: 'CBS StatLine 2023, sector Zakelijke dienstverlening',
    stressScore: 2,
    stressFactors: { deadlines: 2, clientContact: 3, responsibility: 2, unpredictability: 2 },
    stressExplanation: 'Regelmatige werkdruk met pieken rond reorganisaties.',
    aiRiskScore: 2,
    aiAnalysis: { routinePercentage: 35, judgmentPercentage: 65, trend: 'augmentation', explanation: 'AI neemt administratieve taken over. Gesprekken en adviseren blijft mensenwerk.' },
    requirements: [],
    recommendations: ['SHRM certificering', 'Coaching opleiding'],
    remoteOption: 'partial',
    schedule: 'office',
    growthPotential: 'medium',
    marketDemand: 'high'
  },
  {
    id: 'recruiter',
    name: 'Recruiter',
    sector: 'Zakelijke dienstverlening',
    description: 'Talent zoeken en aantrekken, sollicitatiegesprekken voeren, kandidaten begeleiden.',
    requiredSkills: ['communicating', 'sales', 'organizing'],
    preferredSkills: ['advising'],
    energyMatch: ['helping_people', 'variety', 'problem_solving'],
    salaryEntry: [2500, 3000],
    salaryMid: [3200, 4000],
    salarySenior: [4000, 5500],
    salarySource: 'CBS StatLine 2023, inclusief bonus',
    stressScore: 3,
    stressFactors: { deadlines: 4, clientContact: 5, responsibility: 3, unpredictability: 3 },
    stressExplanation: 'Targets halen, veel bellen en netwerken. Kan competitief zijn.',
    aiRiskScore: 3,
    aiAnalysis: { routinePercentage: 40, judgmentPercentage: 60, trend: 'transformation', explanation: 'AI helpt bij sourcing en screening. Relatieopbouw en overtuigen blijft mensenwerk.' },
    requirements: [],
    recommendations: ['LinkedIn Recruiter kennis', 'Sales ervaring helpt'],
    remoteOption: 'partial',
    schedule: 'office',
    growthPotential: 'medium',
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
    id: 'financial-controller',
    name: 'Financial Controller',
    sector: 'Financiële dienstverlening',
    description: 'Financiële rapportages maken, budgetten bewaken, analyses voor management.',
    requiredSkills: ['analyzing', 'organizing'],
    preferredSkills: ['communicating', 'presenting'],
    energyMatch: ['structure', 'expertise', 'problem_solving'],
    salaryEntry: [3200, 3800],
    salaryMid: [4000, 5000],
    salarySenior: [5000, 7000],
    salarySource: 'CBS StatLine 2023, sector Financiële dienstverlening',
    stressScore: 3,
    stressFactors: { deadlines: 4, clientContact: 2, responsibility: 4, unpredictability: 2 },
    stressExplanation: 'Maand- en jaarafsluitingen zijn druk. Verder voorspelbaar.',
    aiRiskScore: 3,
    aiAnalysis: { routinePercentage: 45, judgmentPercentage: 55, trend: 'transformation', explanation: 'AI automatiseert routine rapportages. Analyse en advies blijft waardevol.' },
    requirements: [],
    recommendations: ['WO Economie/Finance', 'RA/RC opleiding is plus'],
    remoteOption: 'partial',
    schedule: 'office',
    growthPotential: 'medium',
    marketDemand: 'medium'
  },

  // ONDERWIJS & OVERHEID
  {
    id: 'docent-vo',
    name: 'Docent Voortgezet Onderwijs',
    sector: 'Onderwijs',
    description: 'Lesgeven aan middelbare scholieren, lessen voorbereiden, leerlingen begeleiden.',
    requiredSkills: ['communicating', 'organizing', 'advising'],
    preferredSkills: ['creating', 'leading'],
    energyMatch: ['helping_people', 'expertise', 'variety'],
    salaryEntry: [2800, 3400],
    salaryMid: [3500, 4200],
    salarySenior: [4200, 5500],
    salarySource: 'CAO VO 2023, schaal LB-LC',
    stressScore: 4,
    stressFactors: { deadlines: 3, clientContact: 5, responsibility: 4, unpredictability: 4 },
    stressExplanation: 'Hoge werkdruk door administratie en klassengrootte. Vakanties compenseren.',
    aiRiskScore: 1,
    aiAnalysis: { routinePercentage: 20, judgmentPercentage: 80, trend: 'augmentation', explanation: 'AI helpt met lesmateriaal en nakijken. Lesgeven en begeleiden blijft mensenwerk. Grote vraag.' },
    requirements: ['teaching_degree'],
    recommendations: ['Eerstegraads of tweedegraads bevoegdheid', 'Zij-instroom mogelijk'],
    remoteOption: 'none',
    schedule: 'office',
    growthPotential: 'medium',
    marketDemand: 'high'
  },
  {
    id: 'onderwijsassistent',
    name: 'Onderwijsassistent',
    sector: 'Onderwijs',
    description: 'Docenten ondersteunen, leerlingen begeleiden, praktische taken in de klas.',
    requiredSkills: ['communicating', 'organizing'],
    preferredSkills: ['advising'],
    energyMatch: ['helping_people', 'variety', 'structure'],
    salaryEntry: [2100, 2400],
    salaryMid: [2400, 2800],
    salarySenior: [2800, 3200],
    salarySource: 'CAO PO/VO 2023, schaal 7-8',
    stressScore: 2,
    stressFactors: { deadlines: 2, clientContact: 4, responsibility: 2, unpredictability: 3 },
    stressExplanation: 'Minder verantwoordelijkheid dan docent. Veel afwisseling.',
    aiRiskScore: 1,
    aiAnalysis: { routinePercentage: 15, judgmentPercentage: 85, trend: 'augmentation', explanation: 'Directe begeleiding van kinderen is niet te automatiseren. Stabiele vraag.' },
    requirements: [],
    recommendations: ['MBO Onderwijsassistent'],
    remoteOption: 'none',
    schedule: 'office',
    growthPotential: 'low',
    marketDemand: 'high'
  },
  {
    id: 'klantmanager-gemeente',
    name: 'Klantmanager Gemeente',
    sector: 'Overheid',
    description: 'Uitkeringsgerechtigden begeleiden naar werk, trajecten uitzetten, regelgeving toepassen.',
    requiredSkills: ['communicating', 'advising', 'organizing'],
    preferredSkills: ['analyzing'],
    energyMatch: ['helping_people', 'problem_solving', 'structure'],
    salaryEntry: [2800, 3200],
    salaryMid: [3300, 3900],
    salarySenior: [3900, 4500],
    salarySource: 'CAO Gemeenten 2023, schaal 9-10',
    stressScore: 3,
    stressFactors: { deadlines: 3, clientContact: 5, responsibility: 4, unpredictability: 3 },
    stressExplanation: 'Complexe casussen, soms lastige gesprekken. Voldoening als het lukt.',
    aiRiskScore: 2,
    aiAnalysis: { routinePercentage: 30, judgmentPercentage: 70, trend: 'augmentation', explanation: 'AI helpt met regelgeving en matching. Persoonlijke begeleiding blijft essentieel.' },
    requirements: [],
    recommendations: ['HBO Social Work of vergelijkbaar'],
    remoteOption: 'partial',
    schedule: 'office',
    growthPotential: 'medium',
    marketDemand: 'medium'
  },
  {
    id: 'beleidsmedewerker',
    name: 'Beleidsmedewerker',
    sector: 'Overheid',
    description: 'Beleid ontwikkelen, onderzoek doen, adviezen schrijven voor bestuurders.',
    requiredSkills: ['analyzing', 'communicating', 'organizing'],
    preferredSkills: ['advising', 'presenting'],
    energyMatch: ['expertise', 'problem_solving', 'structure'],
    salaryEntry: [3000, 3500],
    salaryMid: [3600, 4200],
    salarySenior: [4200, 5200],
    salarySource: 'CAO Gemeenten/Rijk 2023, schaal 10-11',
    stressScore: 2,
    stressFactors: { deadlines: 3, clientContact: 2, responsibility: 3, unpredictability: 2 },
    stressExplanation: 'Pieken rond politieke deadlines. Verder redelijk voorspelbaar.',
    aiRiskScore: 3,
    aiAnalysis: { routinePercentage: 40, judgmentPercentage: 60, trend: 'transformation', explanation: 'AI kan helpen met onderzoek en schrijven. Oordeelsvorming en politieke sensitiviteit blijft mensenwerk.' },
    requirements: [],
    recommendations: ['WO afgerond', 'Goede schrijfvaardigheid'],
    remoteOption: 'partial',
    schedule: 'office',
    growthPotential: 'medium',
    marketDemand: 'medium'
  },

  // OVERIG
  {
    id: 'logistiek-planner',
    name: 'Logistiek Planner',
    sector: 'Transport & Logistiek',
    description: 'Routes plannen, voorraden beheren, leveringen coördineren.',
    requiredSkills: ['organizing', 'analyzing'],
    preferredSkills: ['communicating', 'technical'],
    energyMatch: ['structure', 'problem_solving'],
    salaryEntry: [2400, 2800],
    salaryMid: [2900, 3500],
    salarySenior: [3500, 4200],
    salarySource: 'CBS StatLine 2023, sector Vervoer en opslag',
    stressScore: 3,
    stressFactors: { deadlines: 4, clientContact: 2, responsibility: 3, unpredictability: 4 },
    stressExplanation: 'Hoge druk bij verstoringen. Voldoening als de puzzel klopt.',
    aiRiskScore: 4,
    aiAnalysis: { routinePercentage: 60, judgmentPercentage: 40, trend: 'transformation', explanation: 'Route-optimalisatie wordt steeds meer door AI gedaan. Rol verschuift naar exception handling.' },
    requirements: [],
    recommendations: ['ERP/WMS systeem ervaring', 'Lean/Six Sigma basis'],
    remoteOption: 'partial',
    schedule: 'office',
    growthPotential: 'medium',
    marketDemand: 'high'
  },
  {
    id: 'inkoper',
    name: 'Inkoper',
    sector: 'Zakelijke dienstverlening',
    description: 'Leveranciers selecteren, onderhandelen over prijzen en voorwaarden, inkoop optimaliseren.',
    requiredSkills: ['analyzing', 'communicating', 'organizing'],
    preferredSkills: ['sales', 'advising'],
    energyMatch: ['problem_solving', 'structure', 'variety'],
    salaryEntry: [2800, 3300],
    salaryMid: [3400, 4200],
    salarySenior: [4200, 5500],
    salarySource: 'CBS StatLine 2023',
    stressScore: 2,
    stressFactors: { deadlines: 3, clientContact: 3, responsibility: 3, unpredictability: 3 },
    stressExplanation: 'Onderhandelingen kunnen spannend zijn. Verder goed planbaar.',
    aiRiskScore: 3,
    aiAnalysis: { routinePercentage: 40, judgmentPercentage: 60, trend: 'transformation', explanation: 'AI helpt met marktanalyse en contractbeheer. Relaties en onderhandelen blijft mensenwerk.' },
    requirements: [],
    recommendations: ['NEVI diploma', 'Ervaring met ERP systemen'],
    remoteOption: 'partial',
    schedule: 'office',
    growthPotential: 'medium',
    marketDemand: 'medium'
  },
  {
    id: 'customer-success-manager',
    name: 'Customer Success Manager',
    sector: 'IT / Zakelijke dienstverlening',
    description: 'Klanten helpen succesvol te zijn met het product, relaties onderhouden, churn voorkomen.',
    requiredSkills: ['communicating', 'advising', 'organizing'],
    preferredSkills: ['analyzing', 'sales'],
    energyMatch: ['helping_people', 'problem_solving', 'variety'],
    salaryEntry: [2800, 3400],
    salaryMid: [3500, 4300],
    salarySenior: [4300, 5500],
    salarySource: 'Glassdoor/Indeed 2023, NL tech sector',
    stressScore: 2,
    stressFactors: { deadlines: 2, clientContact: 5, responsibility: 3, unpredictability: 3 },
    stressExplanation: 'Veel klantcontact, maar vaak positief. Druk bij opzeggende klanten.',
    aiRiskScore: 2,
    aiAnalysis: { routinePercentage: 30, judgmentPercentage: 70, trend: 'augmentation', explanation: 'AI helpt met data en signalering. Relatieopbouw en advies blijft mensenwerk.' },
    requirements: [],
    recommendations: ['Ervaring met SaaS producten', 'CRM kennis'],
    remoteOption: 'partial',
    schedule: 'office',
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
  if (profile.values.includes('meaning') && career.sector.includes('Zorg')) valuesScore += 15;
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

  if (career.requirements.includes('nursing_diploma') || 
      career.requirements.includes('teaching_degree') ||
      career.requirements.includes('mbo3_care') ||
      career.requirements.includes('mbo4_health') ||
      career.requirements.includes('hbo_social') ||
      career.requirements.includes('poh_diploma')) {
    score -= 20;
    issues.push('Specifieke opleiding vereist');
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
// PDF GENERATION
// ============================================

function generatePDF(results, profile) {
  const doc = new jsPDF();
  const pageWidth = doc.internal.pageSize.getWidth();
  let y = 20;

  // Helper functions
  const addTitle = (text, size = 20) => {
    doc.setFontSize(size);
    doc.setFont('helvetica', 'bold');
    doc.text(text, 20, y);
    y += size * 0.5;
  };

  const addSubtitle = (text, size = 14) => {
    doc.setFontSize(size);
    doc.setFont('helvetica', 'bold');
    doc.text(text, 20, y);
    y += 8;
  };

  const addText = (text, size = 10) => {
    doc.setFontSize(size);
    doc.setFont('helvetica', 'normal');
    const lines = doc.splitTextToSize(text, pageWidth - 40);
    doc.text(lines, 20, y);
    y += lines.length * 5 + 3;
  };

  const addLine = () => {
    doc.setDrawColor(200);
    doc.line(20, y, pageWidth - 20, y);
    y += 8;
  };

  const checkNewPage = (needed = 60) => {
    if (y > 270 - needed) {
      doc.addPage();
      y = 20;
    }
  };

  const stressLabels = ['', 'Laag', 'Laag-gemiddeld', 'Gemiddeld', 'Gemiddeld-hoog', 'Hoog'];
  const aiLabels = ['', 'Laag', 'Laag-gemiddeld', 'Gemiddeld', 'Gemiddeld-hoog', 'Hoog'];

  // Header
  addTitle('SwitchCoach Rapport');
  y += 5;
  doc.setFontSize(10);
  doc.setFont('helvetica', 'normal');
  doc.text(`Gegenereerd op: ${new Date().toLocaleDateString('nl-NL')}`, 20, y);
  y += 15;

  addLine();

  // Profiel samenvatting
  addSubtitle('Jouw profiel');
  const educationLabel = EDUCATION_LEVELS.find(e => e.id === profile.education)?.label || profile.education;
  addText(`Opleiding: ${educationLabel}`);
  addText(`Werkervaring: ${profile.yearsExperience} jaar`);
  addText(`Minimaal salaris: €${profile.minSalary.toLocaleString()}`);
  if (profile.skills.length > 0) {
    const skillLabels = profile.skills.map(s => SKILLS_OPTIONS.find(opt => opt.id === s)?.label || s).join(', ');
    addText(`Skills: ${skillLabels}`);
  }
  y += 5;
  addLine();

  // Career options
  const routes = [
    { key: 'A', label: 'OPTIE A: VEILIGSTE ROUTE', data: results.A },
    { key: 'B', label: 'OPTIE B: BESTE BALANS', data: results.B },
    { key: 'C', label: 'OPTIE C: GROEIROUTE', data: results.C }
  ];

  routes.forEach((route, index) => {
    if (!route.data) return;
    
    checkNewPage(80);
    
    const career = route.data.career;
    
    // Route header
    doc.setFillColor(240, 240, 240);
    doc.rect(20, y - 5, pageWidth - 40, 12, 'F');
    addSubtitle(route.label);
    y += 3;

    // Career name and match
    doc.setFontSize(16);
    doc.setFont('helvetica', 'bold');
    doc.text(career.name, 20, y);
    doc.setFontSize(12);
    doc.text(`Match: ${route.data.matchScore}%`, pageWidth - 50, y);
    y += 8;

    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    doc.text(career.sector, 20, y);
    y += 8;

    addText(career.description);
    y += 3;

    // Salary
    checkNewPage(40);
    doc.setFont('helvetica', 'bold');
    doc.text('Salaris:', 20, y);
    doc.setFont('helvetica', 'normal');
    y += 6;
    addText(`• Instap: €${career.salaryEntry[0].toLocaleString()} - €${career.salaryEntry[1].toLocaleString()}`);
    addText(`• Na 2-3 jaar: €${career.salaryMid[0].toLocaleString()} - €${career.salaryMid[1].toLocaleString()}`);
    addText(`• Senior: €${career.salarySenior[0].toLocaleString()} - €${career.salarySenior[1].toLocaleString()}`);
    doc.setFontSize(8);
    doc.setTextColor(100);
    addText(`Bron: ${career.salarySource}`);
    doc.setTextColor(0);
    doc.setFontSize(10);

    // Stress & AI Risk
    checkNewPage(30);
    doc.setFont('helvetica', 'bold');
    doc.text(`Werkdruk: ${stressLabels[career.stressScore]}`, 20, y);
    doc.text(`AI-risico: ${aiLabels[career.aiRiskScore]}`, pageWidth / 2, y);
    y += 6;
    doc.setFont('helvetica', 'normal');
    addText(career.stressExplanation);

    // AI Analysis
    checkNewPage(25);
    addText(`AI-analyse: ${career.aiAnalysis.explanation}`);

    // Recommendations
    if (career.recommendations.length > 0) {
      checkNewPage(20);
      doc.setFont('helvetica', 'bold');
      doc.text('Aanbevolen stappen:', 20, y);
      doc.setFont('helvetica', 'normal');
      y += 6;
      career.recommendations.forEach(rec => {
        addText(`• ${rec}`);
      });
    }

    // Constraint issues
    if (route.data.constraintIssues.length > 0) {
      checkNewPage(15);
      doc.setTextColor(180, 100, 0);
      doc.setFont('helvetica', 'bold');
      doc.text('Let op:', 20, y);
      y += 6;
      doc.setFont('helvetica', 'normal');
      route.data.constraintIssues.forEach(issue => {
        addText(`⚠ ${issue}`);
      });
      doc.setTextColor(0);
    }

    y += 10;
    if (index < routes.length - 1) {
      addLine();
    }
  });

  // Footer
  checkNewPage(30);
  addLine();
  doc.setFontSize(9);
  doc.setTextColor(100);
  doc.text('Dit rapport is gegenereerd door SwitchCoach.', 20, y);
  y += 5;
  doc.text('Bronnen: CBS StatLine, UWV Arbeidsmarktinformatie, CAO-gegevens.', 20, y);
  y += 5;
  doc.text('Scores zijn indicaties, geen garanties. Doe altijd eigen onderzoek.', 20, y);

  // Save
  doc.save('switchcoach-rapport.pdf');
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
          Bronnen: CBS, UWV, Beroepeninfo • 25+ kansrijke beroepen
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
                    className="w-full p-3 border border-gray-300 rounded-lg text-slate-700">
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
                    className="w-full p-3 border border-gray-300 rounded-lg text-slate-700">
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
                    <span className="text-slate-700">{skill.label}</span>
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
                    className={`p-4 rounded-lg border text-left flex items-center gap-3 ${profile.energy.includes(item.id) ? 'border-blue-500 bg-blue-50' : 'border-gray-200 bg-white hover:border-gray-300 text-slate-700'}`}>
                    <span className="text-xl">{item.icon}</span>
                    <span className="text-slate-700">{item.label}</span>
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
                        className={`p-3 rounded-lg border text-sm ${profile.remotePreference === opt.id ? 'border-blue-500 bg-blue-50' : 'border-gray-200 bg-white text-slate-700'}`}>
                        {opt.label}
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-3">Rijbewijs?</label>
                  <div className="flex gap-2">
                    <button onClick={() => updateProfile('hasDriversLicense', true)}
                      className={`px-6 py-3 rounded-lg border ${profile.hasDriversLicense ? 'border-blue-500 bg-blue-50' : 'border-gray-200 text-slate-700'}`}>Ja</button>
                    <button onClick={() => updateProfile('hasDriversLicense', false)}
                      className={`px-6 py-3 rounded-lg border ${!profile.hasDriversLicense ? 'border-blue-500 bg-blue-50' : 'border-gray-200 text-slate-700'}`}>Nee</button>
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

function ResultsPage({ results, profile, onSelectOption, onBack }) {
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
            <span className="font-medium text-slate-800">€{data.career.salaryEntry[0].toLocaleString()} - €{data.career.salaryEntry[1].toLocaleString()}</span>
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
          <div className="flex gap-3">
            <button onClick={() => generatePDF(results, profile)}
              className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2">
              📄 Download PDF
            </button>
            <button onClick={onBack} className="text-slate-500 hover:text-slate-700 text-sm">← Opnieuw</button>
          </div>
        </div>
      </header>
      <main className="p-6">
        <div className="max-w-5xl mx-auto">
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-slate-800 mb-2">Jouw 3 carrière-opties</h2>
            <p className="text-slate-500">Gebaseerd op 25+ kansrijke beroepen. Elke optie heeft andere trade-offs.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            <RouteCard route="A" data={results.A} label="A: Veiligste route" />
            <RouteCard route="B" data={results.B} label="B: Beste balans" />
            <RouteCard route="C" data={results.C} label="C: Groeiroute" />
          </div>
          <div className="mt-8 text-center">
            <button onClick={() => generatePDF(results, profile)}
              className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-medium inline-flex items-center gap-2">
              📄 Download volledig rapport als PDF
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}

function DetailPage({ route, data, profile, results, onBack }) {
  const career = data.career;
  const labels = { A: 'Veiligste route', B: 'Beste balans', C: 'Groeiroute' };
  const colors = { A: 'bg-green-100 text-green-800', B: 'bg-blue-100 text-blue-800', C: 'bg-amber-100 text-amber-800' };

  return (
    <div className="min-h-screen bg-stone-50">
      <header className="p-4 border-b border-gray-200 bg-white sticky top-0">
        <div className="max-w-3xl mx-auto flex justify-between items-center">
          <button onClick={onBack} className="text-slate-600">← Terug</button>
          <button onClick={() => generatePDF(results, profile)} 
            className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg text-sm font-medium">
            📄 Download PDF
          </button>
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
              <div className="flex justify-between"><span className="text-slate-500">Instap</span><span className="font-medium">€{career.salaryEntry[0].toLocaleString()} - €{career.salaryEntry[1].toLocaleString()}</span></div>
              <div className="flex justify-between"><span className="text-slate-500">Na 2-3 jaar</span><span className="font-medium">€{career.salaryMid[0].toLocaleString()} - €{career.salaryMid[1].toLocaleString()}</span></div>
              <div className="flex justify-between"><span className="text-slate-500">Senior</span><span className="font-medium">€{career.salarySenior[0].toLocaleString()} - €{career.salarySenior[1].toLocaleString()}</span></div>
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

          <button onClick={() => generatePDF(results, profile)}
            className="w-full py-4 bg-green-600 hover:bg-green-700 text-white rounded-lg font-medium flex items-center justify-center gap-2">
            📄 Download volledig rapport als PDF
          </button>
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

  const handleStart = () => setScreen('intake');
  const handleIntakeComplete = (p) => { setProfile(p); setResults(scoreAndRankCareers(p)); setScreen('results'); };
  const handleSelectOption = (route, data) => { setSelectedOption({ route, data }); setScreen('detail'); };
  const handleBack = () => { setScreen('landing'); setProfile(null); setResults(null); setSelectedOption(null); };
  const handleBackToResults = () => { setScreen('results'); setSelectedOption(null); };

  return (
    <>
      {screen === 'landing' && <LandingPage onStart={handleStart} />}
      {screen === 'intake' && <IntakeWizard onComplete={handleIntakeComplete} onBack={handleBack} />}
      {screen === 'results' && <ResultsPage results={results} profile={profile} onSelectOption={handleSelectOption} onBack={handleBack} />}
      {screen === 'detail' && <DetailPage route={selectedOption.route} data={selectedOption.data} profile={profile} results={results} onBack={handleBackToResults} />}
    </>
  );
}
