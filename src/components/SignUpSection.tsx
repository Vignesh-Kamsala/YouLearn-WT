
import { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Check, Lock } from 'lucide-react';
import { Button } from '@/components/ui/button';

const SignUpSection = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Sign up logic would go here
    console.log('Sign up:', { email, password });
  };

  return (
    <section id="signup" className="py-20 md:py-28 relative">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-white to-blue-50/50 z-0"></div>
      
      <div className="container max-w-7xl mx-auto px-4 relative z-10">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-12 md:gap-16">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6 }}
              className="flex-1"
            >
              <h2 className="text-3xl md:text-4xl font-display font-bold mb-6 tracking-tight text-youlearn-dark">
                Ready to <span className="text-youlearn-blue">Learn</span>?<br />
                Join Now!
              </h2>
              
              <p className="text-youlearn-gray mb-8 max-w-md">
                Create your free account today and start transforming your YouTube watching into productive learning sessions.
              </p>
              
              <ul className="space-y-4 mb-8">
                {['Unlimited quizzes', 'AI-powered summaries', 'Personalized chatbot', 'Progress tracking'].map((feature, index) => (
                  <motion.li 
                    key={feature}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                    className="flex items-center"
                  >
                    <div className="flex-shrink-0 mr-3 w-5 h-5 rounded-full bg-green-100 flex items-center justify-center">
                      <Check size={12} className="text-green-600" />
                    </div>
                    <span className="text-youlearn-gray">{feature}</span>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6 }}
              className="flex-1 w-full max-w-md"
            >
              <div className="glass-card p-8 bg-white/95">
                <h3 className="text-xl font-semibold mb-6 text-youlearn-dark">Create your account</h3>
                
                <form onSubmit={handleSubmit}>
                  <div className="space-y-4">
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-youlearn-gray mb-1">
                        Email
                      </label>
                      <input
                        id="email"
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-youlearn-blue"
                        placeholder="you@example.com"
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="password" className="block text-sm font-medium text-youlearn-gray mb-1">
                        Password
                      </label>
                      <div className="relative">
                        <input
                          id="password"
                          type="password"
                          required
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-youlearn-blue"
                          placeholder="Create a secure password"
                        />
                        <Lock size={16} className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                      </div>
                    </div>
                    
                    <Button 
                      type="submit" 
                      className="w-full bg-youlearn-blue hover:bg-youlearn-lightBlue text-white py-6 rounded-lg transition-all duration-300 btn-hover-animate"
                    >
                      Sign Up <ArrowRight size={16} className="ml-1" />
                    </Button>
                  </div>
                </form>
                
                <div className="mt-6 text-center text-sm text-youlearn-gray">
                  Already have an account?{' '}
                  <a href="#" className="text-youlearn-blue font-medium hover:underline focus-ring rounded">
                    Log In
                  </a>
                </div>
                
                <div className="mt-6 pt-6 border-t border-gray-100 text-center text-xs text-youlearn-gray">
                  By signing up, you agree to our{' '}
                  <a href="#" className="text-youlearn-blue hover:underline">Terms</a>
                  {' '}and{' '}
                  <a href="#" className="text-youlearn-blue hover:underline">Privacy Policy</a>.
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SignUpSection;
