import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { AlertCircle, CheckCircle, Copy, Download, QrCode, Smartphone, MessageSquare, Mail, Key, Shield } from "lucide-react"
import { cn } from "@/lib/utils"

interface TwoFactorSetupProps {
  onComplete?: () => void
  onSkip?: () => void
  className?: string
}

export function TwoFactorSetup({ onComplete, onSkip, className }: TwoFactorSetupProps) {
  const [activeTab, setActiveTab] = useState("authenticator")
  const [phoneNumber, setPhoneNumber] = useState("")
  const [email, setEmail] = useState("")
  const [backupCodes] = useState([
    "8A3B-7C9D-2E4F",
    "1F5G-3H8I-9J2K", 
    "7L6M-4N1O-5P8Q",
    "2R9S-6T3U-8V5W",
    "4X7Y-1Z0A-3B6C",
    "9D8E-5F2G-7H4I",
    "3J6K-8L1M-2N5O",
    "6P9Q-4R7S-1T8U"
  ])
  const [copiedCodes, setCopiedCodes] = useState(false)
  const [setupComplete, setSetupComplete] = useState<string | null>(null)

  const handleCopyBackupCodes = () => {
    const codesText = backupCodes.join('\n')
    navigator.clipboard.writeText(codesText)
    setCopiedCodes(true)
    setTimeout(() => setCopiedCodes(false), 2000)
  }

  const handleDownloadBackupCodes = () => {
    const codesText = `رموز الاحتياط - HakimClinic
تاريخ الإنشاء: ${new Date().toLocaleDateString('ar-EG')}

${backupCodes.join('\n')}

ملاحظة مهمة:
- احتفظ بهذه الرموز في مكان آمن
- كل رمز يمكن استخدامه مرة واحدة فقط
- استخدم هذه الرموز في حالة عدم توفر طرق التحقق الأخرى`

    const blob = new Blob([codesText], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `hakim-clinic-backup-codes-${Date.now()}.txt`
    a.click()
    URL.revokeObjectURL(url)
  }

  const handleMethodComplete = (method: string) => {
    setSetupComplete(method)
    setTimeout(() => {
      onComplete?.()
    }, 2000)
  }

  return (
    <Card className={cn("w-full max-w-2xl mx-auto shadow-medical border-0 bg-white", className)}>
      {/* Header */}
      <div className="bg-gradient-to-br from-blue-500 to-blue-600 px-6 py-8 text-center text-white">
        <div className="flex flex-col items-center space-y-3">
          <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
            <Shield className="h-6 w-6" />
          </div>
          <div>
            <h1 className="text-xl font-bold">إعداد التحقق الثنائي</h1>
            <p className="text-blue-100 text-sm mt-1">قم بتأمين حسابك بخطوة إضافية</p>
          </div>
        </div>
      </div>

      <CardContent className="p-6">
        {setupComplete ? (
          // Success Screen
          <div className="text-center space-y-6">
            <div className="flex flex-col items-center space-y-4">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
                <CheckCircle className="h-8 w-8 text-green-600" />
              </div>
              <div>
                <h2 className="text-lg font-semibold text-gray-800">تم الإعداد بنجاح!</h2>
                <p className="text-sm text-gray-600 mt-2">
                  {setupComplete === 'authenticator' && 'تم ربط تطبيق المصادقة بحسابك'}
                  {setupComplete === 'sms' && 'تم تفعيل التحقق عبر الرسائل النصية'}
                  {setupComplete === 'email' && 'تم تفعيل التحقق عبر البريد الإلكتروني'}
                </p>
              </div>
            </div>

            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <div className="text-sm text-green-800">
                <p className="font-medium mb-2">نصائح مهمة للأمان:</p>
                <ul className="text-right space-y-1 text-xs">
                  <li>• احتفظ برموز الاحتياط في مكان آمن</li>
                  <li>• لا تشارك رموز التحقق مع أحد</li>
                  <li>• تأكد من تحديث معلومات الاتصال عند تغييرها</li>
                </ul>
              </div>
            </div>

            <Button 
              className="w-full bg-gradient-to-r from-green-500 to-green-600"
              onClick={onComplete}
            >
              إكمال الإعداد
            </Button>
          </div>
        ) : (
          // Setup Tabs
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="authenticator" className="text-xs">
                <Smartphone className="h-4 w-4 ml-1" />
                التطبيق
              </TabsTrigger>
              <TabsTrigger value="sms" className="text-xs">
                <MessageSquare className="h-4 w-4 ml-1" />
                SMS
              </TabsTrigger>
              <TabsTrigger value="email" className="text-xs">
                <Mail className="h-4 w-4 ml-1" />
                الإيميل
              </TabsTrigger>
              <TabsTrigger value="backup" className="text-xs">
                <Key className="h-4 w-4 ml-1" />
                الاحتياط
              </TabsTrigger>
            </TabsList>

            {/* Authenticator App Setup */}
            <TabsContent value="authenticator" className="space-y-6">
              <div className="text-center space-y-4">
                <div className="p-2 bg-blue-100 rounded-lg w-fit mx-auto">
                  <QrCode className="h-8 w-8 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800">تطبيق المصادقة</h3>
                  <p className="text-sm text-gray-600 mt-1">
                    استخدم Google Authenticator أو أي تطبيق مصادقة متوافق
                  </p>
                </div>
              </div>

              <div className="space-y-4">
                <div className="text-center">
                  <div className="w-48 h-48 mx-auto bg-gray-100 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center">
                    <div className="text-center space-y-2">
                      <QrCode className="h-12 w-12 text-gray-400 mx-auto" />
                      <p className="text-sm text-gray-500">QR Code</p>
                      <p className="text-xs text-gray-400">اسكن هذا الرمز</p>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-sm font-medium text-gray-700 mb-2">أو أدخل المفتاح يدوياً:</p>
                  <div className="flex items-center space-x-2 space-x-reverse">
                    <Input 
                      value="JBSWY3DPEHPK3PXP" 
                      readOnly 
                      className="font-mono text-sm"
                    />
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => navigator.clipboard.writeText("JBSWY3DPEHPK3PXP")}
                    >
                      <Copy className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                <div className="space-y-3">
                  <Label className="text-sm font-medium">أدخل الرمز من التطبيق للتأكيد:</Label>
                  <Input 
                    placeholder="أدخل الرمز المكون من 6 أرقام"
                    className="text-center font-mono text-lg"
                    maxLength={6}
                  />
                </div>

                <Button 
                  className="w-full bg-gradient-to-r from-blue-500 to-blue-600"
                  onClick={() => handleMethodComplete('authenticator')}
                >
                  تأكيد وتفعيل التطبيق
                </Button>
              </div>
            </TabsContent>

            {/* SMS Setup */}
            <TabsContent value="sms" className="space-y-6">
              <div className="text-center space-y-4">
                <div className="p-2 bg-green-100 rounded-lg w-fit mx-auto">
                  <MessageSquare className="h-8 w-8 text-green-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800">الرسائل النصية</h3>
                  <p className="text-sm text-gray-600 mt-1">
                    سيتم إرسال رمز التحقق إلى هاتفك المحمول
                  </p>
                </div>
              </div>

              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="phone" className="text-sm font-medium">رقم الهاتف المحمول</Label>
                  <div className="flex space-x-2 space-x-reverse">
                    <Input
                      id="phone"
                      type="tel"
                      placeholder="05xxxxxxxx"
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value)}
                      className="flex-1 text-right"
                    />
                    <div className="flex items-center px-3 bg-gray-100 border rounded-md">
                      <span className="text-sm text-gray-600">+966</span>
                    </div>
                  </div>
                </div>

                <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
                  <div className="flex items-start space-x-2 space-x-reverse">
                    <AlertCircle className="h-5 w-5 text-amber-600 mt-0.5" />
                    <div className="text-sm text-amber-800">
                      <p className="font-medium">تنبيه مهم:</p>
                      <p className="mt-1">قد تُطبق رسوم الرسائل النصية حسب مزود الخدمة</p>
                    </div>
                  </div>
                </div>

                <Button 
                  className="w-full bg-gradient-to-r from-green-500 to-green-600"
                  onClick={() => handleMethodComplete('sms')}
                  disabled={!phoneNumber}
                >
                  إرسال رمز التحقق
                </Button>
              </div>
            </TabsContent>

            {/* Email Setup */}
            <TabsContent value="email" className="space-y-6">
              <div className="text-center space-y-4">
                <div className="p-2 bg-purple-100 rounded-lg w-fit mx-auto">
                  <Mail className="h-8 w-8 text-purple-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800">البريد الإلكتروني</h3>
                  <p className="text-sm text-gray-600 mt-1">
                    سيتم إرسال رمز التحقق إلى بريدك الإلكتروني
                  </p>
                </div>
              </div>

              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-sm font-medium">البريد الإلكتروني</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="doctor@clinic.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="text-right"
                  />
                </div>

                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <div className="flex items-start space-x-2 space-x-reverse">
                    <AlertCircle className="h-5 w-5 text-blue-600 mt-0.5" />
                    <div className="text-sm text-blue-800">
                      <p className="font-medium">نصيحة:</p>
                      <p className="mt-1">تأكد من وصولك لهذا البريد بانتظام لضمان الأمان</p>
                    </div>
                  </div>
                </div>

                <Button 
                  className="w-full bg-gradient-to-r from-purple-500 to-purple-600"
                  onClick={() => handleMethodComplete('email')}
                  disabled={!email}
                >
                  إرسال رمز التحقق
                </Button>
              </div>
            </TabsContent>

            {/* Backup Codes */}
            <TabsContent value="backup" className="space-y-6">
              <div className="text-center space-y-4">
                <div className="p-2 bg-red-100 rounded-lg w-fit mx-auto">
                  <Key className="h-8 w-8 text-red-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800">رموز الاحتياط</h3>
                  <p className="text-sm text-gray-600 mt-1">
                    استخدم هذه الرموز عند عدم توفر طرق التحقق الأخرى
                  </p>
                </div>
              </div>

              <div className="space-y-4">
                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="grid grid-cols-2 gap-2 text-center">
                    {backupCodes.map((code, index) => (
                      <div key={index} className="font-mono text-sm bg-white border rounded px-3 py-2">
                        {code}
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex space-x-2 space-x-reverse">
                  <Button
                    variant="outline"
                    onClick={handleCopyBackupCodes}
                    className="flex-1"
                  >
                    <Copy className="h-4 w-4 ml-1" />
                    {copiedCodes ? 'تم النسخ!' : 'نسخ الرموز'}
                  </Button>
                  <Button
                    variant="outline"
                    onClick={handleDownloadBackupCodes}
                    className="flex-1"
                  >
                    <Download className="h-4 w-4 ml-1" />
                    تحميل
                  </Button>
                </div>

                <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                  <div className="flex items-start space-x-2 space-x-reverse">
                    <AlertCircle className="h-5 w-5 text-red-600 mt-0.5" />
                    <div className="text-sm text-red-800">
                      <p className="font-medium">تحذير مهم:</p>
                      <ul className="mt-1 space-y-1 text-xs">
                        <li>• كل رمز يُستخدم مرة واحدة فقط</li>
                        <li>• احتفظ بالرموز في مكان آمن</li>
                        <li>• لا تشاركها مع أحد</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <Button 
                  className="w-full bg-gradient-to-r from-red-500 to-red-600"
                  onClick={() => handleMethodComplete('backup')}
                >
                  تأكيد حفظ الرموز
                </Button>
              </div>
            </TabsContent>
          </Tabs>
        )}

        {/* Skip Option */}
        {!setupComplete && (
          <div className="mt-6 pt-6 border-t">
            <div className="text-center">
              <Button 
                variant="ghost" 
                onClick={onSkip}
                className="text-gray-500 hover:text-gray-700"
              >
                تخطي هذه الخطوة (غير مستحسن)
              </Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}