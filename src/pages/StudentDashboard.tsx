import { useState } from 'react';
import { Header } from '@/components/Header';
import { CourseCard } from '@/components/CourseCard';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { dummyCourses } from '@/data/dummyCourses';
import { useToast } from '@/hooks/use-toast';
import { Search, Filter } from 'lucide-react';

const StudentDashboard = () => {
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSubject, setSelectedSubject] = useState<string>('all');
  
  // TODO: Replace with actual API calls
  // GET /api/courses - Fetch all available courses
  // POST /api/courses/:id/enroll - Enroll in a course
  const [courses] = useState(dummyCourses);

  const subjects = ['all', ...new Set(courses.map(c => c.subject))];

  const filteredCourses = courses.filter(course => {
    const matchesSearch = course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         course.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         course.teacherName.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesSubject = selectedSubject === 'all' || course.subject === selectedSubject;
    return matchesSearch && matchesSubject && !course.enrolled;
  });

  const handleEnroll = (courseId: string) => {
    // TODO: Integrate with backend
    // API Call: POST /api/courses/:courseId/enroll
    // Body: { studentId: currentUser.id }
    // Expected Response: { success: boolean, message: string }
    
    toast({
      title: 'Enrolled Successfully!',
      description: 'You can now access this course in "My Courses"',
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <Header isAuthenticated userType="student" />
      
      <div className="container px-4 py-8">
        {/* Hero Section */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-2">
            Discover Courses
          </h1>
          <p className="text-muted-foreground">
            Learn in your preferred language with AI-powered translations
          </p>
        </div>

        {/* Search and Filter */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search courses, topics, or teachers..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          <div className="flex gap-2">
            <Select value={selectedSubject} onValueChange={setSelectedSubject}>
              <SelectTrigger className="w-[180px]">
                <Filter className="mr-2 h-4 w-4" />
                <SelectValue placeholder="Subject" />
              </SelectTrigger>
              <SelectContent>
                {subjects.map((subject) => (
                  <SelectItem key={subject} value={subject}>
                    {subject === 'all' ? 'All Subjects' : subject}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Course Grid */}
        {filteredCourses.length > 0 ? (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredCourses.map((course) => (
              <CourseCard
                key={course.id}
                course={course}
                onEnroll={handleEnroll}
                viewType="browse"
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No courses found matching your criteria</p>
            <Button
              variant="link"
              onClick={() => {
                setSearchQuery('');
                setSelectedSubject('all');
              }}
            >
              Clear filters
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default StudentDashboard;
