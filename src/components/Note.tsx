
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Edit, Trash2, Save, X } from 'lucide-react';

interface NoteProps {
  id: string;
  title: string;
  content: string;
  createdAt: Date;
  onUpdate: (id: string, title: string, content: string) => void;
  onDelete: (id: string) => void;
}

const Note = ({ id, title, content, createdAt, onUpdate, onDelete }: NoteProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(title);
  const [editContent, setEditContent] = useState(content);

  const handleSave = () => {
    if (editTitle.trim() && editContent.trim()) {
      onUpdate(id, editTitle, editContent);
      setIsEditing(false);
    }
  };

  const handleCancel = () => {
    setEditTitle(title);
    setEditContent(content);
    setIsEditing(false);
  };

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString(undefined, {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  return (
    <Card className="h-full">
      <CardHeader className="pb-2">
        {isEditing ? (
          <input
            type="text"
            value={editTitle}
            onChange={(e) => setEditTitle(e.target.value)}
            className="w-full text-lg font-medium border-b border-gray-200 pb-1 focus:outline-none focus:border-youlearn-blue"
            placeholder="Note title"
          />
        ) : (
          <div className="flex justify-between items-start">
            <CardTitle className="text-lg">{title}</CardTitle>
            <div className="flex space-x-1">
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={() => setIsEditing(true)} 
                className="h-8 w-8"
              >
                <Edit size={16} />
                <span className="sr-only">Edit note</span>
              </Button>
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={() => onDelete(id)} 
                className="h-8 w-8 text-red-500 hover:text-red-600"
              >
                <Trash2 size={16} />
                <span className="sr-only">Delete note</span>
              </Button>
            </div>
          </div>
        )}
        <div className="text-xs text-muted-foreground">
          {formatDate(createdAt)}
        </div>
      </CardHeader>
      <CardContent>
        {isEditing ? (
          <>
            <Textarea
              value={editContent}
              onChange={(e) => setEditContent(e.target.value)}
              className="min-h-[120px] mb-3"
              placeholder="Note content"
            />
            <div className="flex justify-end space-x-2">
              <Button size="sm" variant="outline" onClick={handleCancel}>
                <X size={16} className="mr-1" />
                Cancel
              </Button>
              <Button size="sm" onClick={handleSave}>
                <Save size={16} className="mr-1" />
                Save
              </Button>
            </div>
          </>
        ) : (
          <div className="whitespace-pre-wrap text-sm">{content}</div>
        )}
      </CardContent>
    </Card>
  );
};

export default Note;
