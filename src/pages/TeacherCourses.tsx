import { useState } from 'react';
import { Header } from '@/components/Header';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { BookOpen, Edit, Trash2, Plus, Video, FileText } from 'lucide-react';
import { Link } from 'react-router-dom';

interface TeacherCourse {
  id: string;
  title: string;
  description: string;
  subject: string;
  lectureCount: number;
  notesCount: number;
  studentCount: number;
}

const TeacherCourses = () => {
  const { toast } = useToast();
  
  // TODO: Replace with actual API call
  // GET /api/teacher/courses - Fetch teacher's courses
  // Expected Response: { courses: TeacherCourse[] }
  const [courses] = useState<TeacherCourse[]>([
    {
      id: '1',
      title: 'Introduction to Python Programming',
      description: 'Learn Python basics and programming fundamentals',
      subject: 'Computer Science',
      lectureCount: 24,
      notesCount: 18,
      studentCount: 156,
    },
    {
      id: '2',
      title: 'Advanced Mathematics - Calculus',
      description: 'Master differential and integral calculus',
      subject: 'Mathematics',
      lectureCount: 32,
      notesCount: 25,
      studentCount: 98,
    },
  ]);

  const handleDelete = (courseId: string) => {
    // TODO: Integrate with backend API
    // API Call: DELETE /api/teacher/courses/:courseId
    // Expected Response: { success: boolean, message: string }
    
    toast({
      title: 'Course Deleted',
      description: 'The course has been removed successfully',
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <Header isAuthenticated userType="teacher" />
      
      <div className="container px-4 py-8">
        <div className="flex justify-between items-start mb-8">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold mb-2">
              My Courses
            </h1>
            <p className="text-muted-foreground">
              Manage your courses and content
            </p>
          </div>
          <Button asChild>
            <Link to="/teacher/create-course">
              <Plus className="mr-2 h-4 w-4" />
              Create New Course
            </Link>
          </Button>
        </div>

        {courses.length > 0 ? (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {courses.map((course) => (
              <Card key={course.id} className="hover:shadow-lg transition-smooth">
                <CardHeader>
                  <div className="flex items-start justify-between mb-2">
                    <Badge variant="secondary">{course.subject}</Badge>
                    <div className="flex gap-2">
                      <Button size="icon" variant="ghost" asChild>
                        <Link to={`/teacher/courses/${course.id}/edit`}>
                          <Edit className="h-4 w-4" />
                        </Link>
                      </Button>
                      <Button
                        size="icon"
                        variant="ghost"
                        onClick={() => handleDelete(course.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  <CardTitle className="line-clamp-2">{course.title}</CardTitle>
                  <CardDescription className="line-clamp-2">
                    {course.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-3 gap-4 text-center">
                    <div>
                      <Video className="h-5 w-5 mx-auto mb-1 text-muted-foreground" />
                      <div className="text-2xl font-bold">{course.lectureCount}</div>
                      <div className="text-xs text-muted-foreground">Lectures</div>
                    </div>
                    <div>
                      <FileText className="h-5 w-5 mx-auto mb-1 text-muted-foreground" />
                      <div className="text-2xl font-bold">{course.notesCount}</div>
                      <div className="text-xs text-muted-foreground">Notes</div>
                    </div>
                    <div>
                      <BookOpen className="h-5 w-5 mx-auto mb-1 text-muted-foreground" />
                      <div className="text-2xl font-bold">{course.studentCount}</div>
                      <div className="text-xs text-muted-foreground">Students</div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full" asChild>
                    <Link to={`/teacher/courses/${course.id}`}>
                      Manage Course
                    </Link>
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <BookOpen className="h-16 w-16 mx-auto mb-4 text-muted-foreground opacity-50" />
            <h3 className="text-xl font-semibold mb-2">No Courses Yet</h3>
            <p className="text-muted-foreground mb-4">
              Create your first course to start teaching
            </p>
            <Button asChild>
              <Link to="/teacher/create-course">
                <Plus className="mr-2 h-4 w-4" />
                Create Course
              </Link>
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default TeacherCourses;
