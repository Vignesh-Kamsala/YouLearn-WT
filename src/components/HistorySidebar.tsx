
import { motion, AnimatePresence } from 'framer-motion';
import { X, Clock, Youtube, Trash2 } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';

interface HistoryItem {
  id: string;
  title: string;
  timestamp: Date;
}

interface HistorySidebarProps {
  isOpen: boolean;
  onClose: () => void;
  history: HistoryItem[];
  onVideoSelect: (videoId: string) => void;
  onClearHistory: () => void;
  onDeleteHistoryItem?: (id: string) => void;
}

const HistorySidebar = ({ 
  isOpen, 
  onClose, 
  history, 
  onVideoSelect, 
  onClearHistory,
  onDeleteHistoryItem 
}: HistorySidebarProps) => {
  const [isClearing, setIsClearing] = useState(false);
  
  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString(undefined, {
      month: 'short',
      day: 'numeric'
    });
  };
  
  const handleClearHistory = () => {
    setIsClearing(true);
    
    // Simulate a small delay for better UX
    setTimeout(() => {
      onClearHistory();
      setIsClearing(false);
      toast.success('Watch history cleared');
    }, 500);
  };

  const handleDeleteItem = (id: string, e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent triggering the video selection
    if (onDeleteHistoryItem) {
      onDeleteHistoryItem(id);
      toast.success('Item removed from history');
    }
  };
  
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/20 z-40 md:hidden"
            onClick={onClose}
          />
          
          {/* Sidebar */}
          <motion.div
            initial={{ x: -300 }}
            animate={{ x: 0 }}
            exit={{ x: -300 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="fixed md:relative top-0 left-0 w-72 h-full bg-white dark:bg-gray-900 shadow-lg z-50 flex flex-col"
          >
            <div className="p-4 border-b dark:border-gray-800 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Clock size={18} className="text-youlearn-blue" />
                <h3 className="font-semibold dark:text-white">Watch History</h3>
              </div>
              <button 
                onClick={onClose}
                className="p-1 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors md:hidden"
                aria-label="Close sidebar"
              >
                <X size={18} />
              </button>
            </div>
            
            <div className="flex-1 overflow-y-auto">
              {history.length === 0 ? (
                <div className="py-12 px-4 text-center text-youlearn-gray dark:text-gray-400">
                  <Clock className="mx-auto mb-3 opacity-40" size={24} />
                  <p>No history yet</p>
                  <p className="text-sm mt-1">Videos you watch will appear here</p>
                </div>
              ) : (
                <motion.ul 
                  className="divide-y dark:divide-gray-800"
                  initial="hidden"
                  animate="visible"
                  variants={{
                    visible: {
                      transition: {
                        staggerChildren: 0.05
                      }
                    }
                  }}
                >
                  {history.map((item) => (
                    <motion.li 
                      key={item.id} 
                      className="hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors relative group"
                      variants={{
                        hidden: { opacity: 0, x: -20 },
                        visible: { opacity: 1, x: 0 }
                      }}
                    >
                      <button
                        className="p-3 flex items-start gap-3 w-full text-left"
                        onClick={() => onVideoSelect(item.id)}
                      >
                        <div className="shrink-0 w-10 h-10 rounded bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
                          <Youtube size={16} className="text-youlearn-blue" />
                        </div>
                        <div className="min-w-0 flex-1">
                          <p className="font-medium text-sm truncate dark:text-white">{item.title}</p>
                          <span className="text-xs text-youlearn-gray dark:text-gray-400">
                            {formatDate(item.timestamp)}
                          </span>
                        </div>
                      </button>
                      {onDeleteHistoryItem && (
                        <button 
                          onClick={(e) => handleDeleteItem(item.id, e)}
                          className="absolute right-3 top-1/2 -translate-y-1/2 p-1.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity hover:bg-gray-200 dark:hover:bg-gray-700"
                          aria-label="Delete history item"
                        >
                          <Trash2 size={14} className="text-gray-500 dark:text-gray-400" />
                        </button>
                      )}
                    </motion.li>
                  ))}
                </motion.ul>
              )}
            </div>
            
            {history.length > 0 && (
              <div className="p-3 border-t dark:border-gray-800">
                <button 
                  className="w-full py-2 text-sm text-youlearn-gray dark:text-gray-400 flex items-center justify-center gap-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors disabled:opacity-50"
                  onClick={handleClearHistory}
                  disabled={isClearing}
                >
                  {isClearing ? (
                    <span className="flex items-center gap-2">
                      <div className="w-4 h-4 border-2 border-gray-300 border-t-youlearn-blue rounded-full animate-spin" />
                      Clearing...
                    </span>
                  ) : (
                    <>
                      <Trash2 size={14} />
                      Clear History
                    </>
                  )}
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default HistorySidebar;
