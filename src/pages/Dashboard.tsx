import { useState } from 'react'
import { 
  Users, 
  Calendar, 
  UserPlus, 
  Plus, 
  ClipboardList,
  TrendingUp,
  Activity,
  Clock,
  Search,
  Filter,
  Download
} from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { AppSidebar } from '@/components/AppSidebar'
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar'
import { toast } from '@/hooks/use-toast'

// Mock data for demonstration
const todayAppointments = [
  { id: 1, time: '09:00', patient: 'أحمد محمد علي', doctor: 'د. سارة أحمد', phone: '0501234567', status: 'confirmed' },
  { id: 2, time: '09:30', patient: 'فاطمة حسن', doctor: 'د. محمد خالد', phone: '0507654321', status: 'waiting' },
  { id: 3, time: '10:00', patient: 'عبدالله سعد', doctor: 'د. نور عبدالرحمن', phone: '0509876543', status: 'in-progress' },
  { id: 4, time: '10:30', patient: 'مريم أحمد', doctor: 'د. سارة أحمد', phone: '0502468135', status: 'completed' },
  { id: 5, time: '11:00', patient: 'خالد محمود', doctor: 'د. أحمد صالح', phone: '0503691472', status: 'cancelled' }
]

const Dashboard = () => {
  const [searchTerm, setSearchTerm] = useState('')

  const handleQuickAction = (action: string) => {
    toast({
      title: "إجراء سريع",
      description: `تم النقر على ${action}`,
    })
  }

  const getStatusBadge = (status: string) => {
    const statusMap = {
      'confirmed': { label: 'مؤكد', variant: 'default' as const },
      'waiting': { label: 'في الانتظار', variant: 'secondary' as const },
      'in-progress': { label: 'جارٍ', variant: 'outline' as const },
      'completed': { label: 'مكتمل', variant: 'default' as const },
      'cancelled': { label: 'ملغي', variant: 'destructive' as const }
    }
    
    const statusInfo = statusMap[status as keyof typeof statusMap] || statusMap.confirmed
    return <Badge variant={statusInfo.variant}>{statusInfo.label}</Badge>
  }

  const filteredAppointments = todayAppointments.filter(apt =>
    apt.patient.includes(searchTerm) || apt.doctor.includes(searchTerm)
  )

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-gradient-subtle">
        <AppSidebar />
        
        <main className="flex-1 p-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-4">
              <SidebarTrigger />
              <div>
                <h1 className="text-3xl font-bold text-foreground">لوحة التحكم الرئيسية</h1>
                <p className="text-muted-foreground mt-1">نظام إدارة العيادة الطبية</p>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <Button variant="outline" size="sm">
                <Download className="h-4 w-4 ml-2" />
                تصدير التقرير
              </Button>
              <div className="text-sm text-muted-foreground">
                {new Date().toLocaleDateString('ar-SA', { 
                  weekday: 'long', 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })}
              </div>
            </div>
          </div>

          {/* Statistics Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <Card className="relative overflow-hidden">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  إجمالي التعهدات
                </CardTitle>
                <div className="flex items-center justify-between">
                  <div className="text-2xl font-bold">١</div>
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                    <ClipboardList className="w-6 h-6 text-primary" />
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex items-center text-sm">
                  <TrendingUp className="w-4 h-4 text-green-500 ml-1" />
                  <span className="text-green-500">+12%</span>
                  <span className="text-muted-foreground mr-1">من الشهر الماضي</span>
                </div>
              </CardContent>
            </Card>

            <Card className="relative overflow-hidden">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  العاملين النشطين
                </CardTitle>
                <div className="flex items-center justify-between">
                  <div className="text-2xl font-bold">٣</div>
                  <div className="w-12 h-12 bg-secondary/10 rounded-full flex items-center justify-center">
                    <Users className="w-6 h-6 text-secondary" />
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex items-center text-sm">
                  <Activity className="w-4 h-4 text-blue-500 ml-1" />
                  <span className="text-blue-500">جميعهم متاحون</span>
                </div>
              </CardContent>
            </Card>

            <Card className="relative overflow-hidden">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  المرضى المسجلين
                </CardTitle>
                <div className="flex items-center justify-between">
                  <div className="text-2xl font-bold">٥</div>
                  <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center">
                    <UserPlus className="w-6 h-6 text-accent" />
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex items-center text-sm">
                  <TrendingUp className="w-4 h-4 text-green-500 ml-1" />
                  <span className="text-green-500">+2</span>
                  <span className="text-muted-foreground mr-1">هذا الأسبوع</span>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Quick Actions */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <Card 
              className="cursor-pointer hover:shadow-lg transition-all duration-300 border-dashed border-2 hover:border-primary/50"
              onClick={() => handleQuickAction('موعد جديد')}
            >
              <CardContent className="flex flex-col items-center justify-center p-8 text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                  <Plus className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-lg font-semibold mb-2">موعد جديد</h3>
                <p className="text-sm text-muted-foreground">إضافة موعد جديد للمريض</p>
              </CardContent>
            </Card>

            <Card 
              className="cursor-pointer hover:shadow-lg transition-all duration-300 border-dashed border-2 hover:border-secondary/50"
              onClick={() => handleQuickAction('جلسة جديدة')}
            >
              <CardContent className="flex flex-col items-center justify-center p-8 text-center">
                <div className="w-16 h-16 bg-secondary/10 rounded-full flex items-center justify-center mb-4">
                  <Plus className="w-8 h-8 text-secondary" />
                </div>
                <h3 className="text-lg font-semibold mb-2">جلسة جديدة</h3>
                <p className="text-sm text-muted-foreground">بدء جلسة علاج جديدة</p>
              </CardContent>
            </Card>

            <Card 
              className="cursor-pointer hover:shadow-lg transition-all duration-300 border-dashed border-2 hover:border-accent/50"
              onClick={() => handleQuickAction('مريض جديد')}
            >
              <CardContent className="flex flex-col items-center justify-center p-8 text-center">
                <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mb-4">
                  <Plus className="w-8 h-8 text-accent" />
                </div>
                <h3 className="text-lg font-semibold mb-2">مريض جديد</h3>
                <p className="text-sm text-muted-foreground">تسجيل مريض جديد في النظام</p>
              </CardContent>
            </Card>
          </div>

          {/* Today's Appointments */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-xl">حجوزات اليوم</CardTitle>
                  <CardDescription>
                    إدارة مواعيد اليوم الحالي ({filteredAppointments.length} موعد)
                  </CardDescription>
                </div>
                <div className="flex items-center gap-2">
                  <div className="relative">
                    <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                    <Input
                      placeholder="البحث في المواعيد..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10 w-64"
                    />
                  </div>
                  <Button variant="outline" size="sm">
                    <Filter className="w-4 h-4 ml-2" />
                    تصفية
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="rounded-lg border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="text-right">وقت الموعد</TableHead>
                      <TableHead className="text-right">اسم المريض</TableHead>
                      <TableHead className="text-right">الطبيب المعالج</TableHead>
                      <TableHead className="text-right">رقم الجوال</TableHead>
                      <TableHead className="text-right">الحالة</TableHead>
                      <TableHead className="text-right">الإجراءات</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredAppointments.map((appointment) => (
                      <TableRow key={appointment.id} className="hover:bg-muted/50">
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Clock className="w-4 h-4 text-muted-foreground" />
                            <span className="font-medium">{appointment.time}</span>
                          </div>
                        </TableCell>
                        <TableCell className="font-medium">{appointment.patient}</TableCell>
                        <TableCell>{appointment.doctor}</TableCell>
                        <TableCell className="font-mono text-sm">{appointment.phone}</TableCell>
                        <TableCell>{getStatusBadge(appointment.status)}</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Button variant="ghost" size="sm">
                              عرض
                            </Button>
                            <Button variant="ghost" size="sm">
                              تعديل
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
                
                {filteredAppointments.length === 0 && (
                  <div className="text-center py-8 text-muted-foreground">
                    لا توجد مواعيد تطابق معايير البحث
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </main>
      </div>
    </SidebarProvider>
  )
}

export default Dashboard