import AvContainer from "@/components/layout/AvContainer";
import AvSection from "@/components/layout/AvSection";

/**
 * AboutView Component
 * 
 * Provides background on Avironin's mission and philosophy.
 */
export default function AboutView() {
    return (
        <div className="pt-20">
            <AvSection variant="hex">
                <AvContainer>
                    <div className="max-w-3xl border-l-4 border-azure pl-12">
                        <h1 className="mb-8">ABOUT AVIRONIN</h1>
                        <p className="text-2xl text-charcoal font-bold leading-relaxed">
                            Synthesizing deep technical foresight with venture-scale business strategy.
                        </p>
                    </div>
                </AvContainer>
            </AvSection>

            <AvSection className="bg-white">
                <AvContainer>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-24">
                        <div className="space-y-8 text-xl leading-relaxed text-gray-700">
                            <p>
                                Avironin is a global knowledge platform built to empower the founders, builders, and technologists who are architecting the future.
                            </p>
                            <p>
                                We operate at the intersection of Technology, AI, and Business Strategy. Our mission is to provide the "operating manual" for the next wave of high-growth startups.
                            </p>
                            <p>
                                Think of us as a fusion of Harvard Business Review's strategic rigor and MIT Technology Review's technical depth—engineered specifically for the speed and ambition of the startup ecosystem.
                            </p>
                            <p>
                                We believe that the most valuable companies of the next decade will be built by polymaths— leaders who are fluent in both code and capital, algorithms and economics. We exist to serve them.
                            </p>
                        </div>

                        <div className="bg-offwhite p-12 rounded-xl flex flex-col justify-center border border-gray-100">
                            <h3 className="mb-6">The Reading Room Philosophy</h3>
                            <p className="text-gray-600 mb-8 italic">
                                "Knowledge is the only asset that grows when shared, but only when it is consumed with clarity."
                            </p>
                            <ul className="space-y-4">
                                {[
                                    "Zero Distractions. Zero Pop-ups.",
                                    "Academic Rigor Meets Startup Speed.",
                                    "Formatting for Deep Focus.",
                                    "Data-Driven Insights, Not Hype."
                                ].map((item) => (
                                    <li key={item} className="flex items-center space-x-3">
                                        <div className="w-2 h-2 bg-azure rounded-full" />
                                        <span className="font-bold text-charcoal uppercase tracking-widest text-sm">{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </AvContainer>
            </AvSection>
        </div>
    );
}
