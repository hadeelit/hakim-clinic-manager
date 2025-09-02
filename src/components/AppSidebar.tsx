import { useState } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import {
  Calendar,
  Users,
  UserPlus,
  ClipboardList,
  Settings,
  FileText,
  BarChart3,
  Stethoscope,
  Pill,
  HeartHandshake,
  Activity,
  Clock,
  UserCheck,
  FilePlus,
  MessageSquare,
  HelpCircle,
  LogOut,
  Home,
  FolderOpen,
  Archive,
  CreditCard,
  Shield
} from 'lucide-react'
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarMenuSub,
  SidebarMenuSubItem,
  SidebarMenuSubButton,
  useSidebar,
} from '@/components/ui/sidebar'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible'

const menuItems = [
  {
    title: 'الرئيسية',
    url: '/dashboard',
    icon: Home,
    badge: null
  },
  {
    title: 'إعدادات العيادة',
    icon: Settings,
    items: [
      { title: 'معلومات العيادة', url: '/clinic-info', icon: FileText },
      { title: 'إدارة التخفيضات', url: '/discounts', icon: CreditCard },
      { title: 'إدارة الخصوصية', url: '/privacy', icon: Shield },
      { title: 'الرسائل القصيرة', url: '/sms', icon: MessageSquare }
    ]
  },
  {
    title: 'إدارة المستخدمين',
    icon: Users,
    items: [
      { title: 'إدارة حسابي', url: '/my-account', icon: UserCheck },
      { title: 'طاقم طبي', url: '/medical-staff', icon: Stethoscope },
      { title: 'إدارة العيادات', url: '/clinics-management', icon: Activity }
    ]
  },
  {
    title: 'إدارة المرضى',
    icon: UserPlus,
    items: [
      { title: 'إدارة ملفات المرضى', url: '/patient-files', icon: FolderOpen },
      { title: 'جلسات المريض', url: '/patient-sessions', icon: Clock },
      { title: 'إدارة الفواتير', url: '/invoices', icon: CreditCard },
      { title: 'عرض الفواتير المحدودة', url: '/limited-invoices', icon: Archive }
    ]
  },
  {
    title: 'الرسائل القصيرة',
    url: '/messages',
    icon: MessageSquare,
    badge: null
  },
  {
    title: 'المخزون',
    icon: Archive,
    items: [
      { title: 'إدارة المخزون', url: '/inventory', icon: Archive },
      { title: 'عرض المخزون', url: '/inventory-view', icon: BarChart3 }
    ]
  },
  {
    title: 'إدارة العيادة',
    icon: Activity,
    items: [
      { title: 'إدارة المخزونات', url: '/clinic-inventory', icon: Archive },
      { title: 'إرسال بريد إلكتروني', url: '/email', icon: MessageSquare },
      { title: 'نسخ احتياطية', url: '/backups', icon: Archive }
    ]
  },
  {
    title: 'التقارير',
    icon: BarChart3,
    items: [
      { title: 'تقارير المرضى', url: '/patient-reports', icon: FileText },
      { title: 'تقارير الفواتير', url: '/invoice-reports', icon: CreditCard },
      { title: 'تقارير المصروفات', url: '/expense-reports', icon: BarChart3 },
      { title: 'الأرباح والخسائل', url: '/profit-loss', icon: Activity },
      { title: 'مجموع الدخل اليومي', url: '/daily-income', icon: Activity }
    ]
  },
  {
    title: 'لوحة التحكم',
    url: '/control-panel',
    icon: Settings,
    badge: null
  },
  {
    title: 'مساعدة',
    icon: HelpCircle,
    items: [
      { title: 'مشاهدة الفيديو', url: '/help-video', icon: FileText },
      { title: 'الدعم التقني', url: '/technical-support', icon: MessageSquare },
      { title: 'عن التطبيق', url: '/about', icon: HelpCircle },
      { title: 'عن فاست ميديا', url: '/about-fastmedia', icon: Activity }
    ]
  }
]

export function AppSidebar() {
  const { open, isMobile } = useSidebar()
  const location = useLocation()
  const currentPath = location.pathname
  const [openGroups, setOpenGroups] = useState<string[]>(['الرئيسية'])
  const isCollapsed = !open && !isMobile

  const isActive = (path: string) => currentPath === path
  
  const isGroupActive = (items?: Array<{url: string}>) => {
    return items?.some(item => isActive(item.url)) || false
  }

  const toggleGroup = (groupTitle: string) => {
    setOpenGroups(prev => 
      prev.includes(groupTitle) 
        ? prev.filter(g => g !== groupTitle)
        : [...prev, groupTitle]
    )
  }

  const getNavClassName = (active: boolean) => 
    active 
      ? "bg-primary/10 text-primary border-r-2 border-primary font-medium" 
      : "hover:bg-muted/50 text-muted-foreground hover:text-foreground"

  return (
    <Sidebar side="right" className={isCollapsed ? 'w-16' : 'w-80'} collapsible="icon">
      <SidebarContent className="px-2 py-4">
        {/* User Profile */}
        {!isCollapsed && (
          <div className="px-4 py-6 border-b border-border mb-4">
            <div className="flex items-center gap-3">
              <Avatar className="h-10 w-10">
                <AvatarImage src="/placeholder-user.jpg" />
                <AvatarFallback className="bg-primary/10 text-primary font-medium">
                  أح
                </AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <p className="text-sm font-medium">Admin</p>
                <p className="text-xs text-muted-foreground">مدير النظام</p>
              </div>
              <Badge variant="secondary" className="text-xs">
                نشط
              </Badge>
            </div>
          </div>
        )}

        {/* Navigation Menu */}
        <SidebarGroup>
          <SidebarMenu>
            {menuItems.map((item) => (
              <SidebarMenuItem key={item.title}>
                {item.items ? (
                  <Collapsible 
                    open={openGroups.includes(item.title)}
                    onOpenChange={() => toggleGroup(item.title)}
                  >
                    <CollapsibleTrigger asChild>
                      <SidebarMenuButton 
                        className={`w-full justify-between ${getNavClassName(isGroupActive(item.items))}`}
                      >
                        <div className="flex items-center gap-3">
                          <item.icon className="h-4 w-4" />
                          {!isCollapsed && <span>{item.title}</span>}
                        </div>
                        {!isCollapsed && (
                          <div className={`transition-transform duration-200 ${
                            openGroups.includes(item.title) ? 'rotate-90' : ''
                          }`}>
                            ▶
                          </div>
                        )}
                      </SidebarMenuButton>
                    </CollapsibleTrigger>
                    
                    {!isCollapsed && (
                      <CollapsibleContent>
                        <SidebarMenuSub>
                          {item.items.map((subItem) => (
                            <SidebarMenuSubItem key={subItem.title}>
                              <SidebarMenuSubButton asChild>
                                <NavLink 
                                  to={subItem.url} 
                                  className={({ isActive }) => `flex items-center gap-3 px-4 py-2 text-sm rounded-md transition-colors ${
                                    isActive 
                                      ? 'bg-primary/10 text-primary font-medium' 
                                      : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
                                  }`}
                                >
                                  <subItem.icon className="h-3 w-3" />
                                  <span>{subItem.title}</span>
                                </NavLink>
                              </SidebarMenuSubButton>
                            </SidebarMenuSubItem>
                          ))}
                        </SidebarMenuSub>
                      </CollapsibleContent>
                    )}
                  </Collapsible>
                ) : (
                  <SidebarMenuButton asChild>
                    <NavLink 
                      to={item.url || '#'} 
                      className={({ isActive }) => `flex items-center gap-3 w-full ${getNavClassName(isActive)}`}
                    >
                      <item.icon className="h-4 w-4" />
                      {!isCollapsed && (
                        <div className="flex items-center justify-between flex-1">
                          <span>{item.title}</span>
                          {item.badge && (
                            <Badge variant="secondary" className="text-xs">
                              {item.badge}
                            </Badge>
                          )}
                        </div>
                      )}
                    </NavLink>
                  </SidebarMenuButton>
                )}
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>

      {/* Footer */}
      <SidebarFooter className="p-4 border-t border-border">
        {!isCollapsed && (
          <div className="space-y-2">
            <Button variant="outline" className="w-full justify-start" size="sm">
              <Settings className="h-4 w-4 ml-2" />
              الإعدادات
            </Button>
            <Button variant="ghost" className="w-full justify-start text-destructive hover:text-destructive" size="sm">
              <LogOut className="h-4 w-4 ml-2" />
              تسجيل الخروج
            </Button>
          </div>
        )}
        {isCollapsed && (
          <div className="flex flex-col gap-2">
            <Button variant="ghost" size="sm" className="p-2">
              <Settings className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="sm" className="p-2 text-destructive hover:text-destructive">
              <LogOut className="h-4 w-4" />
            </Button>
          </div>
        )}
      </SidebarFooter>
    </Sidebar>
  )
}