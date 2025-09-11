import { useState } from 'react';
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import { AppSidebar } from '@/components/AppSidebar';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { MessageSquare, Send, CreditCard, RotateCcw, Building2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface SMSData {
  phoneNumber: string;
  message: string;
}

export default function SMS() {
  const { toast } = useToast();
  const [smsData, setSmsData] = useState<SMSData>({
    phoneNumber: '',
    message: ''
  });
  const [balance, setBalance] = useState<number>(150); // مثال على الرصيد

  const handleInputChange = (field: keyof SMSData, value: string) => {
    setSmsData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSendSMS = () => {
    if (!smsData.phoneNumber.trim()) {
      toast({
        title: "خطأ",
        description: "يرجى إدخال رقم الجوال",
        variant: "destructive"
      });
      return;
    }
    
    if (!smsData.message.trim()) {
      toast({
        title: "خطأ", 
        description: "يرجى إدخال محتوى الرسالة",
        variant: "destructive"
      });
      return;
    }

    // محاكاة إرسال الرسالة
    toast({
      title: "تم إرسال الرسالة",
      description: `تم إرسال الرسالة إلى ${smsData.phoneNumber} بنجاح`
    });
    
    // تقليل الرصيد
    setBalance(prev => Math.max(0, prev - 1));
  };

  const handleCheckBalance = () => {
    toast({
      title: "رصيد الرسائل",
      description: `الرصيد المتاح: ${balance} رسالة`
    });
  };

  const handleClearForm = () => {
    setSmsData({
      phoneNumber: '',
      message: ''
    });
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
                  <MessageSquare className="h-5 w-5 text-primary" />
                  <h1 className="text-lg font-semibold">الرسائل القصيرة</h1>
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
                <h2 className="text-2xl font-bold tracking-tight text-foreground">رسالة قصيرة SMS</h2>
                <p className="text-muted-foreground">
                  إرسال الرسائل النصية والإشعارات للمرضى
                </p>
              </div>

              {/* SMS Form */}
              <div className="grid gap-6 lg:grid-cols-4">
                {/* Action Buttons */}
                <Card className="lg:col-span-1">
                  <CardHeader>
                    <CardTitle className="text-lg">الإجراءات</CardTitle>
                    <CardDescription>
                      إجراءات إدارة الرسائل القصيرة
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <Button 
                      onClick={handleSendSMS} 
                      className="w-full justify-center gap-2" 
                      variant="default"
                    >
                      <Send className="h-4 w-4" />
                      إرسال
                    </Button>
                    
                    <Button 
                      onClick={handleCheckBalance} 
                      className="w-full justify-center gap-2" 
                      variant="outline"
                    >
                      <CreditCard className="h-4 w-4" />
                      الرصيد
                    </Button>
                    
                    <Button 
                      onClick={handleClearForm} 
                      className="w-full justify-center gap-2" 
                      variant="outline"
                    >
                      <RotateCcw className="h-4 w-4" />
                      مسح
                    </Button>

                    <div className="mt-4 p-3 bg-muted/50 rounded-lg">
                      <p className="text-sm font-medium text-center">الرصيد المتاح</p>
                      <p className="text-2xl font-bold text-center text-primary">{balance}</p>
                      <p className="text-xs text-muted-foreground text-center">رسالة</p>
                    </div>
                  </CardContent>
                </Card>

                {/* SMS Form */}
                <Card className="lg:col-span-3">
                  <CardHeader>
                    <CardTitle className="text-xl flex items-center justify-end gap-2 text-right">
                      <MessageSquare className="h-5 w-5 text-primary" />
                      إرسال رسالة نصية
                    </CardTitle>
                    <CardDescription>
                      قم بإدخال رقم الجوال ومحتوى الرسالة
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {/* Phone Number */}
                    <div className="space-y-2">
                      <Label htmlFor="phone-number" className="text-sm font-medium text-right">
                        رقم الجوال
                      </Label>
                      <Input 
                        id="phone-number" 
                        value={smsData.phoneNumber} 
                        onChange={(e) => handleInputChange('phoneNumber', e.target.value)} 
                        className="bg-input text-right" 
                        placeholder="أدخل رقم الجوال (مثال: +966501234567)" 
                        dir="ltr" 
                      />
                    </div>

                    {/* Message Content */}
                    <div className="space-y-2">
                      <Label htmlFor="message-content" className="text-sm font-medium text-right">
                        محتوى الرسالة
                      </Label>
                      <Textarea 
                        id="message-content" 
                        value={smsData.message} 
                        onChange={(e) => handleInputChange('message', e.target.value)} 
                        className="bg-input min-h-[120px] text-right" 
                        placeholder="اكتب محتوى الرسالة هنا..."
                        maxLength={160}
                      />
                      <div className="flex justify-between items-center text-xs text-muted-foreground">
                        <span>{160 - smsData.message.length} حرف متبقي</span>
                        <span>{smsData.message.length}/160</span>
                      </div>
                    </div>

                    {/* Preview */}
                    {(smsData.phoneNumber || smsData.message) && (
                      <div className="p-4 bg-muted/30 rounded-lg border-r-4 border-primary">
                        <h4 className="text-sm font-medium mb-2">معاينة الرسالة:</h4>
                        <div className="space-y-1 text-sm">
                          <p><span className="font-medium">إلى:</span> {smsData.phoneNumber || 'غير محدد'}</p>
                          <p><span className="font-medium">الرسالة:</span> {smsData.message || 'غير محددة'}</p>
                        </div>
                      </div>
                    )}
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