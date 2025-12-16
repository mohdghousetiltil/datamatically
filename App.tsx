
import React, { useState, useEffect, Suspense, useRef } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { Menu, X, ArrowRight, Activity, Database, Cpu, ChevronDown, CheckCircle, Mail, Globe, Shield, ExternalLink, Sun, Moon, Search, Zap, Rocket, Users, MapPin, Linkedin, Calendar } from 'lucide-react';
import Scene from './components/Scene';

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

// Navbar
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
  ];

  const handleLinkClick = (e: React.MouseEvent, id: string) => {
      scrollToSection(e, id);
      setIsOpen(false);
  }

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? 'bg-white/70 dark:bg-black/40 backdrop-blur-xl border-b border-gray-200 dark:border-white/5 py-4' : 'bg-transparent py-6'}`}>
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        <a href="#" onClick={(e) => scrollToSection(e, 'root')} className="text-2xl font-bold font-space tracking-tighter flex items-center gap-2 group">
             <Logo />
           <span className="bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-400 group-hover:to-gray-900 dark:group-hover:to-white transition-all duration-500">Datamatically</span>
        </a>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-8">
          {links.map((link) => (
            <a 
                key={link.name} 
                href={`#${link.id}`} 
                onClick={(e) => handleLinkClick(e, link.id)}
                className="text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-black dark:hover:text-white transition-colors relative group"
            >
              {link.name}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-500 transition-all group-hover:w-full"></span>
            </a>
          ))}
          
          <button 
            onClick={toggleTheme} 
            className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-white/10 text-gray-700 dark:text-gray-300 transition-colors"
            aria-label="Toggle Theme"
          >
            {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
          </button>

          <a 
            href="#contact" 
            onClick={(e) => handleLinkClick(e, 'contact')}
            className="px-5 py-2.5 bg-black dark:bg-white text-white dark:text-black text-sm font-bold rounded-full hover:opacity-80 transition-all hover:scale-105 active:scale-95 shadow-lg"
          >
            Contact Us
          </a>
        </div>

        {/* Mobile Toggle */}
        <div className="flex items-center gap-4 md:hidden">
            <button 
                onClick={toggleTheme} 
                className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-white/10 text-gray-700 dark:text-gray-300 transition-colors"
            >
                {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>
            <button onClick={() => setIsOpen(!isOpen)} className="text-gray-900 dark:text-white">
                {isOpen ? <X /> : <Menu />}
            </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <MotionDiv 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white/95 dark:bg-black/90 backdrop-blur-lg border-b border-gray-200 dark:border-gray-800 overflow-hidden"
          >
            <div className="px-6 py-8 flex flex-col gap-6">
              {links.map((link) => (
                <a 
                    key={link.name} 
                    href={`#${link.id}`} 
                    onClick={(e) => handleLinkClick(e, link.id)}
                    className="text-lg text-gray-800 dark:text-gray-300 hover:text-blue-600 dark:hover:text-white font-medium"
                >
                  {link.name}
                </a>
              ))}
              <a 
                href="#contact" 
                onClick={(e) => handleLinkClick(e, 'contact')}
                className="w-full text-center px-5 py-3 bg-blue-600 text-white font-bold rounded-lg shadow-md"
              >
                Get Started
              </a>
            </div>
          </MotionDiv>
        )}
      </AnimatePresence>
    </nav>
  );
};

// Loading Screen
const LoadingScreen = ({ onComplete }: { onComplete: () => void }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Simulate loading progress
    const timer = setInterval(() => {
      setProgress((prev) => {
        // Random increment for realistic feel
        const next = prev + Math.floor(Math.random() * 3) + 1;
        if (next >= 100) {
          clearInterval(timer);
          setTimeout(onComplete, 400); // Slight pause at 100%
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
         
         {/* Progress Bar Container */}
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
    <section className="relative h-screen w-full flex items-center justify-center overflow-hidden perspective-[1200px]">
      {/* Content */}
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
          <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto mb-10 leading-relaxed font-light">
            We help Australian SMEs harness the power of AI and Data to eliminate repetitive tasks, optimize workflows, and scale without limits.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
             <a 
                href="#contact" 
                onClick={(e) => scrollToSection(e, 'contact')}
                className="px-8 py-4 bg-black dark:bg-white text-white dark:text-black font-bold rounded-full hover:opacity-80 transition-all flex items-center gap-2 group hover:scale-105 active:scale-95 shadow-xl"
             >
                Get Started <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
             </a>
             <a 
                href="#projects" 
                onClick={(e) => scrollToSection(e, 'projects')}
                className="px-8 py-4 bg-transparent border border-gray-300 dark:border-gray-700 text-gray-900 dark:text-white font-bold rounded-full hover:bg-gray-100 dark:hover:bg-white/10 transition-all backdrop-blur-sm"
             >
                View Case Studies
             </a>
          </div>
        </MotionDiv>
      </MotionDiv>

      {/* Quick Actions Right Side */}
      <MotionDiv 
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 1.2, duration: 0.8, ease: "easeOut" }}
        className="absolute z-20 flex flex-col gap-3 right-4 bottom-24 lg:top-1/2 lg:bottom-auto lg:-translate-y-1/2 lg:right-6 lg:gap-4"
      >
        <a 
          href="mailto:hello@datamatically.com"
          className="p-3 lg:p-4 bg-white/80 dark:bg-white/5 backdrop-blur-md border border-gray-200 dark:border-white/10 rounded-full hover:bg-blue-600 hover:text-white dark:hover:bg-blue-600 transition-all group relative shadow-lg hover:scale-110"
          aria-label="Send Email"
        >
           <Mail className="w-4 h-4 lg:w-5 lg:h-5 text-gray-700 dark:text-white group-hover:text-white transition-colors" />
           <span className="absolute right-full mr-4 top-1/2 -translate-y-1/2 px-3 py-1.5 bg-white dark:bg-black text-gray-800 dark:text-white text-xs font-bold rounded-lg opacity-0 group-hover:opacity-100 transition-all translate-x-2 group-hover:translate-x-0 whitespace-nowrap shadow-xl pointer-events-none border border-gray-100 dark:border-gray-800 hidden md:block">
             Email Us
           </span>
        </a>

        <a 
          href="https://calendly.com/mo-datamatically" 
          target="_blank" 
          rel="noopener noreferrer"
          className="p-3 lg:p-4 bg-white/80 dark:bg-white/5 backdrop-blur-md border border-gray-200 dark:border-white/10 rounded-full hover:bg-green-600 hover:text-white dark:hover:bg-green-600 transition-all group relative shadow-lg hover:scale-110"
          aria-label="Book Consultation"
        >
           <Calendar className="w-4 h-4 lg:w-5 lg:h-5 text-gray-700 dark:text-white group-hover:text-white transition-colors" />
           <span className="absolute right-full mr-4 top-1/2 -translate-y-1/2 px-3 py-1.5 bg-white dark:bg-black text-gray-800 dark:text-white text-xs font-bold rounded-lg opacity-0 group-hover:opacity-100 transition-all translate-x-2 group-hover:translate-x-0 whitespace-nowrap shadow-xl pointer-events-none border border-gray-100 dark:border-gray-800 hidden md:block">
             Book Consultation
           </span>
        </a>
      </MotionDiv>

      <MotionDiv 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity, delay: 1 }}
        className="absolute bottom-10 inset-x-0 flex flex-col items-center gap-2 text-gray-400 dark:text-gray-500 pointer-events-none"
      >
        <span className="text-[10px] uppercase tracking-widest opacity-50">Scroll to explore</span>
        <ChevronDown className="w-4 h-4" />
      </MotionDiv>
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
            <h2 className="text-3xl md:text-5xl font-bold mb-6 text-slate-900 dark:text-white">Our Core Capabilities</h2>
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
                    className="group p-8 rounded-3xl bg-white/60 dark:bg-white/5 border border-gray-200 dark:border-white/10 hover:border-blue-500/50 shadow-lg dark:shadow-none hover:-translate-y-2 hover:bg-white dark:hover:bg-white/10 backdrop-blur-md relative overflow-hidden h-full transition-all duration-300"
                >
                    <div className="absolute -right-4 -top-4 w-24 h-24 bg-blue-500/10 dark:bg-blue-500/20 blur-2xl rounded-full group-hover:bg-blue-500/20 dark:group-hover:bg-blue-500/30 transition-all"></div>
                    
                    <div className="mb-6 p-4 bg-gray-100 dark:bg-black/50 rounded-2xl w-fit group-hover:scale-110 transition-transform border border-gray-200 dark:border-white/5">
                    {s.icon}
                    </div>
                    <h3 className="text-xl font-bold mb-3 text-slate-900 dark:text-white">{s.title}</h3>
                    <p className="text-gray-600 dark:text-gray-400 leading-relaxed text-sm">{s.desc}</p>
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
                    <h2 className="text-3xl md:text-5xl font-bold text-slate-900 dark:text-white mb-6">The Automation Blueprint</h2>
                    <p className="max-w-2xl mx-auto text-gray-600 dark:text-gray-400">From audit to deployment, our proven methodology ensures a seamless transition to automated operations.</p>
                </MotionDiv>

                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 relative">
                     {/* Connector Line */}
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
                             <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">{step.title}</h3>
                             <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">{step.desc}</p>
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
      className="group relative overflow-hidden rounded-3xl aspect-[4/5] cursor-pointer shadow-xl dark:shadow-2xl bg-gray-100 dark:bg-gray-900 border border-gray-200 dark:border-white/5"
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
       
       {/* Overlay */}
       <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent dark:from-black dark:via-black/40 dark:to-transparent p-8 flex flex-col justify-end transition-all">
          <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500 ease-out">
             <div className="flex justify-between items-center mb-3">
               <span className="text-blue-300 dark:text-blue-400 text-xs font-bold uppercase tracking-wider border border-blue-400/30 px-2 py-1 rounded bg-blue-900/30 dark:bg-blue-500/10 backdrop-blur-sm">{project.tag}</span>
               <ExternalLink className="w-5 h-5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 text-white" />
             </div>
             <h3 className="text-2xl font-bold mb-1 leading-tight text-white">{project.title}</h3>
             <p className="text-gray-200 dark:text-gray-300 text-sm mb-4">{project.client}</p>
             
             <div className="grid grid-rows-[0fr] group-hover:grid-rows-[1fr] transition-[grid-template-rows] duration-500 ease-out">
               <div className="overflow-hidden">
                 <div className="pt-4 border-t border-white/20 flex items-center justify-between">
                   <p className="text-white font-bold flex items-center gap-2">
                      <Activity className="w-4 h-4 text-green-400" /> {project.stat}
                   </p>
                   <p className="text-white text-sm font-semibold flex items-center gap-2 opacity-0 translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-500 delay-100">
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

  const clients = [
    { name: "Elite FSA", url: "https://www.elitefsa.com/#/" },
    { name: "Flagship TMS", url: "https://www.flagshiptms.com/" }
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
             <span className="text-blue-600 dark:text-blue-500 font-bold tracking-widest uppercase text-sm">Case Studies</span>
             <h2 className="text-3xl md:text-5xl font-bold mt-2 text-slate-900 dark:text-white">Engineered for Impact</h2>
          </div>
          <p className="text-gray-600 dark:text-gray-400 max-w-md text-right md:text-left">
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

        {/* Client Logos */}
        <MotionDiv 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.5 }}
          className="mt-24 border-t border-gray-200 dark:border-gray-800 pt-12"
        >
           <p className="text-center text-gray-500 text-sm mb-8 uppercase tracking-widest">Trusted by industry leaders</p>
           <div className="flex flex-wrap justify-center gap-12 md:gap-24 opacity-50 grayscale hover:grayscale-0 transition-all duration-700">
              {clients.map((client) => (
                 <a 
                    key={client.name} 
                    href={client.url} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="text-xl md:text-3xl font-bold font-space text-gray-800 dark:text-white/40 hover:text-blue-600 dark:hover:text-white transition-colors cursor-pointer"
                 >
                    {client.name}
                 </a>
              ))}
           </div>
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
            email: "mailto:mo@datamatically.onmicrosoft.com"
        },
        { 
            name: "Charlie Guthrie", 
            role: "Head of Sales", 
            img: "https://ui-avatars.com/api/?name=Charlie+Guthrie&background=0f172a&color=fff&size=200",
            desc: "Spearheading client partnerships and ensuring every automation solution delivers measurable financial ROI.",
            linkedin: "#",
            email: "#"
        },
        { 
            name: "Craig Haydon", 
            role: "Head of Strategy", 
            img: "https://ui-avatars.com/api/?name=Craig+Haydon&background=0f172a&color=fff&size=200",
            desc: "Developing long-term strategic roadmaps and financial frameworks to sustain rapid business growth.",
            linkedin: "https://www.linkedin.com/in/craig-haydon-447aa673/",
            email: "#"
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
                    <h2 className="text-3xl md:text-5xl font-bold mb-6 text-slate-900 dark:text-white">Meet the Leadership</h2>
                    <p className="text-gray-600 dark:text-gray-400">The minds behind the automation revolution.</p>
                 </MotionDiv>

                 <div className="grid md:grid-cols-3 gap-8">
                     {founders.map((founder, idx) => (
                         <MotionDiv
                            key={idx}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: idx * 0.2 }}
                            className="bg-white/60 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-3xl p-8 backdrop-blur-md hover:-translate-y-2 transition-transform duration-300 group"
                         >
                             <div className="w-24 h-24 mx-auto mb-6 rounded-full overflow-hidden border-2 border-blue-500/20 group-hover:border-blue-500 transition-colors">
                                 <img src={founder.img} alt={founder.name} className="w-full h-full object-cover" />
                             </div>
                             <h3 className="text-xl font-bold text-slate-900 dark:text-white text-center mb-1">{founder.name}</h3>
                             <p className="text-blue-600 dark:text-blue-400 text-sm font-bold text-center uppercase tracking-wide mb-4">{founder.role}</p>
                             <p className="text-center text-gray-600 dark:text-gray-400 text-sm leading-relaxed mb-6">{founder.desc}</p>
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
            <h2 className="text-4xl md:text-6xl font-bold mb-6 text-slate-900 dark:text-white">Ready to automate?</h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 mb-12">
            Let's discuss how we can transform your business data into your most valuable asset.
            </p>
            
            <div className="grid md:grid-cols-3 gap-4 mb-12">
            <a href="mailto:hello@datamatically.com" className="p-6 rounded-2xl bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 hover:bg-gray-50 dark:hover:bg-white/10 hover:border-blue-500 transition-colors flex flex-col items-center gap-4 backdrop-blur-sm group shadow-sm dark:shadow-none">
                <div className="p-3 bg-blue-100 dark:bg-blue-500/20 rounded-full group-hover:scale-110 transition-transform">
                    <Mail className="w-6 h-6 text-blue-600 dark:text-blue-500" />
                </div>
                <span className="text-lg font-bold text-slate-900 dark:text-white">hello@datamatically.com</span>
                <span className="text-xs text-gray-500 uppercase tracking-wider">Email Us</span>
            </a>

             <a href="https://calendly.com/mo-datamatically" target="_blank" rel="noopener noreferrer" className="p-6 rounded-2xl bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 hover:bg-gray-50 dark:hover:bg-white/10 hover:border-green-500 transition-colors flex flex-col items-center gap-4 backdrop-blur-sm group shadow-sm dark:shadow-none">
                <div className="p-3 bg-green-100 dark:bg-green-500/20 rounded-full group-hover:scale-110 transition-transform">
                    <Calendar className="w-6 h-6 text-green-600 dark:text-green-500" />
                </div>
                <span className="text-lg font-bold text-slate-900 dark:text-white">Book Consultation</span>
                <span className="text-xs text-gray-500 uppercase tracking-wider">Via Calendly</span>
            </a>

            <div className="p-6 rounded-2xl bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 hover:bg-gray-50 dark:hover:bg-white/10 transition-colors flex flex-col items-center gap-4 backdrop-blur-sm group shadow-sm dark:shadow-none">
                <div className="p-3 bg-purple-100 dark:bg-purple-500/20 rounded-full group-hover:scale-110 transition-transform">
                    <MapPin className="w-6 h-6 text-purple-600 dark:text-purple-500" />
                </div>
                <span className="text-lg font-bold text-slate-900 dark:text-white">Melbourne, Australia</span>
                <span className="text-xs text-gray-500 uppercase tracking-wider">HQ Location</span>
            </div>
            </div>

            <form className="text-left space-y-4 max-w-xl mx-auto bg-white dark:bg-gray-900/50 p-8 rounded-3xl border border-gray-200 dark:border-gray-800 backdrop-blur-md shadow-xl dark:shadow-none">
            <div className="grid grid-cols-2 gap-4">
                <div>
                    <label className="block text-xs text-gray-500 mb-1 uppercase tracking-wider">Name</label>
                    <input type="text" className="w-full bg-gray-50 dark:bg-black/50 border border-gray-300 dark:border-gray-700 rounded-lg p-3 focus:ring-2 focus:ring-blue-600 outline-none text-slate-900 dark:text-white transition-all focus:border-blue-600" />
                </div>
                <div>
                    <label className="block text-xs text-gray-500 mb-1 uppercase tracking-wider">Email</label>
                    <input type="email" className="w-full bg-gray-50 dark:bg-black/50 border border-gray-300 dark:border-gray-700 rounded-lg p-3 focus:ring-2 focus:ring-blue-600 outline-none text-slate-900 dark:text-white transition-all focus:border-blue-600" />
                </div>
            </div>
            <div>
                <label className="block text-xs text-gray-500 mb-1 uppercase tracking-wider">Project Details</label>
                <textarea rows={4} className="w-full bg-gray-50 dark:bg-black/50 border border-gray-300 dark:border-gray-700 rounded-lg p-3 focus:ring-2 focus:ring-blue-600 outline-none text-slate-900 dark:text-white transition-all focus:border-blue-600"></textarea>
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
  <footer className="py-8 bg-slate-100 dark:bg-black border-t border-gray-200 dark:border-gray-900 text-center text-gray-500 dark:text-gray-600 text-sm relative z-10">
    <p>&copy; {new Date().getFullYear()} Datamatically Pty Ltd. All rights reserved.</p>
  </footer>
);

export default function App() {
  const [loading, setLoading] = useState(true);
  // Dark mode state: default to dark if not set, else read from localStorage
  const [theme, setTheme] = useState(() => {
    if (typeof window !== 'undefined') {
      const savedTheme = localStorage.getItem('theme');
      return savedTheme || 'dark';
    }
    return 'dark';
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
            {/* Fixed Background Scene - Added pointer-events-none */}
            <div className="fixed inset-0 z-0 pointer-events-none">
                <Suspense fallback={<div className="w-full h-full bg-slate-50 dark:bg-[#030712]" />}>
                    <Scene isDark={isDark} />
                </Suspense>
            </div>

            {/* Main Content */}
            <MotionMain
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.5 }}
            className="relative z-10 min-h-screen selection:bg-blue-500 selection:text-white"
            >
            <Navbar toggleTheme={toggleTheme} isDark={isDark} />
            <Hero />
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
