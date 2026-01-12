import AvContainer from "@/components/layout/AvContainer";
import AvSection from "@/components/layout/AvSection";
import { AvEssayCard } from "@/components/content/AvContentComponents";

/**
 * InsightsView Component
 * 
 * Displays analytical pulses on market and tech shifts.
 */
export default function InsightsView() {
    return (
        <div className="pt-20">
            <AvSection variant="hex" className="pb-16 text-center">
                <AvContainer>
                    <div className="max-w-3xl mx-auto">
                        <h1 className="mb-4">Insights & Analysis</h1>
                        <p className="text-xl text-gray-500">Real-time pulses on the market and emerging tech shifts.</p>
                    </div>
                </AvContainer>
            </AvSection>

            <AvSection className="bg-white pt-0">
                <AvContainer>
                    <div className="max-w-4xl mx-auto divide-y divide-gray-100">
                        <AvEssayCard
                            title="Post-Mortem: Why the Enterprise AI Bubble of '25 didn't burst—it hardened."
                            summary="Analyzing the shift from general-purpose assistants to specialized, vertical-specific cognitive agents."
                            category="AI_SYSTEMS"
                            author={{ name: "Analysis Team", avatar: "" }}
                            date="JAN 02, 2026"
                            readTime={5}
                            href="/insights/ai-bubble-hardened"
                        />
                        <AvEssayCard
                            title="Infrastructure Watch: The Rise of Distributed Inference"
                            summary="Why the next decade of AI isn't in the cloud—it's at the edge, and what this means for latency-sensitive applications."
                            category="TECHNOLOGY"
                            author={{ name: "Infrastructure Group", avatar: "" }}
                            date="DEC 20, 2025"
                            readTime={7}
                            href="/insights/distributed-inference"
                        />
                    </div>
                </AvContainer>
            </AvSection>
        </div>
    );
}
