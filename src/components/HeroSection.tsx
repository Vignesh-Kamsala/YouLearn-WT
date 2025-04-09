
import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Play, Youtube } from 'lucide-react';
import { Button } from '@/components/ui/button';

const HeroSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setIsVisible(true);

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.6, ease: [0.19, 1, 0.22, 1] }
    }
  };

  return (
    <section 
      ref={sectionRef}
      className="relative pt-32 pb-20 md:pt-40 md:pb-32 overflow-hidden"
    >
      {/* Enhanced Background Decoration */}
      <div className="absolute inset-0 bg-hero-pattern opacity-30 z-0"></div>
      <div className="absolute top-20 left-1/2 transform -translate-x-1/2 w-[600px] h-[600px] rounded-full bg-gradient-radial from-youlearn-blue/10 to-transparent filter blur-3xl z-0"></div>
      <div className="absolute bottom-20 right-10 w-[300px] h-[300px] rounded-full bg-gradient-radial from-primary/10 to-transparent filter blur-2xl z-0"></div>
      
      <div className="container max-w-7xl mx-auto px-4 relative z-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isVisible ? "visible" : "hidden"}
          className="text-center max-w-3xl mx-auto"
        >
          <motion.div variants={itemVariants} className="inline-block mb-4">
            <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-youlearn-blue/10 text-youlearn-blue">
              <Play size={14} className="mr-1" /> Learning Made Easy
            </span>
          </motion.div>
          
          <motion.h1 
            variants={itemVariants}
            className="text-4xl md:text-5xl lg:text-6xl font-display font-bold tracking-tight text-youlearn-dark mb-4 leading-tight"
          >
            Stay Focused, <span className="text-youlearn-blue">Learn More</span>.
          </motion.h1>
          
          <motion.p 
            variants={itemVariants}
            className="text-lg md:text-xl text-youlearn-gray mb-8 max-w-2xl mx-auto text-balance"
          >
            Paste a YouTube video, get quizzes, summaries, and chat with our bot—all for free.
          </motion.p>
          
          <motion.div variants={itemVariants}>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link to="/dashboard">
                <Button size="lg" className="bg-youlearn-blue hover:bg-youlearn-lightBlue text-white shadow-elevation px-6 py-6 rounded-xl w-full sm:w-auto transition-all duration-300">
                  Get Started <ArrowRight size={16} className="ml-2" />
                </Button>
              </Link>
              <Button variant="outline" size="lg" className="px-6 py-6 rounded-xl w-full sm:w-auto border-youlearn-blue/20 hover:border-youlearn-blue/50 transition-all duration-300">
                <Youtube size={16} className="mr-2 text-youlearn-blue" /> Browse Examples
              </Button>
            </div>
          </motion.div>
        </motion.div>

        {/* Enhanced Video Player with Quiz */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.8, ease: [0.19, 1, 0.22, 1] }}
          className="mt-16 md:mt-20 relative mx-auto max-w-4xl"
        >
          <div className="rounded-2xl shadow-elevation overflow-hidden bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 transform hover:scale-[1.01] transition-transform duration-300">
            {/* Enhanced YouTube UI */}
            <div className="w-full bg-youlearn-dark p-2 flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
              </div>
              <div className="max-w-md mx-auto flex-1 px-3">
                <div className="h-6 bg-white/10 rounded"></div>
              </div>
              <div className="h-5 w-5"></div>
            </div>
            
            <div className="relative aspect-video bg-gradient-to-br from-gray-900 to-gray-800 flex items-center justify-center overflow-hidden">
              {/* Animated glow effect */}
              <div className="absolute w-full h-full bg-[radial-gradient(ellipse_at_center,rgba(0,112,243,0.15)_0%,rgba(0,0,0,0)_70%)] animate-pulse"></div>
              
              {/* Play button overlay with enhanced hover effect */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-20 h-20 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center group hover:bg-white/20 transition-all duration-300 cursor-pointer">
                  <Play size={36} className="text-white ml-1 group-hover:scale-110 transition-transform duration-300" />
                </div>
              </div>
              
              {/* Enhanced Quiz Overlay */}
              <div className="absolute bottom-8 right-8 glass-card p-4 max-w-xs transform translate-y-4 animate-float shadow-elevation">
                <h4 className="font-semibold text-sm mb-2 text-youlearn-dark">Quick Quiz:</h4>
                <p className="text-xs mb-3 text-youlearn-gray">What is the main benefit of spaced repetition?</p>
                <div className="space-y-2">
                  <div className="text-xs flex items-center space-x-2 p-1.5 rounded-md hover:bg-gray-100 transition-colors duration-200 cursor-pointer">
                    <div className="w-3.5 h-3.5 rounded-sm border border-gray-300"></div>
                    <span className="text-youlearn-dark">Faster learning</span>
                  </div>
                  <div className="text-xs flex items-center space-x-2 p-1.5 rounded-md bg-youlearn-blue/5 cursor-pointer">
                    <div className="w-3.5 h-3.5 rounded-sm border border-youlearn-blue bg-youlearn-blue flex items-center justify-center">
                      <svg className="w-2 h-2 text-white" fill="currentColor" viewBox="0 0 16 16">
                        <path d="M13.854 3.646a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L6.5 10.293l6.646-6.647a.5.5 0 0 1 .708 0z"/>
                      </svg>
                    </div>
                    <span className="font-medium text-youlearn-dark">Improved retention</span>
                  </div>
                  <div className="text-xs flex items-center space-x-2 p-1.5 rounded-md hover:bg-gray-100 transition-colors duration-200 cursor-pointer">
                    <div className="w-3.5 h-3.5 rounded-sm border border-gray-300"></div>
                    <span className="text-youlearn-dark">Less effort</span>
                  </div>
                </div>
              </div>
              
              {/* Enhanced Summary Card */}
              <div className="absolute top-8 left-8 glass-card p-4 max-w-xs transform -translate-y-4 animate-float animation-delay-200 shadow-elevation">
                <h4 className="font-semibold text-sm mb-2 text-youlearn-dark">Key Points:</h4>
                <ul className="text-xs space-y-2 text-youlearn-gray">
                  <li className="flex items-start">
                    <div className="w-3 h-3 rounded-full bg-youlearn-blue/20 flex-shrink-0 mt-0.5 mr-2"></div>
                    <span>Active recall enhances memory</span>
                  </li>
                  <li className="flex items-start">
                    <div className="w-3 h-3 rounded-full bg-youlearn-blue/20 flex-shrink-0 mt-0.5 mr-2"></div>
                    <span>Test yourself frequently on material</span>
                  </li>
                  <li className="flex items-start">
                    <div className="w-3 h-3 rounded-full bg-youlearn-blue/20 flex-shrink-0 mt-0.5 mr-2"></div>
                    <span>Space out your learning sessions</span>
                  </li>
                </ul>
              </div>
            </div>
            
            {/* Enhanced Video Controls */}
            <div className="px-4 py-3 bg-gray-100 dark:bg-gray-800 flex items-center space-x-3">
              <div className="w-24 h-2 rounded-full bg-gray-300 dark:bg-gray-700 overflow-hidden">
                <div className="w-[40%] h-full bg-red-600 dark:bg-red-500"></div>
              </div>
              <span className="text-xs text-gray-500 dark:text-gray-400">3:24 / 8:12</span>
              <div className="flex-1"></div>
              <div className="flex space-x-2">
                <div className="w-6 h-6 bg-gray-300 dark:bg-gray-700 rounded-sm hover:bg-gray-400 dark:hover:bg-gray-600 transition-colors duration-200 cursor-pointer"></div>
                <div className="w-6 h-6 bg-gray-300 dark:bg-gray-700 rounded-sm hover:bg-gray-400 dark:hover:bg-gray-600 transition-colors duration-200 cursor-pointer"></div>
                <div className="w-6 h-6 bg-gray-300 dark:bg-gray-700 rounded-sm hover:bg-gray-400 dark:hover:bg-gray-600 transition-colors duration-200 cursor-pointer"></div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
