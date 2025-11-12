import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Header } from '@/components/Header';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { dummyCourses, dummyLectures, Lecture } from '@/data/dummyCourses';
import { PlayCircle, CheckCircle2, Clock, ChevronLeft, Languages } from 'lucide-react';

const CourseDetails = () => {
  const { courseId } = useParams<{ courseId: string }>();
  const [selectedLanguage, setSelectedLanguage] = useState('english');
  const [selectedLecture, setSelectedLecture] = useState<Lecture | null>(null);
  
  // TODO: Replace with actual API calls
  // GET /api/courses/:courseId - Fetch course details
  // GET /api/courses/:courseId/lectures - Fetch course lectures
  // POST /api/lectures/:lectureId/complete - Mark lecture as completed
  // GET /api/lectures/:lectureId/video?lang=:language - Get video URL for selected language
  
  const course = dummyCourses.find(c => c.id === courseId);
  const lectures = courseId ? dummyLectures[courseId] || [] : [];

  if (!course) {
    return (
      <div className="min-h-screen bg-background">
        <Header isAuthenticated userType="student" />
        <div className="container px-4 py-8">
          <p>Course not found</p>
        </div>
      </div>
    );
  }

  const completedCount = lectures.filter(l => l.completed).length;
  const progressPercentage = lectures.length > 0 ? (completedCount / lectures.length) * 100 : 0;

  const handleLectureClick = (lecture: Lecture) => {
    setSelectedLecture(lecture);
    // TODO: Load video for selected lecture and language
    // API Call: GET /api/lectures/:lectureId/video?lang=:selectedLanguage
  };

  const handleMarkComplete = (lectureId: string) => {
    // TODO: Integrate with backend
    // API Call: POST /api/lectures/:lectureId/complete
    // Body: { studentId: currentUser.id, courseId: course.id }
    console.log('Marking lecture as complete:', lectureId);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header isAuthenticated userType="student" />
      
      <div className="container px-4 py-8">
        <Link to="/enrolled" className="inline-flex items-center text-primary hover:underline mb-6">
          <ChevronLeft className="h-4 w-4 mr-1" />
          Back to My Courses
        </Link>

        {/* Course Header */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row justify-between items-start gap-4 mb-4">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold mb-2">
                {course.title}
              </h1>
              <p className="text-muted-foreground mb-4">{course.description}</p>
              <div className="flex flex-wrap gap-2">
                <Badge variant="secondary">{course.subject}</Badge>
                <Badge variant="outline">By {course.teacherName}</Badge>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Languages className="h-5 w-5 text-muted-foreground" />
              <Select value={selectedLanguage} onValueChange={setSelectedLanguage}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {course.languages.map((lang) => (
                    <SelectItem key={lang.toLowerCase()} value={lang.toLowerCase()}>
                      {lang}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Progress Bar */}
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium">Course Progress</span>
                <span className="text-sm text-muted-foreground">
                  {completedCount} / {lectures.length} completed
                </span>
              </div>
              <div className="w-full bg-muted rounded-full h-2">
                <div
                  className="bg-success h-2 rounded-full transition-all"
                  style={{ width: `${progressPercentage}%` }}
                />
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {/* Lecture List */}
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle>Lecture List</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {lectures.map((lecture, index) => (
                  <div
                    key={lecture.id}
                    className={`p-3 rounded-lg border cursor-pointer transition-smooth hover:bg-muted ${
                      selectedLecture?.id === lecture.id ? 'border-primary bg-muted' : 'border-border'
                    }`}
                    onClick={() => handleLectureClick(lecture)}
                  >
                    <div className="flex items-start gap-3">
                      <Checkbox
                        checked={lecture.completed}
                        onCheckedChange={() => handleMarkComplete(lecture.id)}
                        onClick={(e) => e.stopPropagation()}
                      />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          {lecture.completed ? (
                            <CheckCircle2 className="h-4 w-4 text-success flex-shrink-0" />
                          ) : (
                            <PlayCircle className="h-4 w-4 text-primary flex-shrink-0" />
                          )}
                          <span className="text-sm font-medium line-clamp-1">
                            {index + 1}. {lecture.title}
                          </span>
                        </div>
                        <div className="flex items-center text-xs text-muted-foreground">
                          <Clock className="h-3 w-3 mr-1" />
                          {lecture.duration}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Video Player */}
          <div className="lg:col-span-2">
            <Card>
              <CardContent className="p-0">
                {selectedLecture ? (
                  <div>
                    {/* Video Player Placeholder */}
                    <div className="aspect-video bg-gradient-secondary flex items-center justify-center">
                      <div className="text-center text-secondary-foreground/60">
                        <PlayCircle className="h-24 w-24 mx-auto mb-4" />
                        <p className="text-lg font-medium">Video Player</p>
                        <p className="text-sm">
                          Playing in: {selectedLanguage.charAt(0).toUpperCase() + selectedLanguage.slice(1)}
                        </p>
                        {/* TODO: Integrate actual video player */}
                        {/* Use library like video.js or react-player */}
                        {/* Load video URL from: GET /api/lectures/:lectureId/video?lang=:selectedLanguage */}
                      </div>
                    </div>
                    <div className="p-6">
                      <h2 className="text-2xl font-bold mb-2">{selectedLecture.title}</h2>
                      <p className="text-muted-foreground mb-4">{selectedLecture.description}</p>
                      <div className="flex items-center gap-4">
                        <Badge variant={selectedLecture.completed ? 'default' : 'secondary'}>
                          {selectedLecture.completed ? 'Completed' : 'In Progress'}
                        </Badge>
                        <span className="text-sm text-muted-foreground">
                          Duration: {selectedLecture.duration}
                        </span>
                      </div>
                      {!selectedLecture.completed && (
                        <Button
                          onClick={() => handleMarkComplete(selectedLecture.id)}
                          className="mt-4"
                        >
                          Mark as Complete
                        </Button>
                      )}
                    </div>
                  </div>
                ) : (
                  <div className="aspect-video flex items-center justify-center text-muted-foreground p-8">
                    <div className="text-center">
                      <PlayCircle className="h-16 w-16 mx-auto mb-4 opacity-50" />
                      <p>Select a lecture to start learning</p>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseDetails;
