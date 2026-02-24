import React from 'react';
import { SquareStack, CheckSquare, Bookmark, AlertCircle } from 'lucide-react';

export interface AtlassianCardProps {
    id: string;
    summary: string;
    type: string;
    status: string;
}

const getIconForType = (type: string) => {
    switch (type.toLowerCase()) {
        case 'epic':
            return <SquareStack size={16} className="text-purple-600" />;
        case 'story':
            return <Bookmark size={16} className="text-green-500" />;
        case 'bug':
            return <AlertCircle size={16} className="text-red-500" />;
        case 'task':
        default:
            return <CheckSquare size={16} className="text-blue-500" />;
    }
};

export const AtlassianCard: React.FC<AtlassianCardProps> = ({ id, summary, type, status }) => {
    return (
        <div id={`ticket-${id}`} className="bg-atlassian-background-default border border-atlassian-border rounded-jira p-2 hover:bg-atlassian-background-gray transition-colors cursor-pointer w-full max-w-sm">
            <div className="flex flex-col gap-1">
                <div className="text-sm font-sans font-medium text-gray-800 line-clamp-2">
                    {summary}
                </div>

                <div className="flex items-center justify-between mt-1">
                    <div className="flex items-center gap-1">
                        {getIconForType(type)}
                        <span className="text-xs font-sans text-gray-500 font-medium">{id}</span>
                    </div>

                    <div className="text-xs font-sans text-gray-600 bg-gray-100 px-2 py-0.5 rounded-sm uppercase tracking-wider font-semibold">
                        {status}
                    </div>
                </div>
            </div>
        </div>
    );
};
