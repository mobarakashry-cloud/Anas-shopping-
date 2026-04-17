'use client'

import { useState } from 'react'
import { BarChart3, Package, Users, MessageSquare, Settings, TrendingUp, ShoppingBag, AlertCircle, Lightbulb, Palette, Wallet, FileText, ChevronRight, DollarSign } from 'lucide-react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import Link from 'next/link'

export default function AdminDashboard() {
  const [selectedTab, setSelectedTab] = useState('overview')

  const stats = [
    { label: 'Total Products', value: '1,234', change: '+12%', icon: Package },
    { label: 'Total Users', value: '5,678', change: '+8%', icon: Users },
    { label: 'Total Sales', value: 'π 45,890', change: '+23%', icon: TrendingUp },
    { label: 'Active Orders', value: '234', change: '+5%', icon: ShoppingBag },
  ]

  const recentOrders = [
    { id: '#12345', customer: 'John Doe', amount: 'π 1,299', status: 'pending' },
    { id: '#12344', customer: 'Jane Smith', amount: 'π 89', status: 'completed' },
    { id: '#12343', customer: 'Bob Wilson', amount: 'π 249', status: 'processing' },
    { id: '#12342', customer: 'Alice Brown', amount: 'π 18,500', status: 'completed' },
  ]

  const complaints = [
    { id: 1, user: 'User123', issue: 'Product not as described', status: 'pending' },
    { id: 2, user: 'User456', issue: 'Delivery delay', status: 'resolved' },
    { id: 3, user: 'User789', issue: 'Payment issue', status: 'pending' },
  ]

  const suggestions = [
    { id: 1, user: 'User321', suggestion: 'Add more payment options', votes: 45 },
    { id: 2, user: 'User654', suggestion: 'Improve search filters', votes: 32 },
    { id: 3, user: 'User987', suggestion: 'Add wishlists feature', votes: 28 },
  ]

  const aiRecommendations = [
    { 
      type: 'marketing', 
      title: 'Promote Electronics Category',
      description: 'Electronics category shows 25% higher engagement this week',
      priority: 'high'
    },
    { 
      type: 'inventory', 
      title: 'Restock Popular Items',
      description: '5 products are running low on inventory',
      priority: 'medium'
    },
    { 
      type: 'pricing', 
      title: 'Adjust Pricing Strategy',
      description: 'Competitive analysis suggests price optimization for Fashion category',
      priority: 'low'
    },
  ]

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b bg-card">
        <div className="px-4 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold">Admin Dashboard</h1>
              <p className="text-sm text-muted-foreground">Manage your marketplace</p>
            </div>
            <Link href="/">
              <Button variant="outline" size="sm">
                View Store
              </Button>
            </Link>
          </div>
        </div>
      </header>

      <main className="px-4 py-6 space-y-6">
        <Tabs value={selectedTab} onValueChange={setSelectedTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-4 lg:grid-cols-6">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="products">Products</TabsTrigger>
            <TabsTrigger value="orders">Orders</TabsTrigger>
            <TabsTrigger value="users">Users</TabsTrigger>
            <TabsTrigger value="feedback">Feedback</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            {/* Stats Grid */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              {stats.map((stat) => {
                const Icon = stat.icon
                return (
                  <Card key={stat.label} className="p-4 space-y-2">
                    <div className="flex items-center justify-between">
                      <Icon className="h-5 w-5 text-muted-foreground" />
                      <Badge variant="secondary" className="text-xs">
                        {stat.change}
                      </Badge>
                    </div>
                    <div>
                      <p className="text-2xl font-bold">{stat.value}</p>
                      <p className="text-xs text-muted-foreground">{stat.label}</p>
                    </div>
                  </Card>
                )
              })}
            </div>

            {/* AI Recommendations */}
            <Card className="p-4 space-y-4">
              <div className="flex items-center gap-2">
                <Lightbulb className="h-5 w-5 text-primary" />
                <h2 className="font-semibold">AI Recommendations</h2>
              </div>
              <div className="space-y-3">
                {aiRecommendations.map((rec) => (
                  <div key={rec.title} className="flex items-start gap-3 p-3 rounded-lg bg-muted/50">
                    <div className="flex-1 space-y-1">
                      <div className="flex items-center gap-2">
                        <p className="font-medium text-sm">{rec.title}</p>
                        <Badge 
                          variant={rec.priority === 'high' ? 'destructive' : rec.priority === 'medium' ? 'default' : 'secondary'}
                          className="text-xs"
                        >
                          {rec.priority}
                        </Badge>
                      </div>
                      <p className="text-xs text-muted-foreground">{rec.description}</p>
                    </div>
                    <Button size="sm" variant="ghost">
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            </Card>

            {/* Recent Orders */}
            <Card className="p-4 space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="font-semibold">Recent Orders</h2>
                <Button variant="ghost" size="sm">View All</Button>
              </div>
              <div className="space-y-2">
                {recentOrders.map((order) => (
                  <div key={order.id} className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                    <div className="space-y-1">
                      <p className="font-medium text-sm">{order.id}</p>
                      <p className="text-xs text-muted-foreground">{order.customer}</p>
                    </div>
                    <div className="text-right space-y-1">
                      <p className="font-semibold text-sm">{order.amount}</p>
                      <Badge 
                        variant={order.status === 'completed' ? 'default' : 'secondary'}
                        className="text-xs"
                      >
                        {order.status}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="products" className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="font-semibold text-lg">Product Management</h2>
              <Button>Add Product</Button>
            </div>
            <div className="grid gap-4">
              <Card className="p-4">
                <div className="flex items-center gap-3">
                  <Package className="h-8 w-8 text-primary" />
                  <div className="flex-1">
                    <h3 className="font-semibold">All Products</h3>
                    <p className="text-sm text-muted-foreground">Manage product listings</p>
                  </div>
                  <ChevronRight className="h-5 w-5 text-muted-foreground" />
                </div>
              </Card>
              <Card className="p-4">
                <div className="flex items-center gap-3">
                  <BarChart3 className="h-8 w-8 text-primary" />
                  <div className="flex-1">
                    <h3 className="font-semibold">Categories</h3>
                    <p className="text-sm text-muted-foreground">Manage categories and subcategories</p>
                  </div>
                  <ChevronRight className="h-5 w-5 text-muted-foreground" />
                </div>
              </Card>
              <Card className="p-4">
                <div className="flex items-center gap-3">
                  <FileText className="h-8 w-8 text-primary" />
                  <div className="flex-1">
                    <h3 className="font-semibold">Promotions</h3>
                    <p className="text-sm text-muted-foreground">Manage paid video promotions</p>
                  </div>
                  <ChevronRight className="h-5 w-5 text-muted-foreground" />
                </div>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="orders" className="space-y-4">
            <h2 className="font-semibold text-lg">Order Management</h2>
            <div className="space-y-2">
              {recentOrders.map((order) => (
                <Card key={order.id} className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <p className="font-semibold">{order.id}</p>
                      <p className="text-sm text-muted-foreground">{order.customer}</p>
                      <p className="text-sm font-medium text-primary">{order.amount}</p>
                    </div>
                    <div className="space-y-2">
                      <Badge variant={order.status === 'completed' ? 'default' : 'secondary'}>
                        {order.status}
                      </Badge>
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline">View</Button>
                        <Button size="sm">Update</Button>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="users" className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="font-semibold text-lg">User Management</h2>
              <Button variant="outline">Export Data</Button>
            </div>
            <div className="grid gap-4">
              <Card className="p-4">
                <div className="flex items-center gap-3">
                  <Users className="h-8 w-8 text-primary" />
                  <div className="flex-1">
                    <h3 className="font-semibold">All Users</h3>
                    <p className="text-sm text-muted-foreground">View and manage all users</p>
                  </div>
                  <ChevronRight className="h-5 w-5 text-muted-foreground" />
                </div>
              </Card>
              <Card className="p-4">
                <div className="flex items-center gap-3">
                  <ShoppingBag className="h-8 w-8 text-primary" />
                  <div className="flex-1">
                    <h3 className="font-semibold">Sellers</h3>
                    <p className="text-sm text-muted-foreground">Manage seller accounts and verification</p>
                  </div>
                  <ChevronRight className="h-5 w-5 text-muted-foreground" />
                </div>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="feedback" className="space-y-4">
            <h2 className="font-semibold text-lg">Feedback Management</h2>
            
            <Card className="p-4 space-y-4">
              <div className="flex items-center gap-2">
                <AlertCircle className="h-5 w-5 text-red-500" />
                <h3 className="font-semibold">Complaints</h3>
              </div>
              <div className="space-y-2">
                {complaints.map((complaint) => (
                  <div key={complaint.id} className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                    <div className="space-y-1">
                      <p className="font-medium text-sm">{complaint.issue}</p>
                      <p className="text-xs text-muted-foreground">by {complaint.user}</p>
                    </div>
                    <Badge variant={complaint.status === 'resolved' ? 'default' : 'destructive'}>
                      {complaint.status}
                    </Badge>
                  </div>
                ))}
              </div>
            </Card>

            <Card className="p-4 space-y-4">
              <div className="flex items-center gap-2">
                <Lightbulb className="h-5 w-5 text-primary" />
                <h3 className="font-semibold">Suggestions</h3>
              </div>
              <div className="space-y-2">
                {suggestions.map((suggestion) => (
                  <div key={suggestion.id} className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                    <div className="space-y-1 flex-1">
                      <p className="font-medium text-sm">{suggestion.suggestion}</p>
                      <p className="text-xs text-muted-foreground">by {suggestion.user}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant="secondary">{suggestion.votes} votes</Badge>
                      <Button size="sm" variant="outline">Review</Button>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="settings" className="space-y-4">
            <h2 className="font-semibold text-lg">App Settings</h2>
            <div className="grid gap-4">
              <Card className="p-4">
                <div className="flex items-center gap-3">
                  <Palette className="h-8 w-8 text-primary" />
                  <div className="flex-1">
                    <h3 className="font-semibold">Appearance</h3>
                    <p className="text-sm text-muted-foreground">Edit colors, logos, and app interface</p>
                  </div>
                  <ChevronRight className="h-5 w-5 text-muted-foreground" />
                </div>
              </Card>
              <Card className="p-4">
                <div className="flex items-center gap-3">
                  <Wallet className="h-8 w-8 text-primary" />
                  <div className="flex-1">
                    <h3 className="font-semibold">Pi Wallet Management</h3>
                    <p className="text-sm text-muted-foreground">Manage payment settings and transactions</p>
                  </div>
                  <ChevronRight className="h-5 w-5 text-muted-foreground" />
                </div>
              </Card>
              <Card className="p-4">
                <div className="flex items-center gap-3">
                  <DollarSign className="h-8 w-8 text-primary" />
                  <div className="flex-1">
                    <h3 className="font-semibold">Advertisement</h3>
                    <p className="text-sm text-muted-foreground">Manage ads and promotional content</p>
                  </div>
                  <ChevronRight className="h-5 w-5 text-muted-foreground" />
                </div>
              </Card>
              <Card className="p-4">
                <div className="flex items-center gap-3">
                  <Settings className="h-8 w-8 text-primary" />
                  <div className="flex-1">
                    <h3 className="font-semibold">General Settings</h3>
                    <p className="text-sm text-muted-foreground">Configure app behavior and features</p>
                  </div>
                  <ChevronRight className="h-5 w-5 text-muted-foreground" />
                </div>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}
