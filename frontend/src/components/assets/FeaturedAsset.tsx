
import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Download, Star } from 'lucide-react';

interface FeaturedAssetProps {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  count: number;
  category: string;
}

const FeaturedAsset: React.FC<FeaturedAssetProps> = ({ 
  id, 
  title, 
  description, 
  imageUrl, 
  count, 
  category 
}) => {
  return (
    <Card className="overflow-hidden border-0 shadow-lg">
      <CardContent className="p-0">
        <div className="grid grid-cols-1 md:grid-cols-2">
          <div className="bg-accent/20 p-8 flex items-center justify-center">
            <img 
              src={imageUrl} 
              alt={title} 
              className="max-h-[300px] object-contain"
            />
          </div>
          
          <div className="p-8 flex flex-col">
            <div className="flex items-center gap-2 mb-2">
              <span className="inline-flex items-center rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-medium text-primary">
                Featured
              </span>
              <span className="inline-flex items-center text-amber-500">
                <Star className="h-4 w-4 fill-amber-500 mr-1" />
                <span className="text-xs">Popular</span>
              </span>
            </div>
            
            <h2 className="text-2xl font-bold">{title}</h2>
            <p className="text-sm text-muted-foreground mt-1">{category} • {count} items</p>
            
            <p className="mt-4 text-muted-foreground">{description}</p>
            
            <div className="mt-auto pt-8 flex gap-4">
              <Button asChild>
                <Link to={`/asset/${id}`}>
                  <Download className="mr-2 h-4 w-4" />
                  Get Started
                </Link>
              </Button>
              
              <Button variant="outline" asChild>
                <Link to={`/asset/${id}`}>Learn More</Link>
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default FeaturedAsset;
