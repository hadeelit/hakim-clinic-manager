import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp"
import { 
  Shield, 
  Smartphone, 
  Mail, 
  MessageSquare, 
  Key, 
  Clock, 
  CheckCircle, 
  AlertCircle,
  ArrowRight,
  ArrowLeft,
  Fingerprint,
  QrCode
} from "lucide-react"
import { cn } from "@/lib/utils"

interface TwoFactorAuthProps {
  userEmail?: string
  onComplete?: (method: string, code: string) => void
  onBack?: () => void
  className?: string
}

type TFAStep = 'method-selection' | 'code-verification' | 'backup-codes' | 'success'
type TFAMethod = 'sms' | 'email' | 'authenticator' | 'backup'

export function TwoFactorAuth({ userEmail = "user@clinic.com", onComplete, onBack, className }: TwoFactorAuthProps) {
  const [currentStep, setCurrentStep] = useState<TFAStep>('method-selection')
  const [selectedMethod, setSelectedMethod] = useState<TFAMethod>('sms')
  const [verificationCode, setVerificationCode] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [countdown, setCountdown] = useState(0)
  const [attempts, setAttempts] = useState(0)

  const handleMethodSelect = async (method: TFAMethod) => {
    setSelectedMethod(method)
    setIsLoading(true)
    
    // Simulate sending verification code
    setTimeout(() => {
      setIsLoading(false)
      setCurrentStep('code-verification')
      if (method === 'sms' || method === 'email') {
        setCountdown(120) // 2 minutes countdown
        const timer = setInterval(() => {
          setCountdown(prev => {
            if (prev <= 1) {
              clearInterval(timer)
              return 0
            }
            return prev - 1
          })
        }, 1000)
      }
    }, 1500)
  }

  const handleCodeVerification = async () => {
    if (verificationCode.length < 6) return

    setIsLoading(true)
    setAttempts(prev => prev + 1)

    // Simulate verification
    setTimeout(() => {
      setIsLoading(false)
      if (verificationCode === "123456" || attempts >= 2) {
        setCurrentStep('success')
        onComplete?.(selectedMethod, verificationCode)
      } else {
        // Invalid code simulation
        setVerificationCode("")
      }
    }, 1000)
  }

  const handleResendCode = () => {
    setCountdown(120)
    setVerificationCode("")
    // Simulate resend logic here
  }

  const getMethodIcon = (method: TFAMethod) => {
    switch (method) {
      case 'sms': return <MessageSquare className="h-5 w-5" />
      case 'email': return <Mail className="h-5 w-5" />
      case 'authenticator': return <Smartphone className="h-5 w-5" />
      case 'backup': return <Key className="h-5 w-5" />
    }
  }

  const getMethodTitle = (method: TFAMethod) => {
    switch (method) {
      case 'sms': return 'رسالة نصية (SMS)'
      case 'email': return 'البريد الإلكتروني'
      case 'authenticator': return 'تطبيق المصادقة'
      case 'backup': return 'رموز الاحتياط'
    }
  }

  const getMethodDescription = (method: TFAMethod) => {
    switch (method) {
      case 'sms': return 'سيتم إرسال رمز التحقق إلى هاتفك'
      case 'email': return `سيتم إرسال رمز التحقق إلى ${userEmail}`
      case 'authenticator': return 'استخدم تطبيق المصادقة مثل Google Authenticator'
      case 'backup': return 'استخدم أحد رموز الاحتياط المحفوظة'
    }
  }

  const formatCountdown = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  return (
    <Card className={cn("w-full max-w-md mx-auto shadow-medical border-0 bg-white", className)}>
      {/* Header */}
      <div className="bg-gradient-to-br from-blue-500 to-blue-600 px-6 py-8 text-center text-white">
        <div className="flex flex-col items-center space-y-3">
          <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
            <Shield className="h-6 w-6" />
          </div>
          <div>
            <h1 className="text-xl font-bold">التحقق الثنائي</h1>
            <p className="text-blue-100 text-sm mt-1">حماية إضافية لحسابك</p>
          </div>
        </div>
      </div>

      <CardContent className="p-6">
        {/* Method Selection Step */}
        {currentStep === 'method-selection' && (
          <div className="space-y-6">
            <div className="text-center space-y-2">
              <h2 className="text-lg font-semibold text-gray-800">اختر طريقة التحقق</h2>
              <p className="text-sm text-gray-600">
                يرجى اختيار الطريقة المفضلة لاستلام رمز التحقق
              </p>
            </div>

            <RadioGroup value={selectedMethod} onValueChange={(value) => setSelectedMethod(value as TFAMethod)}>
              <div className="space-y-3">
                {(['sms', 'email', 'authenticator', 'backup'] as TFAMethod[]).map((method) => (
                  <div 
                    key={method}
                    className="flex items-center space-x-3 space-x-reverse p-4 border rounded-lg hover:bg-gray-50 cursor-pointer"
                    onClick={() => setSelectedMethod(method)}
                  >
                    <RadioGroupItem value={method} id={method} />
                    <div className="flex-1 flex items-center justify-between">
                      <div className="flex-1 text-right">
                        <Label htmlFor={method} className="font-medium text-gray-800 cursor-pointer">
                          {getMethodTitle(method)}
                        </Label>
                        <p className="text-sm text-gray-600 mt-1">
                          {getMethodDescription(method)}
                        </p>
                      </div>
                      <div className="p-2 bg-blue-100 rounded-lg text-blue-600">
                        {getMethodIcon(method)}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </RadioGroup>

            <div className="flex space-x-3 space-x-reverse">
              <Button
                variant="outline"
                onClick={onBack}
                className="flex-1"
                disabled={isLoading}
              >
                رجوع
                <ArrowLeft className="h-4 w-4 mr-2" />
              </Button>
              <Button
                onClick={() => handleMethodSelect(selectedMethod)}
                className="flex-1 bg-gradient-to-r from-blue-500 to-blue-600"
                disabled={isLoading}
              >
                {isLoading ? (
                  <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent" />
                ) : (
                  <>
                    متابعة
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </>
                )}
              </Button>
            </div>
          </div>
        )}

        {/* Code Verification Step */}
        {currentStep === 'code-verification' && (
          <div className="space-y-6">
            <div className="text-center space-y-2">
              <div className="flex items-center justify-center space-x-2 space-x-reverse">
                <div className="p-2 bg-blue-100 rounded-lg text-blue-600">
                  {getMethodIcon(selectedMethod)}
                </div>
                <Badge variant="secondary" className="text-xs">
                  {getMethodTitle(selectedMethod)}
                </Badge>
              </div>
              <h2 className="text-lg font-semibold text-gray-800">أدخل رمز التحقق</h2>
              <p className="text-sm text-gray-600">
                {selectedMethod === 'sms' ? 'تم إرسال رمز التحقق إلى هاتفك' :
                 selectedMethod === 'email' ? `تم إرسال رمز التحقق إلى ${userEmail}` :
                 selectedMethod === 'authenticator' ? 'أدخل الرمز من تطبيق المصادقة' :
                 'أدخل أحد رموز الاحتياط المحفوظة'}
              </p>
            </div>

            {/* OTP Input */}
            <div className="flex justify-center">
              <InputOTP
                maxLength={6}
                value={verificationCode}
                onChange={setVerificationCode}
                onComplete={handleCodeVerification}
              >
                <InputOTPGroup>
                  <InputOTPSlot index={0} className="w-12 h-12 text-lg" />
                  <InputOTPSlot index={1} className="w-12 h-12 text-lg" />
                  <InputOTPSlot index={2} className="w-12 h-12 text-lg" />
                  <InputOTPSlot index={3} className="w-12 h-12 text-lg" />
                  <InputOTPSlot index={4} className="w-12 h-12 text-lg" />
                  <InputOTPSlot index={5} className="w-12 h-12 text-lg" />
                </InputOTPGroup>
              </InputOTP>
            </div>

            {/* Countdown and Resend */}
            {(selectedMethod === 'sms' || selectedMethod === 'email') && (
              <div className="text-center">
                {countdown > 0 ? (
                  <div className="flex items-center justify-center space-x-2 space-x-reverse text-sm text-gray-600">
                    <Clock className="h-4 w-4" />
                    <span>إعادة الإرسال متاحة خلال {formatCountdown(countdown)}</span>
                  </div>
                ) : (
                  <Button
                    variant="ghost"
                    onClick={handleResendCode}
                    className="text-blue-600 hover:text-blue-700"
                  >
                    إعادة إرسال الرمز
                  </Button>
                )}
              </div>
            )}

            {/* Error handling */}
            {attempts > 0 && verificationCode === "" && (
              <div className="flex items-center space-x-2 space-x-reverse text-sm text-red-600 bg-red-50 p-3 rounded-lg">
                <AlertCircle className="h-4 w-4" />
                <span>رمز التحقق غير صحيح. المحاولات المتبقية: {3 - attempts}</span>
              </div>
            )}

            <div className="flex space-x-3 space-x-reverse">
              <Button
                variant="outline"
                onClick={() => setCurrentStep('method-selection')}
                className="flex-1"
                disabled={isLoading}
              >
                تغيير الطريقة
                <ArrowLeft className="h-4 w-4 mr-2" />
              </Button>
              <Button
                onClick={handleCodeVerification}
                className="flex-1 bg-gradient-to-r from-blue-500 to-blue-600"
                disabled={isLoading || verificationCode.length < 6}
              >
                {isLoading ? (
                  <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent" />
                ) : (
                  'تحقق'
                )}
              </Button>
            </div>

            {/* Alternative methods */}
            <div className="border-t pt-4">
              <p className="text-center text-sm text-gray-600 mb-3">طرق بديلة للتحقق</p>
              <div className="flex justify-center space-x-4 space-x-reverse">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleMethodSelect('backup')}
                    className="text-gray-600"
                  >
                    رموز الاحتياط
                    <Key className="h-4 w-4 mr-1" />
                  </Button>
                {selectedMethod !== 'authenticator' && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleMethodSelect('authenticator')}
                      className="text-gray-600"
                    >
                      تطبيق المصادقة
                      <QrCode className="h-4 w-4 mr-1" />
                    </Button>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Success Step */}
        {currentStep === 'success' && (
          <div className="space-y-6 text-center">
            <div className="flex flex-col items-center space-y-4">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
                <CheckCircle className="h-8 w-8 text-green-600" />
              </div>
              <div>
                <h2 className="text-lg font-semibold text-gray-800">تم التحقق بنجاح!</h2>
                <p className="text-sm text-gray-600 mt-2">
                  تم تأكيد هويتك. سيتم تسجيل دخولك الآن...
                </p>
              </div>
            </div>

            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <div className="flex items-center space-x-2 space-x-reverse text-sm text-green-800">
                <Fingerprint className="h-4 w-4" />
                <span>تم تسجيل جلسة آمنة في {new Date().toLocaleString('ar-EG')}</span>
              </div>
            </div>

            <Button
              className="w-full bg-gradient-to-r from-green-500 to-green-600"
              onClick={() => onComplete?.(selectedMethod, verificationCode)}
            >
              الدخول إلى النظام
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  )
}