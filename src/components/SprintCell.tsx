import React from 'react';
import { AlertTriangle } from 'lucide-react';
import { AtlassianCard } from './AtlassianCard';

interface Issue {
    id: string;
    type: string;
    summary: string;
    status: string;
}

interface SprintCellProps {
    sprintName: string;
    capacity: number;
    assignedPoints: number;
    issues: Issue[];
}

export const SprintCell: React.FC<SprintCellProps> = ({ sprintName, capacity, assignedPoints, issues }) => {
    const loadPercentage = Math.round((assignedPoints / capacity) * 100);
    const isOverCapacity = loadPercentage > 90;

    return (
        <div className={`p-2 flex flex-col gap-2 relative transition-colors duration-200 ${isOverCapacity ? 'bg-[#FFEBE6]' : ''}`}>
            {/* Capacity Bar Header */}
            <div className="flex items-center justify-between mb-1">
                <div className="text-xs font-sans text-gray-500 font-semibold uppercase tracking-wider">
                    {sprintName}
                </div>
                <div className="flex items-center gap-1">
                    {isOverCapacity && <AlertTriangle size={14} className="text-red-500" />}
                    <span className={`text-xs font-sans font-bold ${isOverCapacity ? 'text-red-600' : 'text-gray-600'}`}>
                        {assignedPoints} / {capacity} pt
                    </span>
                </div>
            </div>

            {/* Capacity Bar Visual */}
            <div className="w-full h-1 bg-gray-200 rounded-full overflow-hidden mb-2">
                <div
                    className={`h-full ${isOverCapacity ? 'bg-red-500' : 'bg-atlassian-primary'}`}
                    style={{ width: `${Math.min(loadPercentage, 100)}%` }}
                />
            </div>

            {/* Issues List */}
            <div className="flex flex-col gap-2 flex-grow">
                {issues.map(issue => (
                    <AtlassianCard
                        key={issue.id}
                        id={issue.id}
                        summary={issue.summary}
                        type={issue.type}
                        status={issue.status}
                    />
                ))}
            </div>
        </div>
    );
};
