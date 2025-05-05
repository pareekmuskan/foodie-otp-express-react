
import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Layout from '@/components/Layout';
import { useAuth } from '@/context/AuthContext';
import { toast } from 'sonner';

const Login: React.FC = () => {
  const [searchParams] = useSearchParams();
  const redirect = searchParams.get('redirect') || '';
  
  const navigate = useNavigate();
  const { sendOtp, verifyOtp, isAuthenticated, signup } = useAuth();
  
  const [activeTab, setActiveTab] = useState<string>('login');
  const [step, setStep] = useState<'initial' | 'otp'>('initial');
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [otp, setOtp] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // If already authenticated, redirect
    if (isAuthenticated) {
      if (redirect) {
        navigate(`/${redirect}`);
      } else {
        navigate('/');
      }
    }
  }, [isAuthenticated, navigate, redirect]);

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePassword = (password: string): boolean => {
    return password.length >= 6;
  };

  const handleSendOtp = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setError(null);
    
    if (!validateEmail(email)) {
      setError('Please enter a valid email address');
      return;
    }

    if (activeTab === 'signup' && step === 'initial') {
      if (!name.trim()) {
        setError('Please enter your name');
        return;
      }
      if (!validatePassword(password)) {
        setError('Password must be at least 6 characters long');
        return;
      }
      
      // For signup, register the user first
      setIsSubmitting(true);
      const success = await signup(name, email, password);
      setIsSubmitting(false);
      
      if (!success) {
        return;
      }
    }
    
    // For both login and signup, send OTP
    setIsSubmitting(true);
    const success = await sendOtp(email);
    setIsSubmitting(false);
    
    if (success) {
      setStep('otp');
    }
  };

  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    
    if (!otp || otp.length !== 6) {
      setError('Please enter a valid 6-digit OTP');
      return;
    }
    
    setIsSubmitting(true);
    const success = await verifyOtp(email, otp);
    setIsSubmitting(false);
    
    if (success && redirect) {
      navigate(`/${redirect}`);
    }
  };

  const handleTabChange = (value: string) => {
    setActiveTab(value);
    setStep('initial');
    setError(null);
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-md mx-auto bg-white rounded-lg shadow-md p-6">
          <Tabs value={activeTab} onValueChange={handleTabChange} className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-6">
              <TabsTrigger value="login">Login</TabsTrigger>
              <TabsTrigger value="signup">Sign Up</TabsTrigger>
            </TabsList>
            
            <TabsContent value="login">
              {step === 'initial' ? (
                <form onSubmit={handleSendOtp} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="login-email">Email</Label>
                    <Input
                      id="login-email"
                      type="email"
                      placeholder="you@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>
                  
                  {error && <p className="text-red-500 text-sm">{error}</p>}
                  
                  <Button 
                    type="submit" 
                    className="w-full bg-foodie-primary hover:bg-foodie-primary/90"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? 'Sending OTP...' : 'Send OTP'}
                  </Button>
                </form>
              ) : (
                <form onSubmit={handleVerifyOtp} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="login-otp">Enter OTP sent to {email}</Label>
                    <Input
                      id="login-otp"
                      type="text"
                      placeholder="6-digit OTP"
                      maxLength={6}
                      value={otp}
                      onChange={(e) => setOtp(e.target.value.replace(/\D/g, ''))}
                      required
                    />
                  </div>
                  
                  {error && <p className="text-red-500 text-sm">{error}</p>}
                  
                  <Button 
                    type="submit" 
                    className="w-full bg-foodie-primary hover:bg-foodie-primary/90"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? 'Verifying...' : 'Verify OTP'}
                  </Button>
                  
                  <div className="text-center">
                    <Button 
                      type="button" 
                      variant="link" 
                      onClick={() => setStep('initial')}
                      className="text-gray-500"
                    >
                      Change Email
                    </Button>
                    <Button 
                      type="button" 
                      variant="link" 
                      onClick={() => handleSendOtp()}
                      className="text-foodie-primary"
                      disabled={isSubmitting}
                    >
                      Resend OTP
                    </Button>
                  </div>
                </form>
              )}
            </TabsContent>
            
            <TabsContent value="signup">
              {step === 'initial' ? (
                <form onSubmit={handleSendOtp} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="signup-name">Name</Label>
                    <Input
                      id="signup-name"
                      type="text"
                      placeholder="Your Name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="signup-email">Email</Label>
                    <Input
                      id="signup-email"
                      type="email"
                      placeholder="you@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="signup-password">Password</Label>
                    <Input
                      id="signup-password"
                      type="password"
                      placeholder="Password (min 6 characters)"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                  </div>
                  
                  {error && <p className="text-red-500 text-sm">{error}</p>}
                  
                  <Button 
                    type="submit" 
                    className="w-full bg-foodie-primary hover:bg-foodie-primary/90"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? 'Creating Account...' : 'Create Account'}
                  </Button>
                </form>
              ) : (
                <form onSubmit={handleVerifyOtp} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="signup-otp">Enter OTP sent to {email}</Label>
                    <Input
                      id="signup-otp"
                      type="text"
                      placeholder="6-digit OTP"
                      maxLength={6}
                      value={otp}
                      onChange={(e) => setOtp(e.target.value.replace(/\D/g, ''))}
                      required
                    />
                  </div>
                  
                  {error && <p className="text-red-500 text-sm">{error}</p>}
                  
                  <Button 
                    type="submit" 
                    className="w-full bg-foodie-primary hover:bg-foodie-primary/90"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? 'Verifying...' : 'Verify OTP'}
                  </Button>
                  
                  <div className="text-center">
                    <Button 
                      type="button" 
                      variant="link" 
                      onClick={() => setStep('initial')}
                      className="text-gray-500"
                    >
                      Change Details
                    </Button>
                    <Button 
                      type="button" 
                      variant="link" 
                      onClick={() => handleSendOtp()}
                      className="text-foodie-primary"
                      disabled={isSubmitting}
                    >
                      Resend OTP
                    </Button>
                  </div>
                </form>
              )}
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </Layout>
  );
};

export default Login;
