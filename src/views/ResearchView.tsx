import AvContainer from "@/components/layout/AvContainer";
import AvSection from "@/components/layout/AvSection";
import AvCard from "@/components/ui/AvCard";

/**
 * ResearchView Component
 * 
 * Displays whitepapers and strategic frameworks.
 */
export default function ResearchView() {
    return (
        <div className="pt-20">
            <AvSection variant="hex">
                <AvContainer>
                    <div className="max-w-3xl">
                        <h1 className="mb-6 uppercase">Research & Frameworks</h1>
                        <p className="text-xl text-gray-600 leading-relaxed">
                            Whitepapers and strategic frameworks for navigating complex technical systems and venture-scale growth.
                        </p>
                    </div>
                </AvContainer>
            </AvSection>

            <AvSection className="bg-white">
                <AvContainer>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                        <AvCard
                            title="The Cognitive Stack Framework"
                            description="A systematic approach to evaluating LLM integration at the application layer. Moving beyond wrappers to core architectural cognitive loops."
                            category="FRAMEWORKS"
                            href="/research/frameworks/cognitive-stack"
                            imageUrl="https://metana.io/wp-content/uploads/2025/12/Full-stack-frameworks.webp"
                        />
                        <AvCard
                            title="State of Venture Intelligence 2026"
                            description="Our annual deep dive into how technical leadership is shifting the landscape of early-stage software development."
                            category="RESEARCH"
                            href="/research/whitepapers/venture-intelligence-2026"
                            imageUrl="https://images.unsplash.com/photo-1543286386-713bdd548da4?auto=format&fit=crop&q=80&w=800"
                        />
                    </div>
                </AvContainer>
            </AvSection>
        </div>
    );
}
