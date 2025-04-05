
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FileText, CheckCircle, List, Download, Share2, Sparkles, Clipboard } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { toast } from 'sonner';

interface VideoSummaryProps {
  videoId: string;
}

const VideoSummary = ({ videoId }: VideoSummaryProps) => {
  const [isLoading, setIsLoading] = useState(true);
  const [copied, setCopied] = useState(false);
  
  // In a real app, you would fetch this data from an API
  useEffect(() => {
    // Simulate API call
    setIsLoading(true);
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);
    
    return () => clearTimeout(timer);
  }, [videoId]);

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text).then(
      () => {
        setCopied(true);
        toast.success('Copied to clipboard');
        setTimeout(() => setCopied(false), 2000);
      },
      () => {
        toast.error('Failed to copy');
      }
    );
  };
  
  // Mock data - in a real app this would come from an API
  const summaryData = {
    title: "Understanding Machine Learning Basics",
    summary: "This video covers the fundamental concepts of machine learning, including supervised and unsupervised learning, algorithms, and practical applications. The speaker explains how machine learning systems learn from data and make predictions or decisions without being explicitly programmed to do so.",
    keyPoints: [
      "Machine learning is a subset of artificial intelligence",
      "Supervised learning uses labeled data for training",
      "Unsupervised learning finds patterns in unlabeled data",
      "Deep learning uses neural networks with multiple layers",
      "Data quality is critical for effective machine learning"
    ],
    transcript: "Today we're going to talk about machine learning. Machine learning is a subset of artificial intelligence that focuses on developing systems that learn from data. Unlike traditional programming where you explicitly code rules, machine learning algorithms build models based on sample data to make predictions or decisions without being explicitly programmed to do so..."
  };

  if (isLoading) {
    return (
      <div className="glass-card p-6 dark:bg-gray-900 dark:border-gray-800">
        <div className="flex items-center space-x-2 mb-4">
          <div className="w-8 h-8 rounded-full bg-gray-200 dark:bg-gray-700 animate-pulse"></div>
          <div className="h-6 w-40 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
        </div>
        <div className="space-y-3">
          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse w-5/6"></div>
          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse w-4/6"></div>
        </div>
      </div>
    );
  }
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="glass-card p-6 dark:bg-gray-900 dark:border-gray-800"
    >
      <div className="flex items-center gap-2 mb-4">
        <Sparkles size={20} className="text-youlearn-blue" />
        <span className="text-sm font-medium bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 py-0.5 px-2 rounded-full flex items-center gap-1.5">
          AI-Generated Content
        </span>
      </div>

      <Tabs defaultValue="summary" className="w-full">
        <TabsList className="grid w-full grid-cols-3 mb-4">
          <TabsTrigger value="summary" className="flex items-center gap-2">
            <FileText size={16} />
            <span>Summary</span>
          </TabsTrigger>
          <TabsTrigger value="key-points" className="flex items-center gap-2">
            <CheckCircle size={16} />
            <span>Key Points</span>
          </TabsTrigger>
          <TabsTrigger value="transcript" className="flex items-center gap-2">
            <List size={16} />
            <span>Transcript</span>
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="summary" className="pt-2">
          <h3 className="text-xl font-semibold mb-3 text-youlearn-dark dark:text-white">{summaryData.title}</h3>
          <div className="relative">
            <p className="text-youlearn-gray dark:text-gray-300 leading-relaxed">{summaryData.summary}</p>
            <button 
              onClick={() => copyToClipboard(summaryData.summary)}
              className="absolute right-0 top-0 p-1.5 text-gray-400 hover:text-youlearn-blue rounded-md hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
              aria-label="Copy summary"
            >
              <Clipboard size={16} />
            </button>
          </div>
        </TabsContent>
        
        <TabsContent value="key-points" className="pt-2">
          <h3 className="text-xl font-semibold mb-3 text-youlearn-dark dark:text-white">Key Takeaways</h3>
          <ul className="space-y-2">
            {summaryData.keyPoints.map((point, index) => (
              <motion.li 
                key={index}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex items-start gap-2"
              >
                <CheckCircle size={18} className="text-youlearn-blue shrink-0 mt-0.5" />
                <span className="text-youlearn-gray dark:text-gray-300">{point}</span>
              </motion.li>
            ))}
          </ul>
        </TabsContent>
        
        <TabsContent value="transcript" className="pt-2">
          <h3 className="text-xl font-semibold mb-3 text-youlearn-dark dark:text-white">Full Transcript</h3>
          <div className="max-h-64 overflow-y-auto pr-2 text-youlearn-gray dark:text-gray-300 leading-relaxed">
            <p>{summaryData.transcript}</p>
          </div>
        </TabsContent>
      </Tabs>
      
      <div className="mt-6 pt-4 border-t border-gray-100 dark:border-gray-800 flex justify-end">
        <Button variant="outline" size="sm" className="mr-2 gap-1.5">
          <Download size={16} />
          Download PDF
        </Button>
        <Button size="sm" className="bg-youlearn-blue hover:bg-youlearn-lightBlue text-white gap-1.5">
          <Share2 size={16} />
          Share Summary
        </Button>
      </div>
    </motion.div>
  );
};

export default VideoSummary;
