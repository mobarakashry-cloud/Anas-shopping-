"use client";

import { useState } from "react";
import { BottomNav } from "@/components/bottom-nav";
import { products } from "@/lib/mock-data";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Heart,
  Share2,
  Star,
  ShoppingCart,
  Globe,
  Video,
  ChevronLeft,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";

export default function ProductDetailPage() {
  const params = useParams() as { id?: string } | null;
  const router = useRouter();
  const [quantity, setQuantity] = useState(1);
  const [selectedLanguage, setSelectedLanguage] = useState("ar");
  const [selectedImage, setSelectedImage] = useState(0);

  const id = params?.id;
  const product = id ? products.find((p) => p.id === id) : undefined;
  const inStock = !!product && product.quantity > 0;
  const productViews = product?.reviews ?? 0;

  if (!product) {
    return (
      <div className="min-h-screen bg-background">
        {/* Header is rendered globally in layout as a server component */}
        <div className="container mx-auto px-4 py-16 text-center">
          <h1 className="text-2xl font-bold mb-4">المنتج غير موجود</h1>
          <Button onClick={() => router.push("/")}>العودة للرئيسية</Button>
        </div>
      </div>
    );
  }

  const images = Array.isArray(product.images) && product.images.length > 0 ? product.images : [product.image || "/placeholder.svg"];

  return (
    <div dir={selectedLanguage === "ar" ? "rtl" : "ltr"} className="min-h-screen bg-background pb-20 md:pb-0">
      {/* Header is rendered globally in layout as a server component */}
      <main className="container mx-auto px-4 py-4 max-w-6xl">
        <Button variant="ghost" size="sm" className="mb-4" onClick={() => router.back()}>
          <ChevronLeft className="h-4 w-4 mr-1" />
          العودة
        </Button>

        <div className="grid md:grid-cols-2 gap-6 mb-6">
          <div className="space-y-4">
            <div className="relative aspect-square overflow-hidden rounded-lg bg-muted">
              <Image src={images[selectedImage]} alt={product.name} fill className="object-cover" />
              <Badge className="absolute top-4 left-4 capitalize">{product.condition}</Badge>
            </div>

            {images.length > 1 && (
              <div className="flex items-center gap-2">
                <Button variant="ghost" size="icon" onClick={() => setSelectedImage((i) => Math.max(0, i - 1))}>◀</Button>
                <div className="flex gap-2 overflow-x-auto">
                  {images.map((img, idx) => (
                    <button key={idx} onClick={() => setSelectedImage(idx)} className={`h-12 w-12 rounded-md overflow-hidden border ${selectedImage === idx ? "ring-2 ring-primary" : ""}`}>
                      <img src={img} alt={`${product.name} ${idx + 1}`} className="h-full w-full object-cover" />
                    </button>
                  ))}
                </div>
                <Button variant="ghost" size="icon" onClick={() => setSelectedImage((i) => Math.min(images.length - 1, i + 1))}>▶</Button>
              </div>
            )}

            {product.video && (
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center gap-2 text-sm">
                    <Video className="h-4 w-4 text-primary" />
                    <span className="font-medium">يتوفر فيديو للمنتج</span>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          <div className="space-y-6">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold mb-2 text-balance">{product.name}</h1>
              <div className="flex items-center gap-4 mb-4">
                <div className="flex items-center gap-1">
                  <Star className="h-4 w-4 fill-accent text-accent" />
                  <span className="font-medium">{product.rating}</span>
                  <span className="text-muted-foreground">({productViews} تقييم)</span>
                </div>
                <Badge variant="outline">{inStock ? "متوفر" : "غير متوفر"}</Badge>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="icon">
                  <Heart className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="icon">
                  <Share2 className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="icon" onClick={() => setSelectedLanguage(selectedLanguage === "en" ? "ar" : "en")}>
                  <Globe className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-baseline gap-2 mb-4">
                  <span className="text-3xl font-bold text-primary">{product.price}</span>
                  <span className="text-xl font-medium text-primary">π</span>
                  <span className="text-sm text-muted-foreground ml-2">عملة Pi</span>
                </div>
                <p className="text-sm text-muted-foreground">يباع بواسطة <span className="font-medium text-foreground">{String(product.seller?.name ?? '')}</span></p>
              </CardContent>
            </Card>

            <div className="space-y-3">
              <div className="flex items-center gap-4">
                <span className="text-sm font-medium">الكمية:</span>
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="icon" onClick={() => setQuantity(Math.max(1, quantity - 1))}>-</Button>
                  <span className="w-12 text-center font-medium">{quantity}</span>
                  <Button variant="outline" size="icon" onClick={() => setQuantity(quantity + 1)}>+</Button>
                </div>
              </div>

              <Link href="/cart">
                <Button className="w-full" size="lg">
                  <ShoppingCart className="h-4 w-4 mr-2" /> أضف إلى السلة
                </Button>
              </Link>
              <Button className="w-full" size="lg" variant="secondary">اشترِ الآن بـ Pi</Button>
            </div>

            <Card className="bg-primary/5 border-primary/20">
              <CardContent className="p-4">
                <div className="flex items-center gap-2 text-sm">
                  <span className="text-primary font-medium">✨ موصى به بواسطة الذكاء الاصطناعي</span>
                  <span className="text-muted-foreground">بناءً على تفضيلاتك</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        <Tabs defaultValue="description" className="w-full">
          <TabsList className="w-full grid grid-cols-3">
            <TabsTrigger value="description">الوصف</TabsTrigger>
            <TabsTrigger value="seller">معلومات البائع</TabsTrigger>
            <TabsTrigger value="reviews">التقييمات</TabsTrigger>
          </TabsList>

          <TabsContent value="description" className="mt-6">
            <Card>
              <CardContent className="p-6">
                <h3 className="font-semibold mb-4">وصف المنتج</h3>
                <p className="text-muted-foreground leading-relaxed">{product.description}</p>
                <div className="mt-6 space-y-2">
                  <div className="flex justify-between py-2 border-b">
                    <span className="text-muted-foreground">الفئة</span>
                    <span className="font-medium capitalize">{product.category}</span>
                  </div>
                  <div className="flex justify-between py-2 border-b">
                    <span className="text-muted-foreground">الحالة</span>
                    <span className="font-medium capitalize">{product.condition}</span>
                  </div>
                  <div className="flex justify-between py-2">
                    <span className="text-muted-foreground">حالة المخزون</span>
                    <span className="font-medium">{product.quantity > 0 ? 'متوفر' : 'غير متوفر'}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="seller" className="mt-6">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center gap-4 mb-6">
                  <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center text-2xl font-bold text-primary">{product.seller.name.charAt(0)}</div>
                  <div>
                    <h3 className="font-semibold text-lg">{product.seller.name}</h3>
                    <div className="flex items-center gap-1 text-sm">
                      <Star className="h-3 w-3 fill-accent text-accent" />
                      <span>{product.seller.rating} تقييم البائع</span>
                    </div>
                  </div>
                </div>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between"><span className="text-muted-foreground">المنتجات المدرجة</span><span className="font-medium">127</span></div>
                  <div className="flex justify-between"><span className="text-muted-foreground">زمن الرد</span><span className="font-medium">خلال ساعتين</span></div>
                  <div className="flex justify-between"><span className="text-muted-foreground">عضو منذ</span><span className="font-medium">Jan 2024</span></div>
                </div>
                <Button className="w-full mt-6" variant="outline">اتصل بالبائع</Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="reviews" className="mt-6">
            <Card>
              <CardContent className="p-6">
                <h3 className="font-semibold mb-4">تقييمات العملاء</h3>
                <div className="space-y-4">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="pb-4 border-b last:border-0">
                      <div className="flex items-center gap-2 mb-2">
                        <div className="flex">{[...Array(5)].map((_, j) => (<Star key={j} className="h-3 w-3 fill-accent text-accent" />))}</div>
                        <span className="font-medium text-sm">منتج رائع!</span>
                      </div>
                      <p className="text-sm text-muted-foreground mb-2">جودة ممتازة وشحن سريع. موصى به بشدة!</p>
                      <span className="text-xs text-muted-foreground">John D. • منذ يومين</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>

      <BottomNav />
    </div>
  );
}
