
import type { Metadata } from 'next';
import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Target, Eye, Lightbulb, ShieldCheck, UserRoundCog, Settings, TrendingUp, Rocket } from 'lucide-react';
import CallToAction from '@/components/shared/CallToAction';

export const metadata: Metadata = {
  title: 'About Infiniteo',
  description: "Discover Infiniteo's vision, mission, core values, and our role in the future of business operations through next-generation automation services.",
};

const coreValues = [
  {
    icon: Lightbulb,
    title: "Innovation",
    description: "Continuously exploring and integrating cutting-edge technologies and methodologies to deliver forward-thinking automation that anticipates tomorrow’s challenges."
  },
  {
    icon: ShieldCheck,
    title: "Reliability",
    description: "Building robust, secure workflows using proven tools that clients trust to run flawlessly—every time, everywhere."
  },
  {
    icon: UserRoundCog,
    title: "Empowerment",
    description: "Equipping users with custom-built, intuitive automations and clear guidance, so they own their improved processes and achieve more with less effort."
  },
  {
    icon: Settings,
    title: "Simplicity",
    description: "Designing clear, user-centric automation experiences and streamlined solutions that eliminate complexity and focus on tangible results."
  },
  {
    icon: TrendingUp,
    title: "Scalability",
    description: "Ensuring every automation service we provide can grow with the client’s needs—whether it’s one task or thousands, enterprise or individual."
  }
];

export default function AboutPage() {
  return (
    <div className="bg-black/20 backdrop-blur-sm">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
        <header className="text-center mb-12 md:mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-primary mb-4">About Infiniteo</h1>
          <p className="text-lg md:text-xl text-foreground max-w-4xl mx-auto">
            Infiniteo is the next-generation automation service partner for businesses and professionals ready to break free from manual workflows. By seamlessly integrating with every digital channel—from social content scheduling to CRM updates and custom multi-step routines—Infiniteo enables you to automate any task, at any scale. Our intuitive, platform-agnostic approach to service delivery empowers teams of all sizes to deploy reliable, secure, and infinitely scalable solutions.
          </p>
        </header>

        <section className="mb-12 md:mb-16">
          <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
            <div className="md:order-2">
              <Image
                src="/our-vision.png"
                alt="Our vision and mission illustrated"
                width={600}
                height={450}
                quality={90}
                className="rounded-lg shadow-xl"
                data-ai-hint="vision mission"
              />
            </div>
            <div className="md:order-1">
              <h2 className="text-3xl font-semibold text-primary mb-4 flex items-center">
                <Eye className="h-8 w-8 mr-3 text-accent" /> Our Vision
              </h2>
              <p className="text-foreground mb-6 text-lg">
                To become the world’s leading catalyst for end-to-end digital automation, turning every task into an opportunity for growth and transforming the future of work through infinite possibility.
              </p>
              <h2 className="text-3xl font-semibold text-primary mb-4 mt-8 flex items-center">
                <Target className="h-8 w-8 mr-3 text-accent" /> Our Mission
              </h2>
              <p className="text-foreground text-lg">
                Empowering every organization and individual with limitless, intuitive automation solutions—driving efficiency, innovation, and seamless operations across all digital channels.
              </p>
            </div>
          </div>
        </section>

        <section className="mb-12 md:mb-16 bg-black/20 backdrop-blur-sm p-8 md:p-12 rounded-lg shadow-md">
          <h2 className="text-3xl font-semibold text-primary mb-6 text-center">The Infiniteo Difference</h2>
          <p className="text-foreground text-lg max-w-4xl mx-auto text-center">
            Infiniteo delivers truly limitless automation by combining a platform-agnostic methodology, fully custom workflows, and an intuitive client experience—empowering clients to automate any digital task, from social media publishing to complex multi-step processes, faster and more reliably than any competitor. We enable innovation, profound efficiency, and absolute peace of mind—without limits.
          </p>
        </section>

        <section className="mb-12 md:mb-16">
          <h2 className="text-3xl font-semibold text-primary mb-10 text-center">Our Core Values</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {coreValues.slice(0, 3).map((value) => (
              <Card key={value.title} className="shadow-lg text-center md:text-left hover:shadow-xl hover:-translate-y-1 transition-all duration-300 bg-card">
                <CardHeader className="items-center md:items-start">
                  <value.icon className="h-10 w-10 text-accent mb-3" />
                  <CardTitle className="text-xl text-primary">{value.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-foreground">{value.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
          <div className="grid md:grid-cols-2 gap-8 mt-8 lg:max-w-[calc(66.66%-1rem)] lg:mx-auto">
            {coreValues.slice(3).map((value) => (
              <Card key={value.title} className="shadow-lg text-center md:text-left hover:shadow-xl hover:-translate-y-1 transition-all duration-300 bg-card">
                <CardHeader className="items-center md:items-start">
                  <value.icon className="h-10 w-10 text-accent mb-3" />
                  <CardTitle className="text-xl text-primary">{value.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-foreground">{value.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        <section className="text-center bg-black/20 backdrop-blur-sm p-8 md:p-12 rounded-lg shadow-xl mt-12 md:mt-16">
          <Rocket className="mx-auto h-12 w-12 mb-4 text-accent animate-float" />
          <h2 className="text-3xl font-semibold mb-4 text-primary">Join the Automation Revolution</h2>
          <p className="text-lg mb-8 max-w-2xl mx-auto text-foreground">
            Partner with Infiniteo and transform your business operations. Let's build the future, together, where intelligent automation services meet infinity, and your business evolution knows no bounds.
          </p>
          <CallToAction href="/contact" variant="default" className="bg-accent text-accent-foreground border-accent hover:bg-accent/90">
            Start Your Transformation
          </CallToAction>
        </section>
      </div>
    </div>
  );
}
