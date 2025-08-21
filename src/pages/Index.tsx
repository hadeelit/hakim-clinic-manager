import { LoginForm } from "@/components/ui/login-form"
import { toast } from "@/hooks/use-toast"

const Index = () => {
  const handleLogin = (credentials: { username: string; password: string; rememberMe: boolean }) => {
    // Simulate login logic - replace with actual API call
    console.log("Login attempt:", credentials)
    
    if (credentials.username && credentials.password) {
      toast({
        title: "تم تسجيل الدخول بنجاح",
        description: `مرحباً بك، ${credentials.username}`,
      })
    } else {
      toast({
        title: "خطأ في تسجيل الدخول",
        description: "يرجى التحقق من البيانات المدخلة",
        variant: "destructive"
      })
    }
  }

  return (
    <div className="min-h-screen bg-gradient-subtle relative overflow-hidden">
      {/* Medical Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-10 left-10 w-20 h-20 border-2 border-primary rounded-full animate-pulse"></div>
        <div className="absolute top-32 right-20 w-16 h-16 border-2 border-secondary rounded-full animate-pulse delay-1000"></div>
        <div className="absolute bottom-20 left-32 w-24 h-24 border-2 border-accent rounded-full animate-pulse delay-2000"></div>
        <div className="absolute bottom-40 right-10 w-12 h-12 border-2 border-primary rounded-full animate-pulse delay-500"></div>
      </div>
      
      {/* Main Content */}
      <div className="relative z-10 flex items-center justify-center min-h-screen p-4">
        <LoginForm onSubmit={handleLogin} />
      </div>
      
      {/* Footer */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-center">
        <p className="text-sm text-muted-foreground">
          © 2024 HakimClinic. جميع الحقوق محفوظة
        </p>
      </div>
    </div>
  );
};

export default Index;
