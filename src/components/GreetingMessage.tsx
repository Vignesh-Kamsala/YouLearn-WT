import { useEffect, useState } from 'react';

interface GreetingMessageProps {
  userName?: string;
}

const GreetingMessage = ({ userName = "Student" }: GreetingMessageProps) => {
  const [greeting, setGreeting] = useState('');
  
  useEffect(() => {
    const getCurrentGreeting = () => {
      const hour = new Date().getHours();
      
      if (hour >= 5 && hour < 12) {
        return 'Good morning';
      } else if (hour >= 12 && hour < 18) {
        return 'Good afternoon';
      } else {
        return 'Good evening';
      }
    };
    
    setGreeting(getCurrentGreeting());
    
    // Update greeting if user keeps the page open across time boundaries
    const intervalId = setInterval(() => {
      setGreeting(getCurrentGreeting());
    }, 60000); // Check every minute
    
    return () => clearInterval(intervalId);
  }, []);
  
  return (
    <div className="text-center mb-6">
      <h2 className="text-2xl md:text-3xl font-medium mb-2 text-youlearn-dark dark:text-white">
        {greeting}, <span className="text-youlearn-blue">{userName}</span>
      </h2>
      <p className="text-youlearn-gray dark:text-gray-400">
        Start learning with YouLearn
      </p>
    </div>
  );
};

export default GreetingMessage;
