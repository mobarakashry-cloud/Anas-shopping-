'use client';

import { useState } from 'react';
import { BottomNav } from '@/components/bottom-nav';
import { products, categories } from '@/lib/mock-data';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { User, Heart, Package, Settings, Bell, Globe, LogOut, Edit, MessageCircle, Star, ShoppingBag, Shield } from 'lucide-react';
import { ProductCard } from '@/components/product-card';
import Link from 'next/link';

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState('favorites');
  const favoriteProducts = products.slice(0, 4);
  const orderHistory = products.slice(0, 3);

  return (
    <div className="min-h-screen bg-background pb-20 md:pb-0">
      <Header />

      <main className="container mx-auto px-4 py-6 max-w-7xl">
        {/* Profile Header */}
        <Card className="mb-6">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row gap-6 items-start md:items-center">
              <Avatar className="h-24 w-24">
                <AvatarImage src="/placeholder-user.jpg" />
                <AvatarFallback className="text-2xl">JD</AvatarFallback>
              </Avatar>

              <div className="flex-1">
                <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-4 mb-2">
                  <h1 className="text-2xl font-bold">John Doe</h1>
                  <Badge variant="secondary" className="w-fit">
                    <Star className="h-3 w-3 mr-1 fill-current" />
                    Verified Seller
                  </Badge>
                </div>
                <p className="text-muted-foreground mb-4">
                  Member since January 2024 • johndoe@email.com
                </p>
                <div className="flex flex-wrap gap-4 text-sm">
                  <div>
                    <span className="font-semibold">47</span>
                    <span className="text-muted-foreground"> Orders</span>
                  </div>
                  <div>
                    <span className="font-semibold">24</span>
                    <span className="text-muted-foreground"> Products Listed</span>
                  </div>
                  <div>
                    <span className="font-semibold">4.8</span>
                    <span className="text-muted-foreground"> Rating</span>
                  </div>
                </div>
              </div>

              <Button variant="outline" className="w-full md:w-auto">
                <Edit className="h-4 w-4 mr-2" />
                Edit Profile
              </Button>
            </div>
          </CardContent>
        </Card>

          {/* Categories for user (same as main categories) */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-2">Categories</h3>
            <div className="flex gap-3 overflow-x-auto px-1">
              {categories.map((c) => (
                <Link key={c.id} href={`/search?category=${encodeURIComponent(c.id)}`} className="flex-shrink-0">
                  <span className="px-3 py-2 rounded-lg bg-gradient-to-r from-purple-600 to-purple-500 text-amber-100 text-sm font-medium shadow-sm">
                    {c.name}
                  </span>
                </Link>
              ))}
            </div>
          </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="w-full grid grid-cols-4 mb-6">
            <TabsTrigger value="favorites">
              <Heart className="h-4 w-4 mr-2" />
              <span className="hidden sm:inline">Favorites</span>
            </TabsTrigger>
            <TabsTrigger value="orders">
              <ShoppingBag className="h-4 w-4 mr-2" />
              <span className="hidden sm:inline">Orders</span>
            </TabsTrigger>
            <TabsTrigger value="messages">
              <MessageCircle className="h-4 w-4 mr-2" />
              <span className="hidden sm:inline">Messages</span>
            </TabsTrigger>
            <TabsTrigger value="settings">
              <Settings className="h-4 w-4 mr-2" />
              <span className="hidden sm:inline">Settings</span>
            </TabsTrigger>
          </TabsList>

          {/* Favorites Tab */}
          <TabsContent value="favorites">
            <div className="mb-4">
              <h2 className="text-xl font-semibold mb-2">My Favorites</h2>
              <p className="text-sm text-muted-foreground">
                {favoriteProducts.length} saved items
              </p>
            </div>

            {favoriteProducts.length === 0 ? (
              <Card className="text-center py-16">
                <CardContent>
                  <Heart className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
                  <h3 className="text-xl font-semibold mb-2">No favorites yet</h3>
                  <p className="text-muted-foreground mb-6">
                    Start adding products to your favorites!
                  </p>
                </CardContent>
              </Card>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {favoriteProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            )}
          </TabsContent>

          {/* Orders Tab */}
          <TabsContent value="orders">
            <div className="mb-4">
              <h2 className="text-xl font-semibold mb-2">Order History</h2>
              <p className="text-sm text-muted-foreground">
                Track and manage your orders
              </p>
            </div>

            <div className="space-y-4">
              {orderHistory.map((product, index) => (
                <Card key={product.id}>
                  <CardContent className="p-4">
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <p className="text-sm font-medium">Order #{1000 + index}</p>
                        <p className="text-xs text-muted-foreground">
                          Placed on Jan {15 + index}, 2024
                        </p>
                      </div>
                      <Badge variant={index === 0 ? 'default' : 'secondary'}>
                        {index === 0 ? 'Delivered' : 'In Transit'}
                      </Badge>
                    </div>

                    <div className="flex gap-4">
                      <div className="relative h-20 w-20 flex-shrink-0 overflow-hidden rounded-lg bg-muted">
                        <img
                          src={product.image || "/placeholder.svg"}
                          alt={product.name}
                          className="object-cover h-full w-full"
                        />
                      </div>

                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold mb-1 line-clamp-1">
                          {product.name}
                        </h3>
                        <p className="text-sm text-muted-foreground mb-2">
                          {product.price} π • Qty: 1
                        </p>
                        <div className="flex gap-2">
                          <Button size="sm" variant="outline">
                            Track Order
                          </Button>
                          <Button size="sm" variant="outline">
                            Contact Seller
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Messages Tab */}
          <TabsContent value="messages">
            <Card>
              <CardHeader>
                <CardTitle>Messages</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="flex gap-4 p-4 rounded-lg hover:bg-muted cursor-pointer transition-colors">
                      <Avatar>
                        <AvatarFallback>S{i}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1 min-w-0">
                        <div className="flex justify-between items-start mb-1">
                          <p className="font-medium">Seller Name {i}</p>
                          <span className="text-xs text-muted-foreground">2h ago</span>
                        </div>
                        <p className="text-sm text-muted-foreground line-clamp-1">
                          Your order has been shipped and will arrive soon...
                        </p>
                      </div>
                      {i === 1 && (
                        <Badge className="shrink-0">New</Badge>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Settings Tab */}
          <TabsContent value="settings">
            <div className="space-y-6">
              {/* Account Settings */}
              <Card>
                <CardHeader>
                  <CardTitle>Account Settings</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="display-name">Display Name</Label>
                    <Input id="display-name" defaultValue="John Doe" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" defaultValue="johndoe@email.com" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input id="phone" type="tel" defaultValue="+1 234 567 8900" />
                  </div>
                  <Button>Save Changes</Button>
                </CardContent>
              </Card>

              {/* Preferences */}
              <Card>
                <CardHeader>
                  <CardTitle>Preferences</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Bell className="h-5 w-5 text-muted-foreground" />
                      <div>
                        <p className="font-medium">Notifications</p>
                        <p className="text-sm text-muted-foreground">
                          Receive updates about your orders
                        </p>
                      </div>
                    </div>
                    <Button variant="outline" size="sm">Configure</Button>
                  </div>

                  <Separator />

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Globe className="h-5 w-5 text-muted-foreground" />
                      <div>
                        <p className="font-medium">Language</p>
                        <p className="text-sm text-muted-foreground">
                          Choose your preferred language
                        </p>
                      </div>
                    </div>
                    <Button variant="outline" size="sm">English</Button>
                  </div>

                  <Separator />

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Package className="h-5 w-5 text-muted-foreground" />
                      <div>
                        <p className="font-medium">Seller Mode</p>
                        <p className="text-sm text-muted-foreground">
                          Enable selling features
                        </p>
                      </div>
                    </div>
                    <Button variant="outline" size="sm">Enabled</Button>
                  </div>
                </CardContent>
              </Card>

              {/* Support & Feedback */}
              <Card>
                <CardHeader>
                  <CardTitle>Support & Feedback</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button variant="outline" className="w-full justify-start">
                    <MessageCircle className="h-4 w-4 mr-2" />
                    Submit Feedback
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <Package className="h-4 w-4 mr-2" />
                    Report an Issue
                  </Button>
                  <Link href="/privacy" className="block">
                    <Button variant="outline" className="w-full justify-start">
                      <Shield className="h-4 w-4 mr-2" />
                      Privacy Policy
                    </Button>
                  </Link>
                  <Button variant="outline" className="w-full justify-start text-destructive hover:text-destructive">
                    <LogOut className="h-4 w-4 mr-2" />
                    Log Out
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </main>

      <BottomNav />
    </div>
  );
}
