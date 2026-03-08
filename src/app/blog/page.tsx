
import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Newspaper, ArrowRight } from 'lucide-react';
import { getAllBlogPosts } from '@/lib/blog-data';

export const metadata: Metadata = {
  title: 'Blog & Automation Guides',
  description: 'Explore articles, guides, and insights on workflow automation from Infiniteo. Expert tips on CRM integration, social media automation, and business process optimization.',
  openGraph: {
    title: 'Infiniteo Blog - Automation Insights & Guides',
    description: 'Expert articles on workflow automation, CRM integration, and business process optimization.',
    type: 'website',
  },
  alternates: {
    canonical: '/blog',
  },
};

function generateBlogListingSchema(posts: { title: string; slug: string; date: string; excerpt: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Blog',
    name: 'Infiniteo Insights',
    description: 'Expert guides and articles on workflow automation',
    url: 'https://infiniteo.org/blog',
    publisher: {
      '@type': 'Organization',
      name: 'Infiniteo',
      url: 'https://infiniteo.org',
    },
    blogPost: posts.slice(0, 10).map(post => ({
      '@type': 'BlogPosting',
      headline: post.title,
      url: `https://infiniteo.org/blog/${post.slug}`,
      datePublished: post.date,
      description: post.excerpt,
      author: { '@type': 'Organization', name: 'Infiniteo' },
    })),
  };
}

export default async function BlogPage() {
  const posts = await getAllBlogPosts();
  const jsonLd = generateBlogListingSchema(posts);

  return (
    <div className="bg-black/20 backdrop-blur-sm">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
        <header className="text-center mb-12 md:mb-16">
          <Newspaper className="h-16 w-16 mx-auto text-primary mb-4" />
          <h1 className="text-4xl md:text-5xl font-bold text-primary mb-4">Infiniteo Insights</h1>
          <p className="text-lg md:text-xl text-foreground max-w-3xl mx-auto">
            Your source for expert guides, articles, and best practices in workflow automation. Stay ahead with Infiniteo.
          </p>
        </header>

        {posts.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post) => (
              <Card key={post.slug} className="flex flex-col shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300 bg-card">
                {post.imageUrl && (
                  <div className="relative w-full h-48 overflow-hidden rounded-t-lg">
                    <Image
                      src={post.imageUrl}
                      alt={post.title}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                  </div>
                )}
                <CardHeader>
                  <CardTitle className="text-xl text-accent hover:underline">
                    <Link href={`/blog/${post.slug}`}>{post.title}</Link>
                  </CardTitle>
                  <div className="text-xs text-muted-foreground">
                    <span>{post.date}</span> by <span>{post.author}</span>
                  </div>
                </CardHeader>
                <CardContent className="flex-grow">
                  <CardDescription className="text-foreground/90 mb-4">{post.excerpt}</CardDescription>
                  {post.tags && post.tags.length > 0 && (
                    <div className="flex flex-wrap gap-1 mb-2">
                      {post.tags.slice(0, 3).map(tag => (
                        <span key={tag} className="px-2 py-0.5 text-xs bg-secondary text-secondary-foreground rounded-full">
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                </CardContent>
                <div className="p-6 pt-0">
                  <Button variant="link" asChild className="text-primary p-0 hover:underline">
                    <Link href={`/blog/${post.slug}`}>
                      Read More <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <h2 className="text-2xl font-semibold text-primary mb-4">Coming Soon!</h2>
            <p className="text-lg text-foreground">
              We're busy crafting valuable content for you. Check back soon for our latest articles and guides on automation.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
