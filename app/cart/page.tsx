'use client';

import { useState } from 'react';
import { Header } from '@/components/header';
import { BottomNav } from '@/components/bottom-nav';
import { products } from '@/lib/mock-data';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Trash2, Plus, Minus, ShoppingBag } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

interface CartItem {
  product: typeof products[0];
  quantity: number;
}

export default function CartPage() {
  const [cartItems, setCartItems] = useState<CartItem[]>([
    { product: products[0], quantity: 1 },
    { product: products[1], quantity: 2 },
  ]);

  const updateQuantity = (id: string, delta: number) => {
    setCartItems((items) =>
      items
        .map((item) =>
          item.product.id === id
            ? { ...item, quantity: Math.max(0, item.quantity + delta) }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const removeItem = (id: string) => {
    setCartItems((items) => items.filter((item) => item.product.id !== id));
  };

  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );
  const shipping = subtotal > 100 ? 0 : 5;
  const total = subtotal + shipping;

  return (
    <div dir="rtl" className="min-h-screen bg-background pb-20 md:pb-0">
      <Header />

      <main className="container mx-auto px-4 py-6 max-w-6xl">
        <h1 className="text-2xl md:text-3xl font-bold mb-6">سلة التسوق</h1>

        {cartItems.length === 0 ? (
          <Card className="text-center py-16">
            <CardContent>
              <ShoppingBag className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
              <h2 className="text-xl font-semibold mb-2">سلة التسوق فارغة</h2>
              <p className="text-muted-foreground mb-6">ابدأ بإضافة منتجات إلى السلة</p>
              <Link href="/">
                <Button>تابع التسوق</Button>
              </Link>
            </CardContent>
          </Card>
        ) : (
          <div className="grid md:grid-cols-3 gap-6">
            {/* Cart Items */}
            <div className="md:col-span-2 space-y-4">
              {cartItems.map((item) => (
                <Card key={item.product.id}>
                  <CardContent className="p-4">
                    <div className="flex gap-4">
                      <div className="relative h-24 w-24 flex-shrink-0 overflow-hidden rounded-lg bg-muted">
                        <Image
                          src={item.product.image || "/placeholder.svg"}
                          alt={item.product.name}
                          fill
                          className="object-cover"
                        />
                      </div>

                      <div className="flex-1 min-w-0">
                        <Link href={`/product/${item.product.id}`}>
                          <h3 className="font-semibold mb-1 hover:text-primary transition-colors line-clamp-2">
                            {item.product.name}
                          </h3>
                        </Link>
                        <p className="text-sm text-muted-foreground mb-2">
                          by {String(item.product.seller?.name ?? item.product.seller)}
                        </p>
                        <div className="flex items-center justify-between">
                          <p className="text-lg font-bold text-primary">
                            {item.product.price} π
                          </p>
                          <div className="flex items-center gap-2">
                            <Button
                              variant="outline"
                              size="icon"
                              className="h-8 w-8"
                              onClick={() => updateQuantity(item.product.id, -1)}
                            >
                              <Minus className="h-3 w-3" />
                            </Button>
                            <span className="w-8 text-center font-medium">
                              {item.quantity}
                            </span>
                            <Button
                              variant="outline"
                              size="icon"
                              className="h-8 w-8"
                              onClick={() => updateQuantity(item.product.id, 1)}
                            >
                              <Plus className="h-3 w-3" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8 text-destructive hover:text-destructive"
                              onClick={() => removeItem(item.product.id)}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}

              <Link href="/">
                <Button variant="outline" className="w-full">
                  Continue Shopping
                </Button>
              </Link>
            </div>

            {/* Order Summary */}
            <div className="md:col-span-1">
              <Card className="sticky top-20">
                <CardHeader>
                  <CardTitle>ملخص الطلب</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">المجموع الفرعي</span>
                      <span className="font-medium">{subtotal.toFixed(2)} π</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">تكلفة الشحن</span>
                      <span className="font-medium">
                        {shipping === 0 ? 'مجاني' : `${shipping.toFixed(2)} π`}
                      </span>
                    </div>
                    {subtotal < 100 && (
                      <p className="text-xs text-muted-foreground">
                        أضف {(100 - subtotal).toFixed(2)} π أخرى للحصول على شحن مجاني
                      </p>
                    )}
                    <div className="border-t pt-2 flex justify-between font-semibold text-lg">
                      <span>الإجمالي</span>
                      <span className="text-primary">{total.toFixed(2)} π</span>
                    </div>
                  </div>

                  <Button className="w-full" size="lg">
                    الدفع عبر Pi
                  </Button>

                  <div className="text-center">
                    <p className="text-xs text-muted-foreground">
                      Secure payment via Pi Network
                    </p>
                  </div>

                  {/* Promo Code */}
                  <div className="border-t pt-4">
                    <details className="group">
                        <summary className="text-sm font-medium cursor-pointer flex justify-between items-center">
                          هل لديك رمز خصم؟
                          <span className="group-open:rotate-180 transition-transform">
                            ▼
                          </span>
                        </summary>
                      <div className="mt-3 space-y-2">
                        <input
                          type="text"
                          placeholder="أدخل الرمز"
                          className="w-full px-3 py-2 text-sm border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                        />
                        <Button variant="outline" size="sm" className="w-full">
                          Apply
                        </Button>
                      </div>
                    </details>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        )}
      </main>

      <BottomNav />
    </div>
  );
}
