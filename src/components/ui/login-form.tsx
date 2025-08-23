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
      "w-full max-w-md mx-auto shadow-medical border-0 bg-white overflow-hidden",
      className
    )}>
      {/* Blue Header Section */}
      <div className="bg-gradient-to-br from-blue-500 to-blue-600 px-8 py-12 text-center text-white">
        <div className="flex flex-col items-center space-y-4">
          <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-lg">
            <img 
              src={logo} 
              alt="HakimClinic Logo" 
              className="h-10 w-10 object-contain"
            />
          </div>
          <div className="space-y-2">
            <h1 className="text-2xl font-bold">
              HakimClinic / نظام حكيم كلينك
            </h1>
            <p className="text-blue-100 text-sm">
              مرحباً بك! يرجى تسجيل الدخول إلى حسابك
            </p>
          </div>
        </div>
      </div>
      
      <form onSubmit={handleSubmit}>
        <CardContent className="px-8 py-8 space-y-6">
          <div className="space-y-2">
            <Label htmlFor="username" className="text-right text-sm font-medium text-gray-700">
              اسم المستخدم
            </Label>
            <div className="relative">
              <Input
                id="username"
                type="text"
                value={formData.username}
                onChange={(e) => handleInputChange("username", e.target.value)}
                className="h-12 text-right bg-gray-50 border-gray-200 focus:border-blue-500 focus:ring-blue-500 rounded-lg pr-10"
                placeholder="أدخل اسم المستخدم"
                required
                disabled={isLoading}
              />
              <User className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="password" className="text-right text-sm font-medium text-gray-700">
              كلمة المرور
            </Label>
            <div className="relative">
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                value={formData.password}
                onChange={(e) => handleInputChange("password", e.target.value)}
                className="h-12 text-right bg-gray-50 border-gray-200 focus:border-blue-500 focus:ring-blue-500 rounded-lg pl-10 pr-10"
                placeholder="أدخل كلمة المرور"
                required
                disabled={isLoading}
              />
              <Lock className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                disabled={isLoading}
              >
                {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
              </button>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2 space-x-reverse">
              <Checkbox
                id="remember"
                checked={formData.rememberMe}
                onCheckedChange={(checked) => handleInputChange("rememberMe", !!checked)}
                disabled={isLoading}
                className="data-[state=checked]:bg-blue-500 data-[state=checked]:border-blue-500"
              />
              <Label
                htmlFor="remember"
                className="text-sm text-gray-600 cursor-pointer"
              >
                تذكرني
              </Label>
            </div>
            <button
              type="button"
              className="text-sm text-blue-500 hover:text-blue-600 font-medium"
              disabled={isLoading}
            >
              نسيت كلمة المرور؟
            </button>
          </div>

          <Button
            type="submit"
            className="w-full h-12 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white text-base font-medium rounded-lg"
            disabled={isLoading}
          >
            {isLoading ? (
              <div className="flex items-center space-x-2 space-x-reverse">
                <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent"></div>
                <span>جارٍ تسجيل الدخول...</span>
              </div>
            ) : (
              "تسجيل الدخول"
            )}
          </Button>

          <p className="text-center text-xs text-gray-500 mt-6">
            تسجيل دخول آمن للتطبيق الطبي الخاص بك فقط
          </p>
        </CardContent>
      </form>
    </Card>
  )
}