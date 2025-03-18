
import { HelpCircle, FileText, MessageSquare } from 'lucide-react';
import FeatureCard from './FeatureCard';

const FeaturesSection = () => {
  const features = [
    {
      title: 'Quizzes',
      description: 'Test your knowledge after watching videos with automatically generated quizzes.',
      icon: HelpCircle,
    },
    {
      title: 'Summaries',
      description: 'Get key points and takeaways from any video in seconds.',
      icon: FileText,
    },
    {
      title: 'Chatbot',
      description: 'Ask questions and dive deeper into the video content with our AI assistant.',
      icon: MessageSquare,
    },
  ];

  return (
    <section id="features" className="py-20 md:py-28 relative">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-gradient-radial from-primary/5 to-transparent opacity-70"></div>
      <div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-gradient-radial from-primary/5 to-transparent opacity-70"></div>
      
      <div className="container max-w-7xl mx-auto px-4 relative z-10">
        <div className="text-center max-w-2xl mx-auto mb-12 md:mb-20">
          <span className="inline-block px-3 py-1 rounded-full text-sm font-medium bg-primary/10 text-primary mb-4">
            Our Features
          </span>
          <h2 className="text-3xl md:text-4xl font-display font-bold mb-4 tracking-tight text-youlearn-dark">
            Everything you need to <span className="text-youlearn-blue">learn effectively</span>
          </h2>
          <p className="text-youlearn-gray">
            Our tools work together to maximize your learning potential and help you retain information.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {features.map((feature, index) => (
            <FeatureCard
              key={feature.title}
              title={feature.title}
              description={feature.description}
              icon={feature.icon}
              delay={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
