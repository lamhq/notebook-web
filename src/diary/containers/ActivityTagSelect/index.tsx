import React, { useCallback } from 'react';
import { useApi } from '../../../api';
import TagInput, { TagInputProps } from '../../../common/atoms/TagInput';
import { useAsyncData } from '../../../common/hooks';
import { ApiErrorBoundary } from '../../../error';

export function useTagList(): string[] | undefined {
  const api = useApi();
  const loadTags = useCallback(() => api.getTags(), [api]);
  const result = useAsyncData(loadTags);
  return result;
}

export type ActivityTagSelectProps = Omit<TagInputProps, 'options'>;

// use React.forwardRef to make it work with react-hook-form
const LoadableTagSelect = React.forwardRef<unknown, ActivityTagSelectProps>(
  function LoadableTagSelectRef(props, ref) {
    const tags = useTagList();
    const LoadingFallback = <TagInput {...props} options={[]} loading />;
    if (tags === undefined) return LoadingFallback;

    return <TagInput {...props} ref={ref} options={tags} />;
  },
);

const ActivityTagSelect = React.forwardRef<unknown, ActivityTagSelectProps>(
  function ActivityTagSelectRef(props, ref) {
    return (
      <ApiErrorBoundary displayError={false}>
        <LoadableTagSelect {...props} ref={ref} />
      </ApiErrorBoundary>
    );
  },
);

export default ActivityTagSelect;
