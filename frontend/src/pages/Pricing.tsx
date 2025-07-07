
import React from 'react';
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Check } from 'lucide-react';

const Pricing = () => {
  // Pricing plans
  const plans = [
    {
      name: "Free",
      price: "$0",
      description: "Basic access to design assets",
      features: [
        "10 free downloads per month",
        "PNG format only",
        "Personal use license",
        "Email support"
      ],
      popular: false,
      buttonText: "Get Started"
    },
    {
      name: "Pro",
      price: "$19",
      period: "/month",
      description: "Perfect for designers and developers",
      features: [
        "Unlimited downloads",
        "All formats (PNG, SVG, AI)",
        "Commercial license",
        "Priority support",
        "Early access to new assets"
      ],
      popular: true,
      buttonText: "Get Pro"
    },
    {
      name: "Team",
      price: "$49",
      period: "/month",
      description: "For design teams and agencies",
      features: [
        "Everything in Pro plan",
        "Up to 5 team members",
        "Team workspace",
        "API access",
        "Dedicated account manager",
        "Custom asset requests"
      ],
      popular: false,
      buttonText: "Get Team"
    }
  ];

  return (
    <Layout>
      {/* Header section */}
      <section className="relative">
        <div className="absolute inset-0 bg-gradient-to-b from-accent/50 to-background -z-10" />
        
        <div className="container py-16 md:py-24">
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
              Simple, Transparent <span className="gradient-text">Pricing</span>
            </h1>
            <p className="text-xl text-muted-foreground">
              Choose the plan that's right for you and get access to our premium design assets.
            </p>
          </div>
        </div>
      </section>
      
      {/* Pricing plans */}
      <section className="py-12 md:py-16">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {plans.map((plan) => (
              <div 
                key={plan.name} 
                className={`flex flex-col p-6 rounded-2xl border ${
                  plan.popular 
                    ? 'border-primary shadow-lg relative bg-accent/10' 
                    : 'border-border bg-card'
                }`}
              >
                {plan.popular && (
                  <div className="absolute top-0 right-6 transform -translate-y-1/2 bg-primary text-primary-foreground px-3 py-1 rounded-full text-xs font-medium">
                    Most Popular
                  </div>
                )}
                
                <div className="mb-6">
                  <h3 className="text-2xl font-bold">{plan.name}</h3>
                  <div className="mt-2 flex items-baseline">
                    <span className="text-4xl font-bold">{plan.price}</span>
                    {plan.period && (
                      <span className="ml-1 text-muted-foreground">{plan.period}</span>
                    )}
                  </div>
                  <p className="mt-2 text-muted-foreground">{plan.description}</p>
                </div>
                
                <div className="space-y-3 flex-1 mb-8">
                  {plan.features.map((feature) => (
                    <div key={feature} className="flex items-center">
                      <Check className="h-5 w-5 text-primary shrink-0" />
                      <span className="ml-3">{feature}</span>
                    </div>
                  ))}
                </div>
                
                <Button 
                  variant={plan.popular ? "default" : "outline"}
                  size="lg"
                  className="w-full"
                >
                  {plan.buttonText}
                </Button>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* FAQ Section */}
      <section className="py-12 md:py-16">
        <div className="container">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold mb-8 text-center">Frequently Asked Questions</h2>
            
            <div className="space-y-6">
              <div className="bg-card border rounded-lg p-6">
                <h3 className="text-xl font-bold mb-2">Can I cancel my subscription anytime?</h3>
                <p className="text-muted-foreground">Yes, you can cancel your subscription at any time. If you cancel, you'll still have access to your plan until the end of your billing period.</p>
              </div>
              
              <div className="bg-card border rounded-lg p-6">
                <h3 className="text-xl font-bold mb-2">What formats do you provide for the assets?</h3>
                <p className="text-muted-foreground">Our Pro and Team plans provide assets in multiple formats including PNG, SVG, and AI. The Free plan only includes PNG format.</p>
              </div>
              
              <div className="bg-card border rounded-lg p-6">
                <h3 className="text-xl font-bold mb-2">Can I use the assets in commercial projects?</h3>
                <p className="text-muted-foreground">Yes, our Pro and Team plans include a commercial license that allows you to use the assets in commercial projects. The Free plan is for personal use only.</p>
              </div>
              
              <div className="bg-card border rounded-lg p-6">
                <h3 className="text-xl font-bold mb-2">How many team members can I add to the Team plan?</h3>
                <p className="text-muted-foreground">The Team plan includes up to 5 team members. If you need more, please contact us for our Enterprise options.</p>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-16 md:py-24 bg-accent/30">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <h2 className="text-3xl md:text-4xl font-bold">
              Ready to Get Started?
            </h2>
            <p className="text-lg text-muted-foreground">
              Join thousands of designers and developers using our assets.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
              <Button size="lg">
                Choose a Plan
              </Button>
              <Button size="lg" variant="outline">
                Contact Sales
              </Button>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Pricing;
