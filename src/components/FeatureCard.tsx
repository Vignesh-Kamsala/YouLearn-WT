
import { LucideIcon } from 'lucide-react';
import { motion } from 'framer-motion';

interface FeatureCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  delay?: number;
}

const FeatureCard = ({ title, description, icon: Icon, delay = 0 }: FeatureCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: delay * 0.2 }}
      className="group glass-card p-6 md:p-8 hover:translate-y-[-5px]"
    >
      <div className="feature-card-icon">
        <Icon size={24} />
      </div>
      <h3 className="text-lg md:text-xl font-semibold mb-3 text-youlearn-dark group-hover:text-youlearn-blue transition-colors duration-300">
        {title}
      </h3>
      <p className="text-youlearn-gray text-sm md:text-base">
        {description}
      </p>
      
      {/* Subtle interaction hover effect at bottom of card */}
      <div className="mt-6 pt-4 border-t border-gray-100 flex items-center text-sm text-youlearn-blue opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <span className="mr-2">Learn more</span>
        <svg
          className="w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-300"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
        </svg>
      </div>
    </motion.div>
  );
};

export default FeatureCard;
