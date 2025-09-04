import { useState } from 'react'
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar'
import { AppSidebar } from '@/components/AppSidebar'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { 
  Building2, 
  Upload, 
  Plus, 
  Trash2, 
  Edit, 
  RotateCcw, 
  Save,
  Phone,
  MapPin,
  FileImage,
  Settings,
  Shield,
  MessageSquare,
  CreditCard
} from 'lucide-react'
import { useToast } from '@/hooks/use-toast'

interface ClinicInfo {
  name: string
  address: string
  phone: string
  appointmentNumber: string
  logo: File | null
  headerImage: File | null
}

export default function ClinicSettings() {
  const { toast } = useToast()
  const [clinicInfo, setClinicInfo] = useState<ClinicInfo>({
    name: 'عيادة الدكتور أحمد حكيم',
    address: 'شارع الملك عبدالعزيز، الرياض، المملكة العربية السعودية',
    phone: '+966501234567',
    appointmentNumber: '19999',
    logo: null,
    headerImage: null
  })

  const [isEditing, setIsEditing] = useState(false)

  const handleInputChange = (field: keyof ClinicInfo, value: string) => {
    setClinicInfo(prev => ({ ...prev, [field]: value }))
  }

  const handleFileUpload = (field: 'logo' | 'headerImage', file: File | null) => {
    setClinicInfo(prev => ({ ...prev, [field]: file }))
    if (file) {
      toast({
        title: "تم رفع الملف بنجاح",
        description: `تم رفع ${field === 'logo' ? 'شعار العيادة' : 'ترويسة ملف الطباعة'} بنجاح`,
      })
    }
  }

  const handleSave = () => {
    setIsEditing(false)
    toast({
      title: "تم حفظ البيانات",
      description: "تم حفظ معلومات العيادة بنجاح",
    })
  }

  const handleReset = () => {
    setClinicInfo({
      name: '',
      address: '',
      phone: '',
      appointmentNumber: '',
      logo: null,
      headerImage: null
    })
    toast({
      title: "تم مسح البيانات",
      description: "تم مسح جميع البيانات من النموذج",
    })
  }

  const handleAdd = () => {
    setIsEditing(true)
    setClinicInfo({
      name: '',
      address: '',
      phone: '',
      appointmentNumber: '',
      logo: null,
      headerImage: null
    })
  }

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full bg-gradient-subtle">
        <AppSidebar />
        
        <div className="flex-1">
          {/* Header */}
          <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="container flex h-14 max-w-screen-2xl items-center">
              <div className="flex items-center gap-4">
                <SidebarTrigger />
                <Separator orientation="vertical" className="h-4" />
                <div className="flex items-center gap-2">
                  <Settings className="h-5 w-5 text-primary" />
                  <h1 className="text-lg font-semibold">إعدادات العيادة</h1>
                </div>
              </div>
              
              <div className="flex flex-1 items-center justify-end space-x-2">
                <Badge variant="secondary" className="gap-2">
                  <Building2 className="h-3 w-3" />
                  عيادة الدكتور أحمد حكيم
                </Badge>
              </div>
            </div>
          </header>

          {/* Main Content */}
          <main className="container mx-auto p-6 space-y-6">
            <div className="grid gap-6">
              {/* Page Title & Description */}
              <div className="space-y-2">
                <h2 className="text-2xl font-bold tracking-tight text-foreground">إعدادات العيادة</h2>
                <p className="text-muted-foreground">
                  إدارة وتخصيص معلومات العيادة والإعدادات الأساسية
                </p>
              </div>

              {/* Settings Tabs */}
              <Tabs defaultValue="clinic-info" className="w-full">
                <TabsList className="grid w-full grid-cols-4 bg-muted">
                  <TabsTrigger value="clinic-info" className="gap-2">
                    <Building2 className="h-4 w-4" />
                    معلومات العيادة
                  </TabsTrigger>
                  <TabsTrigger value="discounts" className="gap-2">
                    <CreditCard className="h-4 w-4" />
                    إدارة التخفيضات
                  </TabsTrigger>
                  <TabsTrigger value="privacy" className="gap-2">
                    <Shield className="h-4 w-4" />
                    إدارة الخصوصية
                  </TabsTrigger>
                  <TabsTrigger value="sms" className="gap-2">
                    <MessageSquare className="h-4 w-4" />
                    الرسائل القصيرة
                  </TabsTrigger>
                </TabsList>

                {/* Clinic Information Tab */}
                <TabsContent value="clinic-info" className="mt-6">
                  <div className="grid gap-6 lg:grid-cols-4">
                    {/* Action Buttons */}
                    <Card className="lg:col-span-1">
                      <CardHeader>
                        <CardTitle className="text-lg">الإجراءات</CardTitle>
                        <CardDescription>
                          إجراءات إدارة معلومات العيادة
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-3">
                        <Button 
                          onClick={handleAdd}
                          className="w-full justify-start gap-2"
                          variant="default"
                        >
                          <Plus className="h-4 w-4" />
                          إضافة
                        </Button>
                        
                        <Button 
                          onClick={() => setIsEditing(!isEditing)}
                          className="w-full justify-start gap-2"
                          variant="outline"
                        >
                          <Edit className="h-4 w-4" />
                          تعديل
                        </Button>
                        
                        <Button 
                          onClick={handleReset}
                          className="w-full justify-start gap-2"
                          variant="outline"
                        >
                          <RotateCcw className="h-4 w-4" />
                          مسح
                        </Button>
                        
                        <Button 
                          onClick={handleReset}
                          className="w-full justify-start gap-2"
                          variant="destructive"
                        >
                          <Trash2 className="h-4 w-4" />
                          حذف
                        </Button>

                        {isEditing && (
                          <Button 
                            onClick={handleSave}
                            className="w-full justify-start gap-2 mt-4"
                            variant="default"
                          >
                            <Save className="h-4 w-4" />
                            حفظ التغييرات
                          </Button>
                        )}
                      </CardContent>
                    </Card>

                    {/* Clinic Information Form */}
                    <Card className="lg:col-span-3">
                      <CardHeader>
                        <CardTitle className="text-xl flex items-center gap-2">
                          <Building2 className="h-5 w-5 text-primary" />
                          معلومات العيادة
                        </CardTitle>
                        <CardDescription>
                          قم بتحديث المعلومات الأساسية للعيادة
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-6">
                        {/* Basic Information */}
                        <div className="grid gap-6 md:grid-cols-2">
                          <div className="space-y-2">
                            <Label htmlFor="clinic-name" className="text-sm font-medium">
                              اسم العيادة
                            </Label>
                            <Input
                              id="clinic-name"
                              value={clinicInfo.name}
                              onChange={(e) => handleInputChange('name', e.target.value)}
                              disabled={!isEditing}
                              className="bg-input"
                              placeholder="أدخل اسم العيادة"
                            />
                          </div>

                          <div className="space-y-2">
                            <Label htmlFor="phone" className="text-sm font-medium flex items-center gap-2">
                              <Phone className="h-4 w-4" />
                              رقم الجوال
                            </Label>
                            <Input
                              id="phone"
                              value={clinicInfo.phone}
                              onChange={(e) => handleInputChange('phone', e.target.value)}
                              disabled={!isEditing}
                              className="bg-input"
                              placeholder="+966501234567"
                              dir="ltr"
                            />
                          </div>
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="address" className="text-sm font-medium flex items-center gap-2">
                            <MapPin className="h-4 w-4" />
                            عنوان العيادة
                          </Label>
                          <Textarea
                            id="address"
                            value={clinicInfo.address}
                            onChange={(e) => handleInputChange('address', e.target.value)}
                            disabled={!isEditing}
                            className="bg-input min-h-[80px]"
                            placeholder="أدخل العنوان الكامل للعيادة"
                          />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="appointment-number" className="text-sm font-medium">
                            رقم أبوعاد العيادة
                          </Label>
                          <Input
                            id="appointment-number"
                            value={clinicInfo.appointmentNumber}
                            onChange={(e) => handleInputChange('appointmentNumber', e.target.value)}
                            disabled={!isEditing}
                            className="bg-input"
                            placeholder="19999"
                          />
                        </div>

                        <Separator />

                        {/* File Uploads */}
                        <div className="space-y-6">
                          <h3 className="text-lg font-medium">ملفات العيادة</h3>
                          
                          <div className="grid gap-6 md:grid-cols-2">
                            {/* Logo Upload */}
                            <div className="space-y-4">
                              <Label className="text-sm font-medium flex items-center gap-2">
                                <FileImage className="h-4 w-4" />
                                رقع ترويسة ملف الطباعة
                              </Label>
                              <div className="border-2 border-dashed border-border rounded-lg p-6 text-center bg-muted/20">
                                {clinicInfo.headerImage ? (
                                  <div className="space-y-2">
                                    <FileImage className="h-8 w-8 mx-auto text-primary" />
                                    <p className="text-sm font-medium">{clinicInfo.headerImage.name}</p>
                                    <p className="text-xs text-muted-foreground">
                                      {Math.round(clinicInfo.headerImage.size / 1024)} كيلوبايت
                                    </p>
                                  </div>
                                ) : (
                                  <div className="space-y-2">
                                    <Upload className="h-8 w-8 mx-auto text-muted-foreground" />
                                    <p className="text-sm text-muted-foreground">
                                      اسحب الملف هنا أو انقر للاختيار
                                    </p>
                                  </div>
                                )}
                                
                                <Button
                                  variant="outline"
                                  className="mt-3"
                                  disabled={!isEditing}
                                  onClick={() => {
                                    const input = document.createElement('input')
                                    input.type = 'file'
                                    input.accept = 'image/*'
                                    input.onchange = (e) => {
                                      const file = (e.target as HTMLInputElement).files?.[0]
                                      if (file) handleFileUpload('headerImage', file)
                                    }
                                    input.click()
                                  }}
                                >
                                  <Upload className="h-4 w-4 ml-2" />
                                  تحميل
                                </Button>
                              </div>
                            </div>

                            {/* Header Image Upload */}
                            <div className="space-y-4">
                              <Label className="text-sm font-medium flex items-center gap-2">
                                <FileImage className="h-4 w-4" />
                                شعار العيادة
                              </Label>
                              <div className="border-2 border-dashed border-border rounded-lg p-6 text-center bg-muted/20">
                                {clinicInfo.logo ? (
                                  <div className="space-y-2">
                                    <FileImage className="h-8 w-8 mx-auto text-primary" />
                                    <p className="text-sm font-medium">{clinicInfo.logo.name}</p>
                                    <p className="text-xs text-muted-foreground">
                                      {Math.round(clinicInfo.logo.size / 1024)} كيلوبايت
                                    </p>
                                  </div>
                                ) : (
                                  <div className="space-y-2">
                                    <Upload className="h-8 w-8 mx-auto text-muted-foreground" />
                                    <p className="text-sm text-muted-foreground">
                                      اسحب الملف هنا أو انقر للاختيار
                                    </p>
                                  </div>
                                )}
                                
                                <Button
                                  variant="outline"
                                  className="mt-3"
                                  disabled={!isEditing}
                                  onClick={() => {
                                    const input = document.createElement('input')
                                    input.type = 'file'
                                    input.accept = 'image/*'
                                    input.onchange = (e) => {
                                      const file = (e.target as HTMLInputElement).files?.[0]
                                      if (file) handleFileUpload('logo', file)
                                    }
                                    input.click()
                                  }}
                                >
                                  <Upload className="h-4 w-4 ml-2" />
                                  تحميل
                                </Button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </TabsContent>

                {/* Other Tabs - Placeholder Content */}
                <TabsContent value="discounts">
                  <Card>
                    <CardHeader>
                      <CardTitle>إدارة التخفيضات</CardTitle>
                      <CardDescription>
                        إدارة عروض وتخفيضات العيادة
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground">هذا القسم قيد التطوير...</p>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="privacy">
                  <Card>
                    <CardHeader>
                      <CardTitle>إدارة الخصوصية</CardTitle>
                      <CardDescription>
                        إعدادات خصوصية وأمان البيانات
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground">هذا القسم قيد التطوير...</p>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="sms">
                  <Card>
                    <CardHeader>
                      <CardTitle>الرسائل القصيرة</CardTitle>
                      <CardDescription>
                        إعدادات الرسائل النصية والإشعارات
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground">هذا القسم قيد التطوير...</p>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>
          </main>
        </div>
      </div>
    </SidebarProvider>
  )
}
