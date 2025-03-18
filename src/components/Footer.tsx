
import { Heart } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="py-12 bg-white border-t border-gray-100">
      <div className="container max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-2">
            <div className="flex items-center mb-3">
              <div className="mr-2 text-primary text-2xl font-bold">Y</div>
              <h3 className="font-display text-xl font-bold">
                <span className="text-youlearn-blue">You</span>Learn
              </h3>
            </div>
            <p className="text-youlearn-gray text-sm max-w-xs">
              Transform your YouTube watching into productive learning sessions with AI-powered quizzes, summaries, and chat.
            </p>
          </div>
          
          <div>
            <h4 className="text-sm font-semibold text-youlearn-dark mb-4">Resources</h4>
            <ul className="space-y-2">
              {['Documentation', 'Tutorials', 'Blog', 'Examples'].map(item => (
                <li key={item}>
                  <a href="#" className="text-youlearn-gray text-sm hover:text-youlearn-blue transition-colors duration-200">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h4 className="text-sm font-semibold text-youlearn-dark mb-4">Company</h4>
            <ul className="space-y-2">
              {['About Us', 'Contact', 'Privacy Policy', 'Terms of Service'].map(item => (
                <li key={item}>
                  <a href="#" className="text-youlearn-gray text-sm hover:text-youlearn-blue transition-colors duration-200">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
        
        <div className="mt-12 pt-8 border-t border-gray-100 flex flex-col md:flex-row items-center justify-between">
          <p className="text-youlearn-gray text-sm">
            © 2025 YouLearn. All rights reserved.
          </p>
          <div className="flex items-center mt-4 md:mt-0">
            <span className="text-youlearn-gray text-sm mr-2">Made with</span>
            <Heart size={14} className="text-red-500 mr-2" />
            <span className="text-youlearn-gray text-sm">by the YouLearn Team</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
