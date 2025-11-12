import { useState } from 'react';
import { Header } from '@/components/Header';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { Upload, Video, FileAudio, FileText } from 'lucide-react';

const TeacherUpload = () => {
  const { toast } = useToast();
  const [contentType, setContentType] = useState<'video' | 'audio' | 'document'>('video');
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    courseId: '',
    subject: '',
    topic: '',
    file: null as File | null,
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFormData({ ...formData, file: e.target.files[0] });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // TODO: Integrate with backend API
    // API Call: POST /api/teacher/content/upload
    // Use FormData to send file with metadata
    // Body: {
    //   title: string,
    //   description: string,
    //   courseId: string,
    //   subject: string,
    //   topic: string,
    //   contentType: 'video' | 'audio' | 'document',
    //   file: File
    // }
    // Expected Response: { success: boolean, contentId: string, message: string }
    
    toast({
      title: 'Content Uploaded Successfully',
      description: 'Your content is now available to students',
    });
    
    // Reset form
    setFormData({
      title: '',
      description: '',
      courseId: '',
      subject: '',
      topic: '',
      file: null,
    });
  };

  const getAcceptedFileTypes = () => {
    switch (contentType) {
      case 'video':
        return '.mp4,.avi,.mov,.wmv';
      case 'audio':
        return '.mp3,.wav,.ogg';
      case 'document':
        return '.pdf,.doc,.docx,.ppt,.pptx';
      default:
        return '';
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header isAuthenticated userType="teacher" />
      
      <div className="container px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-2">
            Upload Content
          </h1>
          <p className="text-muted-foreground">
            Add lectures, notes, or audio messages for your students
          </p>
        </div>

        <div className="max-w-3xl mx-auto">
          <Card>
            <CardHeader>
              <CardTitle>Content Details</CardTitle>
              <CardDescription>
                Fill in the details and upload your educational content
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Content Type Selection */}
                <div className="grid grid-cols-3 gap-4">
                  <button
                    type="button"
                    onClick={() => setContentType('video')}
                    className={`p-4 rounded-lg border-2 transition-smooth ${
                      contentType === 'video'
                        ? 'border-primary bg-primary/10'
                        : 'border-border hover:border-primary/50'
                    }`}
                  >
                    <Video className="h-8 w-8 mx-auto mb-2" />
                    <span className="text-sm font-medium">Video Lecture</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setContentType('audio')}
                    className={`p-4 rounded-lg border-2 transition-smooth ${
                      contentType === 'audio'
                        ? 'border-primary bg-primary/10'
                        : 'border-border hover:border-primary/50'
                    }`}
                  >
                    <FileAudio className="h-8 w-8 mx-auto mb-2" />
                    <span className="text-sm font-medium">Audio Message</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setContentType('document')}
                    className={`p-4 rounded-lg border-2 transition-smooth ${
                      contentType === 'document'
                        ? 'border-primary bg-primary/10'
                        : 'border-border hover:border-primary/50'
                    }`}
                  >
                    <FileText className="h-8 w-8 mx-auto mb-2" />
                    <span className="text-sm font-medium">Document/Notes</span>
                  </button>
                </div>

                {/* Title */}
                <div className="space-y-2">
                  <Label htmlFor="title">Title *</Label>
                  <Input
                    id="title"
                    placeholder="Enter content title"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    required
                  />
                </div>

                {/* Description */}
                <div className="space-y-2">
                  <Label htmlFor="description">Description *</Label>
                  <Textarea
                    id="description"
                    placeholder="Describe the content"
                    rows={4}
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    required
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Subject */}
                  <div className="space-y-2">
                    <Label htmlFor="subject">Subject *</Label>
                    <Input
                      id="subject"
                      placeholder="e.g., Mathematics"
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      required
                    />
                  </div>

                  {/* Topic */}
                  <div className="space-y-2">
                    <Label htmlFor="topic">Topic *</Label>
                    <Input
                      id="topic"
                      placeholder="e.g., Calculus"
                      value={formData.topic}
                      onChange={(e) => setFormData({ ...formData, topic: e.target.value })}
                      required
                    />
                  </div>
                </div>

                {/* Course Selection */}
                <div className="space-y-2">
                  <Label htmlFor="course">Select Course *</Label>
                  <Select onValueChange={(value) => setFormData({ ...formData, courseId: value })}>
                    <SelectTrigger id="course">
                      <SelectValue placeholder="Choose a course" />
                    </SelectTrigger>
                    <SelectContent>
                      {/* TODO: Fetch courses from API */}
                      {/* GET /api/teacher/courses */}
                      <SelectItem value="1">Introduction to Python Programming</SelectItem>
                      <SelectItem value="2">Advanced Mathematics - Calculus</SelectItem>
                      <SelectItem value="3">Physics: Mechanics and Motion</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* File Upload */}
                <div className="space-y-2">
                  <Label htmlFor="file">Upload File *</Label>
                  <div className="border-2 border-dashed border-border rounded-lg p-8 text-center hover:border-primary/50 transition-smooth">
                    <Upload className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                    <Input
                      id="file"
                      type="file"
                      accept={getAcceptedFileTypes()}
                      onChange={handleFileChange}
                      className="hidden"
                      required
                    />
                    <Label htmlFor="file" className="cursor-pointer">
                      {formData.file ? (
                        <span className="text-primary font-medium">{formData.file.name}</span>
                      ) : (
                        <>
                          <span className="text-primary font-medium">Click to upload</span>
                          <span className="text-muted-foreground"> or drag and drop</span>
                        </>
                      )}
                    </Label>
                    <p className="text-xs text-muted-foreground mt-2">
                      Accepted formats: {getAcceptedFileTypes()}
                    </p>
                  </div>
                </div>

                <Button type="submit" size="lg" className="w-full">
                  Upload Content
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default TeacherUpload;
