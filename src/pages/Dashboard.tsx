
import { useState, useEffect } from 'react';
import { Book, History, MessageSquare, Search, Youtube, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import VideoPlayer from '@/components/VideoPlayer';
import VideoSummary from '@/components/VideoSummary';
import Chatbot from '@/components/Chatbot';
import HistorySidebar from '@/components/HistorySidebar';
import DashboardHeader from '@/components/DashboardHeader';
import GreetingMessage from '@/components/GreetingMessage';
import { toast } from 'sonner';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  const [videoUrl, setVideoUrl] = useState('');
  const [currentVideo, setCurrentVideo] = useState('');
  const [showChatbot, setShowChatbot] = useState(false);
  const [showSidebar, setShowSidebar] = useState(false);
  const [videoHistory, setVideoHistory] = useState<Array<{id: string, title: string, timestamp: Date}>>([]);
  const [isProcessing, setIsProcessing] = useState(false);

  // Parse YouTube URL to get video ID
  const getYouTubeVideoId = (url: string) => {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? match[2] : null;
  };

  const handleVideoSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!videoUrl.trim()) {
      toast.error('Please enter a YouTube URL');
      return;
    }
    
    const videoId = getYouTubeVideoId(videoUrl);
    
    if (videoId) {
      setIsProcessing(true);
      
      // Simulate processing time for the AI
      setTimeout(() => {
        setCurrentVideo(videoId);
        setIsProcessing(false);
        
        // Add to history
        const newHistoryItem = {
          id: videoId,
          title: `Learning video ${videoId.substring(0, 5)}...`, // This would be replaced with actual video title in a real app
          timestamp: new Date()
        };
        
        setVideoHistory(prev => [newHistoryItem, ...prev]);
        
        // Store in localStorage for persistence
        const history = JSON.parse(localStorage.getItem('videoHistory') || '[]');
        localStorage.setItem('videoHistory', JSON.stringify([newHistoryItem, ...history]));
        
        toast.success('Video processed successfully');
      }, 1500);
    } else {
      toast.error('Invalid YouTube URL');
    }
  };
  
  const handleClearHistory = () => {
    setVideoHistory([]);
    localStorage.removeItem('videoHistory');
  };

  const handleDeleteHistoryItem = (id: string) => {
    const updatedHistory = videoHistory.filter(item => item.id !== id);
    setVideoHistory(updatedHistory);
    localStorage.setItem('videoHistory', JSON.stringify(updatedHistory));
  };

  // Load history from localStorage on initial render
  useEffect(() => {
    const history = JSON.parse(localStorage.getItem('videoHistory') || '[]');
    // Convert string dates back to Date objects
    const historyWithDates = history.map((item: any) => ({
      ...item,
      timestamp: new Date(item.timestamp)
    }));
    setVideoHistory(historyWithDates);
  }, []);

  return (
    <div className="min-h-screen bg-background dark:bg-gray-950 flex flex-col">
      <DashboardHeader toggleSidebar={() => setShowSidebar(!showSidebar)} />
      
      <main className="flex-1 flex relative">
        {/* History Sidebar */}
        <HistorySidebar 
          isOpen={showSidebar} 
          onClose={() => setShowSidebar(false)}
          history={videoHistory}
          onVideoSelect={(videoId) => {
            setCurrentVideo(videoId);
            setShowSidebar(false);
            toast.info('Video loaded from history');
          }}
          onClearHistory={handleClearHistory}
          onDeleteHistoryItem={handleDeleteHistoryItem}
        />
        
        <div className="flex-1 p-4 md:p-6 lg:p-8">
          {/* Video URL Input */}
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="max-w-3xl mx-auto mb-8"
          >
            <form onSubmit={handleVideoSubmit} className="flex flex-col sm:flex-row gap-3">
              <div className="relative flex-1">
                <Youtube className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={20} />
                <Input
                  type="text"
                  placeholder="Paste YouTube video URL here..."
                  className="pl-10 pr-4 py-6 w-full rounded-xl border-input focus:border-youlearn-blue dark:bg-gray-900 dark:border-gray-800 dark:text-white"
                  value={videoUrl}
                  onChange={(e) => setVideoUrl(e.target.value)}
                />
              </div>
              <Button 
                type="submit" 
                className="bg-youlearn-blue hover:bg-youlearn-lightBlue text-white py-6 px-6 rounded-xl flex items-center gap-2 transition-all duration-300 hover:shadow-md disabled:opacity-70 disabled:hover:bg-youlearn-blue disabled:cursor-not-allowed"
                disabled={isProcessing}
              >
                {isProcessing ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>Processing...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="mr-1" size={18} />
                    Learn Now
                  </>
                )}
              </Button>
            </form>
          </motion.div>
          
          {/* Video Player and Summary */}
          <AnimatePresence mode="wait">
            {currentVideo ? (
              <motion.div
                key="video-content"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ delay: 0.2 }}
                className="max-w-5xl mx-auto"
              >
                <VideoPlayer videoId={currentVideo} />
                <VideoSummary videoId={currentVideo} />
              </motion.div>
            ) : (
              <motion.div 
                key="empty-state"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ delay: 0.3 }}
                className="max-w-2xl mx-auto text-center mt-16"
              >
                <div className="text-youlearn-gray dark:text-gray-400 text-lg mb-8">
                  <Youtube size={48} className="mx-auto mb-6 text-youlearn-blue opacity-50" />
                  <GreetingMessage userName="Learner" />
                  <p>Paste any YouTube video URL above to get summaries, key points, and more.</p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center mt-12">
                  <motion.div 
                    className="p-6 rounded-lg border border-border dark:border-gray-800 hover:shadow-md transition-all duration-300 hover:-translate-y-1"
                    whileHover={{ scale: 1.02 }}
                  >
                    <Youtube className="mx-auto mb-4 text-youlearn-blue" size={24} />
                    <h3 className="font-medium mb-2 dark:text-white">Watch Videos</h3>
                    <p className="text-sm text-youlearn-gray dark:text-gray-400">Paste any YouTube URL to start learning</p>
                  </motion.div>
                  <motion.div 
                    className="p-6 rounded-lg border border-border dark:border-gray-800 hover:shadow-md transition-all duration-300 hover:-translate-y-1"
                    whileHover={{ scale: 1.02 }}
                  >
                    <Book className="mx-auto mb-4 text-youlearn-blue" size={24} />
                    <h3 className="font-medium mb-2 dark:text-white">Get Summaries</h3>
                    <p className="text-sm text-youlearn-gray dark:text-gray-400">AI-generated summaries of any video</p>
                  </motion.div>
                  <Link to="/notes" className="block">
                    <motion.div 
                      className="p-6 rounded-lg border border-border dark:border-gray-800 hover:shadow-md transition-all duration-300 hover:-translate-y-1 h-full"
                      whileHover={{ scale: 1.02 }}
                    >
                      <MessageSquare className="mx-auto mb-4 text-youlearn-blue" size={24} />
                      <h3 className="font-medium mb-2 dark:text-white">Take Notes</h3>
                      <p className="text-sm text-youlearn-gray dark:text-gray-400">Store your own notes while learning</p>
                    </motion.div>
                  </Link>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </main>
      
      {/* Floating Chatbot Icon */}
      <motion.button
        className="fixed bottom-6 right-6 w-14 h-14 rounded-full bg-youlearn-blue text-white flex items-center justify-center shadow-elevation hover:bg-youlearn-lightBlue transition-colors"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setShowChatbot(!showChatbot)}
        aria-label="Open chatbot"
      >
        <MessageSquare size={24} />
      </motion.button>
      
      {/* Chatbot Component */}
      <AnimatePresence>
        {showChatbot && (
          <Chatbot videoId={currentVideo} onClose={() => setShowChatbot(false)} />
        )}
      </AnimatePresence>
    </div>
  );
};

export default Dashboard;
