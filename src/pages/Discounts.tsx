import { useState } from 'react';
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import { AppSidebar } from '@/components/AppSidebar';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Checkbox } from '@/components/ui/checkbox';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { format } from 'date-fns';
import { ar } from 'date-fns/locale';
import { Building2, Plus, Trash2, Edit, RotateCcw, Save, CreditCard, CalendarIcon, Clock, Percent } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';

interface Discount {
  id: string;
  totalPrice: string;
  sessionsCount: string;
  discountClients: boolean;
  discountDate: Date | null;
  discountPercentage: string;
  discountStartTime: string;
  discountEndTime: string;
}

export default function Discounts() {
  const { toast } = useToast();
  
  // Discounts state
  const [discounts, setDiscounts] = useState<Discount[]>([]);
  const [currentDiscount, setCurrentDiscount] = useState<Discount>({
    id: '',
    totalPrice: '',
    sessionsCount: '',
    discountClients: false,
    discountDate: null,
    discountPercentage: '',
    discountStartTime: '',
    discountEndTime: ''
  });
  const [isEditingDiscount, setIsEditingDiscount] = useState(false);

  // Discount functions
  const handleDiscountInputChange = (field: keyof Discount, value: string | boolean | Date | null) => {
    setCurrentDiscount(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleAddDiscount = () => {
    setIsEditingDiscount(true);
    setCurrentDiscount({
      id: '',
      totalPrice: '',
      sessionsCount: '',
      discountClients: false,
      discountDate: null,
      discountPercentage: '',
      discountStartTime: '',
      discountEndTime: ''
    });
  };

  const handleSaveDiscount = () => {
    if (currentDiscount.id) {
      // Edit existing discount
      setDiscounts(prev => 
        prev.map(d => d.id === currentDiscount.id ? currentDiscount : d)
      );
    } else {
      // Add new discount
      const newDiscount = {
        ...currentDiscount,
        id: Date.now().toString()
      };
      setDiscounts(prev => [...prev, newDiscount]);
    }
    
    setIsEditingDiscount(false);
    setCurrentDiscount({
      id: '',
      totalPrice: '',
      sessionsCount: '',
      discountClients: false,
      discountDate: null,
      discountPercentage: '',
      discountStartTime: '',
      discountEndTime: ''
    });
    
    toast({
      title: "تم حفظ التخفيض",
      description: "تم حفظ بيانات التخفيض بنجاح"
    });
  };

  const handleEditDiscount = (discount: Discount) => {
    setCurrentDiscount(discount);
    setIsEditingDiscount(true);
  };

  const handleDeleteDiscount = (id: string) => {
    setDiscounts(prev => prev.filter(d => d.id !== id));
    toast({
      title: "تم حذف التخفيض",
      description: "تم حذف التخفيض بنجاح"
    });
  };

  const handleResetDiscount = () => {
    setCurrentDiscount({
      id: '',
      totalPrice: '',
      sessionsCount: '',
      discountClients: false,
      discountDate: null,
      discountPercentage: '',
      discountStartTime: '',
      discountEndTime: ''
    });
    setIsEditingDiscount(false);
    toast({
      title: "تم مسح البيانات",
      description: "تم مسح جميع البيانات من النموذج"
    });
  };

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
                  <CreditCard className="h-5 w-5 text-primary" />
                  <h1 className="text-lg font-semibold">إدارة التخفيضات</h1>
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
          <main dir="rtl" className="container mx-auto p-6 space-y-6 text-right">
            <div className="grid gap-6">
              {/* Page Title & Description */}
              <div className="space-y-2">
                <h2 className="text-2xl font-bold tracking-tight text-foreground">إدارة التخفيضات</h2>
                <p className="text-muted-foreground">
                  إدارة وتخصيص تخفيضات العيادة والعروض الخاصة
                </p>
              </div>

              {/* Discounts Management */}
              <div className="grid gap-6 lg:grid-cols-4">
                {/* Action Buttons */}
                <Card className="lg:col-span-1">
                  <CardHeader>
                    <CardTitle className="text-lg">الإجراءات</CardTitle>
                    <CardDescription>
                      إجراءات إدارة التخفيضات
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <Button onClick={handleAddDiscount} className="w-full justify-center gap-2" variant="default">
                      <Plus className="h-4 w-4" />
                      إضافة
                    </Button>
                    
                    <Button 
                      onClick={() => setIsEditingDiscount(!isEditingDiscount)} 
                      className="w-full justify-center gap-2" 
                      variant={isEditingDiscount ? "secondary" : "outline"}
                    >
                      <Edit className="h-4 w-4" />
                      {isEditingDiscount ? "إلغاء التعديل" : "تعديل"}
                    </Button>
                    
                    <Button onClick={handleResetDiscount} className="w-full justify-center gap-2" variant="outline">
                      <RotateCcw className="h-4 w-4" />
                      مسح
                    </Button>
                    
                    <Button 
                      onClick={() => {
                        if (currentDiscount.id) {
                          handleDeleteDiscount(currentDiscount.id);
                        }
                      }} 
                      className="w-full justify-center gap-2" 
                      variant="destructive"
                      disabled={!currentDiscount.id}
                    >
                      <Trash2 className="h-4 w-4" />
                      حذف
                    </Button>

                    {isEditingDiscount && (
                      <Button onClick={handleSaveDiscount} className="w-full justify-center gap-2 mt-4" variant="default">
                        <Save className="h-4 w-4" />
                        حفظ التغييرات
                      </Button>
                    )}
                  </CardContent>
                </Card>

                {/* Discount Form */}
                <Card className="lg:col-span-3">
                  <CardHeader>
                    <CardTitle className="text-xl flex items-center justify-end gap-2 text-right">
                      <CreditCard className="h-5 w-5 text-primary" />
                      إعدادات التخفيضات
                    </CardTitle>
                    <CardDescription>
                      قم بإدارة تخفيضات العيادة والعروض الخاصة
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6 text-right">
                    {/* Form Fields */}
                    <div className="grid gap-6 md:grid-cols-2">
                      <div className="space-y-2 text-right">
                        <Label htmlFor="total-price" className="text-sm font-medium text-right flex items-center justify-end gap-2">
                          <CreditCard className="h-4 w-4" />
                          السعر الإجمالي المدفوع
                        </Label>
                        <Input 
                          id="total-price" 
                          type="number"
                          value={currentDiscount.totalPrice} 
                          onChange={e => handleDiscountInputChange('totalPrice', e.target.value)} 
                          disabled={!isEditingDiscount} 
                          className="bg-input text-right" 
                          placeholder="أدخل السعر الإجمالي" 
                        />
                      </div>

                      <div className="space-y-2 text-right">
                        <Label htmlFor="sessions-count" className="text-sm font-medium text-right flex items-center justify-end gap-2">
                          <Building2 className="h-4 w-4" />
                          عدد الجلسات
                        </Label>
                        <Input 
                          id="sessions-count" 
                          type="number"
                          value={currentDiscount.sessionsCount} 
                          onChange={e => handleDiscountInputChange('sessionsCount', e.target.value)} 
                          disabled={!isEditingDiscount} 
                          className="bg-input text-right" 
                          placeholder="أدخل عدد الجلسات" 
                        />
                      </div>
                    </div>

                    <div className="grid gap-6 md:grid-cols-2">
                      <div className="space-y-2 text-right">
                        <Label className="text-sm font-medium text-right flex items-center justify-end gap-2">
                          <CalendarIcon className="h-4 w-4" />
                          تاريخ التخفيض
                        </Label>
                        <Popover>
                          <PopoverTrigger asChild>
                            <Button
                              variant="outline"
                              className={cn(
                                "w-full justify-end text-right font-normal",
                                !currentDiscount.discountDate && "text-muted-foreground"
                              )}
                              disabled={!isEditingDiscount}
                            >
                              {currentDiscount.discountDate ? (
                                format(currentDiscount.discountDate, "PPP", { locale: ar })
                              ) : (
                                <span className="text-right">اختر تاريخ التخفيض</span>
                              )}
                              <CalendarIcon className="ml-2 h-4 w-4" />
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0" align="end">
                            <Calendar
                              mode="single"
                              selected={currentDiscount.discountDate || undefined}
                              onSelect={(date) => handleDiscountInputChange('discountDate', date || null)}
                              initialFocus
                              className={cn("p-3 pointer-events-auto")}
                            />
                          </PopoverContent>
                        </Popover>
                      </div>

                      <div className="space-y-2 text-right">
                        <Label htmlFor="discount-percentage" className="text-sm font-medium text-right flex items-center justify-end gap-2">
                          <Percent className="h-4 w-4" />
                          نسبة التخفيض
                        </Label>
                        <Input 
                          id="discount-percentage" 
                          type="number"
                          value={currentDiscount.discountPercentage} 
                          onChange={e => handleDiscountInputChange('discountPercentage', e.target.value)} 
                          disabled={!isEditingDiscount} 
                          className="bg-input text-right" 
                          placeholder="أدخل نسبة التخفيض" 
                        />
                      </div>
                    </div>

                    <div className="grid gap-6 md:grid-cols-2">
                      <div className="space-y-2 text-right">
                        <Label htmlFor="start-time" className="text-sm font-medium text-right flex items-center justify-end gap-2">
                          <Clock className="h-4 w-4" />
                          وقت بدء التخفيض
                        </Label>
                        <Input 
                          id="start-time" 
                          type="time"
                          value={currentDiscount.discountStartTime} 
                          onChange={e => handleDiscountInputChange('discountStartTime', e.target.value)} 
                          disabled={!isEditingDiscount} 
                          className="bg-input text-right" 
                        />
                      </div>

                      <div className="space-y-2 text-right">
                        <Label htmlFor="end-time" className="text-sm font-medium text-right flex items-center justify-end gap-2">
                          <Clock className="h-4 w-4" />
                          وقت نهاية التخفيض
                        </Label>
                        <Input 
                          id="end-time" 
                          type="time"
                          value={currentDiscount.discountEndTime} 
                          onChange={e => handleDiscountInputChange('discountEndTime', e.target.value)} 
                          disabled={!isEditingDiscount} 
                          className="bg-input text-right" 
                        />
                      </div>
                    </div>

                    <div className="flex items-center space-x-2 justify-end text-right">
                      <Label htmlFor="discount-clients" className="text-sm font-medium">
                        عملاء تخفيض
                      </Label>
                      <Checkbox
                        id="discount-clients"
                        checked={currentDiscount.discountClients}
                        onCheckedChange={(checked) => handleDiscountInputChange('discountClients', !!checked)}
                        disabled={!isEditingDiscount}
                      />
                    </div>

                    <Separator />

                    {/* Discounts Table */}
                    <div className="space-y-4">
                      <h3 className="text-lg font-medium">التخفيضات المسجلة</h3>
                      <div className="border rounded-lg">
                        <Table>
                          <TableHeader>
                            <TableRow>
                              <TableHead className="text-right">رقم السجل</TableHead>
                              <TableHead className="text-right">تاريخ التخفيض</TableHead>
                              <TableHead className="text-right">نسبة التخفيض</TableHead>
                              <TableHead className="text-right">وقت بدء التخفيض</TableHead>
                              <TableHead className="text-right">وقت نهاية التخفيض</TableHead>
                              <TableHead className="text-right">السعر الإجمالي المدفوع</TableHead>
                              <TableHead className="text-right">عدد الجلسات</TableHead>
                              <TableHead className="text-right">الإجراءات</TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            {discounts.length === 0 ? (
                              <TableRow>
                                <TableCell colSpan={8} className="text-center text-muted-foreground py-6">
                                  لا توجد تخفيضات مسجلة
                                </TableCell>
                              </TableRow>
                            ) : (
                              discounts.map((discount, index) => (
                                <TableRow key={discount.id}>
                                  <TableCell className="text-right">{index + 1}</TableCell>
                                  <TableCell className="text-right">
                                    {discount.discountDate ? format(discount.discountDate, "dd/MM/yyyy", { locale: ar }) : '-'}
                                  </TableCell>
                                  <TableCell className="text-right">{discount.discountPercentage}%</TableCell>
                                  <TableCell className="text-right">{discount.discountStartTime}</TableCell>
                                  <TableCell className="text-right">{discount.discountEndTime}</TableCell>
                                  <TableCell className="text-right">{discount.totalPrice} ريال</TableCell>
                                  <TableCell className="text-right">{discount.sessionsCount}</TableCell>
                                  <TableCell className="text-right">
                                    <div className="flex gap-2 justify-end">
                                      <Button 
                                        size="sm" 
                                        variant="outline"
                                        onClick={() => handleEditDiscount(discount)}
                                      >
                                        <Edit className="h-3 w-3" />
                                      </Button>
                                      <Button 
                                        size="sm" 
                                        variant="destructive"
                                        onClick={() => handleDeleteDiscount(discount.id)}
                                      >
                                        <Trash2 className="h-3 w-3" />
                                      </Button>
                                    </div>
                                  </TableCell>
                                </TableRow>
                              ))
                            )}
                          </TableBody>
                        </Table>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}