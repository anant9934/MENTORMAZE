export type FieldType = 'single' | 'multiple' | 'ranking' | 'textarea';

export interface SurveyOption {
  id: string;
  label: string;
}

export interface SurveyField {
  id: string;
  label: string;
  type: FieldType;
  options?: SurveyOption[];
  min?: number;
  max?: number;
  derivesFromId?: string; // If options are derived from another field in the same screen
}

export interface SurveyScreen {
  id: string;
  screenNumber: number;
  title: string;
  fields: SurveyField[];
  hasContext: boolean;
  contextPrompt?: string;
}

export interface SurveyManifest {
  surveyType: 'professional' | 'student';
  version: string;
  hero: {
    badge: string;
    titleTop: string;
    titleHighlight: string;
    description: string;
    buttonText: string;
  };
  success: {
    title: string;
    message: string;
    subMessage: string;
  };
  config: SurveyScreen[];
}

export const professionalSurveyConfig: SurveyScreen[] = [
  {
    id: "q1",
    screenNumber: 1,
    title: "What best describes your current professional profile?",
    fields: [
      {
        id: "current_role",
        label: "Current role — Select one:",
        type: "single",
        options: [
          { id: "sde", label: "Software Engineer / Developer" },
          { id: "senior_sde", label: "Senior Software Engineer" },
          { id: "lead_staff", label: "Lead / Staff Engineer" },
          { id: "eng_manager", label: "Engineering Manager" },
          { id: "ai_ml", label: "AI / ML Engineer" },
          { id: "data_eng", label: "Data Engineer / Data Scientist" },
          { id: "cloud_devops", label: "Cloud / DevOps / SRE Engineer" },
          { id: "cybersec", label: "Cybersecurity Professional" },
          { id: "other", label: "Other Technical Role" }
        ],
        min: 1,
        max: 1
      },
      {
        id: "experience",
        label: "Professional experience — Select one:",
        type: "single",
        options: [
          { id: "0_2", label: "0–2 years" },
          { id: "3_5", label: "3–5 years" },
          { id: "6_10", label: "6–10 years" },
          { id: "11_15", label: "11–15 years" },
          { id: "15_plus", label: "15+ years" }
        ],
        min: 1,
        max: 1
      },
      {
        id: "primary_area",
        label: "Primary technical area — Select up to 2:",
        type: "multiple",
        options: [
          { id: "soft_web", label: "Software / Web Engineering" },
          { id: "ai_ml_data", label: "AI / ML / Data" },
          { id: "cloud_devops", label: "Cloud / DevOps" },
          { id: "cybersec", label: "Cybersecurity" },
          { id: "mobile", label: "Mobile" },
          { id: "systems_infra", label: "Systems / Infrastructure" },
          { id: "other", label: "Other" }
        ],
        min: 1,
        max: 2
      }
    ],
    hasContext: true,
    contextPrompt: "Optional: What was your primary area of work or specialization?"
  },
  {
    id: "q2",
    screenNumber: 2,
    title: "When you began preparing for your first serious technical role, what best described your starting point?",
    fields: [
      {
        id: "starting_point",
        label: "Select one:",
        type: "single",
        options: [
          { id: "beginner", label: "Complete beginner" },
          { id: "basic_prog", label: "Basic programming knowledge" },
          { id: "comfortable_prog", label: "Comfortable with programming fundamentals" },
          { id: "strong_prog", label: "Strong programming fundamentals" },
          { id: "solving_prob", label: "Already solving coding/interview problems" },
          { id: "had_internship", label: "Already had internship/industry experience" }
        ],
        min: 1,
        max: 1
      }
    ],
    hasContext: true,
    contextPrompt: "Optional: What was your biggest strength or weakness at that time?"
  },
  {
    id: "q3",
    screenNumber: 3,
    title: "What type of technical opportunity were you primarily preparing for?",
    fields: [
      {
        id: "target_role",
        label: "Target role — Select one:",
        type: "single",
        options: [
          { id: "sde", label: "Software Development / SDE" },
          { id: "full_stack", label: "Full-Stack Development" },
          { id: "backend", label: "Backend Development" },
          { id: "frontend", label: "Frontend Development" },
          { id: "ai_ml", label: "AI / ML" },
          { id: "data_analytics", label: "Data / Analytics" },
          { id: "cloud_devops", label: "Cloud / DevOps / SRE" },
          { id: "cybersec", label: "Cybersecurity" },
          { id: "other", label: "Other Technical Role" }
        ],
        min: 1,
        max: 1
      },
      {
        id: "hiring_route",
        label: "Primary hiring route — Select one:",
        type: "single",
        options: [
          { id: "campus", label: "Campus placement" },
          { id: "off_campus", label: "Off-campus applications" },
          { id: "referral", label: "Referral" },
          { id: "internship_ppo", label: "Internship → PPO / conversion" },
          { id: "hackathon", label: "Hackathon / competition" },
          { id: "networking", label: "Networking / direct connection" },
          { id: "multiple", label: "Multiple routes" },
          { id: "other", label: "Other" }
        ],
        min: 1,
        max: 1
      }
    ],
    hasContext: true,
    contextPrompt: "Optional: Anything notable about the role or hiring route?"
  },
  {
    id: "q4",
    screenNumber: 4,
    title: "How did you primarily prepare for your target role?",
    fields: [
      {
        id: "preparation_strategy",
        label: "Select up to 5:",
        type: "multiple",
        options: [
          { id: "dsa", label: "Data Structures & Algorithms" },
          { id: "core_cs", label: "Core CS Fundamentals" },
          { id: "prog_lang", label: "Programming Language" },
          { id: "dev", label: "Development" },
          { id: "projects", label: "Personal Projects" },
          { id: "cp", label: "Competitive Programming" },
          { id: "aptitude", label: "Aptitude / Logical Reasoning" },
          { id: "mock_interviews", label: "Mock Interviews" },
          { id: "internships", label: "Internships" },
          { id: "open_source", label: "Open Source" },
          { id: "courses", label: "Courses / Structured Programs" },
          { id: "prev_questions", label: "Previous Interview Questions" },
          { id: "guidance", label: "Peer / Senior Guidance" },
          { id: "college_training", label: "College Placement Training" },
          { id: "self_study", label: "Self-study" },
          { id: "other", label: "Other" }
        ],
        min: 1,
        max: 5
      },
      {
        id: "preparation_duration",
        label: "Preparation duration — Select one:",
        type: "single",
        options: [
          { id: "lt_3m", label: "< 3 months" },
          { id: "3_6m", label: "3–6 months" },
          { id: "6_12m", label: "6–12 months" },
          { id: "1_2y", label: "1–2 years" },
          { id: "2y_plus", label: "2+ years" },
          { id: "continuous", label: "Preparation was continuous" }
        ],
        min: 1,
        max: 1
      }
    ],
    hasContext: true,
    contextPrompt: "Optional context."
  },
  {
    id: "q5",
    screenNumber: 5,
    title: "Which parts of your preparation contributed most to getting your first serious technical opportunity?",
    fields: [
      {
        id: "contributed_most",
        label: "Select up to 5:",
        type: "multiple",
        options: [
          { id: "dsa", label: "DSA & Problem Solving" },
          { id: "core_cs", label: "Core CS Fundamentals" },
          { id: "strong_prog", label: "Strong Programming Skills" },
          { id: "dev_skills", label: "Development Skills" },
          { id: "projects", label: "Projects" },
          { id: "internship", label: "Internship Experience" },
          { id: "cp", label: "Competitive Programming" },
          { id: "aptitude", label: "Aptitude" },
          { id: "communication", label: "Communication" },
          { id: "mock_interviews", label: "Mock Interviews" },
          { id: "open_source", label: "Open Source" },
          { id: "networking", label: "Networking / Referrals" },
          { id: "resume", label: "Resume / Portfolio" },
          { id: "company_prep", label: "Company-Specific Preparation" },
          { id: "academic", label: "Academic Performance" },
          { id: "other", label: "Other" }
        ],
        min: 1,
        max: 5
      },
      {
        id: "greatest_impact",
        label: "Which one had the greatest impact? (Select one from selected options)",
        type: "single",
        derivesFromId: "contributed_most",
        min: 1,
        max: 1
      }
    ],
    hasContext: true,
    contextPrompt: "Optional context."
  },
  {
    id: "q6",
    screenNumber: 6,
    title: "What type of practical work had the strongest impact on your resume or interviews?",
    fields: [
      {
        id: "project_type",
        label: "Select up to 3:",
        type: "multiple",
        options: [
          { id: "full_stack", label: "Full-Stack Application" },
          { id: "backend", label: "Backend / API System" },
          { id: "frontend", label: "Frontend Application" },
          { id: "mobile", label: "Mobile Application" },
          { id: "ai_ml", label: "AI / ML Project" },
          { id: "data_eng", label: "Data Engineering Project" },
          { id: "cloud_devops", label: "Cloud / DevOps Project" },
          { id: "cybersec", label: "Cybersecurity Project" },
          { id: "open_source", label: "Open-Source Contribution" },
          { id: "research", label: "Research Project" },
          { id: "freelance", label: "Real Client / Freelance Project" },
          { id: "startup", label: "Startup / Product Project" },
          { id: "hackathon", label: "Hackathon Project" },
          { id: "academic", label: "Academic Project" },
          { id: "other", label: "Other" },
          { id: "none", label: "I did not have significant project experience" }
        ],
        min: 1,
        max: 3
      },
      {
        id: "value_factor",
        label: "What made that experience valuable? (Select up to 3)",
        type: "multiple",
        options: [
          { id: "real_problem", label: "Solved a real problem" },
          { id: "real_users", label: "Used real users / real data" },
          { id: "tech_depth", label: "Demonstrated technical depth" },
          { id: "prob_solving", label: "Showed strong problem-solving" },
          { id: "prod_tech", label: "Used production technologies" },
          { id: "sys_design", label: "Demonstrated system design" },
          { id: "measurable", label: "Had measurable results" },
          { id: "easy_explain", label: "Was easy to explain in interviews" },
          { id: "ownership", label: "Demonstrated ownership" },
          { id: "other", label: "Other" }
        ],
        min: 0,
        max: 3
      }
    ],
    hasContext: true,
    contextPrompt: "Optional context."
  },
  {
    id: "q7",
    screenNumber: 7,
    title: "Based on your actual interview experience, what did companies evaluate most heavily?",
    fields: [
      {
        id: "evaluated_heavily",
        label: "Select up to 6:",
        type: "multiple",
        options: [
          { id: "dsa", label: "Data Structures & Algorithms" },
          { id: "prob_solving", label: "Problem-Solving Ability" },
          { id: "prog_fundamentals", label: "Programming Fundamentals" },
          { id: "oop", label: "OOP" },
          { id: "dbms", label: "DBMS / SQL" },
          { id: "os", label: "Operating Systems" },
          { id: "networks", label: "Computer Networks" },
          { id: "sys_design", label: "System Design" },
          { id: "projects", label: "Projects" },
          { id: "dev_skills", label: "Development Skills" },
          { id: "prog_lang", label: "Programming Language Knowledge" },
          { id: "aptitude", label: "Aptitude / Logical Reasoning" },
          { id: "communication", label: "Communication" },
          { id: "behavioral", label: "Behavioral / HR Skills" },
          { id: "resume", label: "Resume / Experience" },
          { id: "domain", label: "Domain-Specific Knowledge" },
          { id: "other", label: "Other" }
        ],
        min: 1,
        max: 6
      },
      {
        id: "most_decisive",
        label: "Which was the most decisive? (Select one from selected options)",
        type: "single",
        derivesFromId: "evaluated_heavily",
        min: 1,
        max: 1
      }
    ],
    hasContext: true,
    contextPrompt: "Optional context."
  },
  {
    id: "q8",
    screenNumber: 8,
    title: "Which challenges or mistakes most affected your preparation?",
    fields: [
      {
        id: "challenges",
        label: "Select up to 5:",
        type: "multiple",
        options: [
          { id: "late_dsa", label: "Started DSA too late" },
          { id: "weak_fundamentals", label: "Weak programming fundamentals" },
          { id: "inconsistent", label: "Inconsistent preparation" },
          { id: "too_many_resources", label: "Too many learning resources" },
          { id: "poor_time", label: "Poor time management" },
          { id: "weak_projects", label: "Built weak / copied projects" },
          { id: "not_enough_practice", label: "Did not practice enough problems" },
          { id: "ignored_core_cs", label: "Ignored Core CS" },
          { id: "ignored_internships", label: "Ignored internships" },
          { id: "no_mocks", label: "Did not do mock interviews" },
          { id: "poor_communication", label: "Poor communication" },
          { id: "no_strategy", label: "No clear preparation strategy" },
          { id: "certificates", label: "Focused too much on certificates" },
          { id: "only_academics", label: "Focused only on academics" },
          { id: "applied_late", label: "Started applying too late" },
          { id: "no_guidance", label: "Lack of guidance / mentorship" },
          { id: "other", label: "Other" }
        ],
        min: 1,
        max: 5
      },
      {
        id: "hurt_most",
        label: "Which one hurt you the most? (Select one from selected options)",
        type: "single",
        derivesFromId: "challenges",
        min: 1,
        max: 1
      }
    ],
    hasContext: true,
    contextPrompt: "Optional context."
  },
  {
    id: "q9",
    screenNumber: 9,
    title: "If you were preparing for your first technical role again today, what would you do differently?",
    fields: [
      {
        id: "do_differently",
        label: "Select up to 5:",
        type: "multiple",
        options: [
          { id: "early_dsa", label: "Start DSA earlier" },
          { id: "strengthen_fundamentals", label: "Strengthen programming fundamentals" },
          { id: "early_core_cs", label: "Study Core CS earlier" },
          { id: "better_projects", label: "Build better projects" },
          { id: "early_internship", label: "Get an internship earlier" },
          { id: "practice_more", label: "Practice more interview problems" },
          { id: "regular_mocks", label: "Do regular mock interviews" },
          { id: "structured_roadmap", label: "Follow a structured roadmap" },
          { id: "fewer_tech", label: "Focus on fewer technologies" },
          { id: "apply_early", label: "Start applying earlier" },
          { id: "improve_communication", label: "Improve communication" },
          { id: "seek_mentorship", label: "Seek mentorship earlier" },
          { id: "target_specific", label: "Target specific roles/companies" },
          { id: "stronger_portfolio", label: "Build a stronger portfolio" },
          { id: "less_certs", label: "Spend less time on low-value certifications" },
          { id: "other", label: "Other" }
        ],
        min: 1,
        max: 5
      }
    ],
    hasContext: true,
    contextPrompt: "Optional: What is the one thing you wish you had known earlier?"
  },
  {
    id: "q10",
    screenNumber: 10,
    title: "If a CSE student has 6–12 months before placement, what should they prioritize?",
    fields: [
      {
        id: "prioritize",
        label: "Select up to 6:",
        type: "multiple",
        options: [
          { id: "dsa", label: "Data Structures & Algorithms" },
          { id: "core_cs", label: "Core CS Fundamentals" },
          { id: "prog_fundamentals", label: "Programming Fundamentals" },
          { id: "dev_skills", label: "Development Skills" },
          { id: "strong_projects", label: "Strong Projects" },
          { id: "internship", label: "Internship Experience" },
          { id: "aptitude", label: "Aptitude / Logical Reasoning" },
          { id: "communication", label: "Communication" },
          { id: "mock_interviews", label: "Mock Interviews" },
          { id: "resume", label: "Resume / Portfolio" },
          { id: "open_source", label: "GitHub / Open Source" },
          { id: "company_prep", label: "Company-Specific Preparation" },
          { id: "networking", label: "Networking / Referrals" },
          { id: "sys_design", label: "System Design" },
          { id: "other", label: "Other" }
        ],
        min: 1,
        max: 6
      },
      {
        id: "top_3",
        label: "Choose your Top 3 priorities (1st, 2nd, 3rd).",
        type: "ranking",
        derivesFromId: "prioritize",
        min: 3,
        max: 3
      }
    ],
    hasContext: true,
    contextPrompt: "Optional: In 1–2 sentences, what is the most important advice you would give a CSE student preparing for placement?"
  }
];

export const studentSurveyConfig: SurveyScreen[] = [
  {
    id: "q1",
    screenNumber: 1,
    title: "Where are you right now?",
    fields: [
      {
        id: "current_stage",
        label: "What best describes your current stage?",
        type: "single",
        options: [
          { id: "1st_year", label: "1st Year" },
          { id: "2nd_year", label: "2nd Year" },
          { id: "3rd_year", label: "3rd Year" },
          { id: "final_year", label: "Final Year" },
          { id: "recent_grad", label: "Recent Graduate" }
        ],
        min: 1,
        max: 1
      }
    ],
    hasContext: false
  },
  {
    id: "q2",
    screenNumber: 2,
    title: "What are you preparing for?",
    fields: [
      {
        id: "target_role",
        label: "Which role are you primarily targeting?",
        type: "single",
        options: [
          { id: "sde", label: "Software Development / SDE" },
          { id: "full_stack", label: "Full-Stack Development" },
          { id: "backend", label: "Backend Development" },
          { id: "frontend", label: "Frontend Development" },
          { id: "ai_ml", label: "AI / ML" },
          { id: "data", label: "Data / Analytics" },
          { id: "cybersec", label: "Cybersecurity" },
          { id: "cloud_devops", label: "DevOps / Cloud" },
          { id: "not_sure", label: "I’m not sure yet" },
          { id: "other", label: "Other" }
        ],
        min: 1,
        max: 1
      }
    ],
    hasContext: false
  },
  {
    id: "q3",
    screenNumber: 3,
    title: "How prepared do you feel today?",
    fields: [
      {
        id: "preparedness",
        label: "Rate your current placement preparation.",
        type: "single",
        options: [
          { id: "1", label: "1 — Just Starting" },
          { id: "2", label: "2 — Early Stage" },
          { id: "3", label: "3 — Making Progress" },
          { id: "4", label: "4 — Well Prepared" },
          { id: "5", label: "5 — Interview Ready" }
        ],
        min: 1,
        max: 1
      }
    ],
    hasContext: false
  },
  {
    id: "q4",
    screenNumber: 4,
    title: "What’s your current preparation?",
    fields: [
      {
        id: "current_prep",
        label: "Select up to 5.",
        type: "multiple",
        options: [
          { id: "dsa", label: "DSA" },
          { id: "prog_fundamentals", label: "Programming Fundamentals" },
          { id: "core_cs", label: "Core CS" },
          { id: "dev", label: "Development" },
          { id: "projects", label: "Projects" },
          { id: "cp", label: "Competitive Programming" },
          { id: "aptitude", label: "Aptitude" },
          { id: "communication", label: "Communication" },
          { id: "resume", label: "Resume / Portfolio" },
          { id: "mocks", label: "Mock Interviews" },
          { id: "internships", label: "Internships" },
          { id: "nothing_consistent", label: "Nothing consistently yet" }
        ],
        min: 1,
        max: 5
      }
    ],
    hasContext: false
  },
  {
    id: "q5",
    screenNumber: 5,
    title: "Where are you getting stuck?",
    fields: [
      {
        id: "stuck",
        label: "Select up to 3.",
        type: "multiple",
        options: [
          { id: "dont_know_what_first", label: "I don’t know what to learn first" },
          { id: "dsa", label: "DSA / Problem Solving" },
          { id: "dev", label: "Development" },
          { id: "core_cs", label: "Core CS" },
          { id: "projects", label: "Building good projects" },
          { id: "internships", label: "Finding internships" },
          { id: "resume", label: "Resume / Portfolio" },
          { id: "interview_prep", label: "Interview preparation" },
          { id: "communication", label: "Communication" },
          { id: "consistent", label: "Staying consistent" },
          { id: "too_many_resources", label: "Too many resources / conflicting advice" },
          { id: "career_path", label: "Choosing the right career path" },
          { id: "company_expectations", label: "Understanding what companies actually expect" },
          { id: "other", label: "Other" }
        ],
        min: 1,
        max: 3
      }
    ],
    hasContext: false
  },
  {
    id: "q6",
    screenNumber: 6,
    title: "What do you want clarity on?",
    fields: [
      {
        id: "clarity",
        label: "Select up to 4.",
        type: "multiple",
        options: [
          { id: "what_to_learn", label: "What should I learn?" },
          { id: "what_first", label: "What should I learn first?" },
          { id: "skills_matter", label: "What skills matter for my target role?" },
          { id: "stop_wasting_time", label: "What should I stop wasting time on?" },
          { id: "how_good_skills", label: "How good are my current skills?" },
          { id: "what_projects", label: "What projects should I build?" },
          { id: "how_to_prep", label: "How should I prepare for interviews?" },
          { id: "companies_look_for", label: "What do companies actually look for?" },
          { id: "right_path", label: "Am I on the right preparation path?" },
          { id: "what_next", label: "What should I do next?" }
        ],
        min: 1,
        max: 4
      }
    ],
    hasContext: false
  },
  {
    id: "q7",
    screenNumber: 7,
    title: "What would make guidance genuinely useful?",
    fields: [
      {
        id: "useful_guidance",
        label: "Select up to 4.",
        type: "multiple",
        options: [
          { id: "roadmap", label: "Personalized preparation roadmap" },
          { id: "skill_gap", label: "Skill-gap analysis" },
          { id: "next_steps", label: "Recommended next steps" },
          { id: "real_exp", label: "Real professional experiences" },
          { id: "interview_prep", label: "Interview preparation" },
          { id: "project_recs", label: "Project recommendations" },
          { id: "company_specific", label: "Company-specific preparation" },
          { id: "progress_tracking", label: "Progress tracking" },
          { id: "career_guidance", label: "Career/role guidance" },
          { id: "mentor_recs", label: "Human mentor recommendations" }
        ],
        min: 1,
        max: 4
      }
    ],
    hasContext: false
  },
  {
    id: "q8",
    screenNumber: 8,
    title: "Where should AI help you?",
    fields: [
      {
        id: "ai_help",
        label: "If MentorMaze understands your profile, what would you want AI to do? (Select up to 4)",
        type: "multiple",
        options: [
          { id: "analyze_prep", label: "Analyze my current preparation" },
          { id: "weak_areas", label: "Identify my weak areas" },
          { id: "what_next", label: "Tell me what to learn next" },
          { id: "create_plan", label: "Create my preparation plan" },
          { id: "review_projects", label: "Review my projects" },
          { id: "simulate_interviews", label: "Simulate interviews" },
          { id: "analyze_resume", label: "Analyze my resume" },
          { id: "explain_expectations", label: "Explain what companies expect" },
          { id: "track_progress", label: "Track my progress" },
          { id: "career_decisions", label: "Help me make career decisions" }
        ],
        min: 1,
        max: 4
      }
    ],
    hasContext: false
  },
  {
    id: "q9",
    screenNumber: 9,
    title: "When would you want a human mentor?",
    fields: [
      {
        id: "human_mentor",
        label: "Where would real professional experience be more valuable than AI alone? (Select up to 3)",
        type: "multiple",
        options: [
          { id: "career_decisions", label: "Career decisions" },
          { id: "personal_exp", label: "Personal career experience" },
          { id: "project_feedback", label: "Project feedback" },
          { id: "interview_exp", label: "Interview experience" },
          { id: "industry_expectations", label: "Industry expectations" },
          { id: "difficult_decisions", label: "Difficult career decisions" },
          { id: "accountability", label: "Accountability" },
          { id: "evaluating_readiness", label: "Evaluating whether I’m actually ready" },
          { id: "prefer_ai", label: "I would prefer AI for most things" },
          { id: "not_sure", label: "I’m not sure yet" }
        ],
        min: 1,
        max: 3
      }
    ],
    hasContext: false
  },
  {
    id: "q10",
    screenNumber: 10,
    title: "Make MentorMaze useful for YOU",
    fields: [
      {
        id: "one_question",
        label: "What is the one question you most want MentorMaze to answer about your placement journey?",
        type: "textarea",
        min: 0,
        max: 800
      }
    ],
    hasContext: true,
    contextPrompt: "Write it in your own words. For example: “Am I focusing on the right things for an SDE role?”"
  }
];

export const professionalManifest: SurveyManifest = {
  surveyType: 'professional',
  version: '1.0',
  hero: {
    badge: 'AI + HUMAN CSE PLACEMENT MENTORSHIP',
    titleTop: 'Learn from people who already made',
    titleHighlight: 'the journey.',
    description: 'Real technical-career experiences from professionals can help the next generation of CSE students understand what actually matters — what to learn, how to prepare, and what companies really evaluate.',
    buttonText: 'Share Your Experience'
  },
  success: {
    title: 'YOUR EXPERIENCE\nMATTERS.',
    message: 'Thank you for sharing your journey.',
    subMessage: 'The lessons you learned, the challenges you faced, and the choices you made can help future CSE students find a clearer path.'
  },
  config: professionalSurveyConfig
};

export const studentManifest: SurveyManifest = {
  surveyType: 'student',
  version: '1.0',
  hero: {
    badge: 'STUDENT PLACEMENT PROFILE',
    titleTop: 'Build a better placement path for',
    titleHighlight: 'yourself.',
    description: 'Tell us where you are, what you\'re targeting, and where you need clarity. This helps us build MentorMaze around real student needs, not assumptions.',
    buttonText: 'Start Your Profile'
  },
  success: {
    title: 'THANK YOU FOR\nCONTRIBUTING.',
    message: 'Your profile has been saved.',
    subMessage: 'Your answers help us understand where CSE students actually need clarity, direction, and mentorship — so MentorMaze can be built around real student needs, not assumptions.'
  },
  config: studentSurveyConfig
};
