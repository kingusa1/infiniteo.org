
import type { Metadata } from 'next';
import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Presentation, Edit3, Briefcase, Target, TrendingUp } from 'lucide-react';
import CallToAction from '@/components/shared/CallToAction';

export const metadata: Metadata = {
  title: 'Impact & Use Cases',
  description: 'See how Infiniteo delivers quantifiable benefits and transformative impact for marketing managers, operations leads, and various business scenarios through our automation services.',
};

const impactStories = [
  {
    role: "Marketing Managers",
    icon: Presentation,
    challenge: "Struggling with inconsistent cross-channel campaigns, manual content scheduling, performance tracking, and capturing quality leads across platforms like LinkedIn and Instagram.",
    solution: "Infiniteo empowers marketing managers to achieve consistent, impactful cross-channel campaigns through our automation services. We automate content streams from planning to analytics, help launch targeted campaigns in a few clicks, and set up systems to capture high-quality leads directly from social platforms, all while optimizing for peak performance.",
    benefits: [
      "Significant time savings in campaign management.",
      "Enhanced brand consistency and reach across all channels.",
      "Improved campaign performance through timely execution and optimization.",
      "Streamlined lead capture from platforms like LinkedIn to Instagram.",
      "Data-driven insights for strategic decision-making."
    ],
    image: "/marketing-managers-impact.png",
    imageHint: "marketing dashboard"
  },
  {
    role: "Operations Leads",
    icon: Edit3,
    challenge: "Overseeing complex data processes, manual CRM updates, ensuring data integrity, and facing bottlenecks that slow down operations and increase potential for errors.",
    solution: "Infiniteo enables operations leads to transform complex data challenges into streamlined, automated sequences via our expert services. We help eradicate bottlenecks, reduce human error, and accelerate data processes with unwavering precision, ensuring data integrity and operational agility.",
    benefits: [
      "Drastic reduction in manual data entry and associated errors.",
      "Improved operational efficiency and data accuracy.",
      "Enhanced visibility and control over complex workflows.",
      "Accelerated data processes and bottleneck elimination.",
      "Greater agility to adapt to changing business demands."
    ],
    image: "/operations-leads.jpg",
    imageHint: "operations workflow"
  },
  {
    role: "Business Professionals",
    icon: Briefcase,
    challenge: "Facing repetitive daily tasks, information silos between applications, and the need to coordinate multi-step processes that consume valuable time and energy, hindering focus on strategic work.",
    solution: "Infiniteo’s platform-agnostic service approach empowers individual professionals by automating a wide array of tasks, from email management and report generation to data synchronization between their most-used tools, freeing them for high-value activities.",
    benefits: [
      "Reclaim hours each week by automating routine tasks.",
      "Reduce cognitive load and focus on strategic, high-value work.",
      "Ensure consistency and accuracy in personal workflows.",
      "Seamlessly connect and orchestrate personal productivity tools through our services."
    ],
    image: "/business-professionals.jpg",
    imageHint: "professional tools"
  }
];

export default function ImpactPage() {
  return (
    <div className="bg-transparent">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
        <header className="text-center mb-12 md:mb-16">
          <TrendingUp className="h-16 w-16 mx-auto text-primary mb-4" />
          <h1 className="text-4xl md:text-5xl font-bold text-primary mb-4">Transformative Impact, Real Results</h1>
          <p className="text-lg md:text-xl text-foreground max-w-3xl mx-auto">
            Infiniteo isn't just about automation services; it's about revolutionizing how work gets done. Explore relatable business scenarios and see the quantifiable benefits our solutions bring, empowering your teams with the agility and clarity needed to outpace competition.
          </p>
        </header>

        <div className="space-y-12 md:space-y-16">
          {impactStories.map((story, index) => (
            <section
              key={story.role}
              className="p-6 md:p-8 rounded-xl shadow-xl hover:shadow-2xl hover:shadow-primary/10 transition-all duration-300 overflow-hidden"
            >
              <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
                <div className={`md:order-${index % 2 === 0 ? 1 : 2}`}>
                  <Image
                    src={story.image}
                    alt={`Impact for ${story.role}`}
                    width={500}
                    height={350}
                    quality={85}
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="rounded-lg shadow-xl mx-auto hover:shadow-2xl transition-all duration-300 hover:-translate-y-1"
                    data-ai-hint={story.imageHint}
                  />
                </div>
                <div className={`md:order-${index % 2 === 0 ? 2 : 1}`}>
                  <story.icon className="h-12 w-12 text-accent mb-4" />
                  <h2 className="text-2xl md:text-3xl font-semibold text-primary mb-6">{story.role}</h2>
                  <Card className="bg-secondary/80 mb-6 shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300">
                    <CardHeader>
                      <CardTitle className="text-xl text-accent font-semibold">The Challenge:</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-foreground/90">{story.challenge}</p>
                    </CardContent>
                  </Card>
                  <Card className="bg-secondary/80 shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300">
                    <CardHeader>
                      <CardTitle className="text-xl text-accent font-semibold">The Infiniteo Solution:</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-foreground/90">{story.solution}</p>
                    </CardContent>
                  </Card>
                </div>
              </div>
              <div className="mt-10">
                <h3 className="text-xl md:text-2xl font-semibold text-primary mb-6 text-center">Key Benefits & Outcomes:</h3>
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {story.benefits.map((benefit, i) => (
                    <div key={i} className="flex items-start bg-secondary/80 p-4 rounded-lg shadow-md hover:shadow-lg hover:border-accent border-2 border-transparent transition-all duration-300 transform hover:-translate-y-1">
                      <Target className="h-6 w-6 text-accent mr-3 mt-1 shrink-0" />
                      <span className="text-foreground/90 text-sm">{benefit}</span>
                    </div>
                  ))}
                </div>
                <p className="text-sm text-muted-foreground mt-8 text-center">
                  <i>(Note: Specific numbers and detailed case studies available upon request for our services.)</i>
                </p>
              </div>
            </section>
          ))}
        </div>

        <section className="mt-16 md:mt-24 text-center text-primary-foreground p-8 md:p-12">
          <TrendingUp className="mx-auto h-12 w-12 mb-4 text-accent animate-float" />
          <h2 className="text-3xl font-semibold mb-4 text-primary">Ready to Write Your Success Story?</h2>
          <p className="text-lg mb-8 max-w-2xl mx-auto text-foreground">
            Discover how Infiniteo can address your specific challenges and deliver transformative results for your team with our expert automation services. We don’t just automate tasks—we redefine what’s possible.
          </p>
          <CallToAction href="/contact" variant="default" className="bg-accent text-accent-foreground border-accent hover:bg-accent/90">
            Discuss Your Automation Needs
          </CallToAction>
        </section>
      </div>
    </div>
  );
}
