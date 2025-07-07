
import React from 'react';
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import AssetCard from '@/components/assets/AssetCard';
import { Search } from 'lucide-react';

const UIKits = () => {
  // Sample data for UI kit assets
  const uiKits = [
    {
      id: "dashboard",
      title: "Dashboard UI Kit",
      category: "UI Kits",
      imageUrl: "https://images.unsplash.com/photo-1531403009284-440f080d1e12?q=80&w=1000",
      count: 15
    },
    {
      id: "ecommerce",
      title: "E-commerce UI Kit",
      category: "UI Kits",
      imageUrl: "https://images.unsplash.com/photo-1472851294608-062f824d29cc?q=80&w=1000",
      count: 25
    },
    {
      id: "mobile",
      title: "Mobile App UI Kit",
      category: "UI Kits",
      imageUrl: "https://images.unsplash.com/photo-1551650975-87deedd944c3?q=80&w=1000",
      count: 30
    },
    {
      id: "banking",
      title: "Banking & Finance UI",
      category: "UI Kits",
      imageUrl: "https://images.unsplash.com/photo-1563986768494-4dee2763ff3f?q=80&w=1000",
      count: 18
    },
    {
      id: "admin",
      title: "Admin Panel UI Kit",
      category: "UI Kits",
      imageUrl: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1000",
      count: 20,
      free: true
    },
    {
      id: "dark",
      title: "Dark Mode UI Kit",
      category: "UI Kits",
      imageUrl: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=1000",
      count: 15
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
              Professional <span className="gradient-text">UI Kits</span>
            </h1>
            <p className="text-xl text-muted-foreground">
              Ready-to-use UI components and templates for your design projects.
            </p>
            
            {/* Search box */}
            <div className="relative max-w-md mx-auto mt-8">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-muted-foreground" />
              </div>
              <input 
                type="text"
                placeholder="Search UI kits..."
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
            <h2 className="text-2xl md:text-3xl font-bold">Browse UI Kits</h2>
            
            <div className="flex flex-wrap items-center gap-2">
              <Button variant="default" size="sm">All</Button>
              <Button variant="outline" size="sm">Mobile</Button>
              <Button variant="outline" size="sm">Web</Button>
              <Button variant="outline" size="sm">Dashboard</Button>
              <Button variant="outline" size="sm">E-commerce</Button>
            </div>
          </div>
          
          {/* UI Kits grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {uiKits.map((uiKit) => (
              <AssetCard key={uiKit.id} {...uiKit} />
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

export default UIKits;
