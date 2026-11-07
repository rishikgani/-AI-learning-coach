import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Starting database seed...')

  // ============================================
  // EXAM CATEGORIES
  // ============================================
  const categories = await Promise.all([
    prisma.examCategory.upsert({
      where: { slug: 'engineering' },
      update: {},
      create: {
        name: 'Engineering',
        slug: 'engineering',
        description: 'Engineering entrance exams for B.Tech/B.E. programs',
        icon: '🏗️',
        color: '#3B82F6',
        order: 1,
      },
    }),
    prisma.examCategory.upsert({
      where: { slug: 'medical' },
      update: {},
      create: {
        name: 'Medical',
        slug: 'medical',
        description: 'Medical entrance exams for MBBS, BDS, and other medical programs',
        icon: '🏥',
        color: '#EF4444',
        order: 2,
      },
    }),
    prisma.examCategory.upsert({
      where: { slug: 'competitive' },
      update: {},
      create: {
        name: 'Competitive Exams',
        slug: 'competitive',
        description: 'Government job and competitive entrance exams',
        icon: '🎯',
        color: '#8B5CF6',
        order: 3,
      },
    }),
    prisma.examCategory.upsert({
      where: { slug: 'engineering-streams' },
      update: {},
      create: {
        name: 'Engineering Streams',
        slug: 'engineering-streams',
        description: 'Subject-wise preparation for engineering semesters',
        icon: '💻',
        color: '#10B981',
        order: 4,
      },
    }),
    prisma.examCategory.upsert({
      where: { slug: 'school' },
      update: {},
      create: {
        name: 'School & Foundation',
        slug: 'school',
        description: 'Board exams, Olympiads, and foundation courses',
        icon: '📚',
        color: '#F59E0B',
        order: 5,
      },
    }),
    prisma.examCategory.upsert({
      where: { slug: 'other-exams' },
      update: {},
      create: {
        name: 'Other Exams',
        slug: 'other-exams',
        description: 'Other competitive and entrance exams',
        icon: '⭐',
        color: '#14B8A6',
        order: 6,
      },
    }),
  ])

  console.log('✅ Categories created')

  // ============================================
  // EXAMS
  // ============================================
  const categoryMap = Object.fromEntries(categories.map(c => [c.slug, c.id]))

  const exams = await Promise.all([
    // Engineering Exams
    prisma.exam.upsert({
      where: { slug: 'jee-mains' },
      update: {},
      create: {
        name: 'JEE Mains',
        slug: 'jee-mains',
        shortName: 'JEE',
        categoryId: categoryMap['engineering'],
        description: 'Joint Entrance Examination for NITs, IIITs, and other centrally funded technical institutes',
        eligibility: '10+2 with Physics, Chemistry, Mathematics',
        pattern: '90 questions (30 each PCM), 300 marks, 3 hours',
        officialWebsite: 'https://jeemain.nta.nic.in/',
        order: 1,
      },
    }),
    prisma.exam.upsert({
      where: { slug: 'jee-advanced' },
      update: {},
      create: {
        name: 'JEE Advanced',
        slug: 'jee-advanced',
        shortName: 'JEE Adv',
        categoryId: categoryMap['engineering'],
        description: 'Advanced exam for admission to IITs',
        eligibility: 'Top 2.5 lakh in JEE Mains',
        pattern: '2 papers, 3 hours each, Physics/Chemistry/Mathematics',
        officialWebsite: 'https://jeeadv.ac.in/',
        order: 2,
      },
    }),
    prisma.exam.upsert({
      where: { slug: 'mht-cet' },
      update: {},
      create: {
        name: 'MHT-CET',
        slug: 'mht-cet',
        shortName: 'MHT-CET',
        categoryId: categoryMap['engineering'],
        description: 'Maharashtra Common Entrance Test for engineering admissions',
        eligibility: '10+2 with PCM, Maharashtra domicile',
        pattern: '150 questions (50 each PCM), 200 marks, 3 hours',
        officialWebsite: 'https://cetcell.mahacet.org/',
        order: 3,
      },
    }),
    prisma.exam.upsert({
      where: { slug: 'bitsat' },
      update: {},
      create: {
        name: 'BITSAT',
        slug: 'bitsat',
        shortName: 'BITSAT',
        categoryId: categoryMap['engineering'],
        description: 'Birla Institute of Technology and Science Admission Test',
        eligibility: '10+2 with PCM, 75% aggregate',
        pattern: '130 questions, 390 marks, 3 hours',
        officialWebsite: 'https://bitsadmission.com/',
        order: 4,
      },
    }),
    prisma.exam.upsert({
      where: { slug: 'viteee' },
      update: {},
      create: {
        name: 'VITEEE',
        slug: 'viteee',
        shortName: 'VITEEE',
        categoryId: categoryMap['engineering'],
        description: 'Vellore Institute of Technology Engineering Entrance Exam',
        eligibility: '10+2 with PCM, 60% aggregate',
        pattern: '125 questions, 125 marks, 2.5 hours',
        officialWebsite: 'https://vit.ac.in/',
        order: 5,
      },
    }),
    prisma.exam.upsert({
      where: { slug: 'srmjeee' },
      update: {},
      create: {
        name: 'SRMJEEE',
        slug: 'srmjeee',
        shortName: 'SRMJEEE',
        categoryId: categoryMap['engineering'],
        description: 'SRM Joint Engineering Entrance Exam',
        eligibility: '10+2 with PCM, 50% aggregate',
        pattern: '125 questions, 125 marks, 2.5 hours',
        officialWebsite: 'https://www.srmist.edu.in/',
        order: 6,
      },
    }),
    prisma.exam.upsert({
      where: { slug: 'comedk' },
      update: {},
      create: {
        name: 'COMEDK UGET',
        slug: 'comedk',
        shortName: 'COMEDK',
        categoryId: categoryMap['engineering'],
        description: 'Consortium of Medical, Engineering and Dental Colleges of Karnataka',
        eligibility: '10+2 with PCM, 45% aggregate',
        pattern: '180 questions, 180 marks, 3 hours',
        officialWebsite: 'https://www.comedk.org/',
        order: 7,
      },
    }),
    prisma.exam.upsert({
      where: { slug: 'wbjee' },
      update: {},
      create: {
        name: 'WBJEE',
        slug: 'wbjee',
        shortName: 'WBJEE',
        categoryId: categoryMap['engineering'],
        description: 'West Bengal Joint Entrance Examination',
        eligibility: '10+2 with PCM, West Bengal domicile',
        pattern: '155 questions, 200 marks, 4 hours',
        officialWebsite: 'https://wbjeeb.nic.in/',
        order: 8,
      },
    }),

    // Medical Exams
    prisma.exam.upsert({
      where: { slug: 'neet-ug' },
      update: {},
      create: {
        name: 'NEET UG',
        slug: 'neet-ug',
        shortName: 'NEET',
        categoryId: categoryMap['medical'],
        description: 'National Eligibility cum Entrance Test for MBBS/BDS admissions',
        eligibility: '10+2 with PCB, 50% aggregate (40% for reserved)',
        pattern: '180 questions (45 each PCB), 720 marks, 3 hours 20 minutes',
        officialWebsite: 'https://neet.nta.nic.in/',
        order: 1,
      },
    }),
    prisma.exam.upsert({
      where: { slug: 'neet-pg' },
      update: {},
      create: {
        name: 'NEET PG',
        slug: 'neet-pg',
        shortName: 'NEET PG',
        categoryId: categoryMap['medical'],
        description: 'National Eligibility cum Entrance Test for postgraduate medical courses',
        eligibility: 'MBBS degree, completed internship',
        pattern: '200 questions, 800 marks, 3.5 hours',
        officialWebsite: 'https://natboard.edu.in/',
        order: 2,
      },
    }),
    prisma.exam.upsert({
      where: { slug: 'aiims' },
      update: {},
      create: {
        name: 'AIIMS Entrance',
        slug: 'aiims',
        shortName: 'AIIMS',
        categoryId: categoryMap['medical'],
        description: 'All India Institute of Medical Sciences entrance (now through NEET)',
        eligibility: '10+2 with PCB',
        pattern: 'Through NEET UG',
        officialWebsite: 'https://www.aiims.edu/',
        order: 3,
      },
    }),
    prisma.exam.upsert({
      where: { slug: 'jipmer' },
      update: {},
      create: {
        name: 'JIPMER',
        slug: 'jipmer',
        shortName: 'JIPMER',
        categoryId: categoryMap['medical'],
        description: 'Jawaharlal Institute of Postgraduate Medical Education & Research',
        eligibility: '10+2 with PCB',
        pattern: 'Through NEET UG',
        officialWebsite: 'https://jipmer.edu.in/',
        order: 4,
      },
    }),

    // Competitive Exams
    prisma.exam.upsert({
      where: { slug: 'upsc-cse' },
      update: {},
      create: {
        name: 'UPSC Civil Services',
        slug: 'upsc-cse',
        shortName: 'UPSC',
        categoryId: categoryMap['competitive'],
        description: 'Union Public Service Commission Civil Services Examination for IAS, IPS, IFS',
        eligibility: 'Graduate, Age 21-32 (general)',
        pattern: 'Prelims (2 papers), Mains (9 papers), Interview',
        officialWebsite: 'https://www.upsc.gov.in/',
        order: 1,
      },
    }),
    prisma.exam.upsert({
      where: { slug: 'state-psc' },
      update: {},
      create: {
        name: 'State PSC Exams',
        slug: 'state-psc',
        shortName: 'State PSC',
        categoryId: categoryMap['competitive'],
        description: 'State Public Service Commission exams for state civil services',
        eligibility: 'Graduate, state domicile',
        pattern: 'Varies by state',
        officialWebsite: '',
        order: 2,
      },
    }),
    prisma.exam.upsert({
      where: { slug: 'ssc-cgl' },
      update: {},
      create: {
        name: 'SSC CGL',
        slug: 'ssc-cgl',
        shortName: 'SSC CGL',
        categoryId: categoryMap['competitive'],
        description: 'Staff Selection Commission Combined Graduate Level',
        eligibility: 'Graduate, Age 18-32',
        pattern: 'Tier 1, 2, 3, 4',
        officialWebsite: 'https://ssc.nic.in/',
        order: 3,
      },
    }),
    prisma.exam.upsert({
      where: { slug: 'bank-po' },
      update: {},
      create: {
        name: 'Bank PO',
        slug: 'bank-po',
        shortName: 'Bank PO',
        categoryId: categoryMap['competitive'],
        description: 'Bank Probationary Officer exams (IBPS PO, SBI PO)',
        eligibility: 'Graduate, Age 20-30',
        pattern: 'Prelims, Mains, Interview',
        officialWebsite: 'https://www.ibps.in/',
        order: 4,
      },
    }),
    prisma.exam.upsert({
      where: { slug: 'railway' },
      update: {},
      create: {
        name: 'Railway Exams',
        slug: 'railway',
        shortName: 'RRB',
        categoryId: categoryMap['competitive'],
        description: 'Railway Recruitment Board exams for various posts',
        eligibility: '10th/12th/Graduate depending on post',
        pattern: 'CBT, Physical test, Document verification',
        officialWebsite: 'https://www.rrbcdg.gov.in/',
        order: 5,
      },
    }),
    prisma.exam.upsert({
      where: { slug: 'defence' },
      update: {},
      create: {
        name: 'Defence Exams',
        slug: 'defence',
        shortName: 'Defence',
        categoryId: categoryMap['competitive'],
        description: 'NDA, CDS, AFCAT, and other defence entrance exams',
        eligibility: '10+2/Graduate, Age varies',
        pattern: 'Written, SSB, Medical',
        officialWebsite: 'https://www.upsc.gov.in/',
        order: 6,
      },
    }),
    prisma.exam.upsert({
      where: { slug: 'clat' },
      update: {},
      create: {
        name: 'CLAT',
        slug: 'clat',
        shortName: 'CLAT',
        categoryId: categoryMap['competitive'],
        description: 'Common Law Admission Test for NLUs',
        eligibility: '10+2, 45% aggregate',
        pattern: '150 questions, 150 marks, 2 hours',
        officialWebsite: 'https://consortiumofnlus.ac.in/',
        order: 7,
      },
    }),
    prisma.exam.upsert({
      where: { slug: 'cat' },
      update: {},
      create: {
        name: 'CAT',
        slug: 'cat',
        shortName: 'CAT',
        categoryId: categoryMap['competitive'],
        description: 'Common Admission Test for IIMs and other B-schools',
        eligibility: 'Graduate, 50% aggregate',
        pattern: '3 sections, 66 questions, 2 hours',
        officialWebsite: 'https://iimcat.ac.in/',
        order: 8,
      },
    }),

    // Engineering Streams (for semester preparation)
    prisma.exam.upsert({
      where: { slug: 'cse' },
      update: {},
      create: {
        name: 'Computer Science Engineering',
        slug: 'cse',
        shortName: 'CSE',
        categoryId: categoryMap['engineering-streams'],
        description: 'Core CSE subjects: DSA, OS, DBMS, CN, COA, Compiler, AI/ML',
        eligibility: 'B.Tech CSE student',
        pattern: 'Semester-wise university exams',
        officialWebsite: '',
        order: 1,
      },
    }),
    prisma.exam.upsert({
      where: { slug: 'cse-aiml' },
      update: {},
      create: {
        name: 'CSE AI & ML',
        slug: 'cse-aiml',
        shortName: 'CSE AI&ML',
        categoryId: categoryMap['engineering-streams'],
        description: 'AI/ML specialization: ML, DL, NLP, CV, RL, MLOps',
        eligibility: 'B.Tech CSE AI&ML student',
        pattern: 'Semester-wise university exams',
        officialWebsite: '',
        order: 2,
      },
    }),
    prisma.exam.upsert({
      where: { slug: 'aids' },
      update: {},
      create: {
        name: 'Artificial Intelligence & Data Science',
        slug: 'aids',
        shortName: 'AIDS',
        categoryId: categoryMap['engineering-streams'],
        description: 'AI & DS: Statistics, ML, Big Data, Data Viz, Cloud, Ethics',
        eligibility: 'B.Tech AIDS student',
        pattern: 'Semester-wise university exams',
        officialWebsite: '',
        order: 3,
      },
    }),
    prisma.exam.upsert({
      where: { slug: 'cd' },
      update: {},
      create: {
        name: 'Computer Design / Cyber Security',
        slug: 'cd',
        shortName: 'CD',
        categoryId: categoryMap['engineering-streams'],
        description: 'Computer Design/Cyber Security: Cryptography, Networks, Security',
        eligibility: 'B.Tech CD student',
        pattern: 'Semester-wise university exams',
        officialWebsite: '',
        order: 4,
      },
    }),
    prisma.exam.upsert({
      where: { slug: 'eee' },
      update: {},
      create: {
        name: 'Electrical & Electronics Engineering',
        slug: 'eee',
        shortName: 'EEE',
        categoryId: categoryMap['engineering-streams'],
        description: 'EEE: Circuits, Machines, Power Systems, Control, Electronics',
        eligibility: 'B.Tech EEE student',
        pattern: 'Semester-wise university exams',
        officialWebsite: '',
        order: 5,
      },
    }),
    prisma.exam.upsert({
      where: { slug: 'logic-algorithm' },
      update: {},
      create: {
        name: 'Logic & Algorithms',
        slug: 'logic-algorithm',
        shortName: 'Logic/Algo',
        categoryId: categoryMap['engineering-streams'],
        description: 'Discrete Math, Logic, Algorithms, Complexity, Graph Theory',
        eligibility: 'Any CS/Engineering student',
        pattern: 'Course exams, competitive programming',
        officialWebsite: '',
        order: 6,
      },
    }),

    // School Exams
    prisma.exam.upsert({
      where: { slug: 'class-10' },
      update: {},
      create: {
        name: 'Class 10 Board Exams',
        slug: 'class-10',
        shortName: '10th',
        categoryId: categoryMap['school'],
        description: 'CBSE, ICSE, State Board Class 10 examinations',
        eligibility: 'Class 10 student',
        pattern: 'Board exams, 80+20 or 100 marks',
        officialWebsite: '',
        order: 1,
      },
    }),
    prisma.exam.upsert({
      where: { slug: 'class-12' },
      update: {},
      create: {
        name: 'Class 12 Board Exams',
        slug: 'class-12',
        shortName: '12th',
        categoryId: categoryMap['school'],
        description: 'CBSE, ICSE, State Board Class 12 examinations',
        eligibility: 'Class 12 student',
        pattern: 'Board exams, theory + practical',
        officialWebsite: '',
        order: 2,
      },
    }),
    prisma.exam.upsert({
      where: { slug: 'ntse' },
      update: {},
      create: {
        name: 'NTSE',
        slug: 'ntse',
        shortName: 'NTSE',
        categoryId: categoryMap['school'],
        description: 'National Talent Search Examination',
        eligibility: 'Class 10 student',
        pattern: 'Stage 1 (State), Stage 2 (National)',
        officialWebsite: 'https://ncert.nic.in/',
        order: 3,
      },
    }),
    prisma.exam.upsert({
      where: { slug: 'olympiads' },
      update: {},
      create: {
        name: 'Olympiads (IMO, NSO, IEO, etc.)',
        slug: 'olympiads',
        shortName: 'Olympiads',
        categoryId: categoryMap['school'],
        description: 'International Olympiads for Math, Science, English, etc.',
        eligibility: 'School students (Class 1-12)',
        pattern: 'Multiple choice, varies by olympiad',
        officialWebsite: 'https://www.sofworld.org/',
        order: 4,
      },
    }),
    prisma.exam.upsert({
      where: { slug: 'kvpy' },
      update: {},
      create: {
        name: 'KVPY',
        slug: 'kvpy',
        shortName: 'KVPY',
        categoryId: categoryMap['school'],
        description: 'Kishore Vaigyanik Protsahan Yojana (now part of INSPIRE)',
        eligibility: 'Class 11/12/1st year UG science students',
        pattern: 'Aptitude test, Interview',
        officialWebsite: 'https://kvpy.iisc.ernet.in/',
        order: 5,
      },
    }),

    // Other Exams
    prisma.exam.upsert({
      where: { slug: 'gate' },
      update: {},
      create: {
        name: 'GATE',
        slug: 'gate',
        shortName: 'GATE',
        categoryId: categoryMap['other-exams'],
        description: 'Graduate Aptitude Test in Engineering for M.Tech/PSU jobs',
        eligibility: 'B.Tech/B.E. graduate or final year',
        pattern: '65 questions, 100 marks, 3 hours',
        officialWebsite: 'https://gate.iitb.ac.in/',
        order: 1,
      },
    }),
    prisma.exam.upsert({
      where: { slug: 'ese' },
      update: {},
      create: {
        name: 'ESE (IES)',
        slug: 'ese',
        shortName: 'ESE',
        categoryId: categoryMap['other-exams'],
        description: 'Engineering Services Examination for Indian Engineering Services',
        eligibility: 'B.Tech/B.E., Age 21-30',
        pattern: 'Prelims, Mains, Interview',
        officialWebsite: 'https://www.upsc.gov.in/',
        order: 2,
      },
    }),
    prisma.exam.upsert({
      where: { slug: 'cuet' },
      update: {},
      create: {
        name: 'CUET',
        slug: 'cuet',
        shortName: 'CUET',
        categoryId: categoryMap['other-exams'],
        description: 'Common University Entrance Test for UG admissions',
        eligibility: '10+2 pass',
        pattern: 'Language + Domain + General Test',
        officialWebsite: 'https://cuet.samarth.ac.in/',
        order: 3,
      },
    }),
    prisma.exam.upsert({
      where: { slug: 'ipmat' },
      update: {},
      create: {
        name: 'IPMAT',
        slug: 'ipmat',
        shortName: 'IPMAT',
        categoryId: categoryMap['other-exams'],
        description: 'Integrated Program in Management Aptitude Test (IIM Indore/Rohtak)',
        eligibility: '10+2, Age limit varies',
        pattern: 'QA, VA, LR sections',
        officialWebsite: 'https://www.iimidr.ac.in/',
        order: 4,
      },
    }),
  ])

  console.log('✅ Exams created')

  // ============================================
  // SUBJECTS
  // ============================================
  const examMap = Object.fromEntries(exams.map(e => [e.slug, e.id]))

  const subjects = await Promise.all([
    // JEE Mains Subjects
    prisma.subject.upsert({
      where: { slug_examId: { slug: 'physics', examId: examMap['jee-mains'] } },
      update: {},
      create: { name: 'Physics', slug: 'physics', categoryId: categoryMap['engineering'], examId: examMap['jee-mains'], order: 1 },
    }),
    prisma.subject.upsert({
      where: { slug_examId: { slug: 'chemistry', examId: examMap['jee-mains'] } },
      update: {},
      create: { name: 'Chemistry', slug: 'chemistry', categoryId: categoryMap['engineering'], examId: examMap['jee-mains'], order: 2 },
    }),
    prisma.subject.upsert({
      where: { slug_examId: { slug: 'mathematics', examId: examMap['jee-mains'] } },
      update: {},
      create: { name: 'Mathematics', slug: 'mathematics', categoryId: categoryMap['engineering'], examId: examMap['jee-mains'], order: 3 },
    }),

    // NEET UG Subjects
    prisma.subject.upsert({
      where: { slug_examId: { slug: 'physics', examId: examMap['neet-ug'] } },
      update: {},
      create: { name: 'Physics', slug: 'physics', categoryId: categoryMap['medical'], examId: examMap['neet-ug'], order: 1 },
    }),
    prisma.subject.upsert({
      where: { slug_examId: { slug: 'chemistry', examId: examMap['neet-ug'] } },
      update: {},
      create: { name: 'Chemistry', slug: 'chemistry', categoryId: categoryMap['medical'], examId: examMap['neet-ug'], order: 2 },
    }),
    prisma.subject.upsert({
      where: { slug_examId: { slug: 'biology', examId: examMap['neet-ug'] } },
      update: {},
      create: { name: 'Biology', slug: 'biology', categoryId: categoryMap['medical'], examId: examMap['neet-ug'], order: 3 },
    }),

    // UPSC Subjects
    prisma.subject.upsert({
      where: { slug_examId: { slug: 'general-studies', examId: examMap['upsc-cse'] } },
      update: {},
      create: { name: 'General Studies', slug: 'general-studies', categoryId: categoryMap['competitive'], examId: examMap['upsc-cse'], order: 1 },
    }),
    prisma.subject.upsert({
      where: { slug_examId: { slug: 'csat', examId: examMap['upsc-cse'] } },
      update: {},
      create: { name: 'CSAT', slug: 'csat', categoryId: categoryMap['competitive'], examId: examMap['upsc-cse'], order: 2 },
    }),
    prisma.subject.upsert({
      where: { slug_examId: { slug: 'optional', examId: examMap['upsc-cse'] } },
      update: {},
      create: { name: 'Optional Subject', slug: 'optional', categoryId: categoryMap['competitive'], examId: examMap['upsc-cse'], order: 3 },
    }),

    // CSE Subjects
    prisma.subject.upsert({
      where: { slug_examId: { slug: 'dsa', examId: examMap['cse'] } },
      update: {},
      create: { name: 'Data Structures & Algorithms', slug: 'dsa', categoryId: categoryMap['engineering-streams'], examId: examMap['cse'], order: 1 },
    }),
    prisma.subject.upsert({
      where: { slug_examId: { slug: 'operating-systems', examId: examMap['cse'] } },
      update: {},
      create: { name: 'Operating Systems', slug: 'operating-systems', categoryId: categoryMap['engineering-streams'], examId: examMap['cse'], order: 2 },
    }),
    prisma.subject.upsert({
      where: { slug_examId: { slug: 'dbms', examId: examMap['cse'] } },
      update: {},
      create: { name: 'Database Management Systems', slug: 'dbms', categoryId: categoryMap['engineering-streams'], examId: examMap['cse'], order: 3 },
    }),
    prisma.subject.upsert({
      where: { slug_examId: { slug: 'computer-networks', examId: examMap['cse'] } },
      update: {},
      create: { name: 'Computer Networks', slug: 'computer-networks', categoryId: categoryMap['engineering-streams'], examId: examMap['cse'], order: 4 },
    }),
    prisma.subject.upsert({
      where: { slug_examId: { slug: 'coa', examId: examMap['cse'] } },
      update: {},
      create: { name: 'Computer Organization & Architecture', slug: 'coa', categoryId: categoryMap['engineering-streams'], examId: examMap['cse'], order: 5 },
    }),
    prisma.subject.upsert({
      where: { slug_examId: { slug: 'compiler-design', examId: examMap['cse'] } },
      update: {},
      create: { name: 'Compiler Design', slug: 'compiler-design', categoryId: categoryMap['engineering-streams'], examId: examMap['cse'], order: 6 },
    }),
    prisma.subject.upsert({
      where: { slug_examId: { slug: 'ai-ml', examId: examMap['cse'] } },
      update: {},
      create: { name: 'Artificial Intelligence & ML', slug: 'ai-ml', categoryId: categoryMap['engineering-streams'], examId: examMap['cse'], order: 7 },
    }),

    // Class 10 Subjects
    prisma.subject.upsert({
      where: { slug_examId: { slug: 'mathematics', examId: examMap['class-10'] } },
      update: {},
      create: { name: 'Mathematics', slug: 'mathematics', categoryId: categoryMap['school'], examId: examMap['class-10'], order: 1 },
    }),
    prisma.subject.upsert({
      where: { slug_examId: { slug: 'science', examId: examMap['class-10'] } },
      update: {},
      create: { name: 'Science', slug: 'science', categoryId: categoryMap['school'], examId: examMap['class-10'], order: 2 },
    }),
    prisma.subject.upsert({
      where: { slug_examId: { slug: 'social-science', examId: examMap['class-10'] } },
      update: {},
      create: { name: 'Social Science', slug: 'social-science', categoryId: categoryMap['school'], examId: examMap['class-10'], order: 3 },
    }),
    prisma.subject.upsert({
      where: { slug_examId: { slug: 'english', examId: examMap['class-10'] } },
      update: {},
      create: { name: 'English', slug: 'english', categoryId: categoryMap['school'], examId: examMap['class-10'], order: 4 },
    }),
    prisma.subject.upsert({
      where: { slug_examId: { slug: 'hindi', examId: examMap['class-10'] } },
      update: {},
      create: { name: 'Hindi', slug: 'hindi', categoryId: categoryMap['school'], examId: examMap['class-10'], order: 5 },
    }),

    // Class 12 Subjects
    prisma.subject.upsert({
      where: { slug_examId: { slug: 'physics', examId: examMap['class-12'] } },
      update: {},
      create: { name: 'Physics', slug: 'physics', categoryId: categoryMap['school'], examId: examMap['class-12'], order: 1 },
    }),
    prisma.subject.upsert({
      where: { slug_examId: { slug: 'chemistry', examId: examMap['class-12'] } },
      update: {},
      create: { name: 'Chemistry', slug: 'chemistry', categoryId: categoryMap['school'], examId: examMap['class-12'], order: 2 },
    }),
    prisma.subject.upsert({
      where: { slug_examId: { slug: 'mathematics', examId: examMap['class-12'] } },
      update: {},
      create: { name: 'Mathematics', slug: 'mathematics', categoryId: categoryMap['school'], examId: examMap['class-12'], order: 3 },
    }),
    prisma.subject.upsert({
      where: { slug_examId: { slug: 'biology', examId: examMap['class-12'] } },
      update: {},
      create: { name: 'Biology', slug: 'biology', categoryId: categoryMap['school'], examId: examMap['class-12'], order: 4 },
    }),
    prisma.subject.upsert({
      where: { slug_examId: { slug: 'computer-science', examId: examMap['class-12'] } },
      update: {},
      create: { name: 'Computer Science', slug: 'computer-science', categoryId: categoryMap['school'], examId: examMap['class-12'], order: 5 },
    }),
  ])

  console.log('✅ Subjects created')

  // ============================================
  // SYSTEM SETTINGS
  // ============================================
  await Promise.all([
    prisma.systemSetting.upsert({
      where: { key: 'app_name' },
      update: {},
      create: { key: 'app_name', value: 'AI Learning Coach', type: 'STRING', isPublic: true, description: 'Application name' },
    }),
    prisma.systemSetting.upsert({
      where: { key: 'enable_ai_features' },
      update: {},
      create: { key: 'enable_ai_features', value: 'true', type: 'BOOLEAN', isPublic: true, description: 'Enable AI features globally' },
    }),
    prisma.systemSetting.upsert({
      where: { key: 'default_ai_provider' },
      update: {},
      create: { key: 'default_ai_provider', value: 'gemini', type: 'STRING', isPublic: true, description: 'Default AI provider' },
    }),
    prisma.systemSetting.upsert({
      where: { key: 'default_chat_model' },
      update: {},
      create: { key: 'default_chat_model', value: 'gemini-1.5-flash', type: 'STRING', isPublic: true, description: 'Default chat model' },
    }),
    prisma.systemSetting.upsert({
      where: { key: 'maintenance_mode' },
      update: {},
      create: { key: 'maintenance_mode', value: 'false', type: 'BOOLEAN', isPublic: true, description: 'Maintenance mode toggle' },
    }),
    prisma.systemSetting.upsert({
      where: { key: 'registration_enabled' },
      update: {},
      create: { key: 'registration_enabled', value: 'true', type: 'BOOLEAN', isPublic: true, description: 'Allow new registrations' },
    }),
  ])

  console.log('✅ System settings created')

  console.log('🎉 Database seed completed successfully!')
}

main()
  .catch((e) => {
    console.error('❌ Seed error:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })