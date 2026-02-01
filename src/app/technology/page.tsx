
import type { Metadata } from 'next';
import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BrainCircuit, Puzzle, Scale, ShieldCheck, Zap, Layers, Settings } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Our Automation Approach',
  description: 'Explore the intuitive, platform-agnostic approach behind Infiniteo and its strategic advantages for reliable, secure, and scalable automation services.',
};

const techAdvantages = [
  {
    icon: Layers,
    title: "Platform-Agnostic Expertise",
    description: "Our approach to automation is inherently flexible, integrating seamlessly with virtually any digital channel or existing software stack. This ensures broad compatibility and protects your investments."
  },
  {
    icon: Settings,
    title: "Intuitive Design Process",
    description: "An advanced methodology meticulously refined for performance, yet designed for intuitive collaboration. Powerful automation shouldn't require a steep learning curve for your team."
  },
  {
    icon: Puzzle,
    title: "Fully Custom Workflows",
    description: "Connect disparate systems effortlessly and let us design tailor-made automation sequences, from simple actions to complex multi-application routines, using the best available tools."
  },
  {
    icon: ShieldCheck,
    title: "Robust Security Practices",
    description: "We build workflows with enterprise-grade security protocols in mind, using secure tools to protect your sensitive data and ensure operational integrity, giving you complete peace of mind."
  },
  {
    icon: Scale,
    title: "Infinite Scalability in Services",
    description: "Whether a small team or a large enterprise, Infiniteo's automation services scale with your needs, handling increasing data volumes without compromising performance."
  },
  {
    icon: Zap,
    title: "Unparalleled Reliability",
    description: "Count on consistent, dependable automation. Our robust service infrastructure and choice of tools are engineered for high availability and resilience, ensuring your critical workflows run smoothly."
  },
];

export default function TechnologyPage() {
  return (
    <div className="bg-black/20 backdrop-blur-sm">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
        <header className="text-center mb-12 md:mb-16">
          <BrainCircuit className="h-16 w-16 mx-auto text-primary mb-4" />
          <h1 className="text-4xl md:text-5xl font-bold text-primary mb-4">The Powerhouse Approach Behind Infiniteo</h1>
          <p className="text-lg md:text-xl text-foreground max-w-3xl mx-auto">
            Discover the "intuitive, platform-agnostic approach to workflow design" that drives unparalleled automation. It empowers teams with reliable, robustly secure, and infinitely scalable solutions to automate any digital task, faster and more reliably through our expert services.
          </p>
        </header>

        <section className="mb-12 md:mb-16">
          <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
            <div>
              <Image
                src="/Accessible Power, Sophisticated Performance.png"
                alt="Illustration of escaping operational drudgery through automation"
                width={600}
                height={450}
                priority
                quality={90}
                className="rounded-lg shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-1"
                data-ai-hint="process improvement"
              />
            </div>
            <div>
              <h2 className="text-3xl font-semibold text-primary mb-6">Accessible Power, Sophisticated Performance</h2>
              <p className="text-lg text-foreground mb-4">
                At the heart of Infiniteo is an advanced methodology meticulously refined for performance, yet designed for intuitive collaboration. We believe powerful automation shouldn't require a steep learning curve for your team. Our service translates complex automation capabilities into accessible, benefit-oriented solutions that your team can leverage from day one.
              </p>
              <p className="text-lg text-foreground">
                This approach is the cornerstone of our promise: to automate virtually any task, at any scale imaginable, by seamlessly integrating with every conceivable digital channel using the best tools. It combines a platform-agnostic strategy with fully custom workflows, empowering you to solve unique challenges with unparalleled flexibility.
              </p>
            </div>
          </div>
        </section>

        <section className="py-12 md:py-16">
          <h2 className="text-3xl md:text-4xl font-semibold text-primary text-center mb-12">Strategic Advantages of Our Approach</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {techAdvantages.map((advantage) => (
              <Card key={advantage.title} className="shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 flex flex-col bg-card">
                <CardHeader>
                  <div className="flex items-start gap-4">
                    <advantage.icon className="h-10 w-10 text-accent mt-1 shrink-0" />
                    <div>
                      <CardTitle className="text-xl text-primary">{advantage.title}</CardTitle>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="flex-grow">
                  <p className="text-foreground">{advantage.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        <section className="mt-12 md:mt-20 text-center">
          <Image
            src="/Future-Proof Your Operations with Our Services.png"
            alt="Illustration of future-proof operations"
            width={800}
            height={300}
            quality={85}
            className="rounded-lg shadow-xl mx-auto mb-8 hover:shadow-2xl transition-all duration-300 hover:-translate-y-1"
            data-ai-hint="future operations"
          />
          <h2 className="text-3xl font-semibold text-primary mb-4">Future-Proof Your Operations with Our Services</h2>
          <p className="text-lg text-foreground max-w-3xl mx-auto mb-8">
            With Infiniteo's services, you're not just automating tasks; you're building a resilient and adaptable operational foundation. Our commitment to reliability, security, scalability, and an evolving, future-proof service architecture ensures you can focus on strategic growth, confident that your automation infrastructure can handle whatever comes next.
          </p>
        </section>
      </div>
    </div>
  );
}
