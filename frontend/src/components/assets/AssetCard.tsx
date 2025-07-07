
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Copy, Download } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import { useAuth } from '@/contexts/AuthContext';
import LoginModal from '@/components/auth/LoginModal';

interface AssetCardProps {
  id: string;
  title: string;
  category: string;
  imageUrl: string;
  count: number;
  free?: boolean;
}

const AssetCard: React.FC<AssetCardProps> = ({ 
  id, 
  title, 
  category, 
  imageUrl, 
  count,
  free = false // We still keep this prop but won't use it for restrictions
}) => {
  const { user } = useAuth();
  const [loginModalOpen, setLoginModalOpen] = useState(false);

  const handleCopy = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    // Copy asset information to clipboard
    navigator.clipboard.writeText(`${title} - ${category}`);
    
    toast({
      title: "Copied to clipboard",
      description: `${title} details copied to your clipboard`,
      duration: 3000,
    });
  };
  
  const handleDownload = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    // Check if user is logged in
    if (!user) {
      // Show login modal if not logged in
      setLoginModalOpen(true);
      return;
    }
    
    // User is logged in, proceed with download
    const link = document.createElement('a');
    link.href = imageUrl;
    link.download = `${title.toLowerCase().replace(/\s+/g, '-')}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    toast({
      title: "Download started",
      description: `${title} is being downloaded`,
      variant: "default",
      duration: 3000,
    });
  };

  const handleLoginSuccess = () => {
    // After successful login, trigger download
    handleDownload({ preventDefault: () => {}, stopPropagation: () => {} } as React.MouseEvent);
  };

  return (
    <Card className="overflow-hidden card-hover group">
      <CardContent className="p-0">
        <Link to={`/asset/${id}`} className="block">
          <div className="aspect-[4/3] overflow-hidden bg-accent/30 relative group">
            <img 
              src={imageUrl} 
              alt={title} 
              className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
            />
            
            {/* Copy button - appears on hover */}
            <Button 
              size="icon" 
              variant="secondary" 
              className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
              onClick={handleCopy}
            >
              <Copy className="h-4 w-4" />
            </Button>
          </div>
          
          <div className="p-5">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-lg font-medium line-clamp-1">{title}</h3>
                <p className="text-sm text-muted-foreground">{category} • {count} items</p>
              </div>
              
              {/* Remove the free badge since we're removing premium restrictions */}
            </div>
            
            <div className="mt-4 flex justify-between items-center">
              <span className="text-sm text-muted-foreground">
                {user ? 'Click to download' : 'Login to download'}
              </span>
              
              <Button size="sm" variant="default" onClick={handleDownload}>
                <Download className="mr-2 h-4 w-4" />
                Download
              </Button>
            </div>
          </div>
        </Link>
        
        {/* Login Modal */}
        <LoginModal 
          isOpen={loginModalOpen}
          onClose={() => setLoginModalOpen(false)}
          onSuccess={handleLoginSuccess}
        />
      </CardContent>
    </Card>
  );
};

export default AssetCard;
