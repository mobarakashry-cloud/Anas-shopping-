'use client';

import { useState } from 'react';
import { Header } from '@/components/header';
import { BottomNav } from '@/components/bottom-nav';
import { products } from '@/lib/mock-data';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Heart, Share2, Star, ShoppingCart, Globe, Video, ChevronLeft } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';

export default function ProductDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [quantity, setQuantity] = useState(1);
  const [selectedLanguage, setSelectedLanguage] = useState('en');
  
  const product = products.find((p) => p.id === params.id);

  if (!product) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container mx-auto px-4 py-16 text-center">
          <h1 className="text-2xl font-bold mb-4">Product not found</h1>
          <Button onClick={() => router.push('/')}>Back to Home</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background pb-20 md:pb-0">
      <Header />

      <main className="container mx-auto px-4 py-4 max-w-6xl">
        {/* Back Button */}
        <Button
          variant="ghost"
          size="sm"
          className="mb-4"
          onClick={() => router.back()}
        >
          <ChevronLeft className="h-4 w-4 mr-1" />
          Back
        </Button>

        <div className="grid md:grid-cols-2 gap-6 mb-6">
          {/* Product Image */}
          <div className="space-y-4">
            <div className="relative aspect-square overflow-hidden rounded-lg bg-muted">
              <Image
                src={product.image || "/placeholder.svg"}
                alt={product.name}
                fill
                className="object-cover"
              />
              <Badge className="absolute top-4 left-4 capitalize">
                {product.condition}
              </Badge>
            </div>

            {/* Video Preview */}
            {product.videoUrl && (
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center gap-2 text-sm">
                    <Video className="h-4 w-4 text-primary" />
                    <span className="font-medium">Product Video Available</span>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            {/* Title and Actions */}
            <div>
              <h1 className="text-2xl md:text-3xl font-bold mb-2 text-balance">
                {product.name}
              </h1>
              <div className="flex items-center gap-4 mb-4">
                <div className="flex items-center gap-1">
                  <Star className="h-4 w-4 fill-accent text-accent" />
                  <span className="font-medium">{product.rating}</span>
                  <span className="text-muted-foreground">({product.reviews} reviews)</span>
                </div>
                <Badge variant="outline">{product.inStock ? 'In Stock' : 'Out of Stock'}</Badge>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="icon">
                  <Heart className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="icon">
                  <Share2 className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="icon" onClick={() => setSelectedLanguage(selectedLanguage === 'en' ? 'ar' : 'en')}>
                  <Globe className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Price */}
            <Card>
              <CardContent className="p-6">
                <div className="flex items-baseline gap-2 mb-4">
                  <span className="text-3xl font-bold text-primary">{product.price}</span>
                  <span className="text-xl font-medium text-primary">π</span>
                  <span className="text-sm text-muted-foreground ml-2">Pi Currency</span>
                </div>
                <p className="text-sm text-muted-foreground">
                  Sold by <span className="font-medium text-foreground">{product.seller}</span>
                </p>
              </CardContent>
            </Card>

            {/* Quantity and Actions */}
            <div className="space-y-3">
              <div className="flex items-center gap-4">
                <span className="text-sm font-medium">Quantity:</span>
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  >
                    -
                  </Button>
                  <span className="w-12 text-center font-medium">{quantity}</span>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => setQuantity(quantity + 1)}
                  >
                    +
                  </Button>
                </div>
              </div>

              <Link href="/cart">
                <Button className="w-full" size="lg">
                  <ShoppingCart className="h-4 w-4 mr-2" />
                  Add to Cart
                </Button>
              </Link>
              <Button className="w-full" size="lg" variant="secondary">
                Buy Now with Pi
              </Button>
            </div>

            {/* AI Recommendation Badge */}
            <Card className="bg-primary/5 border-primary/20">
              <CardContent className="p-4">
                <div className="flex items-center gap-2 text-sm">
                  <span className="text-primary font-medium">✨ AI Recommended</span>
                  <span className="text-muted-foreground">Based on your preferences</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Product Details Tabs */}
        <Tabs defaultValue="description" className="w-full">
          <TabsList className="w-full grid grid-cols-3">
            <TabsTrigger value="description">Description</TabsTrigger>
            <TabsTrigger value="seller">Seller Info</TabsTrigger>
            <TabsTrigger value="reviews">Reviews</TabsTrigger>
          </TabsList>

          <TabsContent value="description" className="mt-6">
            <Card>
              <CardContent className="p-6">
                <h3 className="font-semibold mb-4">Product Description</h3>
                <p className="text-muted-foreground leading-relaxed">
                  {product.description}
                </p>
                <div className="mt-6 space-y-2">
                  <div className="flex justify-between py-2 border-b">
                    <span className="text-muted-foreground">Category</span>
                    <span className="font-medium capitalize">{product.category}</span>
                  </div>
                  <div className="flex justify-between py-2 border-b">
                    <span className="text-muted-foreground">Condition</span>
                    <span className="font-medium capitalize">{product.condition}</span>
                  </div>
                  <div className="flex justify-between py-2">
                    <span className="text-muted-foreground">Stock Status</span>
                    <span className="font-medium">{product.inStock ? 'Available' : 'Out of Stock'}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="seller" className="mt-6">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center gap-4 mb-6">
                  <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center text-2xl font-bold text-primary">
                    {product.seller.charAt(0)}
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg">{product.seller}</h3>
                    <div className="flex items-center gap-1 text-sm">
                      <Star className="h-3 w-3 fill-accent text-accent" />
                      <span>4.8 seller rating</span>
                    </div>
                  </div>
                </div>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Products Listed</span>
                    <span className="font-medium">127</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Response Time</span>
                    <span className="font-medium">Within 2 hours</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Member Since</span>
                    <span className="font-medium">Jan 2024</span>
                  </div>
                </div>
                <Button className="w-full mt-6" variant="outline">
                  Contact Seller
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="reviews" className="mt-6">
            <Card>
              <CardContent className="p-6">
                <h3 className="font-semibold mb-4">Customer Reviews</h3>
                <div className="space-y-4">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="pb-4 border-b last:border-0">
                      <div className="flex items-center gap-2 mb-2">
                        <div className="flex">
                          {[...Array(5)].map((_, j) => (
                            <Star key={j} className="h-3 w-3 fill-accent text-accent" />
                          ))}
                        </div>
                        <span className="font-medium text-sm">Amazing product!</span>
                      </div>
                      <p className="text-sm text-muted-foreground mb-2">
                        Great quality and fast shipping. Highly recommended!
                      </p>
                      <span className="text-xs text-muted-foreground">John D. • 2 days ago</span>
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
