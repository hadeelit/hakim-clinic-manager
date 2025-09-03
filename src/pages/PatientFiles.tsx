import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Calendar } from '@/components/ui/calendar'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Badge } from '@/components/ui/badge'
import { 
  CalendarIcon, 
  Search, 
  Plus, 
  Edit, 
  Trash2, 
  FileSpreadsheet, 
  Printer, 
  Download,
  RefreshCw,
  SearchCheck,
  Eye,
  Phone,
  Mail,
  MapPin,
  User
} from 'lucide-react'
import { format } from 'date-fns'
import { ar } from 'date-fns/locale'
import { cn } from '@/lib/utils'
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar'
import { AppSidebar } from '@/components/AppSidebar'

interface Patient {
  id: string
  fileNumber: string
  name: string
  nationalId: string
  phone: string
  age: number
  gender: 'male' | 'female'
  maritalStatus: 'married' | 'single'
  address: string
  job: string
  workAddress: string
  email: string
  contactPersonName: string
  contactPersonPhone: string
  registrationDate: string
  status: 'active' | 'inactive'
}

const mockPatients: Patient[] = [
  {
    id: '1',
    fileNumber: '001',
    name: 'أحمد محمد علي',
    nationalId: '1234567890',
    phone: '0501234567',
    age: 35,
    gender: 'male',
    maritalStatus: 'married',
    address: 'الرياض - حي النخيل',
    job: 'مهندس',
    workAddress: 'شركة البناء المتطور',
    email: 'ahmed@example.com',
    contactPersonName: 'فاطمة أحمد',
    contactPersonPhone: '0507654321',
    registrationDate: '2024-01-15',
    status: 'active'
  },
  {
    id: '2',
    fileNumber: '002',
    name: 'سارة عبدالله',
    nationalId: '0987654321',
    phone: '0509876543',
    age: 28,
    gender: 'female',
    maritalStatus: 'single',
    address: 'جدة - حي الصفا',
    job: 'طبيبة',
    workAddress: 'مستشفى الملك فهد',
    email: 'sara@example.com',
    contactPersonName: 'عبدالله سارة',
    contactPersonPhone: '0501122334',
    registrationDate: '2024-02-20',
    status: 'active'
  },
  {
    id: '3',
    fileNumber: '003',
    name: 'محمد خالد',
    nationalId: '1122334455',
    phone: '0551122334',
    age: 42,
    gender: 'male',
    maritalStatus: 'married',
    address: 'الدمام - حي الخليج',
    job: 'معلم',
    workAddress: 'مدرسة الأمل الابتدائية',
    email: 'mohammed@example.com',
    contactPersonName: 'خديجة محمد',
    contactPersonPhone: '0554433221',
    registrationDate: '2024-03-10',
    status: 'inactive'
  }
]

export default function PatientFiles() {
  const [selectedDate, setSelectedDate] = useState<Date>()
  const [formData, setFormData] = useState({
    fileNumber: '',
    name: '',
    nationalId: '',
    phone: '',
    age: '',
    gender: '',
    maritalStatus: '',
    address: '',
    job: '',
    workAddress: '',
    email: '',
    contactPersonName: '',
    contactPersonPhone: ''
  })
  const [searchTerm, setSearchTerm] = useState('')
  const [patients] = useState<Patient[]>(mockPatients)

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const filteredPatients = patients.filter(patient =>
    patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    patient.fileNumber.includes(searchTerm) ||
    patient.phone.includes(searchTerm) ||
    patient.nationalId.includes(searchTerm)
  )

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Form submitted:', formData)
  }

  const clearForm = () => {
    setFormData({
      fileNumber: '',
      name: '',
      nationalId: '',
      phone: '',
      age: '',
      gender: '',
      maritalStatus: '',
      address: '',
      job: '',
      workAddress: '',
      email: '',
      contactPersonName: '',
      contactPersonPhone: ''
    })
    setSelectedDate(undefined)
  }

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-background">
        <AppSidebar />
        <main className="flex-1 p-6">
          <div className="max-w-7xl mx-auto space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <SidebarTrigger />
                <div>
                  <h1 className="text-3xl font-bold text-primary">إدارة ملف المريض</h1>
                  <p className="text-muted-foreground">إدارة شاملة لملفات المرضى وبياناتهم</p>
                </div>
              </div>
              <Badge variant="secondary" className="text-sm">
                {filteredPatients.length} مريض
              </Badge>
            </div>

            {/* Patient Form */}
            <Card className="shadow-lg">
              <CardHeader className="bg-gradient-to-r from-primary/5 to-primary/10">
                <CardTitle className="text-xl flex items-center gap-2">
                  <User className="h-5 w-5" />
                  نموذج بيانات المريض
                </CardTitle>
                <CardDescription>
                  أدخل البيانات الأساسية للمريض بدقة
                </CardDescription>
              </CardHeader>
              <CardContent className="p-6">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Right Column */}
                    <div className="space-y-4">
                      <h3 className="font-semibold text-lg text-primary border-b pb-2">المعلومات الأساسية</h3>
                      
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="fileNumber">رقم الملف</Label>
                          <Input
                            id="fileNumber"
                            value={formData.fileNumber}
                            onChange={(e) => handleInputChange('fileNumber', e.target.value)}
                            placeholder="رقم الملف"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="date">التاريخ</Label>
                          <Popover>
                            <PopoverTrigger asChild>
                              <Button
                                variant="outline"
                                className={cn(
                                  "w-full justify-start text-left font-normal",
                                  !selectedDate && "text-muted-foreground"
                                )}
                              >
                                <CalendarIcon className="mr-2 h-4 w-4" />
                                {selectedDate ? format(selectedDate, "PPP", { locale: ar }) : "اختر التاريخ"}
                              </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-0" align="start">
                              <Calendar
                                mode="single"
                                selected={selectedDate}
                                onSelect={setSelectedDate}
                                initialFocus
                                className="pointer-events-auto"
                              />
                            </PopoverContent>
                          </Popover>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="name">اسم المريض</Label>
                        <Input
                          id="name"
                          value={formData.name}
                          onChange={(e) => handleInputChange('name', e.target.value)}
                          placeholder="الاسم كاملاً"
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="nationalId">رقم الهوية</Label>
                          <Input
                            id="nationalId"
                            value={formData.nationalId}
                            onChange={(e) => handleInputChange('nationalId', e.target.value)}
                            placeholder="رقم الهوية الوطنية"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="phone">رقم الجوال</Label>
                          <Input
                            id="phone"
                            value={formData.phone}
                            onChange={(e) => handleInputChange('phone', e.target.value)}
                            placeholder="05xxxxxxxx"
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="age">العمر</Label>
                        <Input
                          id="age"
                          type="number"
                          value={formData.age}
                          onChange={(e) => handleInputChange('age', e.target.value)}
                          placeholder="العمر بالسنوات"
                        />
                      </div>

                      <div className="space-y-3">
                        <Label>الوضع الاجتماعي</Label>
                        <RadioGroup 
                          value={formData.maritalStatus} 
                          onValueChange={(value) => handleInputChange('maritalStatus', value)}
                          className="flex gap-6"
                        >
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="married" id="married" />
                            <Label htmlFor="married">متزوج</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="single" id="single" />
                            <Label htmlFor="single">أعزب</Label>
                          </div>
                        </RadioGroup>
                      </div>

                      <div className="space-y-3">
                        <Label>الجنس</Label>
                        <RadioGroup 
                          value={formData.gender} 
                          onValueChange={(value) => handleInputChange('gender', value)}
                          className="flex gap-6"
                        >
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="male" id="male" />
                            <Label htmlFor="male">ذكر</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="female" id="female" />
                            <Label htmlFor="female">أنثى</Label>
                          </div>
                        </RadioGroup>
                      </div>
                    </div>

                    {/* Left Column */}
                    <div className="space-y-4">
                      <h3 className="font-semibold text-lg text-primary border-b pb-2">معلومات الاتصال</h3>
                      
                      <div className="space-y-2">
                        <Label htmlFor="address">العنوان</Label>
                        <Input
                          id="address"
                          value={formData.address}
                          onChange={(e) => handleInputChange('address', e.target.value)}
                          placeholder="العنوان التفصيلي"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="job">الوظيفة</Label>
                        <Input
                          id="job"
                          value={formData.job}
                          onChange={(e) => handleInputChange('job', e.target.value)}
                          placeholder="المهنة أو الوظيفة"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="workAddress">عنوان العمل</Label>
                        <Input
                          id="workAddress"
                          value={formData.workAddress}
                          onChange={(e) => handleInputChange('workAddress', e.target.value)}
                          placeholder="مكان العمل"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="email">الإيميل</Label>
                        <Input
                          id="email"
                          type="email"
                          value={formData.email}
                          onChange={(e) => handleInputChange('email', e.target.value)}
                          placeholder="البريد الإلكتروني"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="contactPersonName">اسم المحاور</Label>
                        <Input
                          id="contactPersonName"
                          value={formData.contactPersonName}
                          onChange={(e) => handleInputChange('contactPersonName', e.target.value)}
                          placeholder="اسم الشخص المسؤول"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="contactPersonPhone">رقم المحاور</Label>
                        <Input
                          id="contactPersonPhone"
                          value={formData.contactPersonPhone}
                          onChange={(e) => handleInputChange('contactPersonPhone', e.target.value)}
                          placeholder="رقم هاتف المحاور"
                        />
                      </div>

                      {/* Action Buttons */}
                      <div className="pt-4 space-y-3">
                        <div className="grid grid-cols-2 gap-3">
                          <Button type="submit" className="w-full">
                            <Plus className="h-4 w-4 mr-2" />
                            إضافة
                          </Button>
                          <Button type="button" variant="destructive" className="w-full">
                            <Trash2 className="h-4 w-4 mr-2" />
                            حذف
                          </Button>
                        </div>
                        <div className="grid grid-cols-2 gap-3">
                          <Button type="button" variant="outline" className="w-full">
                            <Edit className="h-4 w-4 mr-2" />
                            تعديل
                          </Button>
                          <Button type="button" variant="outline" onClick={clearForm} className="w-full">
                            <RefreshCw className="h-4 w-4 mr-2" />
                            مسح
                          </Button>
                        </div>
                        <div className="grid grid-cols-2 gap-3">
                          <Button type="button" variant="secondary" className="w-full">
                            <SearchCheck className="h-4 w-4 mr-2" />
                            بحث إضافي
                          </Button>
                          <Button type="button" variant="secondary" className="w-full">
                            <FileSpreadsheet className="h-4 w-4 mr-2" />
                            إكسل
                          </Button>
                        </div>
                        <div className="grid grid-cols-2 gap-3">
                          <Button type="button" variant="secondary" className="w-full">
                            <Printer className="h-4 w-4 mr-2" />
                            طباعة
                          </Button>
                          <Button type="button" variant="secondary" className="w-full">
                            <Download className="h-4 w-4 mr-2" />
                            تحميل الجدول
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Search Section */}
                  <div className="border-t pt-6 mt-6">
                    <div className="flex gap-4 items-end">
                      <div className="flex-1">
                        <Label htmlFor="search">البحث في قاعدة البيانات</Label>
                        <div className="flex gap-2 mt-2">
                          <Input
                            id="search"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            placeholder="ابحث بالاسم، رقم الملف، رقم الهاتف أو رقم الهوية..."
                            className="flex-1"
                          />
                          <Button type="button" variant="default">
                            <Search className="h-4 w-4 mr-2" />
                            إبحث
                          </Button>
                          <Button type="button" variant="destructive">
                            <SearchCheck className="h-4 w-4 mr-2" />
                            إبحث خطير
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </form>
              </CardContent>
            </Card>

            {/* Patients Table */}
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle className="text-xl">قائمة المرضى</CardTitle>
                <CardDescription>
                  عرض جميع المرضى المسجلين في النظام ({filteredPatients.length} مريض)
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow className="bg-muted/50">
                        <TableHead className="text-right">رقم الملف</TableHead>
                        <TableHead className="text-right">اسم المريض</TableHead>
                        <TableHead className="text-right">رقم الهوية</TableHead>
                        <TableHead className="text-right">رقم الجوال</TableHead>
                        <TableHead className="text-right">العمر</TableHead>
                        <TableHead className="text-right">الجنس</TableHead>
                        <TableHead className="text-right">الوضع</TableHead>
                        <TableHead className="text-right">العنوان</TableHead>
                        <TableHead className="text-right">الوظيفة</TableHead>
                        <TableHead className="text-right">الحالة</TableHead>
                        <TableHead className="text-right">العمليات</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredPatients.map((patient) => (
                        <TableRow key={patient.id} className="hover:bg-muted/50">
                          <TableCell className="font-medium">{patient.fileNumber}</TableCell>
                          <TableCell>{patient.name}</TableCell>
                          <TableCell>{patient.nationalId}</TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <Phone className="h-3 w-3 text-muted-foreground" />
                              {patient.phone}
                            </div>
                          </TableCell>
                          <TableCell>{patient.age}</TableCell>
                          <TableCell>
                            <Badge variant={patient.gender === 'male' ? 'default' : 'secondary'}>
                              {patient.gender === 'male' ? 'ذكر' : 'أنثى'}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <Badge variant="outline">
                              {patient.maritalStatus === 'married' ? 'متزوج' : 'أعزب'}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <MapPin className="h-3 w-3 text-muted-foreground" />
                              <span className="truncate max-w-32">{patient.address}</span>
                            </div>
                          </TableCell>
                          <TableCell>{patient.job}</TableCell>
                          <TableCell>
                            <Badge variant={patient.status === 'active' ? 'default' : 'destructive'}>
                              {patient.status === 'active' ? 'نشط' : 'غير نشط'}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <div className="flex gap-1">
                              <Button variant="ghost" size="sm">
                                <Eye className="h-3 w-3" />
                              </Button>
                              <Button variant="ghost" size="sm">
                                <Edit className="h-3 w-3" />
                              </Button>
                              <Button variant="ghost" size="sm">
                                <Trash2 className="h-3 w-3" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>

                {filteredPatients.length === 0 && (
                  <div className="text-center py-8 text-muted-foreground">
                    <User className="h-12 w-12 mx-auto mb-4 opacity-50" />
                    <p>لا توجد نتائج للبحث</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </SidebarProvider>
  )
}