
import { useEffect, useRef, useState } from 'react';

export default function Numbers_card({number,message}){
    const numberRef = useRef(null);
    const value = String(number);
    const match = value.match(/^([^0-9]*)([0-9][0-9,]*)(.*)$/);
    const target = match ? Number(match[2].replaceAll(',', '')) : null;
    const [count, setCount] = useState(() => {
        if (target === null || typeof window === 'undefined') return 0;
        return window.matchMedia('(prefers-reduced-motion: reduce)').matches ||
            typeof IntersectionObserver === 'undefined'
            ? target
            : 0;
    });

    useEffect(() => {
        const element = numberRef.current;
        if (
            !element ||
            target === null ||
            window.matchMedia('(prefers-reduced-motion: reduce)').matches ||
            typeof IntersectionObserver === 'undefined'
        ) return;

        let frameId;
        const observer = new IntersectionObserver(([entry]) => {
            if (!entry.isIntersecting) return;

            observer.disconnect();
            const startTime = performance.now();
            const duration = 1600;

            const animate = (time) => {
                const progress = Math.min((time - startTime) / duration, 1);
                const easedProgress = 1 - Math.pow(1 - progress, 3);
                setCount(Math.round(target * easedProgress));

                if (progress < 1) {
                    frameId = requestAnimationFrame(animate);
                }
            };

            frameId = requestAnimationFrame(animate);
        }, { threshold: 0.4 });

        observer.observe(element);

        return () => {
            observer.disconnect();
            if (frameId) cancelAnimationFrame(frameId);
        };
    }, [target]);

    const displayValue = match
        ? `${match[1]}${count.toLocaleString('en-IN')}${match[3]}`
        : value;

    return (
        <div>
            <h1 ref={numberRef} className="impact-number-value" aria-label={value}>
                <span aria-hidden="true">{displayValue}</span>
            </h1>
            <h3 className="impact-number-label">{message}</h3>
        </div>
    );
}