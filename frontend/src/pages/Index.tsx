
import React, { useState } from 'react';
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Search, Loader2 } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { useAuth } from '@/contexts/AuthContext';
import AssetCard from '@/components/assets/AssetCard';
import { toast } from '@/hooks/use-toast';

interface GeneratedAsset {
  id: string;
  title: string;
  category: string;
  imageUrl: string;
  count: number;
}

const Index = () => {
  const [prompt, setPrompt] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [userCollection, setUserCollection] = useState<GeneratedAsset[]>([]);
  
  // Function to generate an icon based on the prompt
  const generateIcon = async () => {
    if (!prompt.trim()) {
      toast({
        title: "Empty prompt",
        description: "Please enter a description",
        variant: "destructive",
      });
      return;
    }
  
    setIsGenerating(true);
  
    try {
      const response = await fetch('https://api.replicate.com/v1/predictions', {
        method: 'POST',
        headers: {
          'Authorization': `Token ${import.meta.env.VITE_REPLICATE_API_TOKEN}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          version: "model-version-id",
          input: {
            prompt: `isometric icon, ${prompt}, in Airbnb’s design system style, pastel, vector art, flat, modern`
          }
        })
      });
  
      const prediction = await response.json();
  
      if (prediction?.output) {
        const newAsset = {
          id: `generated-${Date.now()}`,
          title: prompt,
          category: "AI Generated",
          imageUrl: prediction.output[0],
          count: 1,
        };
  
        setUserCollection(prev => [newAsset, ...prev]);
  
        toast({ title: "Icon generated", description: "Added to collection" });
        setPrompt('');
      } else {
        throw new Error("No output received");
      }
    } catch (error) {
      console.error("Error generating icon:", error);
      toast({
        title: "Generation failed",
        description: "Failed to generate icon. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsGenerating(false);
    }
  };
  
  
  return (
    <Layout>
      {/* Hero section */}
      <section className="relative">
        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-accent/50 to-background -z-10" />
        
        <div className="container py-16 md:py-24">
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
              AI-Generated <span className="gradient-text">Icons</span> for Your Projects
            </h1>
            <p className="text-xl text-muted-foreground">
              Create unique, custom icons using AI. Describe what you need, and we'll generate it instantly.
            </p>
            
            {/* Prompt input and generate button */}
            <div className="flex flex-col sm:flex-row gap-4 max-w-2xl mx-auto pt-6">
              <Input
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="Describe the icon you need..."
                className="flex-1"
              />
              <Button 
                onClick={generateIcon} 
                disabled={isGenerating || !prompt.trim()}
                className="whitespace-nowrap"
              >
                {isGenerating ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Generating...
                  </>
                ) : (
                  <>Generate Icon</>
                )}
              </Button>
            </div>
          </div>
        </div>
      </section>
      
      {/* User collection section */}
      {userCollection.length > 0 && (
        <section className="py-12">
          <div className="container">
            <h2 className="text-2xl md:text-3xl font-bold mb-8">Your Icon Collection</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {userCollection.map((asset) => (
                <AssetCard key={asset.id} {...asset} />
              ))}
            </div>
          </div>
        </section>
      )}
      
      {/* Newsletter section */}
      <section className="py-16 md:py-24 bg-accent/30">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <span className="inline-flex items-center rounded-full bg-primary/10 px-3 py-1 text-sm font-medium text-primary">
              Stay Updated
            </span>
            <h2 className="text-3xl md:text-4xl font-bold">
              Subscribe to Our Newsletter
            </h2>
            <p className="text-lg text-muted-foreground">
              Get notified about new AI features, free resources, and design tips.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto pt-4">
              <input 
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 border rounded-lg bg-card text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
              />
              <Button>Subscribe</Button>
            </div>
            
            <p className="text-xs text-muted-foreground mt-4">
              We respect your privacy. Unsubscribe at any time.
            </p>
          </div>
        </div>
      </section>
      
      {/* Features section */}
      <section className="py-16 md:py-24">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center space-y-6 mb-12">
            <h2 className="text-3xl md:text-4xl font-bold">
              Why Choose AI-Generated sites
            </h2>
            <p className="text-lg text-muted-foreground">
              Create truly unique icons tailored to your specific needs in seconds.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center space-y-4">
              <div className="w-12 h-12 rounded-full bg-primary/10 text-primary mx-auto flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 2v8"></path>
                  <path d="m16 6-4-4-4 4"></path>
                  <path d="M8 10H5a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-6a2 2 0 0 0-2-2h-3"></path>
                </svg>
              </div>
              <h3 className="text-xl font-bold">Unique & Custom</h3>
              <p className="text-muted-foreground">
                Generate icons that match your exact needs and vision.
              </p>
            </div>
            
            <div className="text-center space-y-4">
              <div className="w-12 h-12 rounded-full bg-primary/10 text-primary mx-auto flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10"></circle>
                  <polyline points="12 6 12 12 16 14"></polyline>
                </svg>
              </div>
              <h3 className="text-xl font-bold">Instant Creation</h3>
              <p className="text-muted-foreground">
                Save hours of design time with AI-powered generation.
              </p>
            </div>
            
            <div className="text-center space-y-4">
              <div className="w-12 h-12 rounded-full bg-primary/10 text-primary mx-auto flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect width="18" height="18" x="3" y="3" rx="2"></rect>
                  <path d="M9 9h.01"></path>
                  <path d="M15 15h.01"></path>
                  <path d="m9 15 6-6"></path>
                </svg>
              </div>
              <h3 className="text-xl font-bold">Unlimited Variations</h3>
              <p className="text-muted-foreground">
                Create multiple versions until you find the perfect icon.
              </p>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Index;
