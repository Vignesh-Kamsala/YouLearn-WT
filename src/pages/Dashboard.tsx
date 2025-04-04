
import { useState, useEffect } from 'react';
import { Book, History, MessageSquare, Search, Youtube } from 'lucide-react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import VideoPlayer from '@/components/VideoPlayer';
import VideoSummary from '@/components/VideoSummary';
import Chatbot from '@/components/Chatbot';
import HistorySidebar from '@/components/HistorySidebar';
import DashboardHeader from '@/components/DashboardHeader';

const Dashboard = () => {
  const [videoUrl, setVideoUrl] = useState('');
  const [currentVideo, setCurrentVideo] = useState('');
  const [showChatbot, setShowChatbot] = useState(false);
  const [showSidebar, setShowSidebar] = useState(false);
  const [videoHistory, setVideoHistory] = useState<Array<{id: string, title: string, timestamp: Date}>>([]);

  // Parse YouTube URL to get video ID
  const getYouTubeVideoId = (url: string) => {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? match[2] : null;
  };

  const handleVideoSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const videoId = getYouTubeVideoId(videoUrl);
    
    if (videoId) {
      setCurrentVideo(videoId);
      
      // Add to history
      const newHistoryItem = {
        id: videoId,
        title: `Video ${videoId}`, // This would be replaced with actual video title in a real app
        timestamp: new Date()
      };
      
      setVideoHistory(prev => [newHistoryItem, ...prev]);
      
      // Store in localStorage for persistence
      const history = JSON.parse(localStorage.getItem('videoHistory') || '[]');
      localStorage.setItem('videoHistory', JSON.stringify([newHistoryItem, ...history]));
    }
  };

  // Load history from localStorage on initial render
  useEffect(() => {
    const history = JSON.parse(localStorage.getItem('videoHistory') || '[]');
    setVideoHistory(history);
  }, []);

  return (
    <div className="min-h-screen bg-background flex flex-col">
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
          }}
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
                  className="pl-10 pr-4 py-6 w-full rounded-xl border-input focus:border-primary"
                  value={videoUrl}
                  onChange={(e) => setVideoUrl(e.target.value)}
                />
              </div>
              <Button type="submit" className="bg-youlearn-blue hover:bg-youlearn-lightBlue text-white py-6 px-6 rounded-xl">
                <Search className="mr-2" size={18} />
                Learn Now
              </Button>
            </form>
          </motion.div>
          
          {/* Video Player and Summary */}
          {currentVideo ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="max-w-5xl mx-auto"
            >
              <VideoPlayer videoId={currentVideo} />
              <VideoSummary videoId={currentVideo} />
            </motion.div>
          ) : (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="max-w-2xl mx-auto text-center mt-16"
            >
              <div className="text-youlearn-gray text-lg mb-8">
                <Youtube size={48} className="mx-auto mb-6 text-youlearn-blue opacity-50" />
                <h2 className="text-2xl md:text-3xl font-medium mb-3 text-youlearn-dark">Start learning with YouLearn</h2>
                <p>Paste any YouTube video URL above to get summaries, key points, and more.</p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center mt-12">
                <div className="p-6 rounded-lg border border-border">
                  <Youtube className="mx-auto mb-4 text-youlearn-blue" size={24} />
                  <h3 className="font-medium mb-2">Watch Videos</h3>
                  <p className="text-sm text-youlearn-gray">Paste any YouTube URL to start learning</p>
                </div>
                <div className="p-6 rounded-lg border border-border">
                  <Book className="mx-auto mb-4 text-youlearn-blue" size={24} />
                  <h3 className="font-medium mb-2">Get Summaries</h3>
                  <p className="text-sm text-youlearn-gray">AI-generated summaries of any video</p>
                </div>
                <div className="p-6 rounded-lg border border-border">
                  <MessageSquare className="mx-auto mb-4 text-youlearn-blue" size={24} />
                  <h3 className="font-medium mb-2">Ask Questions</h3>
                  <p className="text-sm text-youlearn-gray">Chat with our AI about the video content</p>
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </main>
      
      {/* Floating Chatbot Icon */}
      <motion.button
        className="fixed bottom-6 right-6 w-14 h-14 rounded-full bg-youlearn-blue text-white flex items-center justify-center shadow-elevation hover:bg-youlearn-lightBlue transition-colors"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setShowChatbot(!showChatbot)}
      >
        <MessageSquare size={24} />
      </motion.button>
      
      {/* Chatbot Component */}
      {showChatbot && <Chatbot videoId={currentVideo} onClose={() => setShowChatbot(false)} />}
    </div>
  );
};

export default Dashboard;
