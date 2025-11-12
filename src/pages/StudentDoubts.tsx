import { useState } from 'react';
import { Header } from '@/components/Header';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { MessageCircle, Send, Clock, CheckCircle } from 'lucide-react';
import { dummyDoubts } from '@/data/dummyDoubts';
import { useToast } from '@/hooks/use-toast';

const StudentDoubts = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    courseName: '',
    lectureNumber: '',
    subject: '',
    question: ''
  });

  // TODO: Replace with actual student ID from auth context
  const currentStudentId = 'student1';
  
  // Filter doubts for current student
  const myDoubts = dummyDoubts.filter(doubt => doubt.studentId === currentStudentId);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // TODO: Integrate with backend API
    // POST /api/doubts
    // Body: {
    //   studentId: currentStudentId,
    //   courseName: formData.courseName,
    //   lectureNumber: formData.lectureNumber,
    //   subject: formData.subject,
    //   question: formData.question,
    //   timestamp: new Date().toISOString()
    // }
    
    toast({
      title: "Doubt Submitted",
      description: "Your doubt has been sent to the teacher. You'll be notified when it's answered.",
    });
    
    setFormData({
      courseName: '',
      lectureNumber: '',
      subject: '',
      question: ''
    });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <div className="min-h-screen bg-background">
      <Header isAuthenticated userType="student" />
      
      <div className="container px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-2 flex items-center gap-2">
            <MessageCircle className="h-8 w-8 text-primary" />
            Ask Your Doubts
          </h1>
          <p className="text-muted-foreground">
            Have questions? Ask them here and our teachers will help you!
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-2">
          {/* Ask Doubt Form */}
          <Card>
            <CardHeader>
              <CardTitle>Submit New Doubt</CardTitle>
              <CardDescription>
                Fill in the details about your question
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="courseName">Course Name</Label>
                  <Input
                    id="courseName"
                    name="courseName"
                    placeholder="e.g., Introduction to Programming"
                    value={formData.courseName}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="lectureNumber">Lecture Number</Label>
                  <Input
                    id="lectureNumber"
                    name="lectureNumber"
                    placeholder="e.g., 1.2"
                    value={formData.lectureNumber}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="subject">Subject/Topic</Label>
                  <Input
                    id="subject"
                    name="subject"
                    placeholder="e.g., Variables and Data Types"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="question">Your Question</Label>
                  <Textarea
                    id="question"
                    name="question"
                    placeholder="Describe your doubt in detail..."
                    value={formData.question}
                    onChange={handleChange}
                    required
                    rows={5}
                  />
                </div>

                <Button type="submit" className="w-full" size="lg">
                  <Send className="mr-2 h-4 w-4" />
                  Submit Doubt
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* My Doubts List */}
          <div className="space-y-4">
            <h2 className="text-2xl font-bold mb-4">My Doubts</h2>
            
            {myDoubts.length === 0 ? (
              <Card>
                <CardContent className="py-12 text-center text-muted-foreground">
                  <MessageCircle className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p>You haven't asked any doubts yet.</p>
                </CardContent>
              </Card>
            ) : (
              myDoubts.map((doubt) => (
                <Card key={doubt.id}>
                  <CardHeader>
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <CardTitle className="text-lg mb-1">{doubt.subject}</CardTitle>
                        <CardDescription>
                          {doubt.courseName} - Lecture {doubt.lectureNumber}
                        </CardDescription>
                      </div>
                      <Badge variant={doubt.status === 'answered' ? 'default' : 'secondary'}>
                        {doubt.status === 'answered' ? (
                          <><CheckCircle className="mr-1 h-3 w-3" /> Answered</>
                        ) : (
                          <><Clock className="mr-1 h-3 w-3" /> Pending</>
                        )}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div>
                      <p className="text-sm font-medium mb-1">Question:</p>
                      <p className="text-sm text-muted-foreground">{doubt.question}</p>
                    </div>
                    
                    {doubt.answer && (
                      <div className="pt-3 border-t">
                        <p className="text-sm font-medium mb-1 text-primary">Teacher's Answer:</p>
                        <p className="text-sm">{doubt.answer}</p>
                      </div>
                    )}
                    
                    <p className="text-xs text-muted-foreground">
                      Asked on {new Date(doubt.timestamp).toLocaleString('en-IN')}
                    </p>
                  </CardContent>
                </Card>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentDoubts;
