import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ThemeProvider } from "@/contexts/ThemeContext";
import LandingPage from "./pages/LandingPage";
import StudentLogin from "./pages/StudentLogin";
import TeacherLogin from "./pages/TeacherLogin";
import StudentDashboard from "./pages/StudentDashboard";
import EnrolledCourses from "./pages/EnrolledCourses";
import StudentDoubts from "./pages/StudentDoubts";
import CourseDetails from "./pages/CourseDetails";
import TeacherDashboard from "./pages/TeacherDashboard";
import TeacherUpload from "./pages/TeacherUpload";
import TeacherCourses from "./pages/TeacherCourses";
import TeacherDoubts from "./pages/TeacherDoubts";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            {/* Landing and Auth Routes */}
            <Route path="/" element={<Navigate to="/landingpage" replace />} />
            <Route path="/landingpage" element={<LandingPage />} />
            <Route path="/login" element={<StudentLogin />} />
            <Route path="/teacherlogin" element={<TeacherLogin />} />
            
            {/* Student Routes */}
            <Route path="/homepage" element={<StudentDashboard />} />
            <Route path="/enrolled" element={<EnrolledCourses />} />
            <Route path="/doubts" element={<StudentDoubts />} />
            <Route path="/course/:courseId" element={<CourseDetails />} />
            
            {/* Teacher Routes */}
            <Route path="/teacher/dashboard" element={<TeacherDashboard />} />
            <Route path="/teacher/upload" element={<TeacherUpload />} />
            <Route path="/teacher/courses" element={<TeacherCourses />} />
            <Route path="/teacher/doubts" element={<TeacherDoubts />} />
            
            {/* Catch-all route */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
