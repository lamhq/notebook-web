import React from 'react';
import { TagItem } from '../../../common/atoms/TagItem';
import styles from './index.module.css';

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
  return (
    <div>
      <div className={styles.content} dangerouslySetInnerHTML={{ __html: html }} />
      <div className={styles.footer}>
        <div>12/100</div>
        <div>
          {model.tags.map((tag) => (
            <TagItem label={tag} key={tag} className={styles.tagItem} />
          ))}
        </div>
      </div>
    </div>
  );
};
