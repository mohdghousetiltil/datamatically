import React, { useState, useEffect, Suspense, useRef } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { 
  Menu, X, ArrowRight, Activity, Database, Cpu, 
  ChevronDown, CheckCircle, Mail, Globe, Shield, 
  ExternalLink, Sun, Moon, Search, Zap, Rocket, 
  Users, MapPin, Linkedin, Calendar, Play, Pause
} from 'lucide-react';
import Scene from './components/Scene.tsx';

const MotionDiv = motion.div as any;
const MotionMain = motion.main as any;

// --- Animations ---
const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { 
      duration: 1, 
      ease: [0.25, 0.1, 0.25, 1.0] 
    } 
  }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1 
    }
  }
};

// --- Helpers ---
const scrollToSection = (e: React.MouseEvent, id: string) => {
  e.preventDefault();
  const element = document.getElementById(id);
  if (element) {
    element.scrollIntoView({ behavior: 'smooth' });
  }
};

// --- Components ---

const Logo = () => (
    <div className="w-8 h-8 relative group-hover:scale-110 transition-transform duration-300">
        <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
            <rect x="8" y="6" width="6" height="28" rx="3" className="fill-blue-500 dark:fill-blue-500" />
            <path d="M20 6H24C28.4183 6 32 9.58172 32 14V26C32 30.4183 28.4183 34 24 34H20V6Z" className="fill-purple-600 dark:fill-purple-600" fillOpacity="0.8"/>
            <circle cx="20" cy="20" r="3" className="fill-white dark:fill-white animate-pulse" />
        </svg>
    </div>
);

// Automation Ticker Component - Optimized for seamless continuous scroll
const AutomationTicker = () => {
  const [isPlaying, setIsPlaying] = useState(true);
  const items = [
    "Data Engineering", "Machine Learning Models", "Data Analysis", 
    "Manual Data Entry", "Reporting & Dashboards", "Logistics Workflows", 
    "CRM & Data Sync", "Document Automation", "Database Management", 
    "Invoice Processing", "Inventory Management", "Predictive Maintenance", 
    "Demand Forecasting", "Real-Time Analytics", "API Integrations", "Cloud Automation", 
    "Compliance Reporting", "Route Optimization"
  ];
  
  // Create two identical sets of items for seamless looping
  const tickerItems = [...items, ...items];

  return (
    <div className="w-full mt-8 md:mt-12 py-0 relative group select-none">
      {/* Header for Ticker */}
      <div className="max-w-7xl mx-auto px-6 text-center mb-6">
        <h2 className="text-lg md:text-xl font-bold tracking-[0.1em] text-slate-900 dark:text-white font-space uppercase mb-1">
          What We Automate
        </h2>
        <p className="text-[10px] md:text-xs text-gray-500 dark:text-gray-400 font-light max-w-2xl mx-auto uppercase tracking-[0.15em]">
          End-to-end workflows across data, AI, and operations
        </p>
      </div>

      <div className="w-full py-4 border-y border-gray-200 dark:border-white/5 bg-white/5 backdrop-blur-sm overflow-hidden relative">
        <div className="flex items-center gap-6">
          <button 
            onClick={() => setIsPlaying(!isPlaying)}
            className="ml-6 p-1.5 rounded-full bg-gray-100 dark:bg-white/10 hover:bg-blue-500 hover:text-white transition-all z-10 shadow-sm shrink-0"
            aria-label={isPlaying ? "Pause Ticker" : "Play Ticker"}
          >
            {isPlaying ? <Pause className="w-3 h-3" /> : <Play className="w-3 h-3" />}
          </button>
          
          <div className="flex-1 overflow-hidden relative h-5">
            <MotionDiv 
              animate={isPlaying ? { x: ["0%", "-50%"] } : { x: "0%" }}
              transition={{ 
                duration: 60, 
                repeat: Infinity, 
                ease: "linear" 
              }}
              className="flex gap-12 whitespace-nowrap items-center w-max"
            >
              {tickerItems.map((item, idx) => (
                <span 
                  key={idx} 
                  className="text-[10px] md:text-xs font-medium tracking-widest uppercase text-gray-500 dark:text-gray-400 flex items-center gap-12 font-space"
                >
                  {item}
                  <span className="text-blue-500/40 text-base">•</span>
                </span>
              ))}
            </MotionDiv>
          </div>
        </div>
      </div>
    </div>
  );
};

// Navbar - Logo top-left, Pill top-right
const Navbar = ({ toggleTheme, isDark }: { toggleTheme: () => void, isDark: boolean }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const links = [
    { name: 'Services', id: 'services' },
    { name: 'Process', id: 'process' },
    { name: 'Projects', id: 'projects' },
    { name: 'Founders', id: 'team' },
    { name: 'Contact Us', id: 'contact' },
  ];

  const handleLinkClick = (e: React.MouseEvent, id: string) => {
      scrollToSection(e, id);
      setIsOpen(false);
  }

  return (
    <div className={`fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 pt-6 md:px-12 transition-all duration-500 ${scrolled ? 'pt-4' : 'pt-6'}`}>
      
      {/* Top Left: Logo and Site Name */}
      <a href="#" onClick={(e) => scrollToSection(e, 'root')} className="flex items-center gap-3 group">
        <Logo />
        <span className="text-xl md:text-2xl font-bold font-space tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-400 group-hover:to-gray-900 dark:group-hover:to-white transition-all duration-500">
          Datamatically
        </span>
      </a>

      {/* Top Right: Liquid Glass Nav Pill */}
      <nav className={`hidden md:flex items-center gap-6 bg-white/20 dark:bg-black/20 backdrop-blur-2xl border border-white/40 dark:border-white/10 px-8 py-2.5 rounded-full shadow-[0_8px_32px_0_rgba(31,38,135,0.07)] transition-all duration-300 ${scrolled ? 'scale-95' : 'scale-100'}`}>
        {links.map((link) => (
          <a 
              key={link.name} 
              href={`#${link.id}`} 
              onClick={(e) => handleLinkClick(e, link.id)}
              className={`text-[10px] font-bold uppercase tracking-[0.15em] transition-all relative group font-space ${link.name === 'Contact Us' ? 'text-blue-600 dark:text-blue-400' : 'text-gray-500 dark:text-gray-300 hover:text-black dark:hover:text-white'}`}
          >
            {link.name}
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-500 transition-all group-hover:w-full"></span>
          </a>
        ))}
        
        <div className="w-[1px] h-4 bg-gray-200 dark:bg-white/10 mx-1"></div>

        <button 
          onClick={toggleTheme} 
          className="p-1.5 rounded-full hover:bg-gray-100 dark:hover:bg-white/10 text-gray-700 dark:text-gray-300 transition-colors"
          aria-label="Toggle Theme"
        >
          {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
        </button>
      </nav>

      {/* Mobile Toggle */}
      <div className="flex items-center gap-3 md:hidden">
        <button 
          onClick={toggleTheme} 
          className="p-2 rounded-full bg-white/40 backdrop-blur-xl border border-white/40 text-gray-700 dark:text-gray-300"
        >
          {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
        </button>
        <button 
          onClick={() => setIsOpen(!isOpen)} 
          className="p-2 rounded-full bg-white/40 backdrop-blur-xl border border-white/40 text-gray-900 dark:text-white"
        >
           {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile Drawer Menu */}
      <AnimatePresence>
        {isOpen && (
          <MotionDiv 
            initial={{ opacity: 0, scale: 0.95, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -20 }}
            className="absolute top-20 left-6 right-6 z-40 bg-white/95 dark:bg-black/90 backdrop-blur-xl border border-gray-200 dark:border-gray-800 rounded-3xl shadow-2xl overflow-hidden p-8 flex flex-col gap-6 md:hidden"
          >
            {links.map((link) => (
              <a 
                  key={link.name} 
                  href={`#${link.id}`} 
                  onClick={(e) => handleLinkClick(e, link.id)}
                  className="text-lg text-gray-800 dark:text-gray-200 hover:text-blue-600 dark:hover:text-white font-medium font-space"
              >
                {link.name}
              </a>
            ))}
          </MotionDiv>
        )}
      </AnimatePresence>
    </div>
  );
};

// Loading Screen
const LoadingScreen = ({ onComplete }: { onComplete: () => void }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        const next = prev + Math.floor(Math.random() * 3) + 1;
        if (next >= 100) {
          clearInterval(timer);
          setTimeout(onComplete, 400);
          return 100;
        }
        return next;
      });
    }, 30);

    return () => clearInterval(timer);
  }, [onComplete]);

  return (
    <MotionDiv 
      className="fixed inset-0 z-[100] bg-slate-50 dark:bg-[#030712] flex flex-col items-center justify-center"
      initial={{ opacity: 1 }}
      exit={{ y: "-100%", transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] } }}
    >
       <div className="relative flex flex-col items-center">
         <MotionDiv
           initial={{ opacity: 0, scale: 0.9, y: 10 }}
           animate={{ opacity: 1, scale: 1, y: 0 }}
           transition={{ duration: 0.5 }}
           className="mb-8 scale-[1.5]"
         >
           <Logo />
         </MotionDiv>
         
         <div className="w-48 h-[2px] bg-gray-200 dark:bg-white/10 rounded-full overflow-hidden relative">
            <MotionDiv 
                className="absolute top-0 left-0 bottom-0 bg-gradient-to-r from-blue-600 to-purple-600"
                style={{ width: `${progress}%` }}
                layoutId="progress"
            />
         </div>
         
         <div className="mt-4 flex justify-between w-48 text-[10px] font-mono uppercase tracking-widest text-gray-400 dark:text-gray-500">
             <span>System Load</span>
             <span>{progress}%</span>
         </div>
       </div>
    </MotionDiv>
  );
};

// Hero Section
const Hero = () => {
  const { scrollY } = useScroll();
  const yText = useTransform(scrollY, [0, 500], [0, 200]);
  const opacityText = useTransform(scrollY, [0, 300], [1, 0]);
  const rotateX = useTransform(scrollY, [0, 600], [0, 45]);
  const scale = useTransform(scrollY, [0, 600], [1, 0.8]);

  return (
    <section className="relative min-h-screen w-full flex flex-col items-center justify-center pt-32 pb-24 overflow-hidden perspective-[1200px]">
      <MotionDiv 
        style={{ y: yText, opacity: opacityText, rotateX, scale, transformStyle: "preserve-3d", transformOrigin: "center top" }}
        className="relative z-10 max-w-5xl mx-auto px-6 text-center pointer-events-none"
      >
        <MotionDiv
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, ease: [0.25, 0.1, 0.25, 1.0] }}
          className="pointer-events-auto"
        >
          <span className="inline-flex items-center gap-2 py-1 px-3 rounded-full bg-blue-100 dark:bg-blue-500/10 border border-blue-200 dark:border-blue-500/20 text-blue-600 dark:text-blue-400 text-xs md:text-sm font-semibold mb-8 tracking-wide uppercase">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-600 dark:bg-blue-400 animate-pulse"></span>
            Automation for Australian Industry
          </span>
          <h1 className="text-5xl md:text-7xl lg:text-9xl font-bold tracking-tighter leading-[0.9] mb-8 bg-clip-text text-transparent bg-gradient-to-b from-slate-900 via-slate-800 to-slate-500 dark:from-white dark:via-white dark:to-gray-500/50 drop-shadow-2xl pb-2">
            Automating <br /> The Future
          </h1>
          <p className="text-base md:text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto mb-10 leading-relaxed font-light">
            AI & Data Automation consultancy for Australian SMEs that eliminate manual work, reduce errors, improve efficiency, and scale without hiring more staff.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
             <a 
                href="https://calendly.com/datamatically"
                target="_blank"
                rel="noopener noreferrer"
                className="px-8 py-4 bg-black dark:bg-white text-white dark:text-black font-bold rounded-full hover:opacity-80 transition-all flex items-center gap-2 group hover:scale-105 active:scale-95 shadow-xl font-space"
             >
                Book free 30-min consultation <Calendar className="w-4 h-4 transition-transform text-white dark:text-black" />
             </a>
             <a 
                href="#projects" 
                onClick={(e) => scrollToSection(e, 'projects')}
                className="px-8 py-4 bg-transparent border border-gray-300 dark:border-gray-700 text-gray-900 dark:text-white font-bold rounded-full hover:bg-gray-100 dark:hover:bg-white/10 transition-all backdrop-blur-sm font-space"
             >
                View Case Studies
             </a>
          </div>
        </MotionDiv>
      </MotionDiv>

      <div className="w-full relative z-10 pointer-events-auto">
        <AutomationTicker />
      </div>

      <MotionDiv 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity, delay: 1 }}
        className="absolute bottom-6 md:bottom-10 inset-x-0 flex flex-col items-center gap-2 text-gray-400 dark:text-gray-500 pointer-events-none"
      >
        <span className="text-[10px] uppercase tracking-widest opacity-50">Scroll to explore</span>
        <ChevronDown className="w-4 h-4" />
      </MotionDiv>
    </section>
  );
};

// Tools Section Component
const ToolsSection = () => {
    const tools = [
        "n8n", "Python", "Zapier", "AI Agents", "NLP", "ML Models",
        "APIs",, "PowerBI", "Power Automate", "SQL", "R", "AWS", "Docker", "Azure"
    ];

    return (
        <section className="py-24 px-6 md:px-12 relative z-10 overflow-hidden bg-slate-50/50 dark:bg-white/5 border-y border-gray-200 dark:border-white/5 backdrop-blur-sm">
            <div className="max-w-7xl mx-auto">
                <MotionDiv
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={fadeInUp}
                    className="text-center mb-16"
                >
                    <h2 className="text-3xl md:text-5xl font-bold mb-4 text-slate-900 dark:text-white tracking-tight">Tools We Work With</h2>
                    <div className="h-1 w-20 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full mx-auto"></div>
                </MotionDiv>

                <MotionDiv
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={staggerContainer}
                    className="flex flex-wrap justify-center gap-3 md:gap-4 max-w-4xl mx-auto"
                >
                    {tools.map((tool, idx) => (
                        <MotionDiv
                            key={idx}
                            variants={fadeInUp}
                            className="px-6 py-2.5 rounded-full bg-white/40 dark:bg-white/5 backdrop-blur-md border border-gray-200 dark:border-white/10 text-slate-700 dark:text-gray-300 font-medium font-space text-sm md:text-base cursor-default transition-all duration-300 hover:scale-105 hover:bg-white/60 dark:hover:bg-white/10 hover:border-blue-500/50 hover:text-blue-600 dark:hover:text-blue-400 hover:shadow-[0_0_20px_rgba(59,130,246,0.3)]"
                        >
                            {tool}
                        </MotionDiv>
                    ))}
                    <MotionDiv
                        variants={fadeInUp}
                        className="px-6 py-2.5 rounded-full border border-dashed border-gray-300 dark:border-white/20 text-gray-400 dark:text-gray-500 font-medium font-space text-sm md:text-base cursor-default italic"
                    >
                        and more ...
                    </MotionDiv>
                </MotionDiv>
            </div>
        </section>
    );
};

const ParallaxTranslate: React.FC<{ children?: React.ReactNode; speed?: number }> = ({ children, speed = 1 }) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
      target: ref,
      offset: ["start end", "end start"]
  });
  const y = useTransform(scrollYProgress, [0, 1], [50 * speed, -50 * speed]);
  return (
      <MotionDiv ref={ref} style={{ y }} className="w-full h-full">
          {children}
      </MotionDiv>
  );
};

// Services Section
const Services = () => {
  const services = [
    {
      icon: <Database className="w-8 h-8 text-blue-500 dark:text-blue-400" />,
      title: "Data Architecture",
      desc: "Unified data sources creating a single source of truth for real-time analysis."
    },
    {
      icon: <Cpu className="w-8 h-8 text-purple-500 dark:text-purple-400" />,
      title: "AI Integration",
      desc: "Custom LLMs and machine learning models to automate complex decision making."
    },
    {
      icon: <Activity className="w-8 h-8 text-green-500 dark:text-green-400" />,
      title: "Workflow Automation",
      desc: "End-to-end bots that handle invoicing, inventory, and logistics automatically."
    },
    {
      icon: <Shield className="w-8 h-8 text-red-500 dark:text-red-400" />,
      title: "Compliance & Security",
      desc: "Privacy Act compliant data handling with robust, enterprise-grade security."
    }
  ];

  return (
    <section id="services" className="py-32 px-6 md:px-12 relative z-10 scroll-mt-28">
       <div className="absolute inset-0 bg-white/80 dark:bg-black/80 backdrop-blur-sm -z-10" />
       <div className="max-w-7xl mx-auto">
          <MotionDiv 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeInUp}
            className="mb-20"
          >
            <h2 className="text-3xl md:text-5xl font-bold mb-6 text-slate-900 dark:text-white tracking-tight">Our Core Capabilities</h2>
            <div className="h-1 w-20 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full"></div>
          </MotionDiv>

          <MotionDiv 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={staggerContainer}
            className="grid md:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {services.map((s, i) => (
              <ParallaxTranslate key={i} speed={(i % 2 === 0) ? 0.5 : -0.5}>
                <MotionDiv
                    variants={fadeInUp}
                    className="group p-8 rounded-[2.5rem] bg-white/60 dark:bg-white/5 border border-gray-200 dark:border-white/10 hover:border-blue-500/50 shadow-lg dark:shadow-none hover:-translate-y-2 hover:bg-white dark:hover:bg-white/10 backdrop-blur-md relative overflow-hidden h-full transition-all duration-300"
                >
                    <div className="absolute -right-4 -top-4 w-24 h-24 bg-blue-500/10 dark:bg-blue-500/20 blur-2xl rounded-full group-hover:bg-blue-500/20 dark:group-hover:bg-blue-500/30 transition-all"></div>
                    
                    <div className="mb-6 p-4 bg-gray-100 dark:bg-black/50 rounded-2xl w-fit group-hover:scale-110 transition-transform border border-gray-200 dark:border-white/5">
                    {s.icon}
                    </div>
                    <h3 className="text-xl font-bold mb-3 text-slate-900 dark:text-white tracking-tight">{s.title}</h3>
                    <p className="text-gray-600 dark:text-gray-400 leading-relaxed text-sm font-light">{s.desc}</p>
                </MotionDiv>
              </ParallaxTranslate>
            ))}
          </MotionDiv>
       </div>
    </section>
  );
};

// Process Section
const Process = () => {
    const steps = [
        {
            icon: Search,
            title: "Discovery",
            desc: "We dive deep into your existing workflows to uncover bottlenecks and data silos."
        },
        {
            icon: Zap,
            title: "Strategy",
            desc: "We design a custom automation architecture tailored to your specific business KPIs."
        },
        {
            icon: Rocket,
            title: "Implementation",
            desc: "Our engineers build, test, and deploy your solution with minimal disruption to operations."
        },
        {
            icon: CheckCircle,
            title: "Optimization",
            desc: "Continuous monitoring and AI model retraining ensure your system improves over time."
        }
    ];

    return (
        <section id="process" className="py-32 px-6 md:px-12 relative z-10 bg-slate-50/50 dark:bg-white/5 border-y border-gray-200 dark:border-white/5 backdrop-blur-sm scroll-mt-28">
            <div className="max-w-7xl mx-auto">
                <MotionDiv
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={fadeInUp}
                    className="text-center mb-20"
                >
                    <span className="text-blue-600 dark:text-blue-400 font-bold tracking-widest uppercase text-xs mb-3 block">How We Work</span>
                    <h2 className="text-3xl md:text-5xl font-bold text-slate-900 dark:text-white mb-6 tracking-tight">The Automation Blueprint</h2>
                    <p className="max-w-2xl mx-auto text-gray-600 dark:text-gray-400 font-light">From audit to deployment, our proven methodology ensures a seamless transition to automated operations.</p>
                </MotionDiv>

                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 relative">
                     <div className="hidden lg:block absolute top-12 left-0 w-full h-0.5 bg-gradient-to-r from-blue-500/0 via-blue-500/20 to-blue-500/0 dark:via-blue-500/50" />

                     {steps.map((step, idx) => (
                         <MotionDiv
                            key={idx}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: idx * 0.2 }}
                            className="relative z-10 flex flex-col items-center text-center group"
                         >
                             <div className="w-24 h-24 rounded-full bg-white dark:bg-black border-4 border-slate-100 dark:border-gray-800 flex items-center justify-center mb-6 group-hover:border-blue-500 transition-colors shadow-xl">
                                 <step.icon className="w-8 h-8 text-gray-400 dark:text-gray-600 group-hover:text-blue-500 transition-colors" />
                             </div>
                             <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3 tracking-tight">{step.title}</h3>
                             <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed font-light">{step.desc}</p>
                         </MotionDiv>
                     ))}
                </div>
            </div>
        </section>
    );
};

interface ProjectCardProps {
  project: {
    client: string;
    title: string;
    image: string;
    tag: string;
    stat: string;
  };
}

const ParallaxProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });
  
  const y = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);
  
  return (
    <MotionDiv 
      ref={ref}
      variants={fadeInUp}
      className="group relative overflow-hidden rounded-[2.5rem] aspect-[4/5] cursor-pointer shadow-xl dark:shadow-2xl bg-gray-100 dark:bg-gray-900 border border-gray-200 dark:border-white/5"
    >
       <div className="absolute inset-0 overflow-hidden">
          <MotionDiv style={{ y }} className="w-full h-full">
            <img 
              src={project.image} 
              alt={project.title} 
              className="w-full h-full object-cover opacity-90 dark:opacity-70 group-hover:opacity-100 dark:group-hover:opacity-40 transition-all duration-700 scale-[1.15] group-hover:scale-[1.25]" 
            />
          </MotionDiv>
       </div>
       
       <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent dark:from-black dark:via-black/40 dark:to-transparent p-8 flex flex-col justify-end transition-all">
          <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500 ease-out">
             <div className="flex justify-between items-center mb-3">
               <span className="text-blue-300 dark:text-blue-400 text-[10px] font-bold uppercase tracking-widest border border-blue-400/30 px-2 py-1 rounded-md bg-blue-900/30 dark:bg-blue-500/10 backdrop-blur-sm">{project.tag}</span>
               <ExternalLink className="w-5 h-5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 text-white" />
             </div>
             <h3 className="text-2xl font-bold mb-1 leading-tight text-white tracking-tight">{project.title}</h3>
             <p className="text-gray-200 dark:text-gray-300 text-sm mb-4 font-light">{project.client}</p>
             
             <div className="grid grid-rows-[0fr] group-hover:grid-rows-[1fr] transition-[grid-template-rows] duration-500 ease-out">
               <div className="overflow-hidden">
                 <div className="pt-4 border-t border-white/20 flex items-center justify-between">
                   <p className="text-white font-bold flex items-center gap-2">
                      <Activity className="w-4 h-4 text-green-400" /> {project.stat}
                   </p>
                   <p className="text-white text-xs font-semibold uppercase tracking-widest flex items-center gap-2 opacity-0 translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-500 delay-100 font-space">
                      View Project <ArrowRight className="w-4 h-4" />
                   </p>
                 </div>
               </div>
             </div>
          </div>
       </div>
    </MotionDiv>
  );
};

// Projects Section
const Projects = () => {
  const projects = [
    {
      client: "AusMining Co",
      title: "Predictive Maintenance System",
      image: "https://images.unsplash.com/photo-1599839575945-a9e5af0c3fa5?q=80&w=2069&auto=format&fit=crop",
      tag: "Machine Learning",
      stat: "+30% Efficiency"
    },
    {
      client: "Sydney Logistics",
      title: "Automated Route Optimization",
      image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=2070&auto=format&fit=crop",
      tag: "Logistics",
      stat: "400hrs Saved/Mo"
    },
    {
      client: "Melbourne FinTech",
      title: "Real-time Fraud Detection",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070&auto=format&fit=crop",
      tag: "Finance",
      stat: "99.9% Accuracy"
    }
  ];

  return (
    <section id="projects" className="py-32 px-6 md:px-12 relative z-10 scroll-mt-28">
       <div className="absolute inset-0 bg-gradient-to-b from-slate-50 via-slate-100 to-white dark:from-black/90 dark:via-black/95 dark:to-black -z-10" />
      <div className="max-w-7xl mx-auto">
        <MotionDiv 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
          className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6"
        >
          <div>
             <span className="text-blue-600 dark:text-blue-500 font-bold tracking-widest uppercase text-xs mb-3 block">Case Studies</span>
             <h2 className="text-3xl md:text-5xl font-bold mt-2 text-slate-900 dark:text-white tracking-tight">Engineered for Impact</h2>
          </div>
          <p className="text-gray-600 dark:text-gray-400 max-w-md text-right md:text-left font-light">
            See how we've helped Australian businesses save thousands of hours and millions of dollars.
          </p>
        </MotionDiv>

        <MotionDiv 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-10% 0px -10% 0px" }}
          variants={staggerContainer}
          className="grid md:grid-cols-3 gap-8"
        >
           {projects.map((p, i) => (
             <ParallaxTranslate key={i} speed={(i % 2 === 0) ? 0.3 : -0.3}>
                <ParallaxProjectCard project={p} />
             </ParallaxTranslate>
           ))}
        </MotionDiv>
      </div>
    </section>
  );
};

// Founders Section
const Founders = () => {
    const founders = [
        { 
            name: "Mohammed Ghouse Tiltil", 
            role: "Head of Technology", 
            img: "https://ui-avatars.com/api/?name=Mohammed+Ghouse+Tiltil&background=0f172a&color=fff&size=200",
            desc: "Leading the technical vision, architecting bespoke AI models and data ecosystems that drive automation.",
            linkedin: "https://www.linkedin.com/in/mohammed-ghouse-tiltil/",
            email: "mailto:mohammed@datamatically.com"
        },
        { 
            name: "Charlie Guthrie", 
            role: "Head of Sales", 
            img: "https://ui-avatars.com/api/?name=Charlie+Guthrie&background=0f172a&color=fff&size=200",
            desc: "Spearheading client partnerships and ensuring every automation solution delivers measurable financial ROI.",
            linkedin: " ",
            email: "mailto:charlie@datamatically.com"
        },
        { 
            name: "Craig Haydon", 
            role: "Head of Strategy", 
            img: "https://ui-avatars.com/api/?name=Craig+Haydon&background=0f172a&color=fff&size=200",
            desc: "Developing long-term strategic roadmaps and financial frameworks to sustain rapid business growth.",
            linkedin: "https://www.linkedin.com/in/craig-haydon-447aa673/",
            email: " "
        }
    ];

    return (
        <section id="team" className="py-24 px-6 md:px-12 relative z-10 scroll-mt-28">
            <div className="max-w-7xl mx-auto">
                 <MotionDiv 
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={fadeInUp}
                    className="text-center mb-16"
                 >
                    <h2 className="text-3xl md:text-5xl font-bold mb-6 text-slate-900 dark:text-white tracking-tight">Meet the Leadership</h2>
                    <p className="text-gray-600 dark:text-gray-400 font-light">The minds behind the automation revolution.</p>
                 </MotionDiv>

                 <div className="grid md:grid-cols-3 gap-8">
                     {founders.map((founder, idx) => (
                         <MotionDiv
                            key={idx}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: idx * 0.2 }}
                            className="bg-white/60 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-[2.5rem] p-8 backdrop-blur-md hover:-translate-y-2 transition-transform duration-300 group"
                         >
                             <div className="w-24 h-24 mx-auto mb-6 rounded-full overflow-hidden border-2 border-blue-500/20 group-hover:border-blue-500 transition-colors">
                                 <img src={founder.img} alt={founder.name} className="w-full h-full object-cover" />
                             </div>
                             <h3 className="text-xl font-bold text-slate-900 dark:text-white text-center mb-1 tracking-tight">{founder.name}</h3>
                             <p className="text-blue-600 dark:text-blue-400 text-[10px] font-bold text-center uppercase tracking-widest mb-4">{founder.role}</p>
                             <p className="text-center text-gray-600 dark:text-gray-400 text-sm leading-relaxed mb-6 font-light">{founder.desc}</p>
                             <div className="flex justify-center gap-4">
                                 {founder.linkedin !== "#" && (
                                     <a href={founder.linkedin} target="_blank" rel="noopener noreferrer" className="p-2 bg-gray-100 dark:bg-white/10 rounded-full hover:bg-blue-600 hover:text-white dark:hover:bg-blue-600 transition-all text-gray-600 dark:text-gray-400">
                                         <Linkedin className="w-4 h-4" />
                                     </a>
                                 )}
                                 {founder.email !== "#" && (
                                     <a href={founder.email} className="p-2 bg-gray-100 dark:bg-white/10 rounded-full hover:bg-blue-600 hover:text-white dark:hover:bg-blue-600 transition-all text-gray-600 dark:text-gray-400">
                                         <Mail className="w-4 h-4" />
                                     </a>
                                 )}
                             </div>
                         </MotionDiv>
                     ))}
                 </div>
            </div>
        </section>
    );
};

// Contact Section
const Contact = () => {
  return (
    <section id="contact" className="py-24 px-6 md:px-12 bg-slate-50 dark:bg-black border-t border-gray-200 dark:border-gray-900 relative z-10 scroll-mt-28">
      <div className="max-w-4xl mx-auto text-center">
        <MotionDiv
           initial="hidden"
           whileInView="visible"
           viewport={{ once: true }}
           variants={fadeInUp}
        >
            <h2 className="text-4xl md:text-6xl font-bold mb-6 text-slate-900 dark:text-white tracking-tight">Ready to automate?</h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 mb-12 font-light">
            Let's discuss how we can transform your business data into your most valuable asset.
            </p>
            
            <div className="grid md:grid-cols-3 gap-4 mb-12">
                <a href="mailto:hello@datamatically.com" className="p-6 rounded-[2rem] bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 hover:bg-gray-50 dark:hover:bg-white/10 hover:border-blue-500 transition-colors flex flex-col items-center gap-4 backdrop-blur-sm group shadow-sm dark:shadow-none">
                    <div className="p-3 bg-blue-100 dark:bg-blue-500/20 rounded-full group-hover:scale-110 transition-transform">
                        <Mail className="w-6 h-6 text-blue-600 dark:text-blue-500" />
                    </div>
                    <span className="text-lg font-bold text-slate-900 dark:text-white">hello@datamatically.com</span>
                    <span className="text-xs text-gray-500 uppercase tracking-widest font-bold">Email Us</span>
                </a>

                 <a href="https://calendly.com/datamatically" target="_blank" rel="noopener noreferrer" className="p-6 rounded-[2rem] bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 hover:bg-gray-50 dark:hover:bg-white/10 hover:border-green-500 transition-colors flex flex-col items-center gap-4 backdrop-blur-sm group shadow-sm dark:shadow-none">
                    <div className="p-3 bg-green-100 dark:bg-green-500/20 rounded-full group-hover:scale-110 transition-transform">
                        <Calendar className="w-6 h-6 text-green-600 dark:text-green-500" />
                    </div>
                    <span className="text-lg font-bold text-slate-900 dark:text-white">Book Consultation</span>
                    <span className="text-xs text-gray-500 uppercase tracking-widest font-bold">Via Calendly</span>
                </a>

                <div className="p-6 rounded-[2rem] bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 hover:bg-gray-50 dark:hover:bg-white/10 transition-colors flex flex-col items-center gap-4 backdrop-blur-sm group shadow-sm dark:shadow-none">
                    <div className="p-3 bg-purple-100 dark:bg-purple-500/20 rounded-full group-hover:scale-110 transition-transform">
                        <MapPin className="w-6 h-6 text-purple-600 dark:text-purple-500" />
                    </div>
                    <span className="text-lg font-bold text-slate-900 dark:text-white">Melbourne, Australia</span>
                    <span className="text-xs text-gray-500 uppercase tracking-widest font-bold">HQ Location</span>
                </div>
            </div>

            <form 
              className="text-left space-y-4 max-w-xl mx-auto bg-white dark:bg-gray-900/50 p-8 rounded-[2.5rem] border border-gray-200 dark:border-800 backdrop-blur-md shadow-xl dark:shadow-none"
              onSubmit={(e) => e.preventDefault()}
            >
            <div className="grid grid-cols-2 gap-4">
                <div>
                    <label className="block text-[10px] font-bold text-gray-500 mb-2 uppercase tracking-widest">Name</label>
                    <input type="text" className="w-full bg-gray-50 dark:bg-black/50 border border-gray-300 dark:border-gray-700 rounded-xl p-3 focus:ring-2 focus:ring-blue-600 outline-none text-slate-900 dark:text-white transition-all focus:border-blue-600 font-space" />
                </div>
                <div>
                    <label className="block text-[10px] font-bold text-gray-500 mb-2 uppercase tracking-widest">Email</label>
                    <input type="email" className="w-full bg-gray-50 dark:bg-black/50 border border-gray-300 dark:border-gray-700 rounded-xl p-3 focus:ring-2 focus:ring-blue-600 outline-none text-slate-900 dark:text-white transition-all focus:border-blue-600 font-space" />
                </div>
            </div>
            <div>
                <label className="block text-[10px] font-bold text-gray-500 mb-2 uppercase tracking-widest">Project Details</label>
                <textarea rows={4} className="w-full bg-gray-50 dark:bg-black/50 border border-gray-300 dark:border-gray-700 rounded-xl p-3 focus:ring-2 focus:ring-blue-600 outline-none text-slate-900 dark:text-white transition-all focus:border-blue-600 font-space"></textarea>
            </div>
            <button className="w-full bg-black dark:bg-white text-white dark:text-black font-bold py-4 rounded-lg hover:opacity-80 transition-opacity">Send Message</button>
            </form>
        </MotionDiv>
      </div>
    </section>
  );
};

// Footer
const Footer = () => (
  <footer className="py-8 bg-slate-100 dark:bg-black border-t border-gray-200 dark:border-gray-900 text-center text-gray-500 dark:text-gray-600 text-[10px] uppercase font-bold tracking-widest relative z-10 font-space">
    <p>&copy; {new Date().getFullYear()} Datamatically Pty Ltd. Registered in Australia.</p>
  </footer>
);

export default function App() {
  const [loading, setLoading] = useState(true);
  const [theme, setTheme] = useState(() => {
    if (typeof window !== 'undefined') {
      const savedTheme = localStorage.getItem('theme');
      return savedTheme || 'light'; 
    }
    return 'light';
  });

  const isDark = theme === 'dark';

  useEffect(() => {
    const root = window.document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'dark' ? 'light' : 'dark');
  };

  return (
    <>
      <AnimatePresence>
        {loading && <LoadingScreen onComplete={() => setLoading(false)} />}
      </AnimatePresence>
      
      {!loading && (
        <div className="min-h-screen bg-slate-50 dark:bg-[#030712] transition-colors duration-500">
            <div className="fixed inset-0 z-0 pointer-events-none opacity-40 dark:opacity-100">
                <Suspense fallback={<div className="w-full h-full bg-slate-50 dark:bg-[#030712]" />}>
                    <Scene isDark={isDark} />
                </Suspense>
            </div>

            <MotionMain
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.5 }}
            className="relative z-10 min-h-screen selection:bg-blue-500 selection:text-white"
            >
              <Navbar toggleTheme={toggleTheme} isDark={isDark} />
              <Hero />
              <ToolsSection />
              <Services />
              <Process />
              <Projects />
              <Founders />
              <Contact />
              <Footer />
            </MotionMain>
        </div>
      )}
    </>
  );
}
