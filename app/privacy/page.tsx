'use client';
import { BottomNav } from '@/components/bottom-nav';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ChevronLeft, Shield, Lock, Eye, FileText, Mail, RefreshCw } from 'lucide-react';
import Link from 'next/link';

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-background pb-20 md:pb-0">
      {/* Header is rendered globally in layout as a server component */}

      <main className="container mx-auto px-4 py-6 max-w-4xl">
        <Link href="/profile">
          <Button variant="ghost" className="mb-4">
            <ChevronLeft className="h-4 w-4 mr-2" />
            Back to Profile
          </Button>
        </Link>

        <Card className="mb-6">
          <CardHeader className="text-center">
            <div className="mx-auto mb-4 h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center">
              <Shield className="h-8 w-8 text-primary" />
            </div>
            <CardTitle className="text-2xl">سياسة الخصوصية لتطبيق Anas Shopping</CardTitle>
            <p className="text-sm text-muted-foreground mt-2">
              تاريخ السريان: 15 نوفمبر 2025
            </p>
          </CardHeader>
          <CardContent className="space-y-6 text-right" dir="rtl">
            <p className="text-muted-foreground leading-relaxed">
              نحن في Anas Shopping نحترم خصوصيتك ونلتزم بحماية بياناتك أثناء استخدامك للتطبيق. توضح هذه السياسة كيفية جمع المعلومات، استخدامها، ومشاركتها.
            </p>

            {/* Section 1 */}
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <FileText className="h-5 w-5 text-primary flex-shrink-0" />
                <h3 className="text-lg font-semibold">1. البيانات التي نجمعها</h3>
              </div>
              <div className="pr-8 space-y-2">
                <p className="text-sm leading-relaxed">
                  <strong>المعلومات الشخصية:</strong> الاسم، البريد الإلكتروني، رقم الهاتف، وعنوان الشحن عند إنشاء الحساب أو تقديم الطلبات.
                </p>
                <p className="text-sm leading-relaxed">
                  <strong>المعلومات التقنية:</strong> نوع الجهاز، نظام التشغيل، عنوان IP، وسجل النشاط داخل التطبيق.
                </p>
                <p className="text-sm leading-relaxed">
                  <strong>المعاملات المالية:</strong> بيانات الدفع عند استخدام شبكة Pi أو طرق الدفع الأخرى، لضمان إتمام عمليات الشراء بأمان.
                </p>
                <p className="text-sm leading-relaxed">
                  <strong>المحتوى الذي تنشئه:</strong> تقييمات، مراجعات، أو صور ترفعها للمنتجات.
                </p>
              </div>
            </div>

            {/* Section 2 */}
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <Eye className="h-5 w-5 text-primary flex-shrink-0" />
                <h3 className="text-lg font-semibold">2. كيفية استخدام البيانات</h3>
              </div>
              <div className="pr-8 space-y-2">
                <ul className="text-sm space-y-1 list-disc list-inside">
                  <li>إدارة حسابك وإتمام الطلبات.</li>
                  <li>إرسال إشعارات حول العروض، الطلبات، والتحديثات المهمة.</li>
                  <li>تحليل النشاط لتحسين تجربة التسوق وتطوير التطبيق.</li>
                  <li>معالجة المدفوعات وإصدار الفواتير.</li>
                </ul>
              </div>
            </div>

            {/* Section 3 */}
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <FileText className="h-5 w-5 text-primary flex-shrink-0" />
                <h3 className="text-lg font-semibold">3. مشاركة البيانات</h3>
              </div>
              <div className="pr-8 space-y-2">
                <ul className="text-sm space-y-1 list-disc list-inside">
                  <li>قد نشارك المعلومات مع مزودي خدمات الدفع والشحن لضمان توصيل الطلبات.</li>
                  <li>شركائنا التقنيين لتحسين أداء التطبيق وتجربة المستخدم.</li>
                  <li>الجهات القانونية إذا تطلب القانون ذلك أو لحماية حقوق التطبيق.</li>
                </ul>
              </div>
            </div>

            {/* Section 4 */}
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <Lock className="h-5 w-5 text-primary flex-shrink-0" />
                <h3 className="text-lg font-semibold">4. حماية البيانات</h3>
              </div>
              <div className="pr-8">
                <p className="text-sm leading-relaxed">
                  نطبق إجراءات أمنية متقدمة لحماية بياناتك من الوصول غير المصرح به أو السرقة أو التعديل.
                </p>
              </div>
            </div>

            {/* Section 5 */}
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <FileText className="h-5 w-5 text-primary flex-shrink-0" />
                <h3 className="text-lg font-semibold">5. ملفات تعريف الارتباط (Cookies)</h3>
              </div>
              <div className="pr-8">
                <p className="text-sm leading-relaxed">
                  يستخدم التطبيق ملفات تعريف الارتباط لتحسين تجربة المستخدم، مثل حفظ تفضيلات اللغة والعروض المخصصة.
                </p>
              </div>
            </div>

            {/* Section 6 */}
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <Shield className="h-5 w-5 text-primary flex-shrink-0" />
                <h3 className="text-lg font-semibold">6. حقوق المستخدمين</h3>
              </div>
              <div className="pr-8 space-y-2">
                <ul className="text-sm space-y-1 list-disc list-inside">
                  <li>الوصول إلى بياناتك الشخصية وتحديثها.</li>
                  <li>طلب حذف حسابك أو معلوماتك.</li>
                  <li>إلغاء الاشتراك من الرسائل أو الإشعارات الترويجية.</li>
                </ul>
              </div>
            </div>

            {/* Section 7 */}
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <FileText className="h-5 w-5 text-primary flex-shrink-0" />
                <h3 className="text-lg font-semibold">7. تغييرات سياسة الخصوصية</h3>
              </div>
              <div className="pr-8">
                <p className="text-sm leading-relaxed">
                  يجوز لنا تعديل هذه السياسة من وقت لآخر، وسيتم إشعار المستخدمين بأي تغييرات مهمة.
                </p>
              </div>
            </div>

            {/* Section 8 */}
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <Mail className="h-5 w-5 text-primary flex-shrink-0" />
                <h3 className="text-lg font-semibold">8. الاتصال بنا</h3>
              </div>
              <div className="pr-8 space-y-2">
                <p className="text-sm leading-relaxed">
                  <strong>المطور:</strong> 2809mobarak2809
                </p>
                <p className="text-sm leading-relaxed">
                  <strong>البريد الإلكتروني:</strong>{' '}
                  <a href="mailto:mobarak.ashry@gmail.com" className="text-primary hover:underline">
                    mobarak.ashry@gmail.com
                  </a>
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="mb-6">
          <CardHeader className="text-center">
            <div className="mx-auto mb-4 h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center">
              <RefreshCw className="h-8 w-8 text-primary" />
            </div>
            <CardTitle className="text-2xl">Any Changes to Your App</CardTitle>
            <p className="text-sm text-muted-foreground mt-2">
              English Version - Professional & Clear
            </p>
          </CardHeader>
          <CardContent className="space-y-4 text-left">
            <p className="text-muted-foreground leading-relaxed">
              We may update the app from time to time to improve performance, add new features, or enhance security. Whenever an important change is made, you will receive a notification inside the app so you are always informed. We are committed to transparency and will make sure you clearly understand how any updates affect your experience.
            </p>
            
            <div className="bg-primary/5 rounded-lg p-4 border border-primary/10">
              <h4 className="font-semibold text-sm mb-2">What to Expect:</h4>
              <ul className="text-sm space-y-1 list-disc list-inside text-muted-foreground">
                <li>Performance improvements and bug fixes</li>
                <li>New features and enhanced functionality</li>
                <li>Security updates to protect your data</li>
                <li>In-app notifications for important changes</li>
              </ul>
            </div>
          </CardContent>
        </Card>
      </main>

      <BottomNav />
    </div>
  );
}
