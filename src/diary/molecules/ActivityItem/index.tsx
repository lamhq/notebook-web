import React from 'react';

export interface Activity {
  content: string;
  time: Date;
  tags: string[];
  income: number;
  outcome: number;
}

export interface ActivityItemProps {
  model: Activity;
}

export const ActivityItem: React.VFC<ActivityItemProps> = ({ model }) => {
  const html = model.content.replace('\n', '<br/>');
  return <div dangerouslySetInnerHTML={{ __html: html }} />;
};
