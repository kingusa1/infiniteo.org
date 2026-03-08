import { getBlogPosts as getSheetsPosts } from '@/lib/google-sheets';

export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  date: string;
  tags: string[];
  author: string;
  imageUrl?: string;
}

// Static blog posts (fallback when Google Sheets is not available)
export const staticPosts: BlogPost[] = [
  {
    slug: 'linkedin-automation-guidelines',
    title: 'Mastering LinkedIn Automation: Rules and Best Practices',
    excerpt: "Unlock the power of LinkedIn automation safely and effectively. Learn the do's and don'ts to maximize your reach without compromising your account.",
    imageUrl: `https://image.pollinations.ai/prompt/${encodeURIComponent('Realistic photograph of a professional using a laptop in a modern office, LinkedIn networking concept, business meeting room with glass walls, soft natural lighting, no text no words no letters no watermarks, photorealistic, 8k')}?width=800&height=400&nologo=true&nofeed=true`,
    content: `<p>LinkedIn automation can be a powerful tool for lead generation, networking, and brand building. However, it's crucial to use it wisely to avoid penalties and maintain a professional image.</p><h2 class="text-2xl font-semibold text-primary mt-6 mb-3">Understanding LinkedIn's Terms of Service</h2><p>Before diving into automation, familiarize yourself with LinkedIn's User Agreement. Using unauthorized third-party tools or excessive automation can lead to account restrictions or even suspension.</p><h3 class="text-xl font-semibold text-accent mt-4 mb-2">Do:</h3><ul class="list-disc list-inside space-y-2 mb-4 pl-4 text-foreground/90"><li>Personalize connection requests and messages.</li><li>Automate repetitive but valuable tasks in moderation.</li><li>Focus on quality over quantity.</li><li>Set realistic daily limits for automated actions.</li></ul><h3 class="text-xl font-semibold text-accent mt-4 mb-2">Don't:</h3><ul class="list-disc list-inside space-y-2 mb-4 pl-4 text-foreground/90"><li>Send connection requests to people you have no common ground with.</li><li>Overuse automated messaging.</li><li>Scrape large amounts of data from profiles.</li><li>Use tools that require your LinkedIn login credentials directly.</li></ul><p class="mt-4">By following these guidelines, you can leverage LinkedIn automation effectively and responsibly.</p>`,
    date: '2024-07-30',
    tags: ['LinkedIn', 'Automation', 'Social Media', 'Guidelines'],
    author: 'Infiniteo Team',
  },
  {
    slug: 'crm-data-sync-strategies',
    title: 'Seamless CRM Data Synchronization: A Comprehensive Guide',
    excerpt: 'Discover strategies to keep your CRM data accurate and up-to-date across all platforms through intelligent automation.',
    imageUrl: `https://image.pollinations.ai/prompt/${encodeURIComponent('Realistic photograph of data dashboard on multiple computer screens in a modern tech office, CRM software interface, clean desk setup, ambient blue lighting, no text no words no letters no watermarks, photorealistic, 8k')}?width=800&height=400&nologo=true&nofeed=true`,
    content: `<p>Maintaining accurate and consistent CRM data across multiple platforms is a common challenge. Automated data synchronization can save countless hours and prevent costly errors.</p><h2 class="text-2xl font-semibold text-primary mt-6 mb-3">Why Automate CRM Data Sync?</h2><ul class="list-disc list-inside space-y-2 mb-4 pl-4 text-foreground/90"><li><strong>Accuracy:</strong> Reduces human error for reliable data.</li><li><strong>Efficiency:</strong> Frees up your team from tedious data entry.</li><li><strong>Timeliness:</strong> Ensures all teams work with the most current information.</li></ul><h3 class="text-xl font-semibold text-accent mt-4 mb-2">Key Strategies:</h3><ul class="list-disc list-inside space-y-2 mb-4 pl-4 text-foreground/90"><li>Define Your Master Source of truth.</li><li>Careful field mapping between systems.</li><li>Set appropriate synchronization frequency.</li><li>Establish conflict resolution rules.</li><li>Implement error handling and notifications.</li></ul><p class="mt-4">Implementing these strategies will lead to a more robust and reliable data ecosystem.</p>`,
    date: '2024-07-28',
    tags: ['CRM', 'Data Synchronization', 'Automation', 'Workflow'],
    author: 'Infiniteo Team',
  },
  {
    slug: 'future-of-workflow-automation-ai',
    title: 'The Future of Workflow Automation: How AI is Changing the Game',
    excerpt: 'Explore the transformative impact of Artificial Intelligence on workflow automation, predictive analytics, and intelligent decision-making.',
    imageUrl: `https://image.pollinations.ai/prompt/${encodeURIComponent('Realistic photograph of artificial intelligence concept, robotic arm working alongside human in futuristic factory, industrial automation, warm cinematic lighting, no text no words no letters no watermarks, photorealistic, 8k')}?width=800&height=400&nologo=true&nofeed=true`,
    content: `<p>Artificial Intelligence is actively reshaping how businesses approach workflow automation. From intelligent document processing to predictive task management, AI offers unprecedented opportunities.</p><h2 class="text-2xl font-semibold text-primary mt-6 mb-3">AI's Role in Modern Automation</h2><ul class="list-disc list-inside space-y-2 mb-4 pl-4 text-foreground/90"><li><strong>NLP:</strong> Enabling automation of tasks involving human language.</li><li><strong>Machine Learning:</strong> Allowing systems to learn from data to improve processes.</li><li><strong>Computer Vision:</strong> Automating tasks that involve interpreting visual information.</li></ul><h3 class="text-xl font-semibold text-accent mt-4 mb-2">Benefits:</h3><ul class="list-disc list-inside space-y-2 mb-4 pl-4 text-foreground/90"><li>Increased efficiency and reduced errors.</li><li>Enhanced decision-making with AI-driven insights.</li><li>Improved customer experiences.</li><li>Scalability to handle complex processes.</li></ul><p class="mt-4">AI integration into workflow automation will unlock even more sophisticated capabilities.</p>`,
    date: '2024-07-26',
    tags: ['AI', 'Workflow Automation', 'Future Tech', 'Business Intelligence'],
    author: 'Infiniteo Team',
  },
  {
    slug: 'boosting-sales-crm-automation',
    title: 'Boosting Sales Productivity with CRM Automation Strategies',
    excerpt: 'Learn how to automate key CRM tasks such as lead scoring, follow-ups, and data entry to empower your sales team.',
    imageUrl: `https://image.pollinations.ai/prompt/${encodeURIComponent('Realistic photograph of a sales team celebrating in a modern office, business professionals around a conference table with laptops, bright motivational atmosphere, no text no words no letters no watermarks, photorealistic, 8k')}?width=800&height=400&nologo=true&nofeed=true`,
    content: `<p>Your CRM system is a goldmine of data, but manual processes can hinder productivity. CRM automation streamlines repetitive tasks, allowing sales professionals to focus on closing deals.</p><h2 class="text-2xl font-semibold text-primary mt-6 mb-3">Key CRM Automation Opportunities</h2><ul class="list-disc list-inside space-y-2 mb-4 pl-4 text-foreground/90"><li><strong>Lead Management:</strong> Automate lead capture, assignment, and follow-up sequences.</li><li><strong>Data Entry:</strong> Automatically log emails, calls, and meeting notes.</li><li><strong>Sales Cadences:</strong> Set up automated email and task sequences.</li><li><strong>Reporting:</strong> Generate automated sales reports and dashboards.</li></ul><p class="mt-4">By strategically implementing CRM automation, businesses can significantly boost sales productivity.</p>`,
    date: '2024-07-24',
    tags: ['CRM', 'Sales Automation', 'Productivity', 'Lead Management'],
    author: 'Infiniteo Team',
  },
  {
    slug: 'choosing-right-automation-service',
    title: 'Choosing the Right Automation Service: Beyond Off-the-Shelf Tools',
    excerpt: 'Discover why a custom automation service like Infiniteo offers superior flexibility and scalability for your unique business needs.',
    imageUrl: `https://image.pollinations.ai/prompt/${encodeURIComponent('Realistic photograph of a person choosing between different technology options, hands pointing at holographic interface, modern tech startup office, blue ambient lighting, no text no words no letters no watermarks, photorealistic, 8k')}?width=800&height=400&nologo=true&nofeed=true`,
    content: `<p>While off-the-shelf automation tools offer a good starting point, many businesses find their limitations as complexity grows.</p><h2 class="text-2xl font-semibold text-primary mt-6 mb-3">When Do You Need More?</h2><ul class="list-disc list-inside space-y-2 mb-4 pl-4 text-foreground/90"><li>Complex conditional logic steps.</li><li>Integration with legacy systems.</li><li>Sophisticated data transformation.</li><li>Mission-critical scalability and reliability.</li></ul><h3 class="text-xl font-semibold text-accent mt-4 mb-2">Advantages of Custom Service:</h3><ul class="list-disc list-inside space-y-2 mb-4 pl-4 text-foreground/90"><li><strong>Bespoke Solutions:</strong> Designed for your unique processes.</li><li><strong>Deep Integration:</strong> Connect any system.</li><li><strong>Scalability:</strong> Built for high volumes.</li><li><strong>Expert Support:</strong> Ongoing optimization.</li></ul><p class="mt-4">Infiniteo delivers robust, scalable, and perfectly tailored automation solutions.</p>`,
    date: '2024-07-22',
    tags: ['Automation Service', 'Custom Workflows', 'Scalability'],
    author: 'Infiniteo Team',
  },
  {
    slug: 'role-of-rpa-in-modern-business',
    title: 'The Role of RPA (Robotic Process Automation) in Modern Business',
    excerpt: 'Explore how Robotic Process Automation is streamlining repetitive tasks and driving efficiency across various industries.',
    imageUrl: `https://image.pollinations.ai/prompt/${encodeURIComponent('Realistic photograph of robotic process automation in a warehouse, robotic arms on assembly line, modern manufacturing facility, dramatic industrial lighting, no text no words no letters no watermarks, photorealistic, 8k')}?width=800&height=400&nologo=true&nofeed=true`,
    content: `<p>Robotic Process Automation (RPA) allows businesses to automate repetitive, rule-based tasks traditionally performed by humans. Software "bots" mimic human actions to interact with applications and process data.</p><h2 class="text-2xl font-semibold text-primary mt-6 mb-3">Key Benefits of RPA:</h2><ul class="list-disc list-inside space-y-2 mb-4 pl-4 text-foreground/90"><li><strong>Increased Efficiency:</strong> Bots operate 24/7 without breaks.</li><li><strong>Cost Savings:</strong> Reduces labor costs for manual tasks.</li><li><strong>Improved Accuracy:</strong> Minimizes human error.</li><li><strong>Enhanced Compliance:</strong> RPA bots follow predefined rules precisely.</li></ul><h3 class="text-xl font-semibold text-accent mt-4 mb-2">Common Use Cases:</h3><ul class="list-disc list-inside space-y-2 mb-4 pl-4 text-foreground/90"><li>Data entry and migration.</li><li>Invoice processing.</li><li>Customer service.</li><li>Report generation.</li></ul><p class="mt-4">RPA is often a component of a broader hyperautomation strategy combining RPA with AI and ML.</p>`,
    date: '2024-06-20',
    tags: ['RPA', 'Automation', 'Business Process', 'Efficiency'],
    author: 'Infiniteo Team',
  },
];

export async function getAllBlogPosts(): Promise<BlogPost[]> {
  // Try fetching from Google Sheets via googleapis
  try {
    const sheetsPosts = await getSheetsPosts();
    if (sheetsPosts.length > 0) {
      const sheetsSlugs = new Set(sheetsPosts.map(p => p.slug));
      const uniqueStaticPosts = staticPosts.filter(p => !sheetsSlugs.has(p.slug));
      return [...sheetsPosts, ...uniqueStaticPosts].sort(
        (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
      );
    }
  } catch (error) {
    console.error('Failed to fetch blog posts from Google Sheets:', error);
  }

  return [...staticPosts].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );
}

export function getPostBySlug(slug: string, posts: BlogPost[]): BlogPost | undefined {
  return posts.find((post) => post.slug === slug);
}
