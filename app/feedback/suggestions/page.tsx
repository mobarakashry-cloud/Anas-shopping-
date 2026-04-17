'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { ArrowLeft, Lightbulb, Send } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

export default function SuggestionsPage() {
  const router = useRouter()
  const [category, setCategory] = useState('')
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Submit suggestion logic
    alert('Suggestion submitted successfully! Thank you for helping us improve.')
    router.back()
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-50 bg-background/95 backdrop-blur border-b">
        <div className="flex items-center gap-3 p-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => router.back()}
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div className="flex items-center gap-2 flex-1">
            <Lightbulb className="h-5 w-5 text-primary" />
            <h1 className="text-lg font-semibold">Share Your Ideas</h1>
          </div>
        </div>
      </header>

      <main className="px-4 py-6">
        <Card className="p-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="category">Category</Label>
              <Select value={category} onValueChange={setCategory}>
                <SelectTrigger id="category">
                  <SelectValue placeholder="Select suggestion category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="feature">New Feature</SelectItem>
                  <SelectItem value="ui">UI/UX Improvement</SelectItem>
                  <SelectItem value="payment">Payment Options</SelectItem>
                  <SelectItem value="search">Search & Filters</SelectItem>
                  <SelectItem value="performance">Performance</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="title">Suggestion Title</Label>
              <Input
                id="title"
                placeholder="Brief title for your suggestion"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                placeholder="Describe your suggestion in detail. How would this improve your experience?"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="min-h-[150px]"
                required
              />
            </div>

            <div className="bg-primary/10 p-4 rounded-lg space-y-2">
              <p className="text-sm font-medium flex items-center gap-2">
                <Lightbulb className="h-4 w-4" />
                Your Voice Matters
              </p>
              <p className="text-sm text-muted-foreground">
                We carefully review every suggestion. Popular ideas are prioritized and users who submit them get special recognition.
              </p>
            </div>

            <Button type="submit" className="w-full gap-2" size="lg">
              <Send className="h-5 w-5" />
              Submit Suggestion
            </Button>
          </form>
        </Card>

        {/* Popular Suggestions */}
        <div className="mt-6 space-y-3">
          <h2 className="font-semibold text-lg">Popular Suggestions</h2>
          <div className="space-y-2">
            <Card className="p-4">
              <h3 className="font-medium text-sm">Add wishlist sharing feature</h3>
              <p className="text-xs text-muted-foreground mt-1">45 votes</p>
            </Card>
            <Card className="p-4">
              <h3 className="font-medium text-sm">Improve search filters</h3>
              <p className="text-xs text-muted-foreground mt-1">32 votes</p>
            </Card>
            <Card className="p-4">
              <h3 className="font-medium text-sm">Add more payment options</h3>
              <p className="text-xs text-muted-foreground mt-1">28 votes</p>
            </Card>
          </div>
        </div>
      </main>
    </div>
  )
}
