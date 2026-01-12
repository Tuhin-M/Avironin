"use client";

import React, { ErrorInfo, ReactNode } from 'react';
import AvButton from '../ui/AvButton';
import AvContainer from '../layout/AvContainer';
import AvSection from '../layout/AvSection';

interface Props {
    children: ReactNode;
}

interface State {
    hasError: boolean;
}

class AvErrorBoundary extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = { hasError: false };
    }

    static getDerivedStateFromError(_: Error): State {
        return { hasError: true };
    }

    componentDidCatch(error: Error, errorInfo: ErrorInfo) {
        console.error("Uncaught error:", error, errorInfo);
    }

    render() {
        if (this.state.hasError) {
            return (
                <AvSection variant="hex" className="min-h-screen flex items-center">
                    <AvContainer className="text-center space-y-8">
                        <div className="bg-white p-12 rounded-2xl shadow-xl border border-gray-100 max-w-xl mx-auto">
                            <h2 className="text-3xl mb-4 text-charcoal">Something Went Wrong</h2>
                            <p className="text-gray-500 mb-8">
                                The strategic intelligence engine encountered an unexpected anomaly.
                                This usually occurs during deep technical state transitions.
                            </p>
                            <AvButton onClick={() => window.location.reload()}>
                                Reset Intelligence System
                            </AvButton>
                        </div>
                    </AvContainer>
                </AvSection>
            );
        }

        return this.props.children;
    }
}

export default AvErrorBoundary;
