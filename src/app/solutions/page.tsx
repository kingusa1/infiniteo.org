
import type { Metadata } from 'next';
import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import CallToAction from '@/components/shared/CallToAction';
import { Share2, DatabaseZap, Cpu, CheckCircle, ArrowRight, Sparkles } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Automation Services',
  description: 'Explore Infiniteo’s comprehensive automation services, including Social Media Automation, Digital Platform Automation, and Custom Workflow Creation.',
};

const solutions = [
  {
    id: 'social-automation',
    icon: Share2,
    title: 'Social Media Automation Services',
    summary: 'We automate content planning, scheduling, and analytics across all social channels—eliminate manual posting, maintain brand consistency, and gain real-time performance insights through our expert services.',
    benefits: [
      'Ensure consistent brand messaging across all platforms.',
      'Save significant time for marketing managers.',
      'Schedule posts in advance for optimal engagement.',
      'Capture high-quality leads directly from social platforms.',
      'Analyze performance with integrated reporting setups.',
    ],
    targetRoles: 'Marketing Managers, Social Media Specialists, Content Creators, Digital Agencies',
    image: '/Marketing Managers.png',
    imageHint: 'social media dashboard'
  },
  {
    id: 'platform-automation',
    icon: DatabaseZap,
    title: 'Digital Platform Automation Services',
    summary: 'Our experts connect and automate tasks across CRMs, email systems, e-commerce tools, and more—synchronize data, trigger alerts, and ensure seamless operations without requiring developer overhead from your team.',
    benefits: [
      'Achieve real-time synchronization of customer data.',
      'Reduce errors associated with manual input.',
      'Free up sales and operations leads for strategic tasks.',
      'Improve customer relationship management with up-to-date info.',
      'Streamline data processes and eradicate bottlenecks.'
    ],
    targetRoles: 'Operations Leads, Sales Managers, CRM Administrators, E-commerce Managers',
    image: '/Drudgery.png',
    imageHint: 'CRM data flow'
  },
  {
    id: 'custom-workflows',
    icon: Cpu,
    title: 'Custom Workflow Creation Services',
    summary: 'We design tailor-made automation sequences—from simple one-step actions to complex, multi-application routines—empowering you by building solutions to solve unique challenges using intuitive tools available in the market.',
    benefits: [
      'Automate intricate processes tailored to specific business needs.',
      'Integrate seamlessly with your existing software stack via our expertise.',
      'Enhance operational efficiency for complex tasks.',
      'Scale your custom automations as your business grows.',
      'Benefit from solutions built by experts, requiring no coding expertise from your team.'
    ],
    targetRoles: 'Operations Managers, IT Directors, Business Analysts, Freelancers, Consultants',
    image: '/Drudgery.png',
    imageHint: 'workflow automation'
  },
];

export default function SolutionsPage() {
  return (
    <div className="bg-black/20 backdrop-blur-sm">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
        <header className="text-center mb-12 md:mb-16">
          <Cpu className="h-16 w-16 mx-auto text-primary mb-4" />
          <h1 className="text-4xl md:text-5xl font-bold text-primary mb-4">Infiniteo Automation Services</h1>
          <p className="text-lg md:text-xl text-foreground max-w-3xl mx-auto">
            Empowering businesses to "automate any task, at any scale imaginable." Discover how Infiniteo's platform-agnostic service approach can revolutionize your workflows, offering solutions that are inherently reliable, robustly secure, and infinitely scalable.
          </p>
        </header>

        {solutions.map((solution, index) => (
          <section key={solution.id} id={solution.id} className={`py-12 md:py-16 ${index % 2 === 1 ? 'bg-black/20 backdrop-blur-sm rounded-lg shadow-inner' : ''} hover:shadow-xl transition-shadow duration-300`}>
            <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center p-4 md:p-0">
              <div className={`md:order-${index % 2 === 0 ? 1 : 2}`}>
                <Image
                  src={solution.image}
                  alt={`Visual representation of ${solution.title}`}
                  width={500}
                  height={350}
                  quality={85}
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="rounded-lg shadow-xl mx-auto hover:shadow-2xl transition-all duration-300 hover:-translate-y-1"
                  data-ai-hint={solution.imageHint}
                />
              </div>
              <div className={`md:order-${index % 2 === 0 ? 2 : 1} p-6 flex flex-col`}>
                <div className="mb-auto">
                  <solution.icon className="h-12 w-12 text-accent mb-4" />
                  <h2 className="text-3xl font-semibold text-primary mb-4">{solution.title}</h2>
                  <p className="text-lg text-foreground mb-6">{solution.summary}</p>

                  <h3 className="text-xl font-semibold text-primary mb-4">Core Benefits:</h3>
                  <div className="space-y-3 mb-6">
                    {solution.benefits.map((benefit, i) => (
                      <div key={i} className="flex items-start bg-card p-3 rounded-md shadow-sm">
                        <CheckCircle className="h-5 w-5 text-accent mr-3 mt-1 shrink-0" />
                        <span className="text-foreground">{benefit}</span>
                      </div>
                    ))}
                  </div>

                  <p className="text-sm text-muted-foreground mb-1"><strong>Empowers:</strong> {solution.targetRoles}</p>
                </div>

                <CallToAction
                  href={`/contact?solution=${solution.id.replace(/-services$/, '')}`}
                  icon={ArrowRight}
                  size="default"
                  className="mt-6 w-full sm:w-auto bg-primary text-primary-foreground hover:bg-primary/90"
                >
                  Consult on {solution.title.replace(/ Services$/, '')}
                </CallToAction>
              </div>
            </div>
          </section>
        ))}

        <section className="mt-16 md:mt-24 text-center bg-black/20 backdrop-blur-sm p-8 md:p-12 rounded-lg shadow-xl">
          <Sparkles className="mx-auto h-12 w-12 mb-4 text-accent animate-float" />
          <h2 className="text-3xl font-semibold mb-4 text-primary">Ready to Transform Your Operations?</h2>
          <p className="text-lg mb-8 max-w-2xl mx-auto text-foreground">
            Let Infiniteo tailor an automation strategy that aligns with your unique business goals. Choose Infiniteo and unlock a new era of operational excellence with our expert services.
          </p>
          <CallToAction href="/contact" variant="default" className="bg-primary text-primary-foreground hover:bg-primary/90" icon={ArrowRight}>
            Get a Custom Workflow Consultation
          </CallToAction>
        </section>
      </div>
    </div>
  );
}
