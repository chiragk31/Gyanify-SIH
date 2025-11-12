import { Link } from 'react-router-dom';
import { Header } from '@/components/Header';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { 
  GraduationCap, 
  Languages, 
  Video, 
  Users, 
  Globe, 
  BookOpen,
  ArrowRight,
  CheckCircle2
} from 'lucide-react';

const LandingPage = () => {
  const features = [
    {
      icon: Languages,
      title: 'Multilingual Support',
      description: 'Learn in your preferred language with support for Hindi, Bengali, Telugu, Tamil, Marathi, and more',
    },
    {
      icon: Video,
      title: 'Video Lectures',
      description: 'High-quality video content translated to your local language in real-time',
    },
    {
      icon: Users,
      title: 'Expert Teachers',
      description: 'Learn from experienced educators from across India',
    },
    {
      icon: Globe,
      title: 'Regional Content',
      description: 'Content tailored to your region and cultural context',
    },
  ];

  const benefits = [
    'AI-powered instant translation',
    'Learn at your own pace',
    'Progress tracking and certificates',
    'Interactive learning experience',
    'Mobile-friendly platform',
    'Free and accessible education',
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-hero opacity-10" />
        <div className="container relative px-4 py-20 md:py-32">
          <div className="mx-auto max-w-3xl text-center">
            <div className="mb-6 inline-flex items-center rounded-full bg-primary/10 px-4 py-2 text-sm font-medium text-primary">
              <Languages className="mr-2 h-4 w-4" />
              AI-Powered Multilingual Learning
            </div>
            <h1 className="mb-6 text-4xl font-bold tracking-tight md:text-6xl">
              Learn in Your
              <span className="bg-gradient-primary bg-clip-text text-transparent"> Local Language</span>
            </h1>
            <p className="mb-8 text-lg text-muted-foreground md:text-xl">
              Gyanify translates educational content into regional Indian languages,
              making quality education accessible to everyone, everywhere.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="shadow-md hover:shadow-lg transition-smooth">
                <Link to="/login">
                  Get Started as Student
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="shadow-sm">
                <Link to="/teacherlogin">
                  Teacher Login
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-muted/30">
        <div className="container px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Why Choose Gyanify?</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Breaking language barriers in education with cutting-edge AI technology
            </p>
          </div>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {features.map((feature, index) => (
              <Card key={index} className="p-6 hover:shadow-lg transition-smooth border-border">
                <div className="mb-4 inline-flex rounded-lg bg-primary/10 p-3">
                  <feature.icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="mb-2 text-xl font-semibold">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20">
        <div className="container px-4">
          <div className="grid gap-12 lg:grid-cols-2 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6">
                Education Should Have
                <span className="text-primary"> No Boundaries</span>
              </h2>
              <p className="text-muted-foreground mb-8">
                We believe every student deserves access to quality education in their mother tongue.
                Gyanify uses advanced AI to make this a reality.
              </p>
              <div className="space-y-3">
                {benefits.map((benefit, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <CheckCircle2 className="h-5 w-5 text-success flex-shrink-0" />
                    <span>{benefit}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative">
              <div className="aspect-video rounded-2xl bg-gradient-secondary overflow-hidden shadow-lg">
                <div className="flex items-center justify-center h-full">
                  <BookOpen className="h-32 w-32 text-secondary-foreground/20" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-hero">
        <div className="container px-4">
          <Card className="p-12 text-center bg-card/95 backdrop-blur border-border/50">
            <h2 className="text-3xl font-bold mb-4">Ready to Start Learning?</h2>
            <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
              Join thousands of students learning in their preferred language
            </p>
            <Button asChild size="lg" className="shadow-lg">
              <Link to="/login">
                Create Your Account
                <GraduationCap className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-8">
        <div className="container px-4 text-center text-sm text-muted-foreground">
          <p>© 2024 Gyanify. Making education accessible in every language.</p>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
