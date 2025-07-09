import React, { useState, useEffect, createContext, useContext } from 'react';
import { BrowserRouter, Routes, Route, useNavigate, Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus, Send, LogOut, BookOpen, Users, MessageSquare, GraduationCap, UserCheck, Star, Clock, Heart } from 'lucide-react';
import { useToast } from "@/components/ui/use-toast";
import { Toaster } from "@/components/ui/toaster";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import NotFound from "./pages/NotFound";

// Mock Data with updated classes
const mockUsers = [
  { id: '1', email: 'teacher@example.com', full_name: 'John Teacher', role: 'teacher' as const },
  { id: '2', email: 'student@example.com', full_name: 'Jane Student', role: 'student' as const },
];

const mockClasses = [
  { id: '1', name: 'Web Development', description: 'Learn modern web technologies', teacher_id: '1', created_at: '2024-01-15' },
  { id: '2', name: 'Object Oriented Programming', description: 'Master OOP concepts and principles', teacher_id: '1', created_at: '2024-01-20' },
  { id: '3', name: 'Probability Statistics', description: 'Statistical analysis and probability theory', teacher_id: '1', created_at: '2024-01-25' },
  { id: '4', name: 'Data Structures and Algorithms', description: 'Essential computer science fundamentals', teacher_id: '1', created_at: '2024-01-30' },
];

const mockMessages = [
  { id: '1', class_id: '1', user_id: '1', content: 'Welcome to Web Development! Today we\'ll cover React basics.', created_at: '2024-01-15T10:00:00Z' },
  { id: '2', class_id: '1', user_id: '2', content: 'Thank you! Excited to learn React.', created_at: '2024-01-15T10:05:00Z' },
  { id: '3', class_id: '2', user_id: '1', content: 'Today we will explore object-oriented design patterns.', created_at: '2024-01-20T09:00:00Z' },
];

const mockAssignments = [
  { id: '1', class_id: '1', title: 'React Todo App', description: 'Build a complete todo application using React', due_date: '2024-02-01T23:59:59Z', created_at: '2024-01-15' },
  { id: '2', class_id: '2', title: 'OOP Design Project', description: 'Design a class hierarchy for a library system', due_date: '2024-02-05T23:59:59Z', created_at: '2024-01-20' },
];

const mockClassMembers = [
  { id: '1', class_id: '1', user_id: '2' },
  { id: '2', class_id: '2', user_id: '2' },
];

// Auth Context
interface User {
  id: string;
  email: string;
  full_name: string;
  role: 'student' | 'teacher';
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string, role: 'student' | 'teacher') => Promise<void>;
  logout: () => void;
  register: (email: string, password: string, fullName: string, role: 'student' | 'teacher') => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

const useAuth = () => useContext(AuthContext);

const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    const storedUser = localStorage.getItem('workbook_user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const login = async (email: string, password: string, role: 'student' | 'teacher') => {
    // Accept any email/password combination
    const foundUser = mockUsers.find(u => u.email === email && u.role === role) || {
      id: Math.random().toString(),
      email,
      full_name: email.split('@')[0],
      role: role
    };
    
    setUser(foundUser);
    localStorage.setItem('workbook_user', JSON.stringify(foundUser));
    toast({ title: "Success", description: "Logged in successfully!" });
  };

  const register = async (email: string, password: string, fullName: string, role: 'student' | 'teacher') => {
    const newUser = {
      id: Math.random().toString(),
      email,
      full_name: fullName,
      role
    };
    
    setUser(newUser);
    localStorage.setItem('workbook_user', JSON.stringify(newUser));
    toast({ title: "Success", description: "Account created successfully!" });
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('workbook_user');
    toast({ title: "Success", description: "Logged out successfully!" });
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, register }}>
      {children}
    </AuthContext.Provider>
  );
};

// Landing Page Component
const LandingPage = () => {
  const [selectedRole, setSelectedRole] = useState<'student' | 'teacher' | null>(null);

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-accent/10 to-primary/5">
      <Header />

      <main className="container mx-auto px-4 py-16">
        <div className="text-center mb-20">
          <h2 className="text-5xl font-bold text-foreground mb-6 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            Connect, Learn, and Grow Together
          </h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto leading-relaxed">
            Workbook brings students and teachers together in a seamless learning environment. 
            Join classes, share knowledge, and track your progress with our intuitive platform.
          </p>
          
          {/* Role Selection */}
          <div className="flex flex-col items-center space-y-6 mb-8">
            <p className="text-lg font-medium text-foreground">Join as:</p>
            <div className="flex gap-4">
              <Button 
                size="lg" 
                variant={selectedRole === 'student' ? 'default' : 'outline'}
                onClick={() => setSelectedRole('student')}
                className="min-w-32"
              >
                <GraduationCap className="mr-2 h-5 w-5" />
                Student
              </Button>
              <Button 
                size="lg" 
                variant={selectedRole === 'teacher' ? 'default' : 'outline'}
                onClick={() => setSelectedRole('teacher')}
                className="min-w-32"
              >
                <BookOpen className="mr-2 h-5 w-5" />
                Teacher
              </Button>
            </div>
            {selectedRole && (
              <Link to={`/login?role=${selectedRole}`}>
                <Button size="lg" className="gradient-primary text-white shadow-elegant hover:scale-105 transition-transform">
                  Get Started as {selectedRole === 'student' ? 'Student' : 'Teacher'}
                </Button>
              </Link>
            )}
          </div>
        </div>

        {/* Features Section */}
        <div className="grid md:grid-cols-3 gap-8 mb-20">
          <Card className="hover:shadow-elegant transition-all duration-300 hover:scale-105 border-accent/20">
            <CardHeader className="text-center">
              <div className="mx-auto mb-4 p-3 rounded-full bg-primary/10">
                <Users className="h-8 w-8 text-primary" />
              </div>
              <CardTitle className="text-xl">Join Classes</CardTitle>
              <CardDescription className="text-base">
                Easily join classes and connect with teachers and fellow students in real-time
              </CardDescription>
            </CardHeader>
          </Card>
          
          <Card className="hover:shadow-elegant transition-all duration-300 hover:scale-105 border-accent/20">
            <CardHeader className="text-center">
              <div className="mx-auto mb-4 p-3 rounded-full bg-accent/20">
                <MessageSquare className="h-8 w-8 text-primary" />
              </div>
              <CardTitle className="text-xl">Interactive Chat</CardTitle>
              <CardDescription className="text-base">
                Engage in real-time discussions with enhanced chat features and instant notifications
              </CardDescription>
            </CardHeader>
          </Card>
          
          <Card className="hover:shadow-elegant transition-all duration-300 hover:scale-105 border-accent/20">
            <CardHeader className="text-center">
              <div className="mx-auto mb-4 p-3 rounded-full bg-primary/10">
                <GraduationCap className="h-8 w-8 text-primary" />
              </div>
              <CardTitle className="text-xl">Track Progress</CardTitle>
              <CardDescription className="text-base">
                Monitor assignments and stay on top of your learning journey with detailed analytics
              </CardDescription>
            </CardHeader>
          </Card>
        </div>

        {/* Available Courses Section */}
        <div className="bg-card rounded-2xl p-8 mb-20 shadow-elegant border border-accent/20">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-foreground mb-4 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Available Courses
            </h3>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Explore our comprehensive range of programming and computer science courses
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-6">
            {mockClasses.map((course) => (
              <Card key={course.id} className="hover:shadow-lg transition-shadow border-accent/10">
                <CardHeader>
                  <CardTitle className="text-lg flex items-center">
                    <BookOpen className="h-5 w-5 mr-2 text-primary" />
                    {course.name}
                  </CardTitle>
                  <CardDescription>{course.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <Badge variant="outline" className="text-xs">
                      <Clock className="h-3 w-3 mr-1" />
                      Active Course
                    </Badge>
                    <Button size="sm" variant="outline">
                      Learn More
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Teachers Section */}
        <div className="bg-card rounded-2xl p-8 mb-20 shadow-elegant border border-accent/20">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-foreground mb-4 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Empower Your Teaching
            </h3>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Join thousands of educators who are transforming their classrooms with Workbook's powerful teaching tools
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div className="text-center p-6 rounded-xl bg-gradient-to-br from-primary/5 to-accent/5 border border-accent/10">
              <div className="mx-auto mb-3 p-2 rounded-full bg-primary/10 w-fit">
                <BookOpen className="h-6 w-6 text-primary" />
              </div>
              <h4 className="font-semibold text-foreground mb-2">Create Classes</h4>
              <p className="text-sm text-muted-foreground">Set up and manage your courses with ease</p>
            </div>
            
            <div className="text-center p-6 rounded-xl bg-gradient-to-br from-accent/5 to-primary/5 border border-accent/10">
              <div className="mx-auto mb-3 p-2 rounded-full bg-accent/20 w-fit">
                <Users className="h-6 w-6 text-primary" />
              </div>
              <h4 className="font-semibold text-foreground mb-2">Manage Students</h4>
              <p className="text-sm text-muted-foreground">Track student progress and engagement</p>
            </div>
            
            <div className="text-center p-6 rounded-xl bg-gradient-to-br from-primary/5 to-accent/5 border border-accent/10">
              <div className="mx-auto mb-3 p-2 rounded-full bg-primary/10 w-fit">
                <UserCheck className="h-6 w-6 text-primary" />
              </div>
              <h4 className="font-semibold text-foreground mb-2">Assignments</h4>
              <p className="text-sm text-muted-foreground">Create and grade assignments efficiently</p>
            </div>
            
            <div className="text-center p-6 rounded-xl bg-gradient-to-br from-accent/5 to-primary/5 border border-accent/10">
              <div className="mx-auto mb-3 p-2 rounded-full bg-accent/20 w-fit">
                <MessageSquare className="h-6 w-6 text-primary" />
              </div>
              <h4 className="font-semibold text-foreground mb-2">Communication</h4>
              <p className="text-sm text-muted-foreground">Stay connected with your students</p>
            </div>
          </div>
          
          <div className="text-center">
            <Link to="/login?role=teacher">
              <Button size="lg" className="gradient-primary text-white shadow-elegant hover:scale-105 transition-transform">
                <GraduationCap className="mr-2 h-5 w-5" />
                Start Teaching Today
              </Button>
            </Link>
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center bg-gradient-to-r from-primary/10 via-accent/10 to-primary/10 rounded-2xl p-12 shadow-elegant">
          <h3 className="text-3xl font-bold text-foreground mb-4">Ready to Transform Your Learning Experience?</h3>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            Join our community of learners and educators. Start your journey today.
          </p>
          <Link to="/login">
            <Button size="lg" className="gradient-primary text-white shadow-elegant hover:scale-105 transition-transform">
              Get Started for Free
            </Button>
          </Link>
        </div>
      </main>

      <Footer />
    </div>
  );
};

// Login Component with role selection
const Login = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [role, setRole] = useState<'student' | 'teacher'>('student');
  const [loading, setLoading] = useState(false);
  
  const { user, login, register } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  // Get role from URL params
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const roleParam = params.get('role') as 'student' | 'teacher';
    if (roleParam && (roleParam === 'student' || roleParam === 'teacher')) {
      setRole(roleParam);
    }
  }, []);

  useEffect(() => {
    if (user) {
      navigate(user.role === 'teacher' ? '/teacher-dashboard' : '/student-dashboard');
    }
  }, [user, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      if (isLogin) {
        await login(email, password, role);
      } else {
        await register(email, password, fullName, role);
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Something went wrong. Please try again.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <BookOpen className="h-12 w-12 text-primary" />
          </div>
          <CardTitle className="text-2xl">{isLogin ? 'Welcome Back' : 'Create Account'}</CardTitle>
          <CardDescription>
            {isLogin ? 'Sign in to your Workbook account' : 'Join the Workbook community'}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            {!isLogin && (
              <div className="space-y-2">
                <Label htmlFor="fullName">Full Name</Label>
                <Input
                  id="fullName"
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  required
                />
              </div>
            )}
            
            <div className="space-y-2">
              <Label htmlFor="role">I am a:</Label>
              <Select value={role} onValueChange={(value: 'student' | 'teacher') => setRole(value)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="student">Student</SelectItem>
                  <SelectItem value="teacher">Teacher</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? 'Loading...' : (isLogin ? 'Sign In' : 'Create Account')}
            </Button>
          </form>
          
          <div className="mt-4 text-center">
            <Button
              variant="link"
              onClick={() => setIsLogin(!isLogin)}
              className="text-sm"
            >
              {isLogin ? "Don't have an account? Sign up" : "Already have an account? Sign in"}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

// Student Dashboard Component with enhanced chat
const StudentDashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [selectedClass, setSelectedClass] = useState<string | null>(null);
  const [newMessage, setNewMessage] = useState('');
  const [messages, setMessages] = useState(mockMessages);
  const [joinDialogOpen, setJoinDialogOpen] = useState(false);
  const [isTyping, setIsTyping] = useState(false);

  useEffect(() => {
    if (!user || user.role !== 'student') {
      navigate('/login');
    }
  }, [user, navigate]);

  const myClasses = mockClasses.filter(cls => 
    mockClassMembers.some(member => member.class_id === cls.id && member.user_id === user?.id)
  );

  const availableClasses = mockClasses.filter(cls => 
    !mockClassMembers.some(member => member.class_id === cls.id && member.user_id === user?.id)
  );

  const handleJoinClass = (classId: string) => {
    mockClassMembers.push({
      id: Math.random().toString(),
      class_id: classId,
      user_id: user!.id
    });
    toast({ title: "Success", description: "Joined class successfully!" });
    setJoinDialogOpen(false);
  };

  const handleSendMessage = () => {
    if (!newMessage.trim() || !selectedClass) return;
    
    const message = {
      id: Math.random().toString(),
      class_id: selectedClass,
      user_id: user!.id,
      content: newMessage,
      created_at: new Date().toISOString()
    };
    
    setMessages(prev => [...prev, message]);
    setNewMessage('');
    toast({ title: "Success", description: "Message sent!" });
  };

  const handleLikeMessage = (messageId: string) => {
    toast({ title: "Success", description: "Message liked!" });
  };

  const classMessages = messages.filter(msg => msg.class_id === selectedClass);
  const classAssignments = mockAssignments.filter(assignment => 
    myClasses.some(cls => cls.id === assignment.class_id)
  );

  const handleSignOut = () => {
    logout();
    navigate('/login');
  };

  if (!user) return null;

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-primary/5 backdrop-blur">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <BookOpen className="h-8 w-8 text-primary" />
            <h1 className="text-2xl font-bold">Student Dashboard</h1>
          </div>
          <div className="flex items-center space-x-4">
            <span className="text-sm text-muted-foreground">Welcome, {user.full_name}</span>
            <Button variant="outline" size="sm" onClick={handleSignOut}>
              <LogOut className="h-4 w-4 mr-2" />
              Sign Out
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6">
        <div className="grid lg:grid-cols-4 gap-6">
          <div className="lg:col-span-1 space-y-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-base font-medium">My Classes</CardTitle>
                <Dialog open={joinDialogOpen} onOpenChange={setJoinDialogOpen}>
                  <DialogTrigger asChild>
                    <Button size="sm" variant="outline">
                      <Plus className="h-4 w-4" />
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Join a Class</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4">
                      {availableClasses.map((cls) => (
                        <Card key={cls.id} className="hover:shadow-md transition-shadow">
                          <CardHeader>
                            <CardTitle className="text-sm">{cls.name}</CardTitle>
                            <CardDescription className="text-xs">{cls.description}</CardDescription>
                            <Button size="sm" onClick={() => handleJoinClass(cls.id)}>
                              Join Class
                            </Button>
                          </CardHeader>
                        </Card>
                      ))}
                    </div>
                  </DialogContent>
                </Dialog>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {myClasses.map((cls) => (
                    <Button
                      key={cls.id}
                      variant={selectedClass === cls.id ? "default" : "ghost"}
                      className="w-full justify-start"
                      onClick={() => setSelectedClass(cls.id)}
                    >
                      <BookOpen className="h-4 w-4 mr-2" />
                      {cls.name}
                    </Button>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-base font-medium">Upcoming Assignments</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {classAssignments.map((assignment) => (
                    <div key={assignment.id} className="space-y-1 p-3 bg-accent/10 rounded-lg">
                      <h4 className="text-sm font-medium">{assignment.title}</h4>
                      <p className="text-xs text-muted-foreground">{assignment.description}</p>
                      <Badge variant="outline" className="text-xs">
                        Due: {new Date(assignment.due_date).toLocaleDateString()}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="lg:col-span-3">
            {selectedClass ? (
              <Card className="h-[600px] flex flex-col">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <MessageSquare className="h-5 w-5 mr-2" />
                    {myClasses.find(cls => cls.id === selectedClass)?.name} - Interactive Chat
                  </CardTitle>
                </CardHeader>
                <CardContent className="flex-1 flex flex-col">
                  <ScrollArea className="flex-1 mb-4">
                    <div className="space-y-4">
                      {classMessages.map((message) => {
                        const sender = mockUsers.find(u => u.id === message.user_id);
                        const isOwn = message.user_id === user.id;
                        return (
                          <div key={message.id} className={`flex ${isOwn ? 'justify-end' : 'justify-start'}`}>
                            <div className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                              isOwn ? 'bg-primary text-primary-foreground' : 'bg-muted'
                            }`}>
                              <p className="text-xs font-medium mb-1 flex items-center">
                                {sender?.full_name} ({sender?.role})
                                {sender?.role === 'teacher' && <Star className="h-3 w-3 ml-1 text-yellow-500" />}
                              </p>
                              <p className="text-sm">{message.content}</p>
                              <div className="flex items-center justify-between mt-2">
                                <p className="text-xs opacity-70">
                                  {new Date(message.created_at).toLocaleTimeString()}
                                </p>
                                <Button 
                                  size="sm" 
                                  variant="ghost" 
                                  className="h-6 w-6 p-0"
                                  onClick={() => handleLikeMessage(message.id)}
                                >
                                  <Heart className="h-3 w-3" />
                                </Button>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                      {isTyping && (
                        <div className="flex justify-start">
                          <div className="bg-muted px-4 py-2 rounded-lg">
                            <p className="text-sm">Someone is typing...</p>
                          </div>
                        </div>
                      )}
                    </div>
                  </ScrollArea>
                  <div className="flex space-x-2">
                    <Input
                      placeholder="Type your message..."
                      value={newMessage}
                      onChange={(e) => {
                        setNewMessage(e.target.value);
                        setIsTyping(e.target.value.length > 0);
                      }}
                      onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                    />
                    <Button onClick={handleSendMessage} disabled={!newMessage.trim()}>
                      <Send className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ) : (
              <Card className="h-[600px] flex items-center justify-center">
                <div className="text-center">
                  <MessageSquare className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-medium">Select a class to start chatting</h3>
                  <p className="text-muted-foreground">Choose a class from the sidebar to view messages and participate in discussions.</p>
                </div>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

// Teacher Dashboard Component
const TeacherDashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [selectedClass, setSelectedClass] = useState<string | null>(null);
  const [newMessage, setNewMessage] = useState('');
  const [messages, setMessages] = useState(mockMessages);
  const [createClassOpen, setCreateClassOpen] = useState(false);
  const [createAssignmentOpen, setCreateAssignmentOpen] = useState(false);
  const [newClassName, setNewClassName] = useState('');
  const [newClassDescription, setNewClassDescription] = useState('');
  const [assignmentTitle, setAssignmentTitle] = useState('');
  const [assignmentDescription, setAssignmentDescription] = useState('');
  const [assignmentDueDate, setAssignmentDueDate] = useState('');

  useEffect(() => {
    if (!user || user.role !== 'teacher') {
      navigate('/login');
    }
  }, [user, navigate]);

  const myClasses = mockClasses.filter(cls => cls.teacher_id === user?.id);

  const handleCreateClass = () => {
    const newClass = {
      id: Math.random().toString(),
      name: newClassName,
      description: newClassDescription,
      teacher_id: user!.id,
      created_at: new Date().toISOString()
    };
    
    mockClasses.push(newClass);
    setNewClassName('');
    setNewClassDescription('');
    setCreateClassOpen(false);
    toast({ title: "Success", description: "Class created successfully!" });
  };

  const handleCreateAssignment = () => {
    if (!selectedClass) return;
    
    const newAssignment = {
      id: Math.random().toString(),
      class_id: selectedClass,
      title: assignmentTitle,
      description: assignmentDescription,
      due_date: new Date(assignmentDueDate).toISOString(),
      created_at: new Date().toISOString()
    };
    
    mockAssignments.push(newAssignment);
    setAssignmentTitle('');
    setAssignmentDescription('');
    setAssignmentDueDate('');
    setCreateAssignmentOpen(false);
    toast({ title: "Success", description: "Assignment created successfully!" });
  };

  const handleSendMessage = () => {
    if (!newMessage.trim() || !selectedClass) return;
    
    const message = {
      id: Math.random().toString(),
      class_id: selectedClass,
      user_id: user!.id,
      content: newMessage,
      created_at: new Date().toISOString()
    };
    
    setMessages(prev => [...prev, message]);
    setNewMessage('');
    toast({ title: "Success", description: "Message sent!" });
  };

  const classMessages = messages.filter(msg => msg.class_id === selectedClass);
  const classStudents = mockClassMembers
    .filter(member => member.class_id === selectedClass)
    .map(member => mockUsers.find(user => user.id === member.user_id))
    .filter(Boolean);

  const handleSignOut = () => {
    logout();
    navigate('/login');
  };

  if (!user) return null;

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-primary/5 backdrop-blur">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <BookOpen className="h-8 w-8 text-primary" />
            <h1 className="text-2xl font-bold">Teacher Dashboard</h1>
          </div>
          <div className="flex items-center space-x-4">
            <span className="text-sm text-muted-foreground">Welcome, {user.full_name}</span>
            <Button variant="outline" size="sm" onClick={handleSignOut}>
              <LogOut className="h-4 w-4 mr-2" />
              Sign Out
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6">
        <div className="grid lg:grid-cols-4 gap-6">
          <div className="lg:col-span-1 space-y-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-base font-medium">My Classes</CardTitle>
                <Dialog open={createClassOpen} onOpenChange={setCreateClassOpen}>
                  <DialogTrigger asChild>
                    <Button size="sm" variant="outline">
                      <Plus className="h-4 w-4" />
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Create New Class</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="className">Class Name</Label>
                        <Input
                          id="className"
                          value={newClassName}
                          onChange={(e) => setNewClassName(e.target.value)}
                        />
                      </div>
                      <div>
                        <Label htmlFor="classDescription">Description</Label>
                        <Textarea
                          id="classDescription"
                          value={newClassDescription}
                          onChange={(e) => setNewClassDescription(e.target.value)}
                        />
                      </div>
                      <Button onClick={handleCreateClass} className="w-full">
                        Create Class
                      </Button>
                    </div>
                  </DialogContent>
                </Dialog>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {myClasses.map((cls) => (
                    <Button
                      key={cls.id}
                      variant={selectedClass === cls.id ? "default" : "ghost"}
                      className="w-full justify-start"
                      onClick={() => setSelectedClass(cls.id)}
                    >
                      <BookOpen className="h-4 w-4 mr-2" />
                      {cls.name}
                    </Button>
                  ))}
                </div>
              </CardContent>
            </Card>

            {selectedClass && (
              <Card>
                <CardHeader>
                  <CardTitle className="text-base font-medium flex items-center justify-between">
                    Students
                    <Badge variant="secondary">{classStudents.length}</Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {classStudents.map((student) => (
                      <div key={student?.id} className="flex items-center space-x-2">
                        <UserCheck className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm">{student?.full_name}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          <div className="lg:col-span-3">
            {selectedClass ? (
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <h2 className="text-xl font-bold">
                    {myClasses.find(cls => cls.id === selectedClass)?.name}
                  </h2>
                  <Dialog open={createAssignmentOpen} onOpenChange={setCreateAssignmentOpen}>
                    <DialogTrigger asChild>
                      <Button>
                        <Plus className="h-4 w-4 mr-2" />
                        Create Assignment
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Create New Assignment</DialogTitle>
                      </DialogHeader>
                      <div className="space-y-4">
                        <div>
                          <Label htmlFor="assignmentTitle">Assignment Title</Label>
                          <Input
                            id="assignmentTitle"
                            value={assignmentTitle}
                            onChange={(e) => setAssignmentTitle(e.target.value)}
                          />
                        </div>
                        <div>
                          <Label htmlFor="assignmentDescription">Description</Label>
                          <Textarea
                            id="assignmentDescription"
                            value={assignmentDescription}
                            onChange={(e) => setAssignmentDescription(e.target.value)}
                          />
                        </div>
                        <div>
                          <Label htmlFor="assignmentDueDate">Due Date</Label>
                          <Input
                            id="assignmentDueDate"
                            type="datetime-local"
                            value={assignmentDueDate}
                            onChange={(e) => setAssignmentDueDate(e.target.value)}
                          />
                        </div>
                        <Button onClick={handleCreateAssignment} className="w-full">
                          Create Assignment
                        </Button>
                      </div>
                    </DialogContent>
                  </Dialog>
                </div>

                <Card className="h-[500px] flex flex-col">
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <MessageSquare className="h-5 w-5 mr-2" />
                      Class Chat
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="flex-1 flex flex-col">
                    <ScrollArea className="flex-1 mb-4">
                      <div className="space-y-4">
                        {classMessages.map((message) => {
                          const sender = mockUsers.find(u => u.id === message.user_id);
                          const isOwn = message.user_id === user.id;
                          return (
                            <div key={message.id} className={`flex ${isOwn ? 'justify-end' : 'justify-start'}`}>
                              <div className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                                isOwn ? 'bg-primary text-primary-foreground' : 'bg-muted'
                              }`}>
                                <p className="text-xs font-medium mb-1">
                                  {sender?.full_name} ({sender?.role})
                                </p>
                                <p className="text-sm">{message.content}</p>
                                <p className="text-xs opacity-70 mt-1">
                                  {new Date(message.created_at).toLocaleTimeString()}
                                </p>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </ScrollArea>
                    <div className="flex space-x-2">
                      <Input
                        placeholder="Type your message..."
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                      />
                      <Button onClick={handleSendMessage}>
                        <Send className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            ) : (
              <Card className="h-[600px] flex items-center justify-center">
                <div className="text-center">
                  <BookOpen className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-medium">Select a class to manage</h3>
                  <p className="text-muted-foreground">Choose a class from the sidebar to view students, chat, and create assignments.</p>
                </div>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

// Main App Component
const App = () => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <div className="App">
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/student-dashboard" element={<StudentDashboard />} />
            <Route path="/teacher-dashboard" element={<TeacherDashboard />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
          <Toaster />
        </div>
      </AuthProvider>
    </BrowserRouter>
  );
};

export default App;
