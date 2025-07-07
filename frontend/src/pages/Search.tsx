import React, { useState } from "react";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Loader2, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { toast } from "@/hooks/use-toast";
import AssetCard from "@/components/assets/AssetCard";

const countries = [
  { code: "US", name: "United States", flag: "🇺🇸", currency: "USD" },
  { code: "UK", name: "United Kingdom", flag: "🇬🇧", currency: "GBP" },
  { code: "IN", name: "India", flag: "🇮🇳", currency: "INR" },
  { code: "CA", name: "Canada", flag: "🇨🇦", currency: "CAD" },
  { code: "AU", name: "Australia", flag: "🇦🇺", currency: "AUD" },
  { code: "DE", name: "Germany", flag: "🇩🇪", currency: "EUR" },
  { code: "FR", name: "France", flag: "🇫🇷", currency: "EUR" },
  { code: "JP", name: "Japan", flag: "🇯🇵", currency: "JPY" },
  { code: "SG", name: "Singapore", flag: "🇸🇬", currency: "SGD" },
  { code: "AE", name: "UAE", flag: "🇦🇪", currency: "AED" },
];
const Index = () => {
  const [prompt, setPrompt] = useState("");
  const [country, setCountry] = useState("US");
  const [isGenerating, setIsGenerating] = useState(false);
  const [userCollection, setUserCollection] = useState<any[]>([]);

  const generateIcon = async () => {
    if (!prompt.trim()) {
      toast({
        title: "Missing input",
        description: "Please enter a product name",
        variant: "destructive",
      });
      return;
    }

    setIsGenerating(true);

    try {
        console.log(prompt, country);
        
      const res = await fetch("http://localhost:3000/api/fetch-prices", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          country,
          query: prompt,
        }),
      });

      const data = await res.json();

      if (!Array.isArray(data)) throw new Error("Unexpected response");

      setUserCollection(data); // Optionally display this
      console.log("Prices:", data);
      toast({
        title: "Prices fetched",
        description: "Check console for results",
      });
    } catch (error) {
      console.error("Error:", error);
      toast({
        title: "Failed to fetch prices",
        description: "Something went wrong",
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
        <div className="absolute inset-0 bg-gradient-to-b from-accent/50 to-background -z-10" />
        <div className="container py-16 md:py-24">
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
              Product Price <span className="gradient-text">Comparator</span>
            </h1>
            <p className="text-xl text-muted-foreground">
              Compare prices across multiple websites instantly.
            </p>

            {/* Input and Country Dropdown */}
            <div className="max-w-md mx-auto flex flex-col gap-6">
              {/* Product Input */}
              <div className="flex flex-col">
                <label className="text-sm font-medium text-gray-700 mb-2 text-left">
                  What are you looking for?
                </label>
                <div className="relative">
                  <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                  <Input
                    type="text"
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    placeholder="e.g., iPhone 16 Pro, 128GB"
                    className="w-full pl-10 pr-4 py-3"
                  />
                </div>
              </div>

              {/* Country Dropdown */}
              <div className="flex flex-col">
                <label className="text-sm font-medium text-gray-700 mb-2 text-left">
                  Country
                </label>
                <select
                  value={country}
                  onChange={(e) => setCountry(e.target.value)}
                  className="w-full px-4 py-3 bg-background text-foreground border border-input rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                >
                  {countries.map((c) => (
                    <option key={c.code} value={c.code}>
                      {c.flag} {c.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Generate/Search Button */}
              <div className="flex flex-col">
                <label className="text-sm font-medium text-gray-700 mb-2 invisible">
                  Search
                </label>
                <Button
                  onClick={generateIcon}
                  className="w-full"
                >
                  {isGenerating ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Generating...
                    </>
                  ) : (
                    <>Search</>
                  )}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* User collection section */}
      {userCollection.length > 0 && (
        <section className="py-12">
          <div className="container">
            <h2 className="text-2xl md:text-3xl font-bold mb-8">
              Price Comparison Results
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {userCollection.map((item, index) => (
                <div
                  key={index}
                  className="rounded-lg border bg-card p-4 shadow hover:shadow-md transition"
                >
                  <h3 className="text-lg font-semibold mb-2">
                    {item.productName}
                  </h3>
                  <p className="text-sm text-muted-foreground mb-1">
                    Seller: <span className="font-medium">{item.seller}</span>
                  </p>
                  <p className="text-sm text-muted-foreground mb-1">
                    Price:{" "}
                    <span className="font-medium">
                      {item.price} {item.currency}
                    </span>
                  </p>
                  {item.link ? (
                    <a
                      href={item.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-primary underline"
                    >
                      View Product
                    </a>
                  ) : (
                    <p className="text-sm italic text-gray-500">
                      No link available
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Results section */}
      {userCollection.length > 0 && (
        <section className="py-12">
          <div className="container">
            <h2 className="text-2xl md:text-3xl font-bold mb-8">
              Price Results
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {userCollection.map((item, i) => (
                <AssetCard key={i} {...item} />
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
              Why Choose AI-Generated Prices
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
