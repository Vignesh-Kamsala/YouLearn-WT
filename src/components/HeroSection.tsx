
import { useState, useEffect, useRef } from 'react';
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
      {/* Background Decoration */}
      <div className="absolute inset-0 bg-hero-pattern opacity-40 z-0"></div>
      <div className="absolute top-20 left-1/2 transform -translate-x-1/2 w-[500px] h-[500px] rounded-full bg-primary/5 filter blur-3xl z-0"></div>
      
      <div className="container max-w-7xl mx-auto px-4 relative z-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isVisible ? "visible" : "hidden"}
          className="text-center max-w-3xl mx-auto"
        >
          <motion.div variants={itemVariants} className="inline-block mb-4">
            <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-primary/10 text-primary">
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
              <Button size="lg" className="bg-youlearn-blue hover:bg-youlearn-lightBlue text-white shadow-md px-6 py-6 rounded-xl w-full sm:w-auto">
                Get Started <ArrowRight size={16} className="ml-2" />
              </Button>
              <Button variant="outline" size="lg" className="px-6 py-6 rounded-xl w-full sm:w-auto">
                <Youtube size={16} className="mr-2" /> Browse Examples
              </Button>
            </div>
          </motion.div>
        </motion.div>

        {/* Mock Video Player with Quiz */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.8, ease: [0.19, 1, 0.22, 1] }}
          className="mt-16 md:mt-20 relative mx-auto max-w-4xl"
        >
          <div className="rounded-2xl shadow-elevation overflow-hidden bg-white border border-gray-100">
            {/* Mock YouTube UI */}
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
            
            <div className="relative aspect-video bg-gradient-to-br from-gray-900 to-gray-800 flex items-center justify-center">
              {/* Play button overlay */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-20 h-20 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center">
                  <Play size={36} className="text-white ml-1" />
                </div>
              </div>
              
              {/* Mock Quiz Overlay */}
              <div className="absolute bottom-8 right-8 glass-card p-4 max-w-xs transform translate-y-4 animate-float">
                <h4 className="font-semibold text-sm mb-2">Quick Quiz:</h4>
                <p className="text-xs mb-2">What is the main benefit of spaced repetition?</p>
                <div className="space-y-1">
                  <div className="text-xs flex items-center space-x-2">
                    <div className="w-3 h-3 rounded-sm border border-gray-300"></div>
                    <span>Faster learning</span>
                  </div>
                  <div className="text-xs flex items-center space-x-2">
                    <div className="w-3 h-3 rounded-sm border border-gray-300 bg-youlearn-blue"></div>
                    <span className="font-medium">Improved retention</span>
                  </div>
                  <div className="text-xs flex items-center space-x-2">
                    <div className="w-3 h-3 rounded-sm border border-gray-300"></div>
                    <span>Less effort</span>
                  </div>
                </div>
              </div>
              
              {/* Mock Summary Card */}
              <div className="absolute top-8 left-8 glass-card p-4 max-w-xs transform -translate-y-4 animate-float animation-delay-200">
                <h4 className="font-semibold text-sm mb-2">Key Points:</h4>
                <ul className="text-xs space-y-1 list-disc list-inside">
                  <li>Active recall enhances memory</li>
                  <li>Test yourself frequently on material</li>
                  <li>Space out your learning sessions</li>
                </ul>
              </div>
            </div>
            
            {/* Video Controls */}
            <div className="px-4 py-3 bg-gray-100 flex items-center space-x-3">
              <div className="w-20 h-2 rounded-full bg-gray-300 overflow-hidden">
                <div className="w-[40%] h-full bg-red-600"></div>
              </div>
              <span className="text-xs text-gray-500">3:24 / 8:12</span>
              <div className="flex-1"></div>
              <div className="w-5 h-5 bg-gray-300 rounded-sm"></div>
              <div className="w-5 h-5 bg-gray-300 rounded-sm"></div>
              <div className="w-5 h-5 bg-gray-300 rounded-sm"></div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
