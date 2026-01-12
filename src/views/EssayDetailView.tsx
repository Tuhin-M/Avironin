import AvContainer from "@/components/layout/AvContainer";
import AvSection from "@/components/layout/AvSection";
import AvButton from "@/components/ui/AvButton";
import AvBadge from "@/components/ui/AvBadge";
import AvTableOfContents from "@/components/content/AvTableOfContents";
import { AvAuthorCard } from "@/components/content/AvContentComponents";
import { AvMDXComponents } from "@/components/content/AvMDXComponents";
import Link from "next/link";

interface EssayDetailViewProps {
    slug: string;
}

/**
 * EssayDetailView Component
 * 
 * Displays a single dynamic essay.
 */
export default function EssayDetailView({ slug }: EssayDetailViewProps) {
    // Mock Essay Detail
    const essay = {
        title: "Autonomous Agents and the Death of the SaaS Seat Model",
        subtitle: "How AI agents are shifting value from interface to outcomes, and what it means for your gross margins.",
        category: "AI_SYSTEMS",
        date: "JANUARY 06, 2026",
        readTime: 12,
        author: {
            name: "Avironin Research",
            role: "Strategic Foresight Group",
            bio: "The Strategic Foresight Group at Avironin focuses on the long-term architectural shifts in technical business models and emerging cognitive systems.",
            avatar: ""
        }
    };

    return (
        <article className="pt-20">
            {/* Essay Header */}
            <AvSection variant="hex" className="pb-32">
                <AvContainer size="md">
                    <div className="space-y-8">
                        <Link href="/essays" className="text-xs font-black uppercase tracking-[0.2em] text-azure hover:opacity-80 transition-opacity">
                            ← Back to Intelligence
                        </Link>
                        <div className="space-y-4">
                            <AvBadge variant="primary">{essay.category.replace('_', ' ')}</AvBadge>
                            <h1 className="text-4xl md:text-6xl leading-[1.05]">{essay.title}</h1>
                            <p className="text-2xl text-gray-500 leading-relaxed font-serif italic">
                                {essay.subtitle}
                            </p>
                        </div>
                        <div className="flex items-center space-x-6 pt-4 border-t border-azure/10">
                            <div className="flex flex-col">
                                <span className="text-[10px] font-black uppercase tracking-widest text-gray-400">Published</span>
                                <span className="text-sm font-bold text-charcoal">{essay.date}</span>
                            </div>
                            <div className="flex flex-col">
                                <span className="text-[10px] font-black uppercase tracking-widest text-gray-400">Format</span>
                                <span className="text-sm font-bold text-charcoal">Strategic Intelligence</span>
                            </div>
                            <div className="flex flex-col">
                                <span className="text-[10px] font-black uppercase tracking-widest text-gray-400">Reading Time</span>
                                <span className="text-sm font-bold text-charcoal">{essay.readTime} Minutes</span>
                            </div>
                        </div>
                    </div>
                </AvContainer>
            </AvSection>

            {/* Content Area */}
            <AvSection className="bg-white pt-0 -mt-20">
                <AvContainer size="lg">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
                        {/* Sidebar TOC */}
                        <aside className="hidden lg:block lg:col-span-3">
                            <div className="sticky top-32">
                                <AvTableOfContents />
                            </div>
                        </aside>

                        {/* Main Content */}
                        <div className="lg:col-span-8 lg:col-start-5 space-y-12">
                            <div className="prose-content">
                                <AvMDXComponents.h2 id="the-shifting-paradigm">The Shifting Paradigm</AvMDXComponents.h2>
                                <AvMDXComponents.p>
                                    For the last two decades, the software-as-a-service (SaaS) economy has been built on a single, primary metric: the seat. We sold access to tools, and value was derivative of the number of humans using those tools. This model was perfectly aligned with a world where software was an instrument and humans were the agents.
                                </AvMDXComponents.p>
                                <AvMDXComponents.p>
                                    However, the emergence of autonomous cognitive agents—systems capable of high-level reasoning, multi-step execution, and self-correction—is fundamentally breaking the seat-based contract. When a single "agent" can perform the work of a ten-person department at 1/1000th the cost and 100x the speed, the concept of a seat becomes irrelevant.
                                </AvMDXComponents.p>

                                <AvMDXComponents.blockquote>
                                    "We are moving from a world of selling tools for productivity to a world of selling outcomes as a service."
                                </AvMDXComponents.blockquote>

                                <AvMDXComponents.h2 id="economic-reconstruction">Economic Reconstruction</AvMDXComponents.h2>
                                <AvMDXComponents.p>
                                    As value migrates from the interface to the outcome, gross margins for traditional SaaS companies will face unprecedented pressure. If your software is primarily a CRUD interface for a database, an agent doesn't need your UI. It needs your API—or, more likely, it will just build a replacement system for its specific task.
                                </AvMDXComponents.p>

                                <AvMDXComponents.h3 id="margin-dynamics">Margin Dynamics</AvMDXComponents.h3>
                                <AvMDXComponents.p>
                                    The winners in this new landscape will be those who own the underlying data moats and the execution loops. We call this the "Outcome Layer."
                                </AvMDXComponents.p>

                                <AvMDXComponents.img src="https://images.unsplash.com/photo-1635070041078-e363dbe005cb?auto=format&fit=crop&q=80&w=1200" alt="Mapping the shift from Seat-based to Outcome-based models" />

                                <AvMDXComponents.h2 id="conclusion">Strategic Conclusion</AvMDXComponents.h2>
                                <AvMDXComponents.p>
                                    Founders starting today must build "agent-first" architectures. This means prioritizing verifiable outputs over beautiful interfaces. It means designing systems that are meant to be consumed by machines, not just browsed by people.
                                </AvMDXComponents.p>
                            </div>

                            {/* Author Section */}
                            <div className="pt-16 border-t border-gray-100">
                                <AvAuthorCard {...essay.author} />
                            </div>

                            {/* Footer CTA */}
                            <div className="bg-charcoal text-white p-12 rounded-2xl flex flex-col md:flex-row items-center justify-between gap-8">
                                <div className="space-y-2">
                                    <h3 className="text-white">Apply these frameworks.</h3>
                                    <p className="text-gray-400">Join our private channel for deep tech founders.</p>
                                </div>
                                <AvButton variant="primary" size="lg" className="px-10">Connect Strategically</AvButton>
                            </div>
                        </div>
                    </div>
                </AvContainer>
            </AvSection>
        </article>
    );
}
