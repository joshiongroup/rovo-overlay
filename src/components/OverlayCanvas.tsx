import React, { useEffect, useState, useCallback } from 'react';
import mockData from '../mockData.json';

interface Point {
    x: number;
    y: number;
}

interface Connection {
    source: string;
    target: string;
    sourcePoint: Point;
    targetPoint: Point;
    type: string;
}

export const OverlayCanvas: React.FC = () => {
    const [connections, setConnections] = useState<Connection[]>([]);

    const updateConnections = useCallback(() => {
        const newConnections: Connection[] = [];

        mockData.dependencies.forEach(dep => {
            const sourceEl = document.getElementById(`ticket-${dep.sourceIssueID}`);
            const targetEl = document.getElementById(`ticket-${dep.targetIssueID}`);

            if (sourceEl && targetEl) {
                const sourceRect = sourceEl.getBoundingClientRect();
                const targetRect = targetEl.getBoundingClientRect();

                newConnections.push({
                    source: dep.sourceIssueID,
                    target: dep.targetIssueID,
                    type: dep.type,
                    sourcePoint: {
                        x: sourceRect.right,
                        y: sourceRect.top + sourceRect.height / 2
                    },
                    targetPoint: {
                        x: targetRect.left,
                        y: targetRect.top + targetRect.height / 2
                    }
                });
            }
        });

        setConnections(newConnections);
    }, []);

    useEffect(() => {
        // Wait for the layouts to paint
        const timer = setTimeout(updateConnections, 150);

        window.addEventListener('resize', updateConnections);
        // document-level event capturing for scrolls
        document.addEventListener('scroll', updateConnections, true);

        return () => {
            clearTimeout(timer);
            window.removeEventListener('resize', updateConnections);
            document.removeEventListener('scroll', updateConnections, true);
        };
    }, [updateConnections]);

    return (
        <svg
            className="pointer-events-none fixed inset-0 z-50 w-full h-full"
            style={{ minHeight: '100vh', minWidth: '100vw' }}
        >
            <defs>
                <marker id="arrowhead" markerWidth="8" markerHeight="6" refX="7" refY="3" orient="auto">
                    <polygon points="0 0, 8 3, 0 6" fill="#42526E" />
                </marker>
            </defs>
            {connections.map((conn, idx) => {
                const { sourcePoint: s, targetPoint: t } = conn;
                // Calculation for a nice smooth curve bridging the two
                const distance = Math.abs(t.x - s.x);
                const offset = Math.max(distance * 0.4, 40);

                // M source, C control1 control2 target
                const path = `M ${s.x} ${s.y} C ${s.x + offset} ${s.y}, ${t.x - offset} ${t.y}, ${t.x} ${t.y}`;

                return (
                    <path
                        key={idx}
                        d={path}
                        fill="none"
                        stroke="#42526E"
                        strokeWidth="2"
                        markerEnd="url(#arrowhead)"
                        className="opacity-80 drop-shadow-sm"
                    />
                );
            })}
        </svg>
    );
};
