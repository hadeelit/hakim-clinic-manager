import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Eye, EyeOff, Lock, User, Shield } from "lucide-react"
import { cn } from "@/lib/utils"
import logo from "@/assets/hakim-logo.png"

interface LoginFormProps {
  onSubmit?: (credentials: { username: string; password: string; rememberMe: boolean }) => void
  className?: string
}

export function LoginForm({ onSubmit, className }: LoginFormProps) {
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    rememberMe: false
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    
    // Simulate API call
    setTimeout(() => {
      onSubmit?.(formData)
      setIsLoading(false)
    }, 1000)
  }

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  return (
    <Card className={cn(
      "w-full max-w-md mx-auto shadow-medical border-0 bg-card/80 backdrop-blur-sm",
      className
    )}>
      <CardHeader className="text-center space-y-6 pb-8">
        <div className="flex flex-col items-center space-y-4">
          <div className="p-3 rounded-2xl bg-gradient-primary shadow-glow">
            <img 
              src={logo} 
              alt="HakimClinic Logo" 
              className="h-16 w-16 object-contain"
            />
          </div>
          <div className="space-y-2">
            <CardTitle className="text-3xl font-bold bg-gradient-primary bg-clip-text text-transparent">
              HakimClinic
            </CardTitle>
            <CardDescription className="text-lg text-muted-foreground">
              نظام إدارة العيادات الطبية
            </CardDescription>
          </div>
        </div>
        <div className="flex items-center justify-center space-x-2 space-x-reverse">
          <Shield className="h-4 w-4 text-success" />
          <span className="text-sm text-muted-foreground">تسجيل دخول آمن</span>
        </div>
      </CardHeader>
      
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="username" className="text-right text-base font-medium">
              اسم المستخدم
            </Label>
            <div className="relative">
              <Input
                id="username"
                type="text"
                value={formData.username}
                onChange={(e) => handleInputChange("username", e.target.value)}
                className="pl-10 pr-4 h-12 text-right bg-input/50 border-input-border focus:border-input-focus transition-smooth"
                placeholder="أدخل اسم المستخدم"
                required
                disabled={isLoading}
              />
              <User className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="password" className="text-right text-base font-medium">
              كلمة المرور
            </Label>
            <div className="relative">
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                value={formData.password}
                onChange={(e) => handleInputChange("password", e.target.value)}
                className="pl-10 pr-12 h-12 text-right bg-input/50 border-input-border focus:border-input-focus transition-smooth"
                placeholder="أدخل كلمة المرور"
                required
                disabled={isLoading}
              />
              <Lock className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground transition-smooth"
                disabled={isLoading}
              >
                {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
              </button>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <button
              type="button"
              className="text-sm text-primary hover:text-primary-light transition-smooth font-medium"
              disabled={isLoading}
            >
              نسيت كلمة المرور؟
            </button>
            <div className="flex items-center space-x-2 space-x-reverse">
              <Checkbox
                id="remember"
                checked={formData.rememberMe}
                onCheckedChange={(checked) => handleInputChange("rememberMe", !!checked)}
                disabled={isLoading}
                className="data-[state=checked]:bg-primary data-[state=checked]:border-primary"
              />
              <Label
                htmlFor="remember"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
              >
                تذكرني
              </Label>
            </div>
          </div>
        </CardContent>

        <CardFooter className="pt-6">
          <Button
            type="submit"
            className="w-full h-12 bg-gradient-primary hover:shadow-glow transition-bounce text-lg font-medium"
            disabled={isLoading}
          >
            {isLoading ? (
              <div className="flex items-center space-x-2 space-x-reverse">
                <div className="animate-spin rounded-full h-5 w-5 border-2 border-primary-foreground border-t-transparent"></div>
                <span>جارٍ تسجيل الدخول...</span>
              </div>
            ) : (
              "تسجيل الدخول"
            )}
          </Button>
        </CardFooter>
      </form>
    </Card>
  )
}