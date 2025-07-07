
import React from 'react';
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import AssetCard from '@/components/assets/AssetCard';
import { Search } from 'lucide-react';

const Illustrations = () => {
  // Sample data for illustration assets
  const illustrations = [
    {
      id: "workspace",
      title: "Workspace Illustrations",
      category: "Illustrations",
      imageUrl: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?q=80&w=1000",
      count: 50
    },
    {
      id: "tech",
      title: "Tech Illustrations",
      category: "Illustrations",
      imageUrl: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=1000",
      count: 35,
      free: true
    },
    {
      id: "nature",
      title: "Nature Illustrations",
      category: "Illustrations",
      imageUrl: "https://images.unsplash.com/photo-1501854140801-50d01698950b?q=80&w=1000",
      count: 40
    },
    {
      id: "business",
      title: "Business & Finance",
      category: "Illustrations",
      imageUrl: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?q=80&w=1000",
      count: 60
    },
    {
      id: "abstract",
      title: "Abstract Shapes",
      category: "Illustrations",
      imageUrl: "https://images.unsplash.com/photo-1550859492-d5da9d8e45f3?q=80&w=1000",
      count: 25,
      free: true
    },
    {
      id: "people",
      title: "People & Lifestyle",
      category: "Illustrations",
      imageUrl: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?q=80&w=1000",
      count: 45
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
              Beautiful <span className="gradient-text">Illustrations</span>
            </h1>
            <p className="text-xl text-muted-foreground">
              High-quality illustration collections for your creative projects.
            </p>
            
            {/* Search box */}
            <div className="relative max-w-md mx-auto mt-8">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-muted-foreground" />
              </div>
              <input 
                type="text"
                placeholder="Search illustrations..."
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
            <h2 className="text-2xl md:text-3xl font-bold">Browse Illustrations</h2>
            
            <div className="flex flex-wrap items-center gap-2">
              <Button variant="default" size="sm">All</Button>
              <Button variant="outline" size="sm">3D</Button>
              <Button variant="outline" size="sm">Flat</Button>
              <Button variant="outline" size="sm">Isometric</Button>
              <Button variant="outline" size="sm">Hand Drawn</Button>
            </div>
          </div>
          
          {/* Illustrations grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {illustrations.map((illustration) => (
              <AssetCard key={illustration.id} {...illustration} />
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

export default Illustrations;
