"use client";

import AvContainer from "@/components/layout/AvContainer";
import AvSection from "@/components/layout/AvSection";
import AvForm from "@/components/ui/AvForm";
import AvInput from "@/components/ui/AvInput";
import AvSelect from "@/components/ui/AvSelect";
import AvTextarea from "@/components/ui/AvTextarea";
import AvCheckbox from "@/components/ui/AvCheckbox";
import AvButton from "@/components/ui/AvButton";
import { useState } from "react";
import { createContactSubmission } from "@/lib/supabase/db";

/**
 * ContactView Component
 * 
 * Provides a contact form for inquiries.
 */
export default function ContactView() {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsSubmitting(true);
        setError(null);

        const formData = new FormData(e.currentTarget);
        const name = formData.get("name") as string;
        const email = formData.get("email") as string;
        const company = formData.get("company") as string || undefined;
        const stage = formData.get("stage") as string || undefined;
        const message = formData.get("message") as string;
        const isPriority = formData.get("priority") === "on";

        const success = await createContactSubmission({
            name,
            email,
            company,
            stage,
            message,
            priority: isPriority ? 2 : 1,
        });

        setIsSubmitting(false);
        if (success) {
            setIsSubmitted(true);
        } else {
            setError("Failed to submit inquiry. Please try again.");
        }
    };

    const stageOptions = [
        { value: 'IDEATION', label: 'Ideation' },
        { value: 'PRE_SEED', label: 'Pre-Seed' },
        { value: 'SEED', label: 'Seed' },
        { value: 'SERIES_A', label: 'Series A' },
        { value: 'SERIES_B', label: 'Series B' },
        { value: 'LATER', label: 'Later / Exit' },
    ];

    return (
        <div className="pt-20">
            <AvSection variant="hex">
                <AvContainer>
                    <div className="max-w-3xl border-l-4 border-coral pl-12">
                        <h1 className="mb-8 uppercase tracking-tight text-4xl md:text-6xl font-black text-charcoal">CONNECT WITH AVIRONIN</h1>
                        <p className="text-xl text-charcoal leading-relaxed opacity-90">
                            Avironin is primarily a public knowledge platform. However, we maintain a private channel for founders building in deep tech, AI, and complex systems.
                        </p>
                    </div>
                </AvContainer>
            </AvSection>

            <AvSection className="bg-white">
                <AvContainer>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-24">
                        <div>
                            <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                                If you are a founder seeking strategic clarity on a critical pivot, a technical decision, or a go-to-market motion, you may reach out below.
                            </p>
                            <div className="bg-offwhite p-8 rounded-lg border-l-4 border-azure">
                                <p className="font-bold text-charcoal uppercase tracking-widest text-xs mb-2">Note:</p>
                                <p className="text-sm text-gray-600">
                                    We prioritize inquiries from Seed to Series B founders and technical leadership. Response times vary based on current research cycles.
                                </p>
                            </div>
                        </div>

                        <div className="bg-white p-10 rounded-2xl shadow-xl border border-gray-100">
                            {isSubmitted ? (
                                <div className="py-20 text-center space-y-6">
                                    <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto">
                                        <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                                        </svg>
                                    </div>
                                    <h3 className="text-2xl">Transmission Received</h3>
                                    <p className="text-gray-500 max-w-xs mx-auto">Our strategic consultants will review your inquiry within 48 hours.</p>
                                    <AvButton variant="outline" onClick={() => setIsSubmitted(false)}>Send another message</AvButton>
                                </div>
                            ) : (
                                <AvForm onSubmit={handleSubmit}>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <AvInput label="Full Name" name="name" required placeholder="John Doe" />
                                        <AvInput label="Professional Email" name="email" type="email" required placeholder="john@company.com" />
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <AvInput label="Company Name" name="company" placeholder="Acme AI" />
                                        <AvSelect label="Current Stage" name="stage" options={stageOptions} />
                                    </div>

                                    <AvTextarea label="Strategic Inquiry" name="message" required placeholder="Describe the problem or decision you are navigating..." />

                                    <div className="py-2">
                                        <AvCheckbox label="High Priority - Building in AI/Deep Tech" name="priority" />
                                    </div>

                                    <AvButton
                                        type="submit"
                                        className="w-full h-14 uppercase tracking-[0.2em] font-black"
                                        isLoading={isSubmitting}
                                    >
                                        Submit Inquiry
                                    </AvButton>
                                </AvForm>
                            )}
                        </div>
                    </div>
                </AvContainer>
            </AvSection>
        </div>
    );
}
