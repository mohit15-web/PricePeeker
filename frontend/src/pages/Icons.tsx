
import React from 'react';
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import AssetCard from '@/components/assets/AssetCard';
import { Search } from 'lucide-react';

const Icons = () => {
  // Sample data for icon assets
  const icons = [
    {
      id: "minimal-ui",
      title: "Minimal UI Icons",
      category: "Icons",
      imageUrl: "https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?q=80&w=1000",
      count: 200,
      free: true
    },
    {
      id: "finance",
      title: "Finance Icons",
      category: "Icons",
      imageUrl: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1000",
      count: 120
    },
    {
      id: "social",
      title: "Social Media Icons",
      category: "Icons",
      imageUrl: "https://images.unsplash.com/photo-1611162616305-c69b3fa7fbe0?q=80&w=1000",
      count: 80
    },
    {
      id: "essentials",
      title: "Essential Icons Pack",
      category: "Icons",
      imageUrl: "https://images.unsplash.com/photo-1588345921523-c2dcdb7f1dcd?q=80&w=1000",
      count: 500
    },
    {
      id: "weather",
      title: "Weather Icons",
      category: "Icons",
      imageUrl: "https://images.unsplash.com/photo-1530908295418-a12e326966ba?q=80&w=1000",
      count: 50,
      free: true
    },
    {
      id: "travel",
      title: "Travel & Tourism Icons",
      category: "Icons",
      imageUrl: "https://images.unsplash.com/photo-1488646953014-85cb44e25828?q=80&w=1000",
      count: 75
    }
  ];
  
  return (
    <Layout>
      {/* Hero section */}
      <section className="relative">
        <div className="absolute inset-0 bg-gradient-to-b from-accent/50 to-background -z-10" />
        
        <div className="container py-16 md:py-24">
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
              Premium <span className="gradient-text">Icon Collections</span>
            </h1>
            <p className="text-xl text-muted-foreground">
              Beautiful, pixel-perfect icons for your web and mobile projects.
            </p>
            
            {/* Search box */}
            <div className="relative max-w-md mx-auto mt-8">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-muted-foreground" />
              </div>
              <input 
                type="text"
                placeholder="Search icons..."
                className="w-full py-3 pl-10 pr-4 border rounded-lg bg-card text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
              />
            </div>
          </div>
        </div>
      </section>
      
      {/* Filter options */}
      <section className="py-8">
        <div className="container">
          <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
            <h2 className="text-2xl md:text-3xl font-bold">Browse Icons</h2>
            
            <div className="flex flex-wrap items-center gap-2">
              <Button variant="default" size="sm">All</Button>
              <Button variant="outline" size="sm">UI/UX</Button>
              <Button variant="outline" size="sm">Business</Button>
              <Button variant="outline" size="sm">Social Media</Button>
              <Button variant="outline" size="sm">Technology</Button>
            </div>
          </div>
          
          {/* Icons grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {icons.map((icon) => (
              <AssetCard key={icon.id} {...icon} />
            ))}
          </div>
          
          {/* Load more button */}
          <div className="mt-12 text-center">
            <Button variant="outline" size="lg">
              Load More
            </Button>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Icons;
