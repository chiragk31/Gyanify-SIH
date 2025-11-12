import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Header } from '@/components/Header';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { BookOpen } from 'lucide-react';

const TeacherLogin = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    
    // TODO: Integrate with backend teacher login API
    // API Call: POST /api/auth/teacher/login
    // Body: { email, password }
    // Expected Response: { success: boolean, token: string, teacher: object }
    // Note: Teachers receive access from other teachers, so signup is not available here
    
    if (email && password) {
      toast({
        title: 'Login Successful',
        description: 'Welcome to Teacher Portal!',
      });
      navigate('/teacher/dashboard');
    } else {
      toast({
        title: 'Login Failed',
        description: 'Please enter valid credentials',
        variant: 'destructive',
      });
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="container px-4 py-12">
        <div className="mx-auto max-w-md">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center rounded-full bg-secondary/10 p-3 mb-4">
              <BookOpen className="h-8 w-8 text-secondary" />
            </div>
            <h1 className="text-3xl font-bold mb-2">Teacher Portal</h1>
            <p className="text-muted-foreground">Access your teaching dashboard</p>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Welcome Back, Educator</CardTitle>
              <CardDescription>Login to manage your courses and content</CardDescription>
            </CardHeader>
            <form onSubmit={handleLogin}>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="teacher@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
                <div className="text-sm text-muted-foreground bg-muted/50 p-3 rounded-lg">
                  <p>
                    <strong>Note:</strong> Teacher accounts are created by existing teachers. 
                    If you need access, please contact an administrator.
                  </p>
                </div>
              </CardContent>
              <CardFooter className="flex flex-col space-y-4">
                <Button type="submit" className="w-full">Login to Dashboard</Button>
              </CardFooter>
            </form>
          </Card>

          <div className="mt-6 text-center">
            <Link to="/landingpage" className="text-sm text-primary hover:underline">
              ← Back to Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeacherLogin;
