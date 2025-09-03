import { useState } from 'react'
import { Search, Filter, RefreshCw, FileText, Trash2, RotateCcw, Eye } from 'lucide-react'
import { AppSidebar } from '@/components/AppSidebar'
import { SidebarProvider, SidebarInset } from '@/components/ui/sidebar'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { toast } from 'sonner'

// Mock data for deleted invoices
const deletedInvoices = [
  {
    id: 'INV-2024-001',
    patientName: 'أحمد محمد علي',
    amount: 250.00,
    deletedDate: '2024-01-15',
    originalDate: '2024-01-10',
    deletedBy: 'د. سارة أحمد',
    reason: 'خطأ في البيانات',
    status: 'محذوفة'
  },
  {
    id: 'INV-2024-002',
    patientName: 'فاطمة حسن',
    amount: 180.00,
    deletedDate: '2024-01-14',
    originalDate: '2024-01-08',
    deletedBy: 'د. محمد يوسف',
    reason: 'إلغاء الموعد',
    status: 'محذوفة'
  },
  {
    id: 'INV-2024-003',
    patientName: 'عمر خالد',
    amount: 320.00,
    deletedDate: '2024-01-12',
    originalDate: '2024-01-05',
    deletedBy: 'أدمن',
    reason: 'تكرار في الفاتورة',
    status: 'محذوفة'
  },
  {
    id: 'INV-2024-004',
    patientName: 'مريم سالم',
    amount: 150.00,
    deletedDate: '2024-01-10',
    originalDate: '2024-01-03',
    deletedBy: 'د. أحمد محمود',
    reason: 'تعديل في السعر',
    status: 'محذوفة'
  },
  {
    id: 'INV-2024-005',
    patientName: 'يوسف عبدالله',
    amount: 275.00,
    deletedDate: '2024-01-08',
    originalDate: '2024-01-01',
    deletedBy: 'د. ليلى حسن',
    reason: 'خطأ في اسم المريض',
    status: 'محذوفة'
  }
]

export default function DeletedInvoices() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedPeriod, setSelectedPeriod] = useState('كل الفترات')

  const filteredInvoices = deletedInvoices.filter(invoice =>
    invoice.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    invoice.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
    invoice.deletedBy.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const handleRestoreInvoice = (invoiceId: string) => {
    toast.success(`تم استعادة الفاتورة ${invoiceId} بنجاح`)
  }

  const handleViewDetails = (invoiceId: string) => {
    toast.info(`عرض تفاصيل الفاتورة ${invoiceId}`)
  }

  const handlePermanentDelete = (invoiceId: string) => {
    toast.error(`تم حذف الفاتورة ${invoiceId} نهائياً`)
  }

  const totalDeletedAmount = filteredInvoices.reduce((sum, invoice) => sum + invoice.amount, 0)

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full">
        <AppSidebar />
        <SidebarInset className="flex-1">
          <div className="p-6 space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold text-foreground">الفواتير المحذوفة</h1>
                <p className="text-muted-foreground">إدارة ومراجعة الفواتير المحذوفة</p>
              </div>
              <Button variant="outline" className="gap-2">
                <RefreshCw className="h-4 w-4" />
                تحديث
              </Button>
            </div>

            {/* Statistics Cards */}
            <div className="grid gap-4 md:grid-cols-3">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">إجمالي الفواتير المحذوفة</CardTitle>
                  <Trash2 className="h-4 w-4 text-destructive" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-destructive">{filteredInvoices.length}</div>
                  <p className="text-xs text-muted-foreground">
                    فاتورة محذوفة
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">القيمة الإجمالية</CardTitle>
                  <FileText className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{totalDeletedAmount.toFixed(2)} ر.س</div>
                  <p className="text-xs text-muted-foreground">
                    قيمة الفواتير المحذوفة
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">هذا الشهر</CardTitle>
                  <RefreshCw className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-orange-600">5</div>
                  <p className="text-xs text-muted-foreground">
                    فاتورة محذوفة هذا الشهر
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* Filters and Search */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">البحث والتصفية</CardTitle>
                <CardDescription>
                  ابحث عن الفواتير المحذوفة حسب اسم المريض أو رقم الفاتورة
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col sm:flex-row gap-4">
                  <div className="flex-1">
                    <div className="relative">
                      <Search className="absolute right-2 top-2.5 h-4 w-4 text-muted-foreground" />
                      <Input
                        placeholder="البحث عن فاتورة..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pr-8"
                      />
                    </div>
                  </div>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="outline" className="gap-2">
                        <Filter className="h-4 w-4" />
                        {selectedPeriod}
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => setSelectedPeriod('كل الفترات')}>
                        كل الفترات
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => setSelectedPeriod('هذا الشهر')}>
                        هذا الشهر
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => setSelectedPeriod('الشهر الماضي')}>
                        الشهر الماضي
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => setSelectedPeriod('آخر 3 أشهر')}>
                        آخر 3 أشهر
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </CardContent>
            </Card>

            {/* Deleted Invoices Table */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">قائمة الفواتير المحذوفة</CardTitle>
                <CardDescription>
                  عرض جميع الفواتير التي تم حذفها مع إمكانية الاستعادة
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>رقم الفاتورة</TableHead>
                        <TableHead>اسم المريض</TableHead>
                        <TableHead>المبلغ</TableHead>
                        <TableHead>تاريخ الحذف</TableHead>
                        <TableHead>محذوفة بواسطة</TableHead>
                        <TableHead>السبب</TableHead>
                        <TableHead>الحالة</TableHead>
                        <TableHead className="text-left">الإجراءات</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredInvoices.map((invoice) => (
                        <TableRow key={invoice.id}>
                          <TableCell className="font-medium">
                            {invoice.id}
                          </TableCell>
                          <TableCell>{invoice.patientName}</TableCell>
                          <TableCell className="font-medium text-primary">
                            {invoice.amount.toFixed(2)} ر.س
                          </TableCell>
                          <TableCell>{invoice.deletedDate}</TableCell>
                          <TableCell>{invoice.deletedBy}</TableCell>
                          <TableCell>
                            <span className="text-sm text-muted-foreground">
                              {invoice.reason}
                            </span>
                          </TableCell>
                          <TableCell>
                            <Badge variant="destructive" className="text-xs">
                              {invoice.status}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <Button
                                variant="outline"
                                size="sm"
                                className="gap-1"
                                onClick={() => handleViewDetails(invoice.id)}
                              >
                                <Eye className="h-3 w-3" />
                                عرض
                              </Button>
                              <Button
                                variant="outline"
                                size="sm"
                                className="gap-1 text-green-600 hover:text-green-700"
                                onClick={() => handleRestoreInvoice(invoice.id)}
                              >
                                <RotateCcw className="h-3 w-3" />
                                استعادة
                              </Button>
                              <Button
                                variant="outline"
                                size="sm"
                                className="gap-1 text-destructive hover:text-destructive"
                                onClick={() => handlePermanentDelete(invoice.id)}
                              >
                                <Trash2 className="h-3 w-3" />
                                حذف نهائي
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>

                {filteredInvoices.length === 0 && (
                  <div className="text-center py-8 text-muted-foreground">
                    لا توجد فواتير محذوفة تطابق البحث
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </SidebarInset>
      </div>
    </SidebarProvider>
  )
}