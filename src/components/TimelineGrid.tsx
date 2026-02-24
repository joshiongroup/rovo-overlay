import React, { useMemo } from 'react';
import mockData from '../mockData.json';
import { SprintCell } from './SprintCell';
import { OverlayCanvas } from './OverlayCanvas';

const SPRINTS = ['Sprint 1', 'Sprint 2', 'Sprint 3', 'Sprint 4'];

export const TimelineGrid: React.FC = () => {
    // We'll distribute each team's issues into sprints pseudo-randomly to show a dispersed grid
    const teamSprints = useMemo(() => {
        return mockData.teams.map(team => {
            // 4 sprints, initialized empty
            const sprints = SPRINTS.map(sprintName => ({ name: sprintName, issues: [] as typeof team.issues, assignedPoints: 0 }));

            // Round robin distribute issues
            team.issues.forEach((issue, idx) => {
                const sprintIdx = idx % SPRINTS.length;
                sprints[sprintIdx].issues.push(issue);
                sprints[sprintIdx].assignedPoints += 10; // mock weight
            });

            // Artificial bump to demonstrate the Heatmap (>90%) logic as requested
            if (team.id === 'team-web') {
                sprints[1].assignedPoints = 28; // 28/30 = 93%
            }
            if (team.id === 'team-mobile') {
                sprints[0].assignedPoints = 19; // 19/20 = 95%
            }
            if (team.id === 'team-backend') {
                sprints[2].assignedPoints = 24; // 24/25 = 96%
            }

            return {
                ...team,
                sprints
            };
        });
    }, []);

    return (
        <div className="min-h-screen bg-atlassian-background-gray p-8 relative overflow-x-auto">
            <div className="mx-auto w-max relative min-w-full">
                <h1 className="text-2xl font-bold font-sans text-gray-800 mb-6">Advanced Roadmaps</h1>

                {/* The Grid Container */}
                <div
                    className="grid gap-y-2 relative"
                    style={{ gridTemplateColumns: `240px repeat(${SPRINTS.length}, 150px)` }}
                >
                    {/* Header Row */}
                    <div className="col-start-1 text-xs font-semibold text-gray-500 uppercase tracking-wider p-2">Team Info</div>
                    {SPRINTS.map((s, idx) => (
                        <div key={idx} className="text-xs font-semibold text-gray-500 uppercase tracking-wider p-2">
                            {s}
                        </div>
                    ))}

                    {/* Team Rows */}
                    {teamSprints.map(team => (
                        <React.Fragment key={team.id}>
                            {/* Team Info column */}
                            <div className="bg-white border border-atlassian-border rounded-l-jira p-4 flex flex-col justify-center">
                                <h3 className="text-sm font-bold text-gray-800 font-sans">{team.name}</h3>
                                <span className="text-xs text-gray-500 font-sans mt-1">Velocity: {team.capacity} pt/sprint</span>
                            </div>

                            {/* Sprints columns */}
                            {team.sprints.map((sprint, idx) => (
                                <div
                                    key={idx}
                                    className={`border-t border-b border-atlassian-border ${idx === team.sprints.length - 1 ? 'border-r rounded-r-jira' : 'border-r'} bg-white`}
                                >
                                    <SprintCell
                                        sprintName={sprint.name}
                                        capacity={team.capacity}
                                        assignedPoints={sprint.assignedPoints}
                                        issues={sprint.issues}
                                    />
                                </div>
                            ))}
                        </React.Fragment>
                    ))}
                </div>

                {/* Render the overlapping SVG connections */}
                <OverlayCanvas />
            </div>
        </div>
    );
};
