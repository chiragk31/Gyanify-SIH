import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { BookOpen, Clock, Languages, User } from 'lucide-react';
import { Link } from 'react-router-dom';

export interface Course {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  teacherName: string;
  subject: string;
  topic: string;
  duration: string; // e.g., "4 weeks"
  lectureCount: number;
  languages: string[]; // Available languages for translation
  enrolled?: boolean; // For student view
}

interface CourseCardProps {
  course: Course;
  onEnroll?: (courseId: string) => void; // For enrolling in a course
  viewType?: 'browse' | 'enrolled'; // Different views for different contexts
}

export const CourseCard = ({ course, onEnroll, viewType = 'browse' }: CourseCardProps) => {
  // TODO: When integrating with backend:
  // - Fetch course data from: GET /api/courses or GET /api/student/enrolled-courses
  // - Enroll action: POST /api/courses/:id/enroll
  // - Get course thumbnail from backend or use placeholder
  
  return (
    <Card className="overflow-hidden hover:shadow-lg transition-smooth group">
      {/* Thumbnail */}
      <div className="relative aspect-video overflow-hidden bg-muted">
        <div className="absolute inset-0 bg-gradient-secondary flex items-center justify-center">
          <BookOpen className="h-16 w-16 text-secondary-foreground/20" />
        </div>
        {/* TODO: Replace with actual thumbnail when backend is integrated */}
        {/* <img src={course.thumbnail} alt={course.title} className="object-cover w-full h-full" /> */}
      </div>

      <CardHeader>
        <div className="flex items-start justify-between gap-2 mb-2">
          <Badge variant="secondary" className="text-xs">
            {course.subject}
          </Badge>
          <div className="flex gap-1">
            {course.languages.slice(0, 3).map((lang) => (
              <Badge key={lang} variant="outline" className="text-xs">
                {lang}
              </Badge>
            ))}
            {course.languages.length > 3 && (
              <Badge variant="outline" className="text-xs">
                +{course.languages.length - 3}
              </Badge>
            )}
          </div>
        </div>
        <CardTitle className="line-clamp-2 group-hover:text-primary transition-smooth">
          {course.title}
        </CardTitle>
        <CardDescription className="line-clamp-2">
          {course.description}
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-3">
        <div className="flex items-center text-sm text-muted-foreground">
          <User className="mr-2 h-4 w-4" />
          <span>By {course.teacherName}</span>
        </div>
        <div className="flex items-center justify-between text-sm text-muted-foreground">
          <div className="flex items-center">
            <BookOpen className="mr-2 h-4 w-4" />
            <span>{course.lectureCount} Lectures</span>
          </div>
          <div className="flex items-center">
            <Clock className="mr-2 h-4 w-4" />
            <span>{course.duration}</span>
          </div>
        </div>
        <div className="flex items-center text-sm text-accent">
          <Languages className="mr-2 h-4 w-4" />
          <span>Available in {course.languages.length} languages</span>
        </div>
      </CardContent>

      <CardFooter>
        {viewType === 'browse' && !course.enrolled ? (
          <Button 
            className="w-full" 
            onClick={() => onEnroll?.(course.id)}
          >
            Enroll Now
          </Button>
        ) : (
          <Button 
            className="w-full" 
            variant="default"
            asChild
          >
            <Link to={`/course/${course.id}`}>
              Continue Learning
            </Link>
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};
