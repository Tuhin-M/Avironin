"use client";

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

interface TocItem {
    id: string;
    text: string;
    level: number;
}

const AvTableOfContents = () => {
    const [items, setItems] = useState<TocItem[]>([]);
    const [activeId, setActiveId] = useState<string>('');

    useEffect(() => {
        const headings = Array.from(document.querySelectorAll('h2, h3'))
            .map((element) => ({
                id: element.id,
                text: element.textContent || '',
                level: Number(element.tagName.replace('H', '')),
            }))
            .filter((item) => item.id);

        setItems(headings);

        const observer = new IntersectionObserver(
            (entries) => {
                const visibleEntry = entries.find((entry) => entry.isIntersecting);
                if (visibleEntry) {
                    setActiveId(visibleEntry.target.id);
                }
            },
            { rootMargin: '0px 0px -40% 0px' }
        );

        headings.forEach((heading) => {
            const element = document.getElementById(heading.id);
            if (element) observer.observe(element);
        });

        return () => observer.disconnect();
    }, []);

    if (items.length === 0) return null;

    return (
        <nav className="space-y-4">
            <h4 className="text-xs font-black uppercase tracking-[0.2em] text-gray-400 mb-6">In this Essay</h4>
            <ul className="space-y-3">
                {items.map((item) => (
                    <li
                        key={item.id}
                        className={cn(
                            "transition-all duration-300",
                            item.level === 3 ? "pl-4" : ""
                        )}
                    >
                        <Link
                            href={`#${item.id}`}
                            className={cn(
                                "text-sm font-bold uppercase tracking-widest block transition-colors",
                                activeId === item.id ? "text-azure" : "text-gray-400 hover:text-charcoal"
                            )}
                        >
                            {item.text}
                        </Link>
                    </li>
                ))}
            </ul>
        </nav>
    );
};

export default AvTableOfContents;
