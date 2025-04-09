import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FileText, CheckCircle, List, Download, Share2, Sparkles, Clipboard } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { toast } from 'sonner';

interface VideoSummaryProps {
  videoId: string;
}

interface SummaryData {
  title: string;
  summary: string;
  keyPoints: string[];
  transcript: string;
}

const VideoSummary = ({ videoId }: VideoSummaryProps) => {
  const [isLoading, setIsLoading] = useState(true);
  const [copied, setCopied] = useState(false);
  const [summaryData, setSummaryData] = useState<SummaryData | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchVideoSummary = async () => {
      try {
        setIsLoading(true);
        setError(null);

        // Step 1: Get transcript from backend
        const transcriptResponse = await fetch('http://localhost:3000/getTranscript', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ 
            videoUrl: `https://www.youtube.com/watch?v=${videoId}` 
          }),
        });

        if (!transcriptResponse.ok) {
          throw new Error('Failed to fetch transcript');
        }

        const transcriptResult = await transcriptResponse.json();
        
        if (!transcriptResult.success) {
          throw new Error(transcriptResult.message || 'Transcript error');
        }

        // Step 2: Get summary from backend using the transcript
        const summaryResponse = await fetch('http://localhost:3000/getSummary', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ 
            transcript: transcriptResult.transcript 
          }),
        });

        if (!summaryResponse.ok) {
          throw new Error('Failed to fetch summary');
        }

        const summaryResult = await summaryResponse.json();

        // Step 3: Structure the data for the frontend
        setSummaryData({
          title: `Video Summary for ${videoId}`,
          summary: summaryResult.summary,
          keyPoints: generateKeyPoints(summaryResult.summary), // Helper function
          transcript: transcriptResult.transcript
        });

      } catch (err) {
        console.error('Error fetching video summary:', err);
        setError(err instanceof Error ? err.message : 'Unknown error occurred');
      } finally {
        setIsLoading(false);
      }
    };

    fetchVideoSummary();
  }, [videoId]);

  // Helper function to extract key points from summary
  const generateKeyPoints = (summary: string): string[] => {
    // Simple implementation - split summary into sentences for key points
    // In a real app, you might want to use a more sophisticated approach
    return summary
      .split('.')
      .filter(sentence => sentence.trim().length > 0)
      .slice(0, 5) // Take first 5 sentences
      .map(sentence => sentence.trim() + '.');
  };

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

  if (error) {
    return (
      <div className="glass-card p-6 dark:bg-gray-900 dark:border-gray-800">
        <div className="text-red-500">{error}</div>
        <Button 
          onClick={() => window.location.reload()} 
          className="mt-4"
          variant="outline"
        >
          Retry
        </Button>
      </div>
    );
  }

  if (!summaryData) {
    return null;
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
          <h3 className="text-xl font-semibold mb-3 text-youlearn-dark dark:text-white">
            {summaryData.title}
          </h3>
          <div className="relative">
            <p className="text-youlearn-gray dark:text-gray-300 leading-relaxed">
              {summaryData.summary}
            </p>
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
          <h3 className="text-xl font-semibold mb-3 text-youlearn-dark dark:text-white">
            Key Takeaways
          </h3>
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
          <h3 className="text-xl font-semibold mb-3 text-youlearn-dark dark:text-white">
            Full Transcript
          </h3>
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