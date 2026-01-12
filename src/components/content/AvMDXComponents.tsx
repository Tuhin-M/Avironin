import Link from 'next/link';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

/**
 * AvCodeBlock
 */
export const AvCodeBlock = ({ children, language }: { children: string; language?: string }) => {
    return (
        <div className="relative my-8 rounded-lg overflow-hidden bg-charcoal border border-white/10 group">
            {language && (
                <div className="absolute top-0 right-0 px-2 py-1 bg-white/10 text-white/50 text-[10px] font-bold uppercase tracking-widest rounded-bl">
                    {language}
                </div>
            )}
            <pre className="p-6 overflow-x-auto text-sm text-gray-300 font-mono leading-relaxed">
                <code>{children}</code>
            </pre>
        </div>
    );
};

/**
 * AvMDXComponents mapping
 */
export const AvMDXComponents = {
    h1: (props: any) => <h1 className="text-4xl md:text-5xl font-black mb-8 mt-16 text-charcoal" {...props} />,
    h2: (props: any) => <h2 className="text-3xl md:text-4xl font-black mb-6 mt-12 text-charcoal border-b border-gray-100 pb-4" {...props} />,
    h3: (props: any) => <h3 className="text-2xl font-bold mb-4 mt-8 text-charcoal" {...props} />,
    p: (props: any) => <p className="text-lg md:text-xl text-gray-700 leading-relaxed mb-8 font-serif" {...props} />,
    ul: (props: any) => <ul className="list-disc list-outside pl-6 mb-8 space-y-4 text-xl font-serif text-gray-700" {...props} />,
    ol: (props: any) => <ol className="list-decimal list-outside pl-6 mb-8 space-y-4 text-xl font-serif text-gray-700" {...props} />,
    li: (props: any) => <li className="pl-2" {...props} />,
    blockquote: (props: any) => (
        <blockquote className="border-l-4 border-azure pl-8 py-4 my-12 bg-azure/5 rounded-r-lg">
            <p className="text-2xl italic text-azure font-serif leading-relaxed" {...props} />
        </blockquote>
    ),
    hr: () => <hr className="my-16 border-gray-200" />,
    a: ({ href, children, ...props }: any) => {
        const isInternal = href && (href.startsWith('/') || href.startsWith('#'));
        if (isInternal) {
            return (
                <Link href={href} className="text-azure font-bold hover:underline" {...props}>
                    {children}
                </Link>
            );
        }
        return (
            <a href={href} className="text-azure font-bold hover:underline" {...props}>
                {children}
            </a>
        );
    },
    code: (props: any) => <code className="bg-gray-100 rounded px-1.5 py-0.5 text-sm font-bold text-coral" {...props} />,
    pre: (props: any) => <AvCodeBlock {...props} />,
    img: (props: any) => (
        <figure className="my-12">
            <img className="w-full h-auto rounded-xl border border-gray-100 shadow-lg grayscale hover:grayscale-0 transition-all duration-700" {...props} />
            {props.alt && (
                <figcaption className="text-center text-sm text-gray-500 mt-4 italic">{props.alt}</figcaption>
            )}
        </figure>
    ),
};
