
import { useState, useEffect } from 'react';
import { Book, Plus, Search } from 'lucide-react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import Note from '@/components/Note';
import DashboardHeader from '@/components/DashboardHeader';
import { toast } from 'sonner';

interface NoteItem {
  id: string;
  title: string;
  content: string;
  createdAt: Date;
}

const Notes = () => {
  const [notes, setNotes] = useState<NoteItem[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [showSidebar, setShowSidebar] = useState(false);

  useEffect(() => {
    // Load notes from localStorage
    const savedNotes = localStorage.getItem('youlearn-notes');
    if (savedNotes) {
      try {
        const parsedNotes = JSON.parse(savedNotes);
        // Convert string dates back to Date objects
        const notesWithDates = parsedNotes.map((note: any) => ({
          ...note,
          createdAt: new Date(note.createdAt)
        }));
        setNotes(notesWithDates);
      } catch (error) {
        console.error('Failed to parse notes:', error);
        // If there's an error parsing, initialize with empty array
        setNotes([]);
      }
    }
  }, []);

  // Save notes to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('youlearn-notes', JSON.stringify(notes));
  }, [notes]);

  const addNewNote = () => {
    const newNote: NoteItem = {
      id: `note-${Date.now()}`,
      title: 'New Note',
      content: 'Start writing here...',
      createdAt: new Date()
    };

    setNotes([newNote, ...notes]);
    toast.success('New note created');
  };

  const updateNote = (id: string, title: string, content: string) => {
    setNotes(notes.map(note => 
      note.id === id 
        ? { ...note, title, content } 
        : note
    ));
    toast.success('Note updated');
  };

  const deleteNote = (id: string) => {
    setNotes(notes.filter(note => note.id !== id));
    toast.success('Note deleted');
  };

  // Filter notes based on search query
  const filteredNotes = notes.filter(note => 
    note.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
    note.content.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <DashboardHeader toggleSidebar={() => setShowSidebar(!showSidebar)} />
      
      <main className="flex-1 p-4 md:p-6 lg:p-8">
        <div className="max-w-7xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
              <div className="flex items-center gap-2">
                <Book className="text-youlearn-blue" size={24} />
                <h1 className="text-2xl font-semibold">My Notes</h1>
              </div>
              
              <div className="flex flex-col sm:flex-row w-full sm:w-auto gap-3">
                <div className="relative flex-1 sm:w-80">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={18} />
                  <Input
                    type="text"
                    placeholder="Search notes..."
                    className="pl-10 pr-4 py-2 w-full"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                <Button 
                  onClick={addNewNote}
                  className="bg-youlearn-blue hover:bg-youlearn-lightBlue text-white"
                >
                  <Plus size={18} className="mr-1" />
                  New Note
                </Button>
              </div>
            </div>
            
            {notes.length === 0 ? (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-12"
              >
                <Book size={48} className="mx-auto mb-4 text-youlearn-gray opacity-40" />
                <h2 className="text-xl font-medium mb-2">No notes yet</h2>
                <p className="text-muted-foreground mb-6">Create your first note to get started</p>
                <Button 
                  onClick={addNewNote}
                  className="bg-youlearn-blue hover:bg-youlearn-lightBlue text-white"
                >
                  <Plus size={18} className="mr-1" />
                  Create Note
                </Button>
              </motion.div>
            ) : filteredNotes.length === 0 ? (
              <div className="text-center py-12">
                <Search size={48} className="mx-auto mb-4 text-youlearn-gray opacity-40" />
                <h2 className="text-xl font-medium mb-2">No matching notes</h2>
                <p className="text-muted-foreground">Try a different search term</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredNotes.map((note) => (
                  <motion.div
                    key={note.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    layout
                  >
                    <Note
                      id={note.id}
                      title={note.title}
                      content={note.content}
                      createdAt={note.createdAt}
                      onUpdate={updateNote}
                      onDelete={deleteNote}
                    />
                  </motion.div>
                ))}
              </div>
            )}
          </motion.div>
        </div>
      </main>
    </div>
  );
};

export default Notes;
