import React from 'react';
import { useRecoilValue } from 'recoil';
import { TagInput, TagInputProps } from '../../../common/atoms/TagInput';
import { tagListState } from '../../states';

export type ActivityTagSelectProps = Omit<TagInputProps, 'options'>;

const LoadableTagSelect: React.VFC<ActivityTagSelectProps> = (props) => {
  const tags = useRecoilValue(tagListState);
  return <TagInput {...props} options={tags.map((tag) => tag.name)} />;
};

export const ActivityTagSelect: React.VFC<ActivityTagSelectProps> = (props) => {
  const fallBack = <TagInput {...props} options={[]} loading />;
  return (
    <React.Suspense fallback={fallBack}>
      <LoadableTagSelect {...props} />
    </React.Suspense>
  );
};
