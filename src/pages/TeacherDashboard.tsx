import { Header } from '@/components/Header';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { BookOpen, Users, Video, FileText, TrendingUp, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';

const TeacherDashboard = () => {
  // TODO: Integrate with backend API
  // GET /api/teacher/stats - Fetch teacher statistics
  // Expected Response: {
  //   totalCourses: number,
  //   totalStudents: number,
  //   totalLectures: number,
  //   studentsByRegion: Array<{ region: string, count: number }>
  // }

  const stats = {
    totalCourses: 5,
    totalStudents: 342,
    totalLectures: 67,
    totalNotes: 45,
  };

  const regionData = [
    { region: 'North India', count: 125 },
    { region: 'South India', count: 98 },
    { region: 'West India', count: 76 },
    { region: 'East India', count: 43 },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header isAuthenticated userType="teacher" />
      
      <div className="container px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-2">
            Teacher Dashboard
          </h1>
          <p className="text-muted-foreground">
            Manage your courses and track student engagement
          </p>
        </div>

        {/* Quick Actions */}
        <div className="grid gap-4 md:grid-cols-3 mb-8">
          <Button asChild size="lg" className="h-auto py-6">
            <Link to="/teacher/upload" className="flex flex-col items-center">
              <Video className="h-8 w-8 mb-2" />
              <span>Upload Content</span>
            </Link>
          </Button>
          <Button asChild size="lg" variant="secondary" className="h-auto py-6">
            <Link to="/teacher/courses" className="flex flex-col items-center">
              <BookOpen className="h-8 w-8 mb-2" />
              <span>Manage Courses</span>
            </Link>
          </Button>
          <Button asChild size="lg" variant="outline" className="h-auto py-6">
            <Link to="/teacher/analytics" className="flex flex-col items-center">
              <TrendingUp className="h-8 w-8 mb-2" />
              <span>View Analytics</span>
            </Link>
          </Button>
        </div>

        {/* Statistics Cards */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Total Courses
              </CardTitle>
              <BookOpen className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{stats.totalCourses}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Total Students
              </CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{stats.totalStudents}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Total Lectures
              </CardTitle>
              <Video className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{stats.totalLectures}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Course Materials
              </CardTitle>
              <FileText className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{stats.totalNotes}</div>
            </CardContent>
          </Card>
        </div>

        {/* Regional Distribution */}
        <Card>
          <CardHeader>
            <CardTitle>Student Distribution by Region</CardTitle>
            <CardDescription>
              See where your students are learning from
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {regionData.map((region) => (
                <div key={region.region} className="flex items-center">
                  <MapPin className="h-4 w-4 text-muted-foreground mr-3" />
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm font-medium">{region.region}</span>
                      <span className="text-sm text-muted-foreground">{region.count} students</span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2">
                      <div
                        className="bg-primary h-2 rounded-full"
                        style={{ width: `${(region.count / stats.totalStudents) * 100}%` }}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default TeacherDashboard;
