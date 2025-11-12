import { Header } from '@/components/Header';
import { CourseCard } from '@/components/CourseCard';
import { dummyCourses } from '@/data/dummyCourses';
import { BookOpen } from 'lucide-react';

const EnrolledCourses = () => {
  // TODO: Replace with actual API call
  // GET /api/student/enrolled-courses
  // Expected Response: { courses: Course[], progress: Record<courseId, number> }
  const enrolledCourses = dummyCourses.filter(course => course.enrolled);

  return (
    <div className="min-h-screen bg-background">
      <Header isAuthenticated userType="student" />
      
      <div className="container px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-2">
            My Courses
          </h1>
          <p className="text-muted-foreground">
            Continue your learning journey
          </p>
        </div>

        {enrolledCourses.length > 0 ? (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {enrolledCourses.map((course) => (
              <CourseCard
                key={course.id}
                course={course}
                viewType="enrolled"
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="inline-flex items-center justify-center rounded-full bg-muted p-6 mb-4">
              <BookOpen className="h-12 w-12 text-muted-foreground" />
            </div>
            <h3 className="text-xl font-semibold mb-2">No Enrolled Courses Yet</h3>
            <p className="text-muted-foreground mb-4">
              Start learning by enrolling in courses from the browse page
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default EnrolledCourses;
