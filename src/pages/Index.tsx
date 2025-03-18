
import { useEffect } from 'react';
import Header from '@/components/Header';
import HeroSection from '@/components/HeroSection';
import FeaturesSection from '@/components/FeaturesSection';
import SignUpSection from '@/components/SignUpSection';
import Footer from '@/components/Footer';

// Add framer-motion for animations
import { motion, useScroll, useSpring } from 'framer-motion';

const Index = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  useEffect(() => {
    // Initialize any needed scripts or observers
    const animateOnScrollElements = document.querySelectorAll('.animate-on-scroll');
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
        }
      });
    }, { threshold: 0.1 });
    
    animateOnScrollElements.forEach(element => {
      observer.observe(element);
    });
    
    return () => {
      animateOnScrollElements.forEach(element => {
        observer.unobserve(element);
      });
    };
  }, []);

  return (
    <div className="relative min-h-screen">
      {/* Scroll Progress Indicator */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-youlearn-blue z-50 origin-left"
        style={{ scaleX }}
      />
      
      <Header />
      
      <main>
        <HeroSection />
        <FeaturesSection />
        <SignUpSection />
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
