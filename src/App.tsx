import React, { useState, useMemo, useEffect } from 'react';
import { 
  TOOLS_DATA, 
  PROMPTS_DATA, 
  JOBS_DATA, 
  GIS_RESOURCES, 
  LEARNING_COURSES 
} from './data/platformData';
import { 
  AITool, 
  PromptItem, 
  AIJob, 
  GisResource, 
  LearningCourse, 
  ActiveTab,
  CommunitySubmission 
} from './types';
import { 
  Search, 
  Copy, 
  Check, 
  ExternalLink, 
  Bookmark, 
  Sliders, 
  Code, 
  Globe, 
  ChevronRight, 
  X, 
  CheckCircle2, 
  Send, 
  Info, 
  Terminal, 
  BookOpen, 
  Briefcase,
  Compass,
  Layers,
  ArrowRight
} from 'lucide-react';

export default function App() {
  const [currentTab, setCurrentTab] = useState<ActiveTab>('home');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Favorites state persisted in localStorage
  const [savedTools, setSavedTools] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('aiwm_saved_tools');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [savedJobs, setSavedJobs] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('aiwm_saved_jobs');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Course progress persisted in localStorage
  const [completedModules, setCompletedModules] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('aiwm_completed_modules');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Tools View State
  const [toolSearch, setToolSearch] = useState('');
  const [toolCategory, setToolCategory] = useState<string>('All');
  const [toolPricing, setToolPricing] = useState<string>('All');
  const [onlyBeginner, setOnlyBeginner] = useState(false);
  const [selectedTool, setSelectedTool] = useState<AITool | null>(null);
  const [showSavedOnlyTools, setShowSavedOnlyTools] = useState(false);

  // Prompts View State
  const [promptSearch, setPromptSearch] = useState('');
  const [promptCategory, setPromptCategory] = useState<string>('All');
  const [activePromptModal, setActivePromptModal] = useState<PromptItem | null>(null);
  const [customVariables, setCustomVariables] = useState<Record<string, string>>({});
  const [copiedPromptId, setCopiedPromptId] = useState<string | null>(null);

  // Jobs View State
  const [jobCategory, setJobCategory] = useState<string>('All');
  const [jobType, setJobType] = useState<string>('All');
  const [jobSearch, setJobSearch] = useState('');
  const [selectedJob, setSelectedJob] = useState<AIJob | null>(null);
  const [showSavedOnlyJobs, setShowSavedOnlyJobs] = useState(false);

  // GIS Interactive Simulator State (NDVI Calculator)
  const [gisActiveWorkflow, setGisActiveWorkflow] = useState<GisResource>(GIS_RESOURCES[0]);
  const [activeStepIndex, setActiveStepIndex] = useState(0);
  const [copiedCodeSnippet, setCopiedCodeSnippet] = useState(false);
  // Interactive NDVI Band Simulator Values
  const [nirValue, setNirValue] = useState<number>(0.72);
  const [redValue, setRedValue] = useState<number>(0.14);

  // Learning Hub Active Syllabus Modal
  const [activeCourse, setActiveCourse] = useState<LearningCourse | null>(null);

  // Resource Submission Form State
  const [isSubmitModalOpen, setIsSubmitModalOpen] = useState(false);
  const [submitForm, setSubmitForm] = useState({ 
    title: '', 
    category: 'Tools' as CommunitySubmission['category'], 
    link: '', 
    notes: '' 
  });
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [mySubmissions, setMySubmissions] = useState<CommunitySubmission[]>(() => {
    try {
      const saved = localStorage.getItem('aiwm_submissions');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Contact form in About page
  const [contactMessage, setContactMessage] = useState({ name: '', email: '', message: '' });
  const [contactSent, setContactSent] = useState(false);

  // Sync favorites
  useEffect(() => {
    try {
      localStorage.setItem('aiwm_saved_tools', JSON.stringify(savedTools));
    } catch {
      // ignore
    }
  }, [savedTools]);

  useEffect(() => {
    try {
      localStorage.setItem('aiwm_saved_jobs', JSON.stringify(savedJobs));
    } catch {
      // ignore
    }
  }, [savedJobs]);

  useEffect(() => {
    try {
      localStorage.setItem('aiwm_completed_modules', JSON.stringify(completedModules));
    } catch {
      // ignore
    }
  }, [completedModules]);

  useEffect(() => {
    try {
      localStorage.setItem('aiwm_submissions', JSON.stringify(mySubmissions));
    } catch {
      // ignore
    }
  }, [mySubmissions]);

  // Toast trigger
  const triggerToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage((current) => (current === msg ? null : current));
    }, 3200);
  };

  // Toggle tool bookmark
  const toggleSaveTool = (id: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    if (savedTools.includes(id)) {
      setSavedTools(savedTools.filter(t => t !== id));
      triggerToast('Removed from saved tools');
    } else {
      setSavedTools([...savedTools, id]);
      triggerToast('Saved tool to your bookmarks');
    }
  };

  // Toggle job bookmark
  const toggleSaveJob = (id: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    if (savedJobs.includes(id)) {
      setSavedJobs(savedJobs.filter(j => j !== id));
      triggerToast('Removed from saved opportunities');
    } else {
      setSavedJobs([...savedJobs, id]);
      triggerToast('Saved opportunity to your bookmarks');
    }
  };

  // Toggle completed learning module
  const toggleModuleCompletion = (moduleId: string) => {
    if (completedModules.includes(moduleId)) {
      setCompletedModules(completedModules.filter(m => m !== moduleId));
    } else {
      setCompletedModules([...completedModules, moduleId]);
      triggerToast('Module marked as completed');
    }
  };

  // Copy to clipboard helper
  const copyTextToClipboard = async (text: string, idForState?: string) => {
    try {
      await navigator.clipboard.writeText(text);
      if (idForState) {
        setCopiedPromptId(idForState);
        setTimeout(() => setCopiedPromptId(null), 2500);
      }
      triggerToast('Copied to clipboard');
    } catch {
      triggerToast('Copied successfully');
    }
  };

  // Compute interpolated prompt string
  const buildCustomPrompt = (item: PromptItem) => {
    let result = item.template;
    item.variables.forEach((variable) => {
      const val = customVariables[variable] || item.defaultValues?.[variable] || `[${variable}]`;
      result = result.split(`[${variable}]`).join(val);
    });
    return result;
  };

  // Filtered tools
  const filteredTools = useMemo(() => {
    return TOOLS_DATA.filter((tool) => {
      const matchesSearch = 
        tool.name.toLowerCase().includes(toolSearch.toLowerCase()) || 
        tool.description.toLowerCase().includes(toolSearch.toLowerCase()) ||
        tool.tags.some(t => t.toLowerCase().includes(toolSearch.toLowerCase()));
      const matchesCategory = toolCategory === 'All' || tool.category === toolCategory;
      const matchesPricing = toolPricing === 'All' || tool.pricing === toolPricing;
      const matchesBeginner = !onlyBeginner || tool.isBeginnerFriendly;
      const matchesSaved = !showSavedOnlyTools || savedTools.includes(tool.id);
      return matchesSearch && matchesCategory && matchesPricing && matchesBeginner && matchesSaved;
    });
  }, [toolSearch, toolCategory, toolPricing, onlyBeginner, showSavedOnlyTools, savedTools]);

  // Filtered Prompts
  const filteredPrompts = useMemo(() => {
    return PROMPTS_DATA.filter((p) => {
      const matchesSearch = 
        p.title.toLowerCase().includes(promptSearch.toLowerCase()) || 
        p.task.toLowerCase().includes(promptSearch.toLowerCase()) ||
        p.variables.some(v => v.toLowerCase().includes(promptSearch.toLowerCase()));
      const matchesCategory = promptCategory === 'All' || p.category === promptCategory;
      return matchesSearch && matchesCategory;
    });
  }, [promptSearch, promptCategory]);

  // Filtered Jobs
  const filteredJobs = useMemo(() => {
    return JOBS_DATA.filter((job) => {
      const matchesCat = jobCategory === 'All' || job.category === jobCategory;
      const matchesType = jobType === 'All' || job.type === jobType;
      const matchesSearch = 
        job.title.toLowerCase().includes(jobSearch.toLowerCase()) ||
        job.skills.some(s => s.toLowerCase().includes(jobSearch.toLowerCase())) ||
        job.location.toLowerCase().includes(jobSearch.toLowerCase());
      const matchesSaved = !showSavedOnlyJobs || savedJobs.includes(job.id);
      return matchesCat && matchesType && matchesSearch && matchesSaved;
    });
  }, [jobCategory, jobType, jobSearch, showSavedOnlyJobs, savedJobs]);

  // Handle Resource Submission
  const handleResourceSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!submitForm.title.trim() || !submitForm.link.trim()) {
      triggerToast('Please complete the title and destination link.');
      return;
    }
    setFormSubmitted(true);
    setTimeout(() => {
      const newSubmission: CommunitySubmission = {
        id: `sub-${Date.now()}`,
        title: submitForm.title.trim(),
        category: submitForm.category,
        link: submitForm.link.trim(),
        notes: submitForm.notes.trim(),
        date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
        status: 'Pending Review'
      };
      setMySubmissions([newSubmission, ...mySubmissions]);
      setFormSubmitted(false);
      setIsSubmitModalOpen(false);
      setSubmitForm({ title: '', category: 'Tools', link: '', notes: '' });
      triggerToast('Proposal submitted. Saved under your community contributions.');
    }, 800);
  };

  // Handle contact form submit
  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!contactMessage.name || !contactMessage.email || !contactMessage.message) {
      triggerToast('Please fill out all contact fields.');
      return;
    }
    setContactSent(true);
    setTimeout(() => {
      setContactSent(false);
      setContactMessage({ name: '', email: '', message: '' });
      triggerToast('Inquiry sent! Our coordination team will respond shortly.');
    }, 700);
  };

  // NDVI calculation for the interactive simulator: (NIR - Red) / (NIR + Red)
  const currentNdvi = useMemo(() => {
    const denom = nirValue + redValue;
    if (denom === 0) return 0;
    return Number(((nirValue - redValue) / denom).toFixed(3));
  }, [nirValue, redValue]);

  // NDVI Classification health interpretation
  const ndviStatus = useMemo(() => {
    if (currentNdvi > 0.6) return { label: 'Dense Healthy Canopy', color: 'text-emerald-400', barBg: 'bg-emerald-500', desc: 'Vigorous chlorophyll activity, optimal agricultural density.' };
    if (currentNdvi > 0.3) return { label: 'Moderate / Sparse Vegetation', color: 'text-lime-400', barBg: 'bg-lime-500', desc: 'Typical shrubland, early crop growth, or mild water stress.' };
    if (currentNdvi > 0.1) return { label: 'Bare Soil / Arid Sand', color: 'text-amber-400', barBg: 'bg-amber-500', desc: 'Exposed surface ground, urban asphalt, or fallow field.' };
    return { label: 'Water Body / Cloud Shadow', color: 'text-cyan-400', barBg: 'bg-cyan-500', desc: 'Near-zero or negative reflectance typical of deep water or ice.' };
  }, [currentNdvi]);

  return (
    <div className="min-h-screen bg-[#080C15] text-slate-100 font-sans flex flex-col selection:bg-blue-600 selection:text-white">
      {/* Toast Notification */}
      {toastMessage && (
        <div 
          role="status" 
          aria-live="polite"
          className="fixed bottom-6 right-6 z-50 bg-[#0E172A] text-slate-100 px-4 py-3 rounded-lg shadow-2xl text-xs font-medium flex items-center space-x-2.5 border border-slate-700 animate-fade-in"
        >
          <CheckCircle2 className="w-4 h-4 text-blue-400 shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* TOP BAR CONTRACT:
          Zone 1: Single text element wordmark
          Zone 2: 4-5 concise single-line nav links
          Zone 3: 1 primary action button
      */}
      <header className="sticky top-0 z-40 bg-[#0A0F1D]/90 backdrop-blur-md border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-8">
          
          {/* Zone 1: Wordmark */}
          <button 
            onClick={() => { setCurrentTab('home'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
            className="flex items-center space-x-2.5 text-left focus:outline-none whitespace-nowrap shrink-0 group"
          >
            <div className="w-8 h-8 rounded-md bg-blue-600 flex items-center justify-center text-white font-bold text-xs shadow-sm shadow-blue-500/20 group-hover:bg-blue-500 transition-colors">
              WM
            </div>
            <span className="text-sm font-bold tracking-tight text-white group-hover:text-blue-300 transition-colors">
              AI WEALTH MOVEMENT
            </span>
          </button>

          {/* Zone 2: Navigation Links (single line, no wrapping) */}
          <nav className="hidden lg:flex items-center space-x-1 text-xs font-medium text-slate-300">
            {[
              { id: 'home', label: 'Home' },
              { id: 'explore', label: 'Explore' },
              { id: 'tools', label: 'AI Tools' },
              { id: 'prompts', label: 'Prompt Studio' },
              { id: 'jobs', label: 'Opportunities' },
              { id: 'gis', label: 'GIS & Spatial AI' },
              { id: 'learning', label: 'Learning Hub' },
              { id: 'about', label: 'About' }
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => { setCurrentTab(item.id as ActiveTab); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                className={`px-3 py-1.5 rounded-md whitespace-nowrap shrink-0 transition-colors ${
                  currentTab === item.id 
                    ? 'text-white bg-slate-800/80 font-semibold' 
                    : 'hover:text-white hover:bg-slate-800/40 text-slate-300'
                }`}
              >
                {item.label}
              </button>
            ))}
          </nav>

          {/* Zone 3: 1 Primary Action */}
          <div className="flex items-center space-x-2 shrink-0">
            <button
              onClick={() => setIsSubmitModalOpen(true)}
              className="px-3.5 py-1.5 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-500 rounded-md transition-colors shadow-sm whitespace-nowrap shrink-0"
            >
              + Submit Resource
            </button>

            {/* Mobile menu toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden text-slate-400 hover:text-white p-1.5 rounded-md focus:outline-none"
              aria-label="Toggle navigation drawer"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Layers className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-b border-slate-800 bg-[#0A0F1D] px-4 pt-2 pb-5 space-y-1">
            {[
              { id: 'home', label: 'Home' },
              { id: 'explore', label: 'Explore AI' },
              { id: 'tools', label: 'Tools Directory' },
              { id: 'prompts', label: 'Prompt Studio' },
              { id: 'jobs', label: 'Opportunities Board' },
              { id: 'gis', label: 'GIS & Spatial AI Hub' },
              { id: 'learning', label: 'Learning Hub' },
              { id: 'about', label: 'About & Community' }
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  setCurrentTab(item.id as ActiveTab);
                  setMobileMenuOpen(false);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className={`w-full text-left px-3 py-2 rounded-md text-xs font-medium ${
                  currentTab === item.id 
                    ? 'text-white bg-blue-600/30 font-semibold' 
                    : 'text-slate-300 hover:bg-slate-800/60'
                }`}
              >
                {item.label}
              </button>
            ))}
            <div className="pt-2 border-t border-slate-800/80">
              <button
                onClick={() => { setIsSubmitModalOpen(true); setMobileMenuOpen(false); }}
                className="w-full text-center text-xs font-semibold py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-md"
              >
                Submit Resource
              </button>
            </div>
          </div>
        )}
      </header>

      {/* Main Content Area */}
      <main className="flex-grow">
        {/* ============================================================ */}
        {/* VIEW 1: HOME */}
        {/* ============================================================ */}
        {currentTab === 'home' && (
          <div>
            {/* Hero Section */}
            <section className="relative overflow-hidden pt-14 pb-16 border-b border-slate-800">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
                <div className="inline-flex items-center space-x-2 text-xs font-medium text-slate-400 mb-5">
                  <span className="text-blue-400 font-semibold">Practical Applied Intelligence</span>
                  <span aria-hidden="true">·</span>
                  <span>Skills, Tools & Digital Workflows</span>
                </div>
                
                <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white max-w-4xl mx-auto leading-tight" style={{ textWrap: 'balance' }}>
                  Turn Artificial Intelligence into <span className="text-blue-400">Applicable Competence</span>.
                </h1>
                
                <p className="mt-5 text-sm sm:text-base text-slate-400 max-w-2xl mx-auto font-normal leading-relaxed">
                  Discover curated AI tools, master deterministic prompt engineering, explore hands-on geospatial workflows, and discover emerging practical opportunities without noise or hype.
                </p>

                {/* Primary Action Buttons */}
                <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
                  <button 
                    onClick={() => { setCurrentTab('tools'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                    className="px-5 py-2.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold shadow-md transition-colors flex items-center space-x-2"
                  >
                    <span>Browse AI Tools</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                  <button 
                    onClick={() => { setCurrentTab('prompts'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                    className="px-5 py-2.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 text-xs font-semibold transition-colors flex items-center space-x-2"
                  >
                    <Code className="w-3.5 h-3.5 text-blue-400" />
                    <span>Open Prompt Studio</span>
                  </button>
                  <button 
                    onClick={() => { setCurrentTab('gis'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                    className="px-5 py-2.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 text-xs font-semibold transition-colors flex items-center space-x-2"
                  >
                    <Globe className="w-3.5 h-3.5 text-emerald-400" />
                    <span>GIS & Satellite Hub</span>
                  </button>
                </div>

                {/* Unboxed Metadata Banner */}
                <div className="mt-12 pt-6 border-t border-slate-800 max-w-3xl mx-auto flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs text-slate-400">
                  <span>9 Verified Tool Engines</span>
                  <span aria-hidden="true">·</span>
                  <span>Deterministic Prompt Templates</span>
                  <span aria-hidden="true">·</span>
                  <span>Geospatial Earth Observation Tracks</span>
                  <span aria-hidden="true">·</span>
                  <span>Zero Advertisements</span>
                </div>
              </div>
            </section>

            {/* Knowledge Pillars */}
            <section className="py-14 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-3">
                <div>
                  <h2 className="text-xl font-bold text-white tracking-tight">Structured Knowledge Tracks</h2>
                  <p className="text-xs text-slate-400 mt-1">Modular domains built for software developers, spatial analysts, and independent builders.</p>
                </div>
                <button
                  onClick={() => setCurrentTab('explore')}
                  className="text-xs text-blue-400 hover:text-blue-300 font-medium flex items-center space-x-1"
                >
                  <span>Explore full taxonomy</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {[
                  { title: 'AI Tools Directory', desc: 'Direct access to vetted code assistants, GIS platforms, and automation engines.', tab: 'tools', count: `${TOOLS_DATA.length} Tools` },
                  { title: 'Prompt Studio', desc: 'Customizable variables with live previews for high-precision model execution.', tab: 'prompts', count: `${PROMPTS_DATA.length} Formulas` },
                  { title: 'GIS & Satellite AI', desc: 'Sentinel-2 band math, NDVI indices, building footprint segmentation, and GEE.', tab: 'gis', count: `${GIS_RESOURCES.length} Guides` },
                  { title: 'Opportunities Board', desc: 'Profiles in data labeling, model auditing, spatial analysis, and agent workflows.', tab: 'jobs', count: `${JOBS_DATA.length} Profiles` },
                  { title: 'Learning Syllabus', desc: 'Self-paced roadmaps with concrete technical checklists and outcomes.', tab: 'learning', count: `${LEARNING_COURSES.length} Tracks` },
                  { title: 'Workflow Automation', desc: 'Connect webhooks, REST APIs, and generative completions without code.', tab: 'tools', count: 'No-Code' },
                  { title: 'Interactive NDVI Simulator', desc: 'Hands-on band reflectance slider with real-time health index calculations.', tab: 'gis', count: 'Interactive' },
                  { title: 'Community Index', desc: 'Suggest verified resources or contribute prompt templates for review.', tab: 'about', count: 'Open Access' }
                ].map((item, idx) => (
                  <div 
                    key={idx}
                    onClick={() => { setCurrentTab(item.tab as ActiveTab); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                    className="p-5 rounded-lg bg-[#0E1526] border border-slate-800 hover:border-slate-700 transition cursor-pointer group flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex justify-between items-center text-xs text-slate-400 mb-2.5">
                        <span className="font-mono text-[11px] text-blue-400">{item.count}</span>
                        <ChevronRight className="w-4 h-4 text-slate-500 group-hover:text-blue-400 transition transform group-hover:translate-x-0.5" />
                      </div>
                      <h3 className="text-sm font-bold text-white group-hover:text-blue-300 transition-colors">{item.title}</h3>
                      <p className="text-xs text-slate-400 mt-1.5 leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Featured Tools Snapshot */}
            <section className="py-12 bg-[#0A0F1D] border-y border-slate-800">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-end mb-6">
                  <div>
                    <h2 className="text-lg font-bold text-white">Featured Technical Tools</h2>
                    <p className="text-xs text-slate-400 mt-0.5">Foundational developer and spatial platforms with verified endpoints.</p>
                  </div>
                  <button 
                    onClick={() => setCurrentTab('tools')}
                    className="text-xs text-blue-400 hover:text-blue-300 font-medium"
                  >
                    View All Directory →
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {TOOLS_DATA.filter(t => t.featured).slice(0, 3).map((tool) => (
                    <div key={tool.id} className="p-4 rounded-lg bg-[#0E1526] border border-slate-800 flex flex-col justify-between">
                      <div>
                        <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
                          <span className="text-blue-400 font-medium">{tool.category}</span>
                          <span>{tool.pricing}</span>
                        </div>
                        <h4 className="font-bold text-white text-sm">{tool.name}</h4>
                        <p className="text-xs text-slate-400 mt-1.5 line-clamp-2 leading-relaxed">{tool.description}</p>
                      </div>
                      <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between">
                        <button
                          onClick={() => { setSelectedTool(tool); }}
                          className="text-xs text-slate-400 hover:text-white"
                        >
                          Quick Specs
                        </button>
                        <a 
                          href={tool.url} 
                          target="_blank" 
                          rel="noreferrer"
                          className="text-xs font-semibold text-blue-400 hover:text-blue-300 flex items-center space-x-1"
                        >
                          <span>Official Site</span>
                          <ExternalLink className="w-3 h-3" />
                        </a>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* Geospatial Spotlight Banner */}
            <section className="py-14 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="bg-[#0E1526] border border-slate-800 rounded-xl p-6 sm:p-8 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                <div className="max-w-2xl">
                  <div className="text-xs text-emerald-400 font-semibold mb-1">Specialized Track</div>
                  <h3 className="text-xl sm:text-2xl font-bold text-white">GIS & Planetary Satellite Intelligence</h3>
                  <p className="text-xs sm:text-sm text-slate-400 mt-2 leading-relaxed">
                    Learn how open satellite constellations like Copernicus Sentinel-2 combined with Python data science enable automated land cover mapping, crop health analytics, and climate risk modeling.
                  </p>
                  <div className="mt-4 flex flex-wrap gap-4 text-xs text-slate-400">
                    <span>Raster Algebra</span>
                    <span aria-hidden="true">·</span>
                    <span>QGIS & Plugins</span>
                    <span aria-hidden="true">·</span>
                    <span>Google Earth Engine</span>
                    <span aria-hidden="true">·</span>
                    <span>GeoPandas Vector Ops</span>
                  </div>
                </div>
                <div className="flex sm:flex-col gap-3 shrink-0">
                  <button
                    onClick={() => { setCurrentTab('gis'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                    className="px-5 py-2.5 bg-blue-600 hover:bg-blue-500 text-white rounded-md text-xs font-semibold transition-colors flex items-center justify-center space-x-1.5"
                  >
                    <span>Launch GIS Workflows</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => { setCurrentTab('prompts'); setPromptCategory('GIS & Remote Sensing'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                    className="px-5 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 rounded-md text-xs font-semibold transition-colors"
                  >
                    GIS Prompts
                  </button>
                </div>
              </div>
            </section>
          </div>
        )}

        {/* ============================================================ */}
        {/* VIEW 2: EXPLORE AI TAXONOMY */}
        {/* ============================================================ */}
        {currentTab === 'explore' && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
            <div className="max-w-3xl mb-8">
              <h1 className="text-2xl sm:text-3xl font-bold text-white">Explore Applied AI Fields</h1>
              <p className="text-slate-400 text-xs sm:text-sm mt-1.5 leading-relaxed">
                A structured taxonomy of modern artificial intelligence disciplines, industry-standard tooling, and practical competencies required for professional deployment.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {[
                {
                  domain: 'Large Language Models (LLMs)',
                  focus: 'Transformer token generation, context optimization, multi-turn reasoning, and structured data outputs.',
                  tools: ['Claude 3.5 Sonnet', 'GPT-4o', 'Llama 3.3', 'Gemini 2.5 Flash'],
                  skills: ['System Prompt Engineering', 'JSON Schema Enforcement', 'Context Budgeting'],
                  linkTab: 'prompts'
                },
                {
                  domain: 'Geospatial AI & Remote Sensing',
                  focus: 'Multi-spectral satellite processing, raster band math, environmental monitoring, and vector geometries.',
                  tools: ['QGIS', 'Google Earth Engine', 'GeoPandas', 'Rasterio'],
                  skills: ['NDVI / NDWI Calculation', 'Land Cover Classification', 'STAC Catalog Queries'],
                  linkTab: 'gis'
                },
                {
                  domain: 'Agentic Workflows & Automation',
                  focus: 'Connecting webhook triggers, third-party REST APIs, and generative functions into autonomous pipelines.',
                  tools: ['Make.com', 'n8n', 'Zapier', 'LangChain'],
                  skills: ['Webhook Orchestration', 'Error Routing', 'CRM & DB Synchronization'],
                  linkTab: 'tools'
                },
                {
                  domain: 'Computer Vision & Segmentation',
                  focus: 'Object detection, building footprint extraction, and aerial imagery polygon vectorization.',
                  tools: ['Meta SAM', 'YOLOv8', 'OpenCV', 'CVAT'],
                  skills: ['Bounding Box Annotation', 'Mask-to-Polygon Vectorization', 'Orthophoto Calibration'],
                  linkTab: 'gis'
                },
                {
                  domain: 'AI Safety & Red Teaming',
                  focus: 'Adversarial prompt injection testing, security guardrails, data leakage mitigation, and evaluation suites.',
                  tools: ['Garak', 'OWASP Top 10 LLM', 'Llama-Guard'],
                  skills: ['Adversarial Testing', 'Boundary Auditing', 'Evaluation Benchmarks'],
                  linkTab: 'prompts'
                },
                {
                  domain: 'Digital Freelancing with AI',
                  focus: 'Monetizing AI capabilities through client automation retainers, custom spatial maps, and prompt optimization.',
                  tools: ['Cursor', 'Perplexity', 'Make', 'GitHub'],
                  skills: ['Value-Based Proposal Design', 'Rapid Prototyping', 'Client Workflow Auditing'],
                  linkTab: 'jobs'
                }
              ].map((item, idx) => (
                <div key={idx} className="bg-[#0E1526] border border-slate-800 rounded-lg p-5 flex flex-col justify-between">
                  <div>
                    <h3 className="text-base font-bold text-white">{item.domain}</h3>
                    <p className="text-xs text-slate-400 mt-2 leading-relaxed">{item.focus}</p>

                    <div className="mt-4">
                      <span className="text-[11px] font-semibold text-slate-300 block mb-1">Standard Tooling:</span>
                      <div className="flex flex-wrap gap-1.5">
                        {item.tools.map((t, i) => (
                          <span key={i} className="text-[11px] px-2 py-0.5 rounded bg-[#090D18] text-slate-300 border border-slate-800">
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="mt-3">
                      <span className="text-[11px] font-semibold text-slate-300 block mb-1">Core Competencies:</span>
                      <p className="text-xs text-slate-400 leading-relaxed">
                        {item.skills.join(' · ')}
                      </p>
                    </div>
                  </div>

                  <div className="mt-5 pt-3 border-t border-slate-800/80 flex justify-end">
                    <button
                      onClick={() => { setCurrentTab(item.linkTab as ActiveTab); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                      className="text-xs font-semibold text-blue-400 hover:text-blue-300 flex items-center space-x-1"
                    >
                      <span>Explore Related Module</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ============================================================ */}
        {/* VIEW 3: AI TOOLS DIRECTORY */}
        {/* ============================================================ */}
        {currentTab === 'tools' && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
              <div>
                <h1 className="text-2xl sm:text-3xl font-bold text-white">AI Tools Directory</h1>
                <p className="text-slate-400 text-xs sm:text-sm mt-1">
                  Curated directory of vetted platforms with direct links and technical specifications.
                </p>
              </div>

              {/* Bookmark Toggle */}
              <button
                onClick={() => setShowSavedOnlyTools(!showSavedOnlyTools)}
                className={`px-3 py-1.5 rounded-md text-xs font-semibold transition-colors flex items-center space-x-1.5 self-start md:self-auto ${
                  showSavedOnlyTools 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-slate-800 text-slate-300 hover:bg-slate-700 border border-slate-700'
                }`}
              >
                <Bookmark className="w-3.5 h-3.5" />
                <span>Saved Tools ({savedTools.length})</span>
              </button>
            </div>

            {/* Filter Bar */}
            <div className="bg-[#0E1526] p-4 rounded-lg border border-slate-800 mb-6 flex flex-col md:flex-row items-stretch md:items-center gap-3">
              <div className="relative flex-grow">
                <Search className="w-4 h-4 text-slate-500 absolute left-3 top-2.5" />
                <input
                  type="text"
                  placeholder="Search tools by name, description, tags..."
                  value={toolSearch}
                  onChange={(e) => setToolSearch(e.target.value)}
                  className="w-full pl-9 pr-3 py-1.5 rounded-md bg-[#080C15] border border-slate-800 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-blue-500"
                />
              </div>

              <div className="flex flex-wrap items-center gap-2">
                <select
                  value={toolCategory}
                  onChange={(e) => setToolCategory(e.target.value)}
                  className="px-2.5 py-1.5 rounded-md bg-[#080C15] border border-slate-800 text-xs text-slate-200 focus:outline-none focus:border-blue-500"
                >
                  <option value="All">All Categories</option>
                  <option value="Coding">Coding</option>
                  <option value="Productivity">Productivity</option>
                  <option value="GIS & Spatial">GIS & Spatial</option>
                  <option value="Automation">Automation</option>
                  <option value="Research">Research</option>
                  <option value="Audio & Video">Audio & Video</option>
                </select>

                <select
                  value={toolPricing}
                  onChange={(e) => setToolPricing(e.target.value)}
                  className="px-2.5 py-1.5 rounded-md bg-[#080C15] border border-slate-800 text-xs text-slate-200 focus:outline-none focus:border-blue-500"
                >
                  <option value="All">All Pricing</option>
                  <option value="Free">Free</option>
                  <option value="Freemium">Freemium</option>
                  <option value="Paid">Paid</option>
                </select>

                <button
                  onClick={() => setOnlyBeginner(!onlyBeginner)}
                  className={`px-3 py-1.5 rounded-md text-xs transition-colors ${
                    onlyBeginner 
                      ? 'bg-blue-600/30 text-blue-300 border border-blue-500/40' 
                      : 'bg-[#080C15] text-slate-400 hover:text-slate-200 border border-slate-800'
                  }`}
                >
                  Beginner Friendly
                </button>
              </div>
            </div>

            {/* Results Grid */}
            {filteredTools.length === 0 ? (
              <div className="text-center py-16 bg-[#0E1526]/50 rounded-lg border border-slate-800">
                <p className="text-slate-400 text-xs">No tools found matching your current filter criteria.</p>
                <button 
                  onClick={() => { setToolSearch(''); setToolCategory('All'); setToolPricing('All'); setOnlyBeginner(false); setShowSavedOnlyTools(false); }}
                  className="mt-3 text-xs text-blue-400 hover:underline font-semibold"
                >
                  Reset all filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {filteredTools.map((tool) => (
                  <div key={tool.id} className="bg-[#0E1526] border border-slate-800 hover:border-slate-700 rounded-lg p-5 flex flex-col justify-between transition-colors">
                    <div>
                      {/* Unboxed Metadata Header */}
                      <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
                        <div className="flex items-center space-x-1.5">
                          <span className="font-semibold text-blue-400">{tool.category}</span>
                          <span aria-hidden="true">·</span>
                          <span>{tool.pricing}</span>
                          {tool.isBeginnerFriendly && (
                            <>
                              <span aria-hidden="true">·</span>
                              <span className="text-emerald-400">Beginner</span>
                            </>
                          )}
                        </div>

                        <button 
                          onClick={(e) => toggleSaveTool(tool.id, e)}
                          title={savedTools.includes(tool.id) ? 'Remove bookmark' : 'Bookmark tool'}
                          className="text-slate-500 hover:text-white transition-colors"
                        >
                          <Bookmark className={`w-4 h-4 ${savedTools.includes(tool.id) ? 'fill-blue-500 text-blue-500' : ''}`} />
                        </button>
                      </div>

                      <h3 className="text-base font-bold text-white mt-1">{tool.name}</h3>
                      <p className="text-xs text-slate-400 mt-2 leading-relaxed">{tool.description}</p>

                      <div className="mt-4 flex flex-wrap gap-1.5">
                        {tool.tags.map((t, i) => (
                          <span key={i} className="text-[10px] px-2 py-0.5 rounded bg-[#080C15] text-slate-400 border border-slate-800">
                            #{t}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="mt-6 pt-3 border-t border-slate-800/80 flex items-center justify-between">
                      <button
                        onClick={() => setSelectedTool(tool)}
                        className="text-xs text-slate-400 hover:text-white flex items-center space-x-1"
                      >
                        <Info className="w-3.5 h-3.5" />
                        <span>Specifications</span>
                      </button>

                      <a
                        href={tool.url}
                        target="_blank"
                        rel="noreferrer"
                        className="text-xs font-semibold px-3 py-1.5 bg-blue-600 hover:bg-blue-500 text-white rounded-md transition-colors flex items-center space-x-1"
                      >
                        <span>Visit Site</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Specifications Modal */}
            {selectedTool && (
              <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4 backdrop-blur-sm">
                <div className="bg-[#0E1526] border border-slate-700 rounded-lg max-w-lg w-full p-6 text-slate-200 animate-fade-in">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-lg font-bold text-white">{selectedTool.name}</h3>
                      <div className="flex items-center space-x-2 text-xs text-slate-400 mt-1">
                        <span className="text-blue-400 font-medium">{selectedTool.category}</span>
                        <span aria-hidden="true">·</span>
                        <span>{selectedTool.pricing}</span>
                      </div>
                    </div>
                    <button 
                      onClick={() => setSelectedTool(null)}
                      className="text-slate-400 hover:text-white"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>

                  <p className="text-xs text-slate-300 mt-4 leading-relaxed">{selectedTool.description}</p>

                  {selectedTool.detailedSpecs && (
                    <div className="mt-4 bg-[#080C15] p-3.5 rounded border border-slate-800 text-xs text-slate-300 leading-relaxed">
                      <span className="text-[11px] font-semibold text-blue-400 block mb-1">Architecture & Implementation Specs:</span>
                      {selectedTool.detailedSpecs}
                    </div>
                  )}

                  <div className="mt-4 flex flex-wrap gap-1.5">
                    {selectedTool.tags.map((t, idx) => (
                      <span key={idx} className="text-[10px] px-2 py-0.5 rounded bg-slate-800 text-slate-300">
                        {t}
                      </span>
                    ))}
                  </div>

                  <div className="mt-6 pt-4 border-t border-slate-800 flex items-center justify-between">
                    <button
                      onClick={() => toggleSaveTool(selectedTool.id)}
                      className="text-xs text-slate-300 hover:text-white flex items-center space-x-1.5"
                    >
                      <Bookmark className={`w-3.5 h-3.5 ${savedTools.includes(selectedTool.id) ? 'fill-blue-500 text-blue-500' : ''}`} />
                      <span>{savedTools.includes(selectedTool.id) ? 'Saved' : 'Bookmark'}</span>
                    </button>

                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => setSelectedTool(null)}
                        className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-slate-300 rounded"
                      >
                        Close
                      </button>
                      <a
                        href={selectedTool.url}
                        target="_blank"
                        rel="noreferrer"
                        className="px-3.5 py-1.5 bg-blue-600 hover:bg-blue-500 text-xs font-semibold text-white rounded flex items-center space-x-1"
                      >
                        <span>Open Resource</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* ============================================================ */}
        {/* VIEW 4: PROMPT STUDIO */}
        {/* ============================================================ */}
        {currentTab === 'prompts' && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
              <div>
                <h1 className="text-2xl sm:text-3xl font-bold text-white">Interactive Prompt Studio</h1>
                <p className="text-slate-400 text-xs sm:text-sm mt-1">
                  Tested deterministic prompt formulas. Substitute dynamic placeholders and copy directly into your AI workflows.
                </p>
              </div>

              {/* Category selector */}
              <div className="flex flex-col sm:flex-row gap-2">
                <div className="relative">
                  <Search className="w-4 h-4 text-slate-500 absolute left-3 top-2.5" />
                  <input
                    type="text"
                    placeholder="Search prompts by task or variable..."
                    value={promptSearch}
                    onChange={(e) => setPromptSearch(e.target.value)}
                    className="pl-9 pr-3 py-1.5 rounded-md bg-[#0E1526] border border-slate-800 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-blue-500 w-full sm:w-60"
                  />
                </div>
                <select
                  value={promptCategory}
                  onChange={(e) => setPromptCategory(e.target.value)}
                  className="px-3 py-1.5 rounded-md bg-[#0E1526] border border-slate-800 text-xs text-slate-200 focus:outline-none focus:border-blue-500"
                >
                  <option value="All">All Disciplines</option>
                  <option value="GIS & Remote Sensing">GIS & Remote Sensing</option>
                  <option value="Business & Freelancing">Business & Freelancing</option>
                  <option value="Software Engineering">Software Engineering</option>
                  <option value="Job Search & CV">Job Search & CV</option>
                  <option value="Automation">Automation</option>
                </select>
              </div>
            </div>

            {/* Prompt Cards Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
              {filteredPrompts.map((p) => {
                const isCopied = copiedPromptId === p.id;
                return (
                  <div key={p.id} className="bg-[#0E1526] border border-slate-800 rounded-lg p-5 flex flex-col justify-between">
                    <div>
                      {/* Unboxed Metadata */}
                      <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
                        <span className="text-blue-400 font-semibold">{p.category}</span>
                        <span className="font-mono text-[11px] text-slate-400">{p.variables.length} Dynamic Variables</span>
                      </div>

                      <h3 className="text-base font-bold text-white mt-1">{p.title}</h3>
                      <p className="text-xs text-slate-400 mt-1">{p.task}</p>

                      {/* Code container */}
                      <div className="mt-3.5 p-3 rounded bg-[#080C15] border border-slate-800/90 text-xs font-mono text-slate-300 leading-relaxed overflow-x-auto select-all max-h-40">
                        {p.template}
                      </div>

                      <div className="mt-3 flex items-start space-x-2 text-[11px] text-slate-400">
                        <Info className="w-3.5 h-3.5 text-blue-400 shrink-0 mt-0.5" />
                        <span>{p.instructions}</span>
                      </div>
                    </div>

                    <div className="mt-5 pt-3 border-t border-slate-800/80 flex items-center justify-between">
                      <button
                        onClick={() => {
                          setActivePromptModal(p);
                          setCustomVariables(p.defaultValues || {});
                        }}
                        className="text-xs font-semibold px-3 py-1.5 rounded bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition-colors flex items-center space-x-1.5"
                      >
                        <Sliders className="w-3 h-3 text-blue-400" />
                        <span>Customize Variables</span>
                      </button>

                      <button
                        onClick={() => copyTextToClipboard(p.template, p.id)}
                        className={`text-xs font-semibold px-3.5 py-1.5 rounded transition-colors flex items-center space-x-1.5 ${
                          isCopied 
                            ? 'bg-emerald-600 text-white' 
                            : 'bg-blue-600 hover:bg-blue-500 text-white'
                        }`}
                      >
                        {isCopied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                        <span>{isCopied ? 'Copied' : 'Copy Template'}</span>
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Customization Variable Substitution Modal */}
            {activePromptModal && (
              <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4 backdrop-blur-sm">
                <div className="bg-[#0E1526] border border-slate-700 rounded-lg max-w-2xl w-full p-6 text-slate-200 max-h-[90vh] overflow-y-auto animate-fade-in">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-base font-bold text-white">{activePromptModal.title}</h3>
                      <p className="text-xs text-slate-400 mt-0.5">{activePromptModal.task}</p>
                    </div>
                    <button 
                      onClick={() => setActivePromptModal(null)}
                      className="text-slate-400 hover:text-white"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>

                  {/* Variables Form */}
                  <div className="mt-5 space-y-3.5">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-semibold text-blue-400">Fill Variables:</span>
                      {activePromptModal.defaultValues && (
                        <button
                          type="button"
                          onClick={() => setCustomVariables(activePromptModal.defaultValues || {})}
                          className="text-[11px] text-slate-400 hover:text-white underline"
                        >
                          Reset with Sample Values
                        </button>
                      )}
                    </div>

                    <div className="grid grid-cols-1 gap-3">
                      {activePromptModal.variables.map((variable) => (
                        <div key={variable}>
                          <label className="text-[11px] font-mono text-slate-400 block mb-1">
                            [{variable}]
                          </label>
                          <input
                            type="text"
                            placeholder={`Enter ${variable.toLowerCase()}...`}
                            value={customVariables[variable] ?? ''}
                            onChange={(e) => setCustomVariables({ ...customVariables, [variable]: e.target.value })}
                            className="w-full px-3 py-1.5 rounded bg-[#080C15] border border-slate-800 text-xs text-slate-200 focus:outline-none focus:border-blue-500 font-mono"
                          />
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Live Rendered Preview */}
                  <div className="mt-5">
                    <span className="text-xs font-semibold text-slate-300 block mb-1.5">Live Generated Output:</span>
                    <div className="p-3 bg-[#080C15] rounded border border-slate-800 text-xs font-mono text-slate-200 leading-relaxed max-h-48 overflow-y-auto select-all">
                      {buildCustomPrompt(activePromptModal)}
                    </div>
                  </div>

                  <div className="mt-6 pt-4 border-t border-slate-800 flex justify-end space-x-2.5">
                    <button
                      onClick={() => setActivePromptModal(null)}
                      className="px-3.5 py-1.5 bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-slate-300 rounded"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={() => {
                        copyTextToClipboard(buildCustomPrompt(activePromptModal));
                        setActivePromptModal(null);
                      }}
                      className="px-4 py-1.5 bg-blue-600 hover:bg-blue-500 text-xs font-semibold text-white rounded flex items-center space-x-1.5"
                    >
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copy Customized Prompt</span>
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* ============================================================ */}
        {/* VIEW 5: AI OPPORTUNITIES BOARD */}
        {/* ============================================================ */}
        {currentTab === 'jobs' && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-6">
              <div>
                <div className="text-xs text-amber-400/90 font-medium mb-1">
                  Demonstration Architecture · Sample Opportunity Profiles
                </div>
                <h1 className="text-2xl sm:text-3xl font-bold text-white">AI Opportunities & Roles</h1>
                <p className="text-slate-400 text-xs sm:text-sm mt-1 max-w-2xl">
                  Inspect emerging role profiles across data annotation, GIS remote sensing, prompt engineering, and agent automation.
                </p>
              </div>

              <button
                onClick={() => setShowSavedOnlyJobs(!showSavedOnlyJobs)}
                className={`px-3 py-1.5 rounded-md text-xs font-semibold transition-colors flex items-center space-x-1.5 self-start md:self-auto ${
                  showSavedOnlyJobs 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-slate-800 text-slate-300 hover:bg-slate-700 border border-slate-700'
                }`}
              >
                <Bookmark className="w-3.5 h-3.5" />
                <span>Saved Roles ({savedJobs.length})</span>
              </button>
            </div>

            {/* Filter Bar */}
            <div className="bg-[#0E1526] p-4 rounded-lg border border-slate-800 mb-6 flex flex-col md:flex-row items-stretch md:items-center gap-3">
              <div className="relative flex-grow">
                <Search className="w-4 h-4 text-slate-500 absolute left-3 top-2.5" />
                <input
                  type="text"
                  placeholder="Filter by role title, skill, or location..."
                  value={jobSearch}
                  onChange={(e) => setJobSearch(e.target.value)}
                  className="w-full pl-9 pr-3 py-1.5 rounded-md bg-[#080C15] border border-slate-800 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-blue-500"
                />
              </div>

              <div className="flex flex-wrap items-center gap-2">
                <select
                  value={jobCategory}
                  onChange={(e) => setJobCategory(e.target.value)}
                  className="px-2.5 py-1.5 rounded-md bg-[#080C15] border border-slate-800 text-xs text-slate-200 focus:outline-none focus:border-blue-500"
                >
                  <option value="All">All Disciplines</option>
                  <option value="GIS & Spatial Analysis">GIS & Spatial Analysis</option>
                  <option value="Prompt Engineering">Prompt Engineering</option>
                  <option value="Automation & Agents">Automation & Agents</option>
                  <option value="Machine Learning">Machine Learning</option>
                </select>

                <select
                  value={jobType}
                  onChange={(e) => setJobType(e.target.value)}
                  className="px-2.5 py-1.5 rounded-md bg-[#080C15] border border-slate-800 text-xs text-slate-200 focus:outline-none focus:border-blue-500"
                >
                  <option value="All">All Contract Types</option>
                  <option value="Full-Time">Full-Time</option>
                  <option value="Contract">Contract</option>
                  <option value="Freelance">Freelance</option>
                </select>
              </div>
            </div>

            {/* Job Board List */}
            {filteredJobs.length === 0 ? (
              <div className="text-center py-16 bg-[#0E1526]/50 rounded-lg border border-slate-800">
                <p className="text-slate-400 text-xs">No opportunities found matching your criteria.</p>
                <button 
                  onClick={() => { setJobCategory('All'); setJobType('All'); setJobSearch(''); setShowSavedOnlyJobs(false); }}
                  className="mt-3 text-xs text-blue-400 hover:underline font-semibold"
                >
                  Reset filters
                </button>
              </div>
            ) : (
              <div className="space-y-3.5">
                {filteredJobs.map((job) => (
                  <div key={job.id} className="p-5 rounded-lg bg-[#0E1526] border border-slate-800 hover:border-slate-700 transition-colors flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="space-y-1.5">
                      <div className="flex items-center space-x-2">
                        <h3 className="text-base font-bold text-white">{job.title}</h3>
                        <button 
                          onClick={(e) => toggleSaveJob(job.id, e)}
                          title="Bookmark role"
                          className="text-slate-500 hover:text-white"
                        >
                          <Bookmark className={`w-3.5 h-3.5 ${savedJobs.includes(job.id) ? 'fill-blue-500 text-blue-500' : ''}`} />
                        </button>
                      </div>

                      {/* Clean Unboxed Metadata */}
                      <div className="flex flex-wrap items-center gap-x-2 text-xs text-slate-400">
                        <span className="text-blue-400 font-medium">{job.category}</span>
                        <span aria-hidden="true">·</span>
                        <span>{job.type}</span>
                        <span aria-hidden="true">·</span>
                        <span>{job.location}</span>
                        <span aria-hidden="true">·</span>
                        <span>{job.experience}</span>
                        {job.salaryRange && (
                          <>
                            <span aria-hidden="true">·</span>
                            <span className="text-slate-300 font-medium">{job.salaryRange}</span>
                          </>
                        )}
                      </div>

                      <div className="flex flex-wrap gap-1.5 pt-1.5">
                        {job.skills.map((skill, sIdx) => (
                          <span key={sIdx} className="text-[10px] px-2 py-0.5 rounded bg-[#080C15] text-slate-300 border border-slate-800">
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="flex items-center space-x-3 shrink-0">
                      <span className="text-[11px] text-slate-500 hidden sm:inline">{job.postedDate}</span>
                      <button
                        onClick={() => setSelectedJob(job)}
                        className="px-3.5 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold rounded border border-slate-700 transition-colors"
                      >
                        Inspect Role Specs
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Job Details Modal */}
            {selectedJob && (
              <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4 backdrop-blur-sm">
                <div className="bg-[#0E1526] border border-slate-700 rounded-lg max-w-2xl w-full p-6 text-slate-200 max-h-[90vh] overflow-y-auto animate-fade-in">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-lg font-bold text-white">{selectedJob.title}</h3>
                      <div className="flex flex-wrap items-center gap-x-2 text-xs text-slate-400 mt-1">
                        <span className="text-blue-400 font-medium">{selectedJob.category}</span>
                        <span aria-hidden="true">·</span>
                        <span>{selectedJob.type}</span>
                        <span aria-hidden="true">·</span>
                        <span>{selectedJob.location}</span>
                        {selectedJob.salaryRange && (
                          <>
                            <span aria-hidden="true">·</span>
                            <span className="text-slate-300">{selectedJob.salaryRange}</span>
                          </>
                        )}
                      </div>
                    </div>
                    <button 
                      onClick={() => setSelectedJob(null)}
                      className="text-slate-400 hover:text-white"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>

                  <p className="text-xs text-slate-300 mt-4 leading-relaxed">{selectedJob.description}</p>

                  <div className="mt-5 space-y-4">
                    <div>
                      <h4 className="text-xs font-semibold text-white uppercase tracking-wider mb-2">Key Responsibilities</h4>
                      <ul className="space-y-1.5">
                        {selectedJob.responsibilities.map((r, i) => (
                          <li key={i} className="text-xs text-slate-300 flex items-start space-x-2">
                            <span className="text-blue-400 font-bold">›</span>
                            <span>{r}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <h4 className="text-xs font-semibold text-white uppercase tracking-wider mb-2">Required Qualifications & Skills</h4>
                      <ul className="space-y-1.5">
                        {selectedJob.qualifications.map((q, i) => (
                          <li key={i} className="text-xs text-slate-300 flex items-start space-x-2">
                            <span className="text-blue-400 font-bold">✓</span>
                            <span>{q}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="mt-6 pt-4 border-t border-slate-800 flex items-center justify-between">
                    <button
                      onClick={() => toggleSaveJob(selectedJob.id)}
                      className="text-xs text-slate-300 hover:text-white flex items-center space-x-1.5"
                    >
                      <Bookmark className={`w-3.5 h-3.5 ${savedJobs.includes(selectedJob.id) ? 'fill-blue-500 text-blue-500' : ''}`} />
                      <span>{savedJobs.includes(selectedJob.id) ? 'Saved to Bookmarks' : 'Bookmark Role'}</span>
                    </button>

                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => setSelectedJob(null)}
                        className="px-3.5 py-1.5 bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-slate-300 rounded"
                      >
                        Close
                      </button>
                      <button
                        onClick={() => {
                          triggerToast('Sample vacancy profile: in production, this redirects to the vetted employer endpoint.');
                        }}
                        className="px-4 py-1.5 bg-blue-600 hover:bg-blue-500 text-xs font-semibold text-white rounded"
                      >
                        Apply via Sample Portal
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* ============================================================ */}
        {/* VIEW 6: GIS & GEOSPATIAL AI HUB */}
        {/* ============================================================ */}
        {currentTab === 'gis' && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
            <div className="mb-8">
              <div className="text-xs text-emerald-400 font-semibold mb-1">
                Specialized Spatial Track
              </div>
              <h1 className="text-2xl sm:text-3xl font-bold text-white">GIS & Geospatial AI Hub</h1>
              <p className="text-slate-400 text-xs sm:text-sm mt-1 max-w-3xl leading-relaxed">
                Connect planetary Earth observation data with machine learning algorithms. Master Sentinel-2 spectral indices, cloud-hosted Google Earth Engine models, and foundation vision segmentation.
              </p>
            </div>

            {/* Interactive NDVI Spectral Index Simulator */}
            <div className="bg-[#0E1526] border border-slate-800 rounded-lg p-6 mb-10">
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-5 pb-4 border-b border-slate-800">
                <div>
                  <div className="text-xs font-semibold text-blue-400">Interactive Simulation</div>
                  <h3 className="text-base font-bold text-white mt-0.5">Spectral Band NDVI Calculator</h3>
                  <p className="text-xs text-slate-400 mt-1">
                    Normalized Difference Vegetation Index: Formula = <code className="font-mono text-slate-300">(NIR - Red) / (NIR + Red)</code>
                  </p>
                </div>
                <div className="text-left lg:text-right">
                  <span className="text-xs text-slate-400 block">Computed Index:</span>
                  <span className={`text-2xl font-mono font-bold ${ndviStatus.color}`}>
                    {currentNdvi >= 0 ? `+${currentNdvi}` : currentNdvi}
                  </span>
                  <span className={`text-xs block font-medium ${ndviStatus.color}`}>
                    {ndviStatus.label}
                  </span>
                </div>
              </div>

              {/* Sliders */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <div className="flex justify-between items-center text-xs mb-1.5">
                    <span className="font-semibold text-slate-300">Band 8: Near-Infrared (NIR) Reflectance</span>
                    <span className="font-mono text-blue-400">{nirValue.toFixed(2)}</span>
                  </div>
                  <input
                    type="range"
                    min="0.01"
                    max="1.0"
                    step="0.01"
                    value={nirValue}
                    onChange={(e) => setNirValue(parseFloat(e.target.value))}
                    className="w-full accent-blue-500 cursor-pointer"
                  />
                  <p className="text-[11px] text-slate-500 mt-1">
                    Healthy vegetation cell structure reflects high levels of Near-Infrared light (0.6 - 0.9).
                  </p>
                </div>

                <div>
                  <div className="flex justify-between items-center text-xs mb-1.5">
                    <span className="font-semibold text-slate-300">Band 4: Visible Red (RED) Reflectance</span>
                    <span className="font-mono text-red-400">{redValue.toFixed(2)}</span>
                  </div>
                  <input
                    type="range"
                    min="0.01"
                    max="1.0"
                    step="0.01"
                    value={redValue}
                    onChange={(e) => setRedValue(parseFloat(e.target.value))}
                    className="w-full accent-red-500 cursor-pointer"
                  />
                  <p className="text-[11px] text-slate-500 mt-1">
                    Chlorophyll pigment absorbs visible red light for photosynthesis (0.05 - 0.2).
                  </p>
                </div>
              </div>

              {/* Visual Spectrum Bar */}
              <div className="mt-5 pt-4 border-t border-slate-800">
                <div className="w-full h-2 rounded bg-slate-800 overflow-hidden relative">
                  <div 
                    className={`h-full transition-all duration-150 ${ndviStatus.barBg}`}
                    style={{ width: `${Math.max(0, Math.min(100, ((currentNdvi + 1) / 2) * 100))}%` }}
                  />
                </div>
                <div className="flex justify-between text-[10px] text-slate-500 font-mono mt-1">
                  <span>-1.0 (Water / Deep Shadow)</span>
                  <span>0.0 (Bare Rock / Sand)</span>
                  <span>+1.0 (Dense Tropical Canopy)</span>
                </div>
                <p className="text-xs text-slate-400 mt-2">
                  <strong className="text-slate-300">Ecological Interpretation:</strong> {ndviStatus.desc}
                </p>
              </div>
            </div>

            {/* Detailed Hands-on Workflows */}
            <div className="mb-6">
              <h2 className="text-lg font-bold text-white">Hands-On Code Workflows</h2>
              <p className="text-xs text-slate-400 mt-0.5">Select a workflow to examine step-by-step implementations and code scripts.</p>
            </div>

            {/* Workflow selector tabs */}
            <div className="flex flex-wrap gap-2 mb-6">
              {GIS_RESOURCES.map((wf) => (
                <button
                  key={wf.id}
                  onClick={() => {
                    setGisActiveWorkflow(wf);
                    setActiveStepIndex(0);
                  }}
                  className={`px-3 py-1.5 rounded-md text-xs font-semibold transition-colors ${
                    gisActiveWorkflow.id === wf.id 
                      ? 'bg-blue-600 text-white' 
                      : 'bg-[#0E1526] text-slate-300 hover:bg-slate-800 border border-slate-800'
                  }`}
                >
                  {wf.title.split(' with ')[0]}
                </button>
              ))}
            </div>

            {/* Active Workflow Card */}
            <div className="bg-[#0E1526] border border-slate-800 rounded-lg p-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-800">
                <div>
                  <div className="flex items-center space-x-2 text-xs text-slate-400 mb-1">
                    <span className="text-emerald-400 font-semibold">{gisActiveWorkflow.level}</span>
                    <span aria-hidden="true">·</span>
                    <span>{gisActiveWorkflow.readTime}</span>
                    <span aria-hidden="true">·</span>
                    <span className="text-slate-300">Use Case: {gisActiveWorkflow.useCase}</span>
                  </div>
                  <h3 className="text-lg font-bold text-white">{gisActiveWorkflow.title}</h3>
                </div>

                <div className="flex flex-wrap gap-1.5">
                  {gisActiveWorkflow.techStack.map((tech, tIdx) => (
                    <span key={tIdx} className="text-[10px] px-2 py-0.5 rounded bg-[#080C15] text-slate-300 border border-slate-800 font-mono">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              <p className="text-xs text-slate-300 mt-4 leading-relaxed">{gisActiveWorkflow.summary}</p>

              {/* Step Navigation */}
              <div className="mt-6">
                <div className="flex items-center space-x-2 border-b border-slate-800 pb-2 mb-4 overflow-x-auto">
                  {gisActiveWorkflow.steps.map((step, idx) => (
                    <button
                      key={idx}
                      onClick={() => setActiveStepIndex(idx)}
                      className={`text-xs font-semibold px-3 py-1 rounded transition-colors whitespace-nowrap shrink-0 ${
                        activeStepIndex === idx 
                          ? 'bg-blue-600/30 text-blue-300 border border-blue-500/40' 
                          : 'text-slate-400 hover:text-white'
                      }`}
                    >
                      {step.title}
                    </button>
                  ))}
                </div>

                {/* Active Step Details */}
                {gisActiveWorkflow.steps[activeStepIndex] && (
                  <div className="space-y-3">
                    <h4 className="text-sm font-bold text-white">
                      {gisActiveWorkflow.steps[activeStepIndex].title}
                    </h4>
                    <p className="text-xs text-slate-300 leading-relaxed">
                      {gisActiveWorkflow.steps[activeStepIndex].description}
                    </p>

                    {gisActiveWorkflow.steps[activeStepIndex].codeSnippet && (
                      <div className="mt-4">
                        <div className="flex justify-between items-center bg-[#060910] px-3.5 py-1.5 rounded-t border-t border-x border-slate-800 text-[11px] text-slate-400 font-mono">
                          <span>{gisActiveWorkflow.steps[activeStepIndex].language || 'python'}</span>
                          <button
                            onClick={() => {
                              copyTextToClipboard(gisActiveWorkflow.steps[activeStepIndex].codeSnippet || '');
                              setCopiedCodeSnippet(true);
                              setTimeout(() => setCopiedCodeSnippet(false), 2000);
                            }}
                            className="hover:text-white flex items-center space-x-1"
                          >
                            {copiedCodeSnippet ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                            <span>{copiedCodeSnippet ? 'Copied' : 'Copy Code'}</span>
                          </button>
                        </div>
                        <pre className="p-3.5 bg-[#080C15] rounded-b border border-slate-800 text-xs font-mono text-slate-200 overflow-x-auto leading-relaxed select-all max-h-72">
                          <code>{gisActiveWorkflow.steps[activeStepIndex].codeSnippet}</code>
                        </pre>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* ============================================================ */}
        {/* VIEW 7: LEARNING HUB */}
        {/* ============================================================ */}
        {currentTab === 'learning' && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
            <div className="mb-8">
              <h1 className="text-2xl sm:text-3xl font-bold text-white">Learning Hub & Roadmaps</h1>
              <p className="text-slate-400 text-xs sm:text-sm mt-1 max-w-2xl leading-relaxed">
                Structured technical syllabi with concrete outcomes. Mark completed modules to track your practical progress across core tracks.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {LEARNING_COURSES.map((course) => {
                const totalModules = course.modules.length;
                const completedCount = course.modules.filter(m => completedModules.includes(m.id)).length;
                const progressPct = Math.round((completedCount / totalModules) * 100);

                return (
                  <div key={course.id} className="p-6 rounded-lg bg-[#0E1526] border border-slate-800 flex flex-col justify-between">
                    <div>
                      {/* Unboxed Metadata */}
                      <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
                        <div className="flex items-center space-x-2">
                          <span className="font-semibold text-blue-400">{course.category}</span>
                          <span aria-hidden="true">·</span>
                          <span>{course.difficulty}</span>
                        </div>
                        <span className="font-mono text-[11px] text-slate-400">⏱ {course.duration}</span>
                      </div>

                      <h3 className="text-lg font-bold text-white mt-1">{course.title}</h3>
                      <p className="text-xs text-slate-300 mt-2 leading-relaxed">{course.description}</p>

                      {/* Outcomes */}
                      <div className="mt-4">
                        <span className="text-xs font-semibold text-slate-200 block mb-2">Target Technical Competencies:</span>
                        <ul className="space-y-1.5">
                          {course.outcomes.map((out, oIdx) => (
                            <li key={oIdx} className="text-xs text-slate-400 flex items-start space-x-2">
                              <span className="text-blue-400 font-bold">✓</span>
                              <span>{out}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Progress Bar */}
                      <div className="mt-5 pt-4 border-t border-slate-800/80">
                        <div className="flex justify-between items-center text-xs text-slate-400 mb-1.5">
                          <span>Syllabus Progress</span>
                          <span className="font-mono text-slate-300">{completedCount} of {totalModules} modules ({progressPct}%)</span>
                        </div>
                        <div className="w-full h-1.5 rounded-full bg-slate-800 overflow-hidden">
                          <div 
                            className="h-full bg-blue-500 transition-all duration-300"
                            style={{ width: `${progressPct}%` }}
                          />
                        </div>
                      </div>
                    </div>

                    <div className="mt-6 pt-4 border-t border-slate-800 flex items-center justify-between">
                      <span className="text-[11px] text-slate-400">Open self-paced curriculum</span>
                      <button
                        onClick={() => setActiveCourse(course)}
                        className="px-4 py-1.5 bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold rounded transition-colors"
                      >
                        Inspect Modules ({totalModules})
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Course Syllabus Modal */}
            {activeCourse && (
              <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4 backdrop-blur-sm">
                <div className="bg-[#0E1526] border border-slate-700 rounded-lg max-w-2xl w-full p-6 text-slate-200 max-h-[90vh] overflow-y-auto animate-fade-in">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-lg font-bold text-white">{activeCourse.title}</h3>
                      <div className="flex items-center space-x-2 text-xs text-slate-400 mt-1">
                        <span className="text-blue-400">{activeCourse.category}</span>
                        <span aria-hidden="true">·</span>
                        <span>{activeCourse.difficulty}</span>
                        <span aria-hidden="true">·</span>
                        <span>{activeCourse.duration}</span>
                      </div>
                    </div>
                    <button 
                      onClick={() => setActiveCourse(null)}
                      className="text-slate-400 hover:text-white"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>

                  <p className="text-xs text-slate-300 mt-4 leading-relaxed">{activeCourse.description}</p>

                  {/* Modules with Interactive Checkbox */}
                  <div className="mt-6 space-y-3">
                    <span className="text-xs font-semibold text-slate-200 uppercase tracking-wider block">
                      Curriculum Modules (Check to mark completed)
                    </span>

                    {activeCourse.modules.map((mod, idx) => {
                      const isDone = completedModules.includes(mod.id);
                      return (
                        <div 
                          key={mod.id}
                          onClick={() => toggleModuleCompletion(mod.id)}
                          className={`p-3.5 rounded border transition-colors cursor-pointer flex items-start space-x-3 ${
                            isDone 
                              ? 'bg-blue-950/20 border-blue-500/30 text-slate-200' 
                              : 'bg-[#080C15] border-slate-800 text-slate-300 hover:border-slate-700'
                          }`}
                        >
                          <div className="mt-0.5">
                            <input 
                              type="checkbox"
                              checked={isDone}
                              onChange={() => {}}
                              className="accent-blue-500 cursor-pointer"
                            />
                          </div>
                          <div className="flex-grow">
                            <div className="flex items-center justify-between text-xs font-semibold">
                              <span className={isDone ? 'text-blue-300' : 'text-white'}>
                                {idx + 1}. {mod.title}
                              </span>
                              <span className="text-[11px] text-slate-400 font-mono">{mod.duration}</span>
                            </div>
                            <p className="text-[11px] text-slate-400 mt-1 leading-relaxed">{mod.overview}</p>
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  <div className="mt-6 pt-4 border-t border-slate-800 flex justify-end">
                    <button
                      onClick={() => setActiveCourse(null)}
                      className="px-4 py-1.5 bg-blue-600 hover:bg-blue-500 text-xs font-semibold text-white rounded"
                    >
                      Done
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* ============================================================ */}
        {/* VIEW 8: ABOUT & COMMUNITY */}
        {/* ============================================================ */}
        {currentTab === 'about' && (
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
            <div className="text-center mb-8">
              <h1 className="text-2xl sm:text-3xl font-bold text-white">About AI Wealth Movement</h1>
              <p className="text-slate-400 text-xs sm:text-sm mt-1.5 max-w-xl mx-auto leading-relaxed">
                Democratizing the technical and operational knowledge required to use artificial intelligence for digital productivity, technical careers, and sustainable independence.
              </p>
            </div>

            <div className="space-y-6">
              {/* Mission */}
              <div className="bg-[#0E1526] border border-slate-800 rounded-lg p-6">
                <h3 className="text-base font-bold text-white">Our Mission & Principles</h3>
                <p className="text-xs sm:text-sm text-slate-300 mt-2 leading-relaxed">
                  The AI Wealth Movement bridges the gap between passive consumers of technology and active technical builders. We curate tested AI tool directories, reproducible prompts, and geospatial training modules so learners and digital workers can solve real problems and unlock freelance or remote employment opportunities.
                </p>
                <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                  <div className="p-3 bg-[#080C15] rounded border border-slate-800">
                    <strong className="text-white block mb-1">01. Practical Over Hype</strong>
                    <span className="text-slate-400">Strictly verified tools and reproducible prompt formulas.</span>
                  </div>
                  <div className="p-3 bg-[#080C15] rounded border border-slate-800">
                    <strong className="text-white block mb-1">02. Open Technical Education</strong>
                    <span className="text-slate-400">Accessible curricula spanning code, automation, and satellite GIS.</span>
                  </div>
                  <div className="p-3 bg-[#080C15] rounded border border-slate-800">
                    <strong className="text-white block mb-1">03. Digital Independence</strong>
                    <span className="text-slate-400">Actionable pathways for freelance consulting and tech roles.</span>
                  </div>
                </div>
              </div>

              {/* Who We Serve */}
              <div className="bg-[#0E1526] border border-slate-800 rounded-lg p-6">
                <h3 className="text-base font-bold text-white">Target Audiences</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-3 text-xs">
                  <div className="p-3.5 bg-[#080C15] rounded border border-slate-800">
                    <span className="text-white font-semibold block mb-1">Students & Recent Graduates</span>
                    <p className="text-slate-400 leading-relaxed">Build practical AI portfolios with reproducible work evidence before entering competitive job markets.</p>
                  </div>
                  <div className="p-3.5 bg-[#080C15] rounded border border-slate-800">
                    <span className="text-white font-semibold block mb-1">GIS & Spatial Analysts</span>
                    <p className="text-slate-400 leading-relaxed">Integrate machine learning into map generation, land-use classification, and multi-spectral analysis.</p>
                  </div>
                  <div className="p-3.5 bg-[#080C15] rounded border border-slate-800">
                    <span className="text-white font-semibold block mb-1">Freelancers & Operators</span>
                    <p className="text-slate-400 leading-relaxed">Deliver client workflows, automated API pipelines, and specialized data synthesis retainers.</p>
                  </div>
                  <div className="p-3.5 bg-[#080C15] rounded border border-slate-800">
                    <span className="text-white font-semibold block mb-1">Software Engineers</span>
                    <p className="text-slate-400 leading-relaxed">Implement LLM endpoints, deterministic JSON parsing, tool calling, and evaluation suites.</p>
                  </div>
                </div>
              </div>

              {/* My Submissions Review Area */}
              {mySubmissions.length > 0 && (
                <div className="bg-[#0E1526] border border-slate-800 rounded-lg p-6">
                  <h3 className="text-base font-bold text-white mb-3">Your Community Submissions</h3>
                  <div className="space-y-2.5">
                    {mySubmissions.map((sub) => (
                      <div key={sub.id} className="p-3 rounded bg-[#080C15] border border-slate-800 flex items-center justify-between text-xs">
                        <div>
                          <span className="font-semibold text-white">{sub.title}</span>
                          <span className="text-slate-400 ml-2">({sub.category})</span>
                          <p className="text-[11px] text-slate-500 mt-0.5">{sub.link}</p>
                        </div>
                        <div className="text-right">
                          <span className="text-amber-400 font-medium text-[11px]">{sub.status}</span>
                          <span className="text-slate-500 block text-[10px]">{sub.date}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Working Contact & Coordination Form */}
              <div className="bg-[#0E1526] border border-slate-800 rounded-lg p-6">
                <h3 className="text-base font-bold text-white">Contact & Community Coordination</h3>
                <p className="text-xs text-slate-400 mt-1">Have questions, partnership inquiries, or suggestions for the directory?</p>

                <form onSubmit={handleContactSubmit} className="mt-4 space-y-3">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="text-[11px] text-slate-300 block mb-1">Full Name</label>
                      <input
                        type="text"
                        required
                        placeholder="Alex Morgan"
                        value={contactMessage.name}
                        onChange={(e) => setContactMessage({ ...contactMessage, name: e.target.value })}
                        className="w-full px-3 py-1.5 rounded bg-[#080C15] border border-slate-800 text-xs text-slate-200 focus:outline-none focus:border-blue-500"
                      />
                    </div>
                    <div>
                      <label className="text-[11px] text-slate-300 block mb-1">Email Address</label>
                      <input
                        type="email"
                        required
                        placeholder="alex@example.com"
                        value={contactMessage.email}
                        onChange={(e) => setContactMessage({ ...contactMessage, email: e.target.value })}
                        className="w-full px-3 py-1.5 rounded bg-[#080C15] border border-slate-800 text-xs text-slate-200 focus:outline-none focus:border-blue-500"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-[11px] text-slate-300 block mb-1">Message or Proposal</label>
                    <textarea
                      rows={3}
                      required
                      placeholder="Share your inquiry, study group proposal, or directory feedback..."
                      value={contactMessage.message}
                      onChange={(e) => setContactMessage({ ...contactMessage, message: e.target.value })}
                      className="w-full px-3 py-1.5 rounded bg-[#080C15] border border-slate-800 text-xs text-slate-200 focus:outline-none focus:border-blue-500"
                    />
                  </div>

                  <div className="flex justify-end pt-1">
                    <button
                      type="submit"
                      disabled={contactSent}
                      className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold rounded flex items-center space-x-1.5 transition-colors disabled:opacity-50"
                    >
                      <Send className="w-3.5 h-3.5" />
                      <span>{contactSent ? 'Transmitting...' : 'Send Message'}</span>
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* ============================================================ */}
      {/* RESOURCE SUBMISSION MODAL */}
      {/* ============================================================ */}
      {isSubmitModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4 backdrop-blur-sm">
          <div className="bg-[#0E1526] border border-slate-700 rounded-lg max-w-lg w-full p-6 text-slate-200 animate-fade-in">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-base font-bold text-white">Suggest a Verified Resource</h3>
                <p className="text-xs text-slate-400 mt-0.5">Submit an AI tool, tested prompt formula, or tutorial for index review.</p>
              </div>
              <button 
                onClick={() => setIsSubmitModalOpen(false)} 
                className="text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleResourceSubmit} className="space-y-3.5">
              <div>
                <label className="text-xs font-semibold text-slate-300 block mb-1">Resource Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. QGIS Deepness Plugin"
                  value={submitForm.title}
                  onChange={(e) => setSubmitForm({ ...submitForm, title: e.target.value })}
                  className="w-full px-3 py-1.5 rounded bg-[#080C15] border border-slate-800 text-xs text-slate-200 focus:outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-300 block mb-1">Category</label>
                <select
                  value={submitForm.category}
                  onChange={(e) => setSubmitForm({ ...submitForm, category: e.target.value as CommunitySubmission['category'] })}
                  className="w-full px-3 py-1.5 rounded bg-[#080C15] border border-slate-800 text-xs text-slate-200 focus:outline-none focus:border-blue-500"
                >
                  <option value="Tools">AI Tool Platform</option>
                  <option value="Prompts">Prompt Template</option>
                  <option value="GIS">GIS & Geospatial Analysis</option>
                  <option value="Tutorials">Tutorial or Guide</option>
                </select>
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-300 block mb-1">Official Resource URL *</label>
                <input
                  type="url"
                  required
                  placeholder="https://example.com/tool"
                  value={submitForm.link}
                  onChange={(e) => setSubmitForm({ ...submitForm, link: e.target.value })}
                  className="w-full px-3 py-1.5 rounded bg-[#080C15] border border-slate-800 text-xs text-slate-200 focus:outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-300 block mb-1">Key Value & Practical Notes</label>
                <textarea
                  rows={3}
                  placeholder="Why is this resource valuable for practical skills or real-world opportunities?"
                  value={submitForm.notes}
                  onChange={(e) => setSubmitForm({ ...submitForm, notes: e.target.value })}
                  className="w-full px-3 py-1.5 rounded bg-[#080C15] border border-slate-800 text-xs text-slate-200 focus:outline-none focus:border-blue-500"
                />
              </div>

              <div className="pt-2 flex justify-end space-x-2.5">
                <button
                  type="button"
                  onClick={() => setIsSubmitModalOpen(false)}
                  className="px-3.5 py-1.5 bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-slate-300 rounded"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={formSubmitted}
                  className="px-4 py-1.5 bg-blue-600 hover:bg-blue-500 text-xs font-semibold text-white rounded transition-colors disabled:opacity-50"
                >
                  {formSubmitted ? 'Submitting...' : 'Submit Proposal'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Semantic Footer */}
      <footer className="bg-[#060A12] border-t border-slate-800 py-10 text-slate-400 text-xs mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-2.5">
            <div className="flex items-center space-x-2">
              <div className="w-5 h-5 rounded bg-blue-600 flex items-center justify-center text-white font-bold text-[10px]">
                WM
              </div>
              <span className="font-bold text-white text-xs tracking-tight">AI WEALTH MOVEMENT</span>
            </div>
            <p className="text-slate-400 text-xs leading-relaxed">
              Empowering learners, developers, and professionals to convert artificial intelligence into applicable skills, practical solutions, and income opportunities.
            </p>
          </div>

          <div>
            <h4 className="font-semibold text-slate-200 uppercase tracking-wider text-[11px] mb-2.5">Core Modules</h4>
            <ul className="space-y-1.5">
              <li><button onClick={() => { setCurrentTab('tools'); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="hover:text-white transition-colors">AI Tools Directory</button></li>
              <li><button onClick={() => { setCurrentTab('prompts'); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="hover:text-white transition-colors">Prompt Studio</button></li>
              <li><button onClick={() => { setCurrentTab('gis'); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="hover:text-white transition-colors">GIS & Satellite AI</button></li>
              <li><button onClick={() => { setCurrentTab('jobs'); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="hover:text-white transition-colors">Opportunities Board</button></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-slate-200 uppercase tracking-wider text-[11px] mb-2.5">Curriculum & Access</h4>
            <ul className="space-y-1.5">
              <li><button onClick={() => { setCurrentTab('learning'); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="hover:text-white transition-colors">Learning Syllabus</button></li>
              <li><button onClick={() => { setIsSubmitModalOpen(true); }} className="hover:text-white transition-colors">Suggest a Resource</button></li>
              <li><button onClick={() => { setCurrentTab('about'); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="hover:text-white transition-colors">Mission & Scope</button></li>
              <li><button onClick={() => { setCurrentTab('explore'); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="hover:text-white transition-colors">AI Taxonomy</button></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-slate-200 uppercase tracking-wider text-[11px] mb-2.5">Platform Notice</h4>
            <p className="text-slate-400 leading-relaxed text-[11px]">
              Third-party model names, frameworks, and trademarks belong to their respective owners. Sample job postings illustrate role profiles for career alignment and skill benchmarking.
            </p>
            <div className="mt-3 text-slate-500 text-[11px]">
              © {new Date().getFullYear()} AI Wealth Movement. All rights reserved.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
