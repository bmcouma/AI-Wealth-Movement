export interface AITool {
  id: string;
  name: string;
  category: 'Coding' | 'Image & Design' | 'Productivity' | 'GIS & Spatial' | 'Automation' | 'Audio & Video' | 'Research';
  description: string;
  detailedSpecs?: string;
  pricing: 'Free' | 'Freemium' | 'Paid';
  isBeginnerFriendly: boolean;
  featured: boolean;
  tags: string[];
  url: string;
}

export interface PromptItem {
  id: string;
  title: string;
  category: 'Software Engineering' | 'GIS & Remote Sensing' | 'Business & Freelancing' | 'Job Search & CV' | 'Content Creation' | 'Automation';
  task: string;
  template: string;
  variables: string[];
  defaultValues?: Record<string, string>;
  instructions: string;
}

export interface AIJob {
  id: string;
  title: string;
  category: 'Data Annotation' | 'Prompt Engineering' | 'GIS & Spatial Analysis' | 'Automation & Agents' | 'Machine Learning';
  type: 'Full-Time' | 'Contract' | 'Freelance' | 'Internship';
  location: 'Remote' | 'Hybrid' | 'On-site';
  experience: 'Entry-Level' | 'Intermediate' | 'Senior';
  salaryRange?: string;
  skills: string[];
  description: string;
  responsibilities: string[];
  qualifications: string[];
  postedDate: string;
  isSample: boolean;
  url: string;
}

export interface GisResource {
  id: string;
  title: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  techStack: string[];
  summary: string;
  useCase: string;
  readTime: string;
  steps: {
    title: string;
    description: string;
    codeSnippet?: string;
    language?: string;
  }[];
}

export interface LearningCourse {
  id: string;
  title: string;
  category: 'Fundamentals' | 'Prompting' | 'Automation' | 'Geospatial AI';
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  duration: string;
  description: string;
  outcomes: string[];
  modules: {
    id: string;
    title: string;
    duration: string;
    overview: string;
  }[];
}

export interface CommunitySubmission {
  id: string;
  title: string;
  category: 'Tools' | 'Prompts' | 'GIS' | 'Tutorials';
  link: string;
  notes: string;
  date: string;
  status: 'Pending Review' | 'Verified';
}

export type ActiveTab = 'home' | 'explore' | 'tools' | 'prompts' | 'jobs' | 'gis' | 'learning' | 'about';
