import { NextRequest, NextResponse } from 'next/server';
import { appendBlogPost } from '@/lib/google-sheets';

const POLLINATIONS_BASE = process.env.POLLINATIONS_BASE_URL || 'https://gen.pollinations.ai/v1';
const POLLINATIONS_API = `${POLLINATIONS_BASE}/chat/completions`;
const POLLINATIONS_KEY = process.env.POLLINATIONS_API_KEY || '';

const RSS_SOURCES = [
  'https://feeds.feedburner.com/automationanywhere',
  'https://www.zapier.com/blog/feed/',
  'https://blog.hubspot.com/marketing/rss.xml',
  'https://feeds.feedburner.com/entrepreneur/latest',
];

interface GeneratedPost {
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  tags: string[];
  date: string;
  author: string;
  imageUrl: string;
}

async function fetchRSSTopics(): Promise<string[]> {
  const topics: string[] = [];

  for (const url of RSS_SOURCES) {
    try {
      const response = await fetch(url, { signal: AbortSignal.timeout(5000) });
      const text = await response.text();
      const titleMatches = text.match(/<title><!\[CDATA\[(.*?)\]\]><\/title>|<title>(.*?)<\/title>/g);
      if (titleMatches) {
        for (const match of titleMatches.slice(1, 6)) {
          const title = match.replace(/<\/?title>|<!\[CDATA\[|\]\]>/g, '').trim();
          if (title && title.length > 10) {
            topics.push(title);
          }
        }
      }
    } catch {
      // Skip failed feeds silently
    }
  }

  if (topics.length === 0) {
    topics.push(
      'How AI-Powered Workflow Automation is Transforming Small Businesses',
      'The Ultimate Guide to CRM Integration and Data Synchronization',
      'Social Media Automation Best Practices for Business Growth',
      'Building Scalable Business Processes with Modern Automation Tools',
      'How to Measure ROI on Your Business Automation Investments'
    );
  }

  return topics;
}

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
    .substring(0, 80);
}

async function generateArticle(topic: string): Promise<GeneratedPost> {
  const prompt = `You are a professional content writer for Infiniteo, a B2B automation services company. Write a comprehensive blog article inspired by this topic: "${topic}".

Requirements:
- The article should be about business automation, workflow optimization, or related technology
- Write 600-900 words of high-quality, SEO-optimized content
- Use HTML formatting with these CSS classes:
  - h2: class="text-2xl font-semibold text-primary mt-6 mb-3"
  - h3: class="text-xl font-semibold text-accent mt-4 mb-2"
  - ul: class="list-disc list-inside space-y-2 mb-4 pl-4 text-foreground/90"
  - p: no special class needed
  - strong tags for emphasis
- Include 2-3 subheadings (h2/h3)
- Include practical tips and actionable advice
- End with a call to action mentioning Infiniteo
- Make it engaging and informative

Respond in this exact JSON format (no markdown code blocks, just raw JSON):
{
  "title": "Article Title Here",
  "excerpt": "A 1-2 sentence compelling summary",
  "content": "<p>Full HTML content here...</p>",
  "tags": ["Tag1", "Tag2", "Tag3", "Tag4"]
}`;

  const fetchHeaders: Record<string, string> = { 'Content-Type': 'application/json' };
  if (POLLINATIONS_KEY) {
    fetchHeaders['Authorization'] = `Bearer ${POLLINATIONS_KEY}`;
  }

  const response = await fetch(POLLINATIONS_API, {
    method: 'POST',
    headers: fetchHeaders,
    body: JSON.stringify({
      model: 'openai',
      messages: [
        { role: 'system', content: 'You are a JSON API. Always respond with valid JSON only, no markdown code blocks or extra text.' },
        { role: 'user', content: prompt },
      ],
      response_format: { type: 'json_object' },
    }),
  });

  const responseData = await response.json();

  let text = '';
  if (responseData.choices && responseData.choices[0]?.message?.content) {
    text = responseData.choices[0].message.content;
  } else if (typeof responseData === 'string') {
    text = responseData;
  } else {
    text = JSON.stringify(responseData);
  }

  let parsed;
  try {
    parsed = JSON.parse(text);
  } catch {
    const jsonMatch = text.match(/\{[\s\S]*\}/);
    if (jsonMatch) {
      parsed = JSON.parse(jsonMatch[0]);
    } else {
      throw new Error('Failed to parse AI response: ' + text.substring(0, 200));
    }
  }

  const today = new Date().toISOString().split('T')[0];
  const slug = slugify(parsed.title || topic);

  const imagePrompt = encodeURIComponent(
    `Professional business automation technology illustration, ${parsed.title}, modern minimalist, dark blue and teal color scheme, corporate style`
  );
  const imageUrl = `https://image.pollinations.ai/prompt/${imagePrompt}?width=800&height=400&nologo=true`;

  return {
    slug,
    title: parsed.title || topic,
    excerpt: parsed.excerpt || `Explore insights on ${topic} and how automation can transform your business.`,
    content: parsed.content || '<p>Content generation in progress...</p>',
    tags: parsed.tags || ['Automation', 'Business', 'Technology'],
    date: today,
    author: 'Infiniteo AI',
    imageUrl,
  };
}

async function saveToGoogleSheets(post: GeneratedPost): Promise<boolean> {
  try {
    await appendBlogPost({
      slug: post.slug,
      title: post.title,
      excerpt: post.excerpt,
      content: post.content,
      tags: post.tags.join(', '),
      author: post.author,
      date: post.date,
      imageUrl: post.imageUrl,
      status: 'published',
    });
    return true;
  } catch (error) {
    console.error('Failed to save to Google Sheets:', error);
    return false;
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json().catch(() => ({}));
    const count = Math.min(body.count || 1, 5);

    const topics = await fetchRSSTopics();
    const generatedPosts: GeneratedPost[] = [];

    for (let i = 0; i < count && i < topics.length; i++) {
      try {
        const post = await generateArticle(topics[i]);
        generatedPosts.push(post);
        await saveToGoogleSheets(post);
      } catch (error) {
        console.error(`Failed to generate article for topic: ${topics[i]}`, error);
      }
    }

    return NextResponse.json({
      success: true,
      message: `Generated ${generatedPosts.length} blog post(s)`,
      posts: generatedPosts.map(p => ({
        slug: p.slug,
        title: p.title,
        date: p.date,
      })),
    });
  } catch (error) {
    console.error('Blog generation error:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to generate blog posts' },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const count = parseInt(searchParams.get('count') || '1');

  const fakeRequest = new NextRequest(request.url, {
    method: 'POST',
    body: JSON.stringify({ count }),
    headers: { 'Content-Type': 'application/json' },
  });

  return POST(fakeRequest);
}
