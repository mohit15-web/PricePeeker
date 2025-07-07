
import React from 'react';
import { useParams } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Download, Heart, Share2, Tag } from 'lucide-react';
import AssetCard from '@/components/assets/AssetCard';

const AssetDetail = () => {
  const { id } = useParams();
  
  // This would typically come from an API call based on the ID
  // For now using static data
  
  // Sample asset data
  const assetData = {
    id,
    title: id?.charAt(0).toUpperCase() + id?.slice(1) + " Collection",
    category: "Illustrations",
    imageUrl: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?q=80&w=1000",
    count: 50,
    description: "A beautiful collection of high-quality assets for your design projects. Perfect for web and mobile applications.",
    fileFormats: ["PNG", "SVG", "AI"],
    license: "Commercial",
    lastUpdated: "2025-04-15",
    price: 39
  };
  
  // Related assets
  const relatedAssets = [
    {
      id: "tech",
      title: "Tech Illustrations",
      category: "Illustrations",
      imageUrl: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=1000",
      count: 35,
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
      id: "dashboard",
      title: "Dashboard UI Kit",
      category: "UI Kits",
      imageUrl: "https://images.unsplash.com/photo-1531403009284-440f080d1e12?q=80&w=1000",
      count: 15
    }
  ];
  
  return (
    <Layout>
      <div className="container py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main image */}
          <div className="lg:col-span-2">
            <div className="aspect-[4/3] overflow-hidden rounded-lg bg-accent/20">
              <img 
                src={assetData.imageUrl} 
                alt={assetData.title}
                className="w-full h-full object-cover"
              />
            </div>
            
            {/* Image thumbnails */}
            <div className="mt-4 grid grid-cols-5 gap-2">
              {Array(5).fill(0).map((_, i) => (
                <div 
                  key={i} 
                  className="aspect-square overflow-hidden rounded-md border bg-accent/10"
                >
                  <img 
                    src={assetData.imageUrl} 
                    alt={`Thumbnail ${i+1}`}
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </div>
          </div>
          
          {/* Product info */}
          <div className="space-y-6">
            <div>
              <span className="text-sm font-medium text-primary">{assetData.category}</span>
              <h1 className="text-3xl font-bold mt-1">{assetData.title}</h1>
              <div className="mt-2 flex items-center">
                <span className="text-2xl font-bold">${assetData.price}</span>
                <span className="ml-2 text-sm text-muted-foreground">USD</span>
              </div>
            </div>
            
            <p className="text-muted-foreground">
              {assetData.description}
            </p>
            
            <div className="space-y-2">
              <div className="flex items-center">
                <span className="w-32 text-sm text-muted-foreground">File formats:</span>
                <span>{assetData.fileFormats.join(", ")}</span>
              </div>
              <div className="flex items-center">
                <span className="w-32 text-sm text-muted-foreground">License:</span>
                <span>{assetData.license}</span>
              </div>
              <div className="flex items-center">
                <span className="w-32 text-sm text-muted-foreground">Items:</span>
                <span>{assetData.count}</span>
              </div>
              <div className="flex items-center">
                <span className="w-32 text-sm text-muted-foreground">Last update:</span>
                <span>{assetData.lastUpdated}</span>
              </div>
            </div>
            
            {/* Buttons */}
            <div className="pt-4 flex flex-col space-y-3">
              <Button size="lg" className="w-full">
                <Download className="mr-2" />
                Download Now
              </Button>
              
              <div className="flex gap-2">
                <Button variant="outline" className="flex-1">
                  <Heart className="mr-2" />
                  Save
                </Button>
                <Button variant="outline" className="flex-1">
                  <Share2 className="mr-2" />
                  Share
                </Button>
              </div>
            </div>
            
            {/* Tags */}
            <div className="pt-4">
              <div className="flex items-center mb-2">
                <Tag className="h-4 w-4 mr-2" />
                <span className="text-sm font-medium">Tags:</span>
              </div>
              <div className="flex flex-wrap gap-2">
                <span className="px-3 py-1 text-xs rounded-full bg-accent text-accent-foreground">
                  Workspace
                </span>
                <span className="px-3 py-1 text-xs rounded-full bg-accent text-accent-foreground">
                  Design
                </span>
                <span className="px-3 py-1 text-xs rounded-full bg-accent text-accent-foreground">
                  Office
                </span>
                <span className="px-3 py-1 text-xs rounded-full bg-accent text-accent-foreground">
                  Creative
                </span>
              </div>
            </div>
          </div>
        </div>
        
        {/* Related assets */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold mb-6">You may also like</h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {relatedAssets.map((asset) => (
              <AssetCard key={asset.id} {...asset} />
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AssetDetail;
