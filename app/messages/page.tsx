'use client';

import { Header } from '@/components/header';
import { BottomNav } from '@/components/bottom-nav';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { MessageCircle } from 'lucide-react';

export default function MessagesPage() {
  const conversations = [
    { id: 1, seller: 'TechStore', lastMessage: 'Your order has been shipped!', time: '2h ago', unread: true },
    { id: 2, seller: 'ArtisanCrafts', lastMessage: 'Thank you for your purchase', time: '1d ago', unread: false },
    { id: 3, seller: 'VintageStyle', lastMessage: 'Is the jacket still available?', time: '2d ago', unread: false },
  ];

  return (
    <div className="min-h-screen bg-background pb-20 md:pb-0">
      <Header />

      <main className="container mx-auto px-4 py-6 max-w-4xl">
        <h1 className="text-2xl md:text-3xl font-bold mb-6">Messages</h1>

        {conversations.length === 0 ? (
          <Card className="text-center py-16">
            <CardContent>
              <MessageCircle className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
              <h2 className="text-xl font-semibold mb-2">No messages yet</h2>
              <p className="text-muted-foreground">
                Start a conversation with sellers or buyers
              </p>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-2">
            {conversations.map((conversation) => (
              <Card key={conversation.id} className="cursor-pointer hover:shadow-md transition-shadow">
                <CardContent className="p-4">
                  <div className="flex gap-4 items-center">
                    <Avatar>
                      <AvatarFallback>{conversation.seller.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-start mb-1">
                        <p className="font-semibold">{conversation.seller}</p>
                        <span className="text-xs text-muted-foreground">{conversation.time}</span>
                      </div>
                      <p className="text-sm text-muted-foreground line-clamp-1">
                        {conversation.lastMessage}
                      </p>
                    </div>
                    {conversation.unread && (
                      <Badge className="shrink-0">New</Badge>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </main>

      <BottomNav />
    </div>
  );
}
