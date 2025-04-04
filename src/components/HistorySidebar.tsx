
import { motion, AnimatePresence } from 'framer-motion';
import { X, Clock, YouTube, Trash2 } from 'lucide-react';

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
}

const HistorySidebar = ({ isOpen, onClose, history, onVideoSelect }: HistorySidebarProps) => {
  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString(undefined, {
      month: 'short',
      day: 'numeric'
    });
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
            className="fixed md:relative top-0 left-0 w-72 h-full bg-white shadow-lg z-50 flex flex-col"
          >
            <div className="p-4 border-b flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Clock size={18} className="text-youlearn-blue" />
                <h3 className="font-semibold">Watch History</h3>
              </div>
              <button 
                onClick={onClose}
                className="p-1 rounded-md hover:bg-gray-100 transition-colors md:hidden"
              >
                <X size={18} />
              </button>
            </div>
            
            <div className="flex-1 overflow-y-auto">
              {history.length === 0 ? (
                <div className="py-12 px-4 text-center text-youlearn-gray">
                  <Clock className="mx-auto mb-3 opacity-40" size={24} />
                  <p>No history yet</p>
                  <p className="text-sm mt-1">Videos you watch will appear here</p>
                </div>
              ) : (
                <ul className="divide-y">
                  {history.map((item) => (
                    <li key={item.id} className="hover:bg-gray-50 transition-colors">
                      <button
                        className="p-3 flex items-start gap-3 w-full text-left"
                        onClick={() => onVideoSelect(item.id)}
                      >
                        <div className="shrink-0 w-10 h-10 rounded bg-gray-100 flex items-center justify-center">
                          <YouTube size={16} className="text-youlearn-blue" />
                        </div>
                        <div className="min-w-0 flex-1">
                          <p className="font-medium text-sm truncate">{item.title}</p>
                          <span className="text-xs text-youlearn-gray">
                            {formatDate(item.timestamp)}
                          </span>
                        </div>
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>
            
            {history.length > 0 && (
              <div className="p-3 border-t">
                <button className="w-full py-2 text-sm text-youlearn-gray flex items-center justify-center gap-2 rounded-md hover:bg-gray-100 transition-colors">
                  <Trash2 size={14} />
                  Clear History
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
