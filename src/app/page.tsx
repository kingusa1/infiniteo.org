
import Image from 'next/image';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import CallToAction from '@/components/shared/CallToAction';
import { ArrowRight, BrainCircuit, Handshake, Layers, CheckCircle, Cpu, BarChart3, DatabaseZap, Share2, Lightbulb, Gauge, ShieldCheck, Rocket } from 'lucide-react';
import { Button } from '@/components/ui/button';

const valueProps = [
  {
    icon: Lightbulb,
    title: "Unparalleled Innovation",
    description: "Pioneering workflow solutions that redefine automation possibilities and drive future growth, anticipating tomorrow’s challenges by leveraging the best market tools."
  },
  {
    icon: Gauge,
    title: "Profound Efficiency",
    description: "Streamline operations, reduce manual effort, and unlock significant time savings with our custom automation services, freeing teams for strategic work."
  },
  {
    icon: ShieldCheck,
    title: "Absolute Peace of Mind",
    description: "Reliable, secure, and scalable automation services you can trust, ensuring your critical workflows run smoothly around the clock."
  }
];

const services = [
  {
    icon: Share2,
    title: "Social Media Automation Services",
    description: "We automate your content planning, scheduling, and analytics across all social channels for consistent, impactful campaigns.",
    href: "/solutions#social-automation"
  },
  {
    icon: DatabaseZap,
    title: "Digital Platform Automation Services",
    description: "Our experts connect CRMs, email, e-commerce tools, and more to synchronize data and ensure seamless operations.",
    href: "/solutions#platform-automation"
  },
  {
    icon: Cpu,
    title: "Custom Workflow Creation Services",
    description: "We design tailor-made automation sequences for your unique challenges using a suite of powerful, existing tools.",
    href: "/solutions#custom-workflows"
  }
];

const pioneeringPoints = [
  {
    icon: BrainCircuit,
    title: "Fresh Perspective, Modern Solutions",
    description: "Leveraging the latest in automation technology and best practices without the constraints of legacy systems. We bring a fresh, agile approach to solving your most complex challenges."
  },
  {
    icon: Handshake,
    title: "Dedicated Partnership",
    description: "Your success is our blueprint. We work closely with you to understand your unique needs, ensuring our automation services are perfectly tailored and deliver tangible results from day one."
  },
  {
    icon: Layers,
    title: "Future-Ready by Design",
    description: "We build scalable and adaptable automation solutions designed to grow with your business, ensuring you're always prepared for tomorrow's opportunities."
  }
];

export default function HomePage() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative h-[calc(100vh-4rem)] flex items-center justify-center text-primary-foreground overflow-hidden">
        <div className="relative z-0 container mx-auto px-4 sm:px-6 lg:px-8 text-center py-20 md:py-32">
          <Rocket className="mx-auto h-16 w-16 mb-6 text-accent animate-float" />
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 leading-tight">
            Infiniteo: Expert Automation Workflow Services
          </h1>
          <p className="text-lg sm:text-xl md:text-2xl mb-10 max-w-3xl mx-auto font-light">
            Liberate your business from archaic, manual workflows. Achieve unbounded evolution with our limitless, intuitive automation services.
          </p>
          <div className="space-x-4">
            <CallToAction href="/contact" icon={ArrowRight}>
              Book a Consultation
            </CallToAction>
            <CallToAction href="/solutions" variant="outline" className="text-primary-foreground border-primary-foreground hover:bg-primary-foreground hover:text-primary">
              Explore Our Services
            </CallToAction>
          </div>
        </div>
      </section>

      {/* Introduction */}
      <section className="py-16 md:py-24 bg-transparent">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-semibold text-accent mb-6 text-center">
            Reclaim Time, Drive Innovation, Propel Growth
          </h2>
          <p className="text-lg text-foreground mb-4 max-w-4xl mx-auto text-center">
            Infiniteo stands as the unparalleled next-generation automation service partner, engineered to liberate businesses and professionals from the shackles of archaic, manual workflows. We believe every organization—regardless of size—deserves the freedom to focus on strategic vision rather than operational drudgery. By unifying fragmented processes into elegant, automated workflows, Infiniteo empowers you to reclaim time, drive innovation, and propel growth without compromise.
          </p>
          <p className="text-lg text-foreground font-semibold max-w-4xl mx-auto text-center">
            At the heart of our service is an intuitive, platform-agnostic approach to integrating with every conceivable digital channel using established market tools.
          </p>
        </div>
      </section>


      {/* Problem/Solution - Refined */}
      <section className="py-16 md:py-24 bg-transparent">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-semibold text-accent mb-6">
                Escape Operational Drudgery
              </h2>
              <p className="text-lg text-foreground mb-4">
                In today's fast-paced digital landscape, manual workflows are a barrier to growth and innovation. Businesses are shackled by repetitive tasks, data silos, and disconnected systems, stifling potential and efficiency.
              </p>
              <p className="text-lg text-foreground font-semibold">
                Infiniteo provides definitive, cutting-edge automation services, engineered to set you free by automating virtually any task at any scale.
              </p>
            </div>
            <div>
              <Image
                src="/escape-drudgery.jpg"
                alt="Illustration of escaping operational drudgery through automation"
                width={600}
                height={400}
                quality={85}
                className="rounded-lg shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-1"
                data-ai-hint="process improvement"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Key Value Propositions */}
      <section className="py-16 md:py-24 bg-transparent">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-semibold text-accent text-center mb-12">
            Unlock Your Business Potential with Our Services
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {valueProps.map((prop) => (
              <Card key={prop.title} className="text-center shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 bg-card">
                <CardHeader>
                  <prop.icon className="h-12 w-12 mx-auto text-primary mb-4" />
                  <CardTitle className="text-2xl text-accent">{prop.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-foreground">{prop.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
          <p className="text-xl text-center mt-12 font-semibold text-accent">
            Experience unparalleled innovation, profound efficiency, and absolute peace of mind through our expert automation services—without limits.
          </p>
        </div>
      </section>

      {/* Core Automation Services */}
      <section className="py-16 md:py-24 bg-transparent">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-semibold text-accent text-center mb-12">
            Core Automation Services
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {services.map((service) => (
              <Card key={service.title} className="flex flex-col shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 bg-card">
                <CardHeader>
                  <div className="flex items-center gap-4 mb-3">
                    <service.icon className="h-10 w-10 text-primary" />
                    <CardTitle className="text-xl text-accent">{service.title}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="flex-grow">
                  <p className="text-foreground mb-4">{service.description}</p>
                </CardContent>
                <div className="p-6 pt-0">
                  <Button variant="link" asChild className="text-primary p-0 hover:underline">
                    <Link href={service.href}>Learn More <ArrowRight className="ml-2 h-4 w-4" /></Link>
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Pioneering Your Automated Future Section */}
      <section className="py-16 md:py-24 bg-transparent">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-semibold text-accent text-center mb-6">
            Pioneering Your Automated Future
          </h2>
          <p className="text-lg text-foreground mb-12 max-w-3xl mx-auto text-center">
            As a new force in automation, Infiniteo is built on a foundation of innovation, client-centric service, and a commitment to transforming your operational landscape. We're not just building workflows; we're architecting your next level of efficiency and growth.
          </p>
          <div className="grid md:grid-cols-3 gap-8">
            {pioneeringPoints.map((point) => (
              <Card key={point.title} className="text-center shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 bg-card">
                <CardHeader>
                  <point.icon className="h-12 w-12 mx-auto text-primary mb-4" />
                  <CardTitle className="text-xl text-accent">{point.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-foreground">{point.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
