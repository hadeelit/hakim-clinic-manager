import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Shield, Lock, Eye, UserCheck, FileText, Clock, Database, AlertCircle } from "lucide-react";
import { AppSidebar } from "@/components/AppSidebar";
import { SidebarProvider } from "@/components/ui/sidebar";
import { useToast } from "@/components/ui/use-toast";

interface PrivacySettings {
  dataRetentionPeriod: string;
  patientConsentRequired: boolean;
  dataExportEnabled: boolean;
  dataAnonymization: boolean;
  auditLogEnabled: boolean;
  encryptionLevel: string;
  accessControlPolicy: string;
  privacyNotice: string;
}

const Privacy = () => {
  const { toast } = useToast();
  
  const [privacySettings, setPrivacySettings] = useState<PrivacySettings>({
    dataRetentionPeriod: "5",
    patientConsentRequired: true,
    dataExportEnabled: false,
    dataAnonymization: true,
    auditLogEnabled: true,
    encryptionLevel: "AES-256",
    accessControlPolicy: "role-based",
    privacyNotice: "نحن نلتزم بحماية خصوصية بياناتكم الطبية وفقاً للمعايير الدولية..."
  });

  const [isEditing, setIsEditing] = useState(false);

  const handleInputChange = (field: keyof PrivacySettings, value: string | boolean) => {
    setPrivacySettings(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSave = () => {
    setIsEditing(false);
    toast({
      title: "تم الحفظ بنجاح",
      description: "تم تحديث إعدادات الخصوصية"
    });
  };

  const handleReset = () => {
    setPrivacySettings({
      dataRetentionPeriod: "5",
      patientConsentRequired: true,
      dataExportEnabled: false,
      dataAnonymization: true,
      auditLogEnabled: true,
      encryptionLevel: "AES-256",
      accessControlPolicy: "role-based",
      privacyNotice: "نحن نلتزم بحماية خصوصية بياناتكم الطبية وفقاً للمعايير الدولية..."
    });
    setIsEditing(false);
    toast({
      title: "تم الإعادة تعيين",
      description: "تم إعادة تعيين جميع الإعدادات"
    });
  };

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full">
        <AppSidebar />
        <div className="flex flex-1 flex-col">
          <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
            <h1 className="text-xl font-semibold">إدارة الخصوصية</h1>
          </header>
          
          <main className="flex-1 space-y-4 p-4 md:p-6">
            {/* Action Buttons */}
            <div className="flex flex-wrap justify-end gap-2">
              <Button onClick={() => setIsEditing(!isEditing)} className="gap-2" variant={isEditing ? "secondary" : "outline"}>
                <Shield className="h-4 w-4" />
                {isEditing ? "إلغاء التعديل" : "تعديل الإعدادات"}
              </Button>
              
              <Button onClick={handleReset} className="gap-2" variant="outline">
                <AlertCircle className="h-4 w-4" />
                إعادة تعيين
              </Button>
              
              {isEditing && (
                <Button onClick={handleSave} className="gap-2">
                  <FileText className="h-4 w-4" />
                  حفظ التغييرات
                </Button>
              )}
            </div>

            <div className="grid gap-6">
              {/* Data Protection Settings */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-right">
                    <Database className="h-5 w-5" />
                    حماية البيانات
                  </CardTitle>
                  <CardDescription className="text-right">
                    إعدادات حماية وأمان بيانات المرضى
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2 text-right">
                      <Label htmlFor="dataRetentionPeriod">فترة الاحتفاظ بالبيانات (بالسنوات)</Label>
                      <Input
                        id="dataRetentionPeriod"
                        type="number"
                        value={privacySettings.dataRetentionPeriod}
                        onChange={(e) => handleInputChange('dataRetentionPeriod', e.target.value)}
                        disabled={!isEditing}
                        className="text-right"
                      />
                    </div>

                    <div className="space-y-2 text-right">
                      <Label htmlFor="encryptionLevel">مستوى التشفير</Label>
                      <Select 
                        value={privacySettings.encryptionLevel} 
                        onValueChange={(value) => handleInputChange('encryptionLevel', value)}
                        disabled={!isEditing}
                      >
                        <SelectTrigger className="text-right">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="AES-128">AES-128</SelectItem>
                          <SelectItem value="AES-256">AES-256</SelectItem>
                          <SelectItem value="RSA-2048">RSA-2048</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-2 text-right">
                    <Label htmlFor="accessControlPolicy">سياسة التحكم في الوصول</Label>
                    <Select 
                      value={privacySettings.accessControlPolicy} 
                      onValueChange={(value) => handleInputChange('accessControlPolicy', value)}
                      disabled={!isEditing}
                    >
                      <SelectTrigger className="text-right">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="role-based">على أساس الدور</SelectItem>
                        <SelectItem value="permission-based">على أساس الصلاحيات</SelectItem>
                        <SelectItem value="hybrid">نموذج مختلط</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </CardContent>
              </Card>

              {/* Privacy Controls */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-right">
                    <Lock className="h-5 w-5" />
                    ضوابط الخصوصية
                  </CardTitle>
                  <CardDescription className="text-right">
                    إعدادات موافقة المرضى وحقوق البيانات
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex items-center justify-between">
                    <Switch
                      id="patientConsent"
                      checked={privacySettings.patientConsentRequired}
                      onCheckedChange={(checked) => handleInputChange('patientConsentRequired', checked)}
                      disabled={!isEditing}
                    />
                    <div className="text-right">
                      <Label htmlFor="patientConsent" className="text-sm font-medium">
                        موافقة المريض مطلوبة
                      </Label>
                      <p className="text-xs text-muted-foreground">
                        يتطلب موافقة صريحة من المريض قبل معالجة البيانات
                      </p>
                    </div>
                  </div>

                  <Separator />

                  <div className="flex items-center justify-between">
                    <Switch
                      id="dataExport"
                      checked={privacySettings.dataExportEnabled}
                      onCheckedChange={(checked) => handleInputChange('dataExportEnabled', checked)}
                      disabled={!isEditing}
                    />
                    <div className="text-right">
                      <Label htmlFor="dataExport" className="text-sm font-medium">
                        تصدير البيانات مُفعّل
                      </Label>
                      <p className="text-xs text-muted-foreground">
                        السماح للمرضى بتصدير بياناتهم الشخصية
                      </p>
                    </div>
                  </div>

                  <Separator />

                  <div className="flex items-center justify-between">
                    <Switch
                      id="dataAnonymization"
                      checked={privacySettings.dataAnonymization}
                      onCheckedChange={(checked) => handleInputChange('dataAnonymization', checked)}
                      disabled={!isEditing}
                    />
                    <div className="text-right">
                      <Label htmlFor="dataAnonymization" className="text-sm font-medium">
                        إخفاء هوية البيانات
                      </Label>
                      <p className="text-xs text-muted-foreground">
                        إزالة المعرفات الشخصية من البيانات المحفوظة
                      </p>
                    </div>
                  </div>

                  <Separator />

                  <div className="flex items-center justify-between">
                    <Switch
                      id="auditLog"
                      checked={privacySettings.auditLogEnabled}
                      onCheckedChange={(checked) => handleInputChange('auditLogEnabled', checked)}
                      disabled={!isEditing}
                    />
                    <div className="text-right">
                      <Label htmlFor="auditLog" className="text-sm font-medium">
                        سجل المراجعة مُفعّل
                      </Label>
                      <p className="text-xs text-muted-foreground">
                        تسجيل جميع عمليات الوصول والتعديل على البيانات
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Privacy Notice */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-right">
                    <Eye className="h-5 w-5" />
                    إشعار الخصوصية
                  </CardTitle>
                  <CardDescription className="text-right">
                    النص المعروض للمرضى بخصوص سياسة الخصوصية
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <Label htmlFor="privacyNotice">نص إشعار الخصوصية</Label>
                    <Textarea
                      id="privacyNotice"
                      placeholder="أدخل نص إشعار الخصوصية..."
                      value={privacySettings.privacyNotice}
                      onChange={(e) => handleInputChange('privacyNotice', e.target.value)}
                      disabled={!isEditing}
                      className="min-h-[120px] text-right"
                      dir="rtl"
                    />
                  </div>
                </CardContent>
              </Card>
            </div>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default Privacy;