
import type { Metadata, ResolvingMetadata } from 'next';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowLeft, CalendarDays, UserCircle } from 'lucide-react';
import Link from 'next/link';
import { getAllBlogPosts, getPostBySlug, staticPosts } from '@/lib/blog-data';

type PageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return staticPosts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata(
  { params }: PageProps,
  _parent: ResolvingMetadata
): Promise<Metadata> {
  const { slug } = await params;
  const posts = await getAllBlogPosts();
  const post = getPostBySlug(slug, posts);

  if (!post) {
    return { title: 'Post Not Found' };
  }

  return {
    title: post.title,
    description: post.excerpt,
    keywords: post.tags,
    authors: [{ name: post.author }],
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: 'article',
      publishedTime: post.date,
      authors: [post.author],
      tags: post.tags,
      ...(post.imageUrl && { images: [{ url: post.imageUrl, width: 800, height: 400, alt: post.title }] }),
    },
    alternates: {
      canonical: `/blog/${slug}`,
    },
  };
}

function generateArticleSchema(post: { title: string; excerpt: string; date: string; author: string; slug: string; imageUrl?: string; tags: string[] }) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.excerpt,
    datePublished: post.date,
    dateModified: post.date,
    url: `https://infiniteo.org/blog/${post.slug}`,
    author: {
      '@type': 'Organization',
      name: post.author,
      url: 'https://infiniteo.org',
    },
    publisher: {
      '@type': 'Organization',
      name: 'Infiniteo',
      url: 'https://infiniteo.org',
      logo: {
        '@type': 'ImageObject',
        url: 'https://infiniteo.org/infiniteo.png',
      },
    },
    ...(post.imageUrl && {
      image: {
        '@type': 'ImageObject',
        url: post.imageUrl,
      },
    }),
    keywords: post.tags.join(', '),
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `https://infiniteo.org/blog/${post.slug}`,
    },
  };
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  const posts = await getAllBlogPosts();
  const post = getPostBySlug(slug, posts);

  if (!post) {
    notFound();
  }

  const jsonLd = generateArticleSchema(post);

  return (
    <div className="bg-black/20 backdrop-blur-sm">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <article className="max-w-3xl mx-auto">
          <div className="mb-8">
            <Link href="/blog" className="inline-flex items-center text-primary hover:underline mb-6 text-sm">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Blog
            </Link>
            <h1 className="text-3xl md:text-4xl font-bold text-primary mb-3">{post.title}</h1>
            <div className="flex items-center space-x-4 text-sm text-muted-foreground mb-6">
              <div className="flex items-center">
                <CalendarDays className="mr-2 h-4 w-4" />
                <time dateTime={post.date}>{post.date}</time>
              </div>
              <div className="flex items-center">
                <UserCircle className="mr-2 h-4 w-4" />
                <span>By {post.author}</span>
              </div>
            </div>

            {post.imageUrl && (
              <div className="relative w-full h-64 md:h-80 mb-8 rounded-lg overflow-hidden">
                <Image
                  src={post.imageUrl}
                  alt={post.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 768px"
                  priority
                />
              </div>
            )}
          </div>

          <Card className="shadow-lg bg-card">
            <CardContent className="py-6">
              <div
                className="prose prose-lg dark:prose-invert max-w-none text-foreground prose-headings:text-primary prose-h2:text-2xl prose-h2:font-semibold prose-h2:mt-6 prose-h2:mb-3 prose-h3:text-xl prose-h3:font-semibold prose-h3:text-accent prose-h3:mt-4 prose-h3:mb-2 prose-p:leading-relaxed prose-a:text-accent prose-a:hover:underline prose-ul:list-disc prose-ul:pl-5 prose-ul:space-y-1 prose-strong:text-foreground/90"
                dangerouslySetInnerHTML={{ __html: post.content }}
              />
            </CardContent>
          </Card>

          {post.tags && post.tags.length > 0 && (
            <div className="mt-8">
              <h3 className="text-lg font-semibold text-primary mb-2">Tags:</h3>
              <div className="flex flex-wrap gap-2">
                {post.tags.map(tag => (
                  <span key={tag} className="px-3 py-1 text-xs bg-secondary text-secondary-foreground rounded-full">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          )}
          <div className="mt-12 text-center">
            <Link href="/blog" className="inline-flex items-center text-primary hover:underline">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Return to Blog Overview
            </Link>
          </div>
        </article>
      </div>
    </div>
  );
}
