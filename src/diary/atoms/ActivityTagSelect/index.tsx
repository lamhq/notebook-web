import React from 'react';
import { useRecoilValue } from 'recoil';
import { TagInput, TagInputProps } from '../../../common/atoms/TagInput';
import { tagListState } from '../../states';

export type ActivityTagSelectProps = Omit<TagInputProps, 'options'>;

// use React.forwardRef to make it work with react-hook-form
export const LoadableTagSelect = React.forwardRef<unknown, ActivityTagSelectProps>(
  function LoadableTagSelectRef(props, ref) {
    const tags = useRecoilValue(tagListState);
    return <TagInput {...props} ref={ref} options={tags} />;
  },
);

export const ActivityTagSelect = React.forwardRef<unknown, ActivityTagSelectProps>(
  function ActivityTagSelectRef(props, ref) {
    const fallBack = <TagInput {...props} options={[]} loading />;
    return (
      <React.Suspense fallback={fallBack}>
        <LoadableTagSelect {...props} ref={ref} />
      </React.Suspense>
    );
  },
);
