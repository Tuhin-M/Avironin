import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';
import * as path from 'path';

// Load .env from project root
dotenv.config({ path: path.resolve(process.cwd(), '.env') });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
// Use service role key for seeding (bypasses RLS)
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
    console.error('❌ Missing environment variables!');
    console.error('   NEXT_PUBLIC_SUPABASE_URL:', supabaseUrl ? '✓ Set' : '✗ Missing');
    console.error('   SUPABASE_SERVICE_ROLE_KEY:', process.env.SUPABASE_SERVICE_ROLE_KEY ? '✓ Set' : '✗ Missing');
    console.error('\n   Add SUPABASE_SERVICE_ROLE_KEY to .env to bypass RLS.');
    process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);



const dummyPosts = [
    // Essays
    {
        title: "The Architecture of Autonomous AI Agents",
        slug: "architecture-autonomous-ai-agents",
        content: `<p>As we witness the emergence of autonomous AI agents, understanding their architectural foundations becomes crucial for any technology leader. These systems represent a fundamental shift from simple automation to truly autonomous decision-making.</p>
    <h2>The Three Pillars of Agent Architecture</h2>
    <p>Every successful AI agent is built on three fundamental pillars: perception, reasoning, and action. The perception layer handles input processing and context understanding. The reasoning layer implements decision-making logic, often leveraging large language models. The action layer executes decisions and interacts with external systems.</p>
    <p>This architectural pattern mirrors human cognition but operates at machine scale and speed, enabling unprecedented automation capabilities.</p>`,
        summary: "A deep dive into the architectural patterns that power modern autonomous AI agents and their implications for enterprise software.",
        category: "AI_SYSTEMS",
        content_type: "essay",
        published: true,
        featured: true,
        read_time: 12,
        image_url: "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800"
    },
    {
        title: "Modular Monolith: The Middle Ground Architecture",
        slug: "modular-monolith-architecture",
        content: `<p>The eternal debate between monoliths and microservices often overlooks a powerful middle ground: the modular monolith. This architectural pattern combines the simplicity of deployment with the modularity of distributed systems.</p>
    <h2>Why Modular Monoliths Work</h2>
    <p>Startups often rush to microservices too early, incurring operational complexity before they understand their domain boundaries. A modular monolith allows you to define clear module boundaries while maintaining a single deployment unit.</p>
    <p>The key is enforcing strict interface contracts between modules, making future extraction to microservices straightforward when scale demands it.</p>`,
        summary: "Exploring the modular monolith pattern as a pragmatic choice for startups navigating between monolithic and microservices architectures.",
        category: "TECHNOLOGY",
        content_type: "essay",
        published: true,
        featured: true,
        read_time: 15,
        image_url: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&q=80&w=800"
    },
    {
        title: "Network Effects in AI Platform Businesses",
        slug: "network-effects-ai-platforms",
        content: `<p>Platform businesses have long leveraged network effects, but AI introduces a new dimension: data network effects. Understanding these dynamics is essential for building defensible AI businesses.</p>
    <h2>Traditional vs Data Network Effects</h2>
    <p>Traditional network effects grow with user count. Data network effects grow with data quality and diversity. An AI platform that improves with every user interaction creates a compounding advantage that's nearly impossible to replicate.</p>
    <p>The strategic implication is clear: prioritize data collection and model improvement feedback loops from day one.</p>`,
        summary: "How AI platforms leverage data network effects to build sustainable competitive advantages in the modern technology landscape.",
        category: "STRATEGY",
        content_type: "essay",
        published: true,
        featured: true,
        read_time: 10,
        image_url: "https://images.unsplash.com/photo-1639322537228-f710d846310a?auto=format&fit=crop&q=80&w=800"
    },

    // Blogs
    {
        title: "5 Lessons from Scaling Our Engineering Team to 50",
        slug: "lessons-scaling-engineering-team",
        content: `<p>Scaling an engineering team is more art than science. Here are five hard-won lessons from growing our team from 5 to 50 engineers over 18 months.</p>
    <h2>1. Hire for Culture, Train for Skills</h2>
    <p>Technical skills can be taught. Cultural alignment cannot. Every bad hire we made was when we prioritized résumé over values fit.</p>
    <h2>2. Documentation is Infrastructure</h2>
    <p>At 10 engineers, tribal knowledge works. At 50, it's a bottleneck. Invest in documentation early—your future self will thank you.</p>`,
        summary: "Practical lessons learned from rapidly scaling an engineering organization while maintaining culture and velocity.",
        category: "STARTUP_STRATEGY",
        content_type: "blog",
        published: true,
        featured: false,
        read_time: 6,
        image_url: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=800"
    },
    {
        title: "Why We Moved from Next.js to Remix",
        slug: "nextjs-to-remix-migration",
        content: `<p>After two years on Next.js, we made the decision to migrate to Remix. Here's why, and what we learned in the process.</p>
    <h2>The Breaking Point</h2>
    <p>Our app server components were becoming a maintenance nightmare. Data fetching patterns were inconsistent across the team, and SSR performance varied wildly.</p>
    <h2>What Remix Solved</h2>
    <p>Remix's loader/action pattern enforced consistency. The nested routing model matched our UI hierarchy perfectly. Most importantly, our Core Web Vitals improved by 40%.</p>`,
        summary: "Our journey from Next.js to Remix, including the challenges faced and performance improvements gained.",
        category: "TECHNOLOGY",
        content_type: "blog",
        published: true,
        featured: false,
        read_time: 8,
        image_url: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&q=80&w=800"
    },
    {
        title: "The Rise of Vertical AI Agents",
        slug: "rise-vertical-ai-agents",
        content: `<p>While general-purpose AI assistants grab headlines, the real value creation is happening in vertical-specific agents. Here's what the smart money is betting on.</p>
    <h2>Domain Expertise Matters</h2>
    <p>A legal AI that understands contract law deeply outperforms a general AI every time. Vertical specialization creates moats through accumulated domain knowledge.</p>
    <p>The opportunity? Pick a boring industry with high-value repetitive tasks. That's where vertical AI agents will thrive.</p>`,
        summary: "Why industry-specific AI agents are outperforming general-purpose solutions and where the opportunities lie.",
        category: "AI_SYSTEMS",
        content_type: "blog",
        published: true,
        featured: false,
        read_time: 5,
        image_url: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&q=80&w=800"
    },

    // White Papers
    {
        title: "State of AI Infrastructure 2026",
        slug: "state-ai-infrastructure-2026",
        content: `<h1>State of AI Infrastructure 2026</h1>
    <h2>Executive Summary</h2>
    <p>The AI infrastructure landscape has undergone dramatic transformation in the past year. This report examines the key trends, technologies, and strategic considerations for organizations building AI-native applications.</p>
    <h2>Key Findings</h2>
    <ul>
    <li>GPU costs have decreased 40% while performance increased 60%</li>
    <li>Edge AI deployment grew 300% year-over-year</li>
    <li>Open-source models now match proprietary performance in 80% of use cases</li>
    </ul>
    <h2>Recommendations</h2>
    <p>Organizations should prioritize hybrid deployment strategies, investing in both cloud and edge capabilities to maximize flexibility and cost efficiency.</p>`,
        summary: "Comprehensive analysis of the AI infrastructure landscape with key trends, market data, and strategic recommendations for 2026.",
        category: "RESEARCH",
        content_type: "whitepaper",
        published: true,
        featured: false,
        read_time: 25,
        image_url: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=800"
    },
    {
        title: "Framework: Building Products with AI-First Design",
        slug: "framework-ai-first-product-design",
        content: `<h1>AI-First Product Design Framework</h1>
    <h2>Introduction</h2>
    <p>Traditional product design methodologies were created for deterministic software. AI products require a fundamentally different approach that accounts for probabilistic outputs and continuous learning.</p>
    <h2>The ADAPT Framework</h2>
    <h3>A - Augment, Don't Replace</h3>
    <p>Design AI features that enhance human capabilities rather than attempting full automation.</p>
    <h3>D - Design for Uncertainty</h3>
    <p>Build interfaces that communicate confidence levels and handle edge cases gracefully.</p>
    <h3>A - Allow Human Override</h3>
    <p>Always provide escape hatches for users to correct or override AI decisions.</p>
    <h3>P - Plan for Improvement</h3>
    <p>Build feedback loops that enable continuous model improvement.</p>
    <h3>T - Test Continuously</h3>
    <p>Implement comprehensive evaluation strategies that go beyond traditional testing.</p>`,
        summary: "A comprehensive framework for designing products that leverage AI capabilities while maintaining user trust and control.",
        category: "FRAMEWORKS",
        content_type: "whitepaper",
        published: true,
        featured: false,
        read_time: 30,
        image_url: "https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?auto=format&fit=crop&q=80&w=800"
    },
    {
        title: "Technical Due Diligence for AI Startups",
        slug: "technical-due-diligence-ai-startups",
        content: `<h1>Technical Due Diligence for AI Startups</h1>
    <h2>Overview</h2>
    <p>Investing in AI startups requires specialized technical evaluation that goes beyond traditional software due diligence. This guide provides a comprehensive framework for assessing AI-native companies.</p>
    <h2>Key Evaluation Areas</h2>
    <h3>1. Data Moat Assessment</h3>
    <p>Evaluate the uniqueness, scale, and defensibility of the company's data assets.</p>
    <h3>2. Model Architecture Review</h3>
    <p>Assess whether the technical approach is appropriate for the problem domain.</p>
    <h3>3. Infrastructure Scalability</h3>
    <p>Determine if the infrastructure can handle 10x growth without fundamental redesign.</p>
    <h3>4. Team Capability</h3>
    <p>Evaluate the depth of ML expertise and research background of the technical team.</p>
    <h2>Red Flags</h2>
    <ul>
    <li>Over-reliance on third-party APIs without proprietary value-add</li>
    <li>Lack of evaluation metrics or benchmarking</li>
    <li>Missing data governance and privacy frameworks</li>
    </ul>`,
        summary: "A comprehensive guide for investors conducting technical due diligence on AI-native startups.",
        category: "STRATEGY",
        content_type: "whitepaper",
        published: true,
        featured: false,
        read_time: 20,
        image_url: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800"
    }
];

const dummyAuthor = {
    name: "Avironin Research",
    role: "Strategic Foresight Group",
    bio: "The Strategic Foresight Group at Avironin focuses on the long-term architectural shifts in technical business models and emerging cognitive systems.",
    avatar_url: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200",
    social_links: { twitter: "https://twitter.com", linkedin: "https://linkedin.com" }
};

async function seed() {
    console.log('🌱 Starting database seed...\n');

    // 1. Get or Create Author
    let authorId: string;

    // Check if author exists (because 'name' is not unique constraint in DB, only ID)
    const { data: existingAuthor } = await supabase
        .from('authors')
        .select('id')
        .eq('name', dummyAuthor.name)
        .single();

    if (existingAuthor) {
        console.log(`✅ Author found: ${dummyAuthor.name}`);
        authorId = existingAuthor.id;
    } else {
        const { data: newAuthor, error: createError } = await supabase
            .from('authors')
            .insert(dummyAuthor)
            .select()
            .single();

        if (createError) {
            console.error('❌ Error creating author:', createError.message);
            console.error('   Details:', createError);
            return;
        }
        console.log(`✅ Author created: ${newAuthor.name}`);
        authorId = newAuthor.id;
    }

    // 2. Create Posts
    for (const post of dummyPosts) {
        const postWithAuthor = { ...post, author_id: authorId };

        const { error } = await supabase
            .from('posts')
            .upsert(postWithAuthor, { onConflict: 'slug' });

        if (error) {
            console.error(`❌ Error inserting "${post.title}":`, error.message);
        } else {
            console.log(`✅ ${post.content_type.toUpperCase()}: ${post.title}`);
        }
    }

    console.log('\n🎉 Seed complete!');
    console.log(`   - ${dummyPosts.filter(p => p.content_type === 'essay').length} Essays`);
    console.log(`   - ${dummyPosts.filter(p => p.content_type === 'blog').length} Blogs`);
    console.log(`   - ${dummyPosts.filter(p => p.content_type === 'whitepaper').length} White Papers`);
}

seed().catch(console.error);
