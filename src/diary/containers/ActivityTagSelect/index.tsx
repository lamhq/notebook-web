import React from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { ErrorBoundary } from 'react-error-boundary';
import TagInput, { TagInputProps } from '../../../common/atoms/TagInput';
import { refreshTagListFlag, tagListState } from '../../states';

export type ActivityTagSelectProps = Omit<TagInputProps, 'options'>;

// use React.forwardRef to make it work with react-hook-form
const LoadableTagSelect = React.forwardRef<unknown, ActivityTagSelectProps>(
  function LoadableTagSelectRef(props, ref) {
    const tags = useRecoilValue(tagListState);
    return <TagInput {...props} ref={ref} options={tags} />;
  },
);

const ActivityTagSelect = React.forwardRef<unknown, ActivityTagSelectProps>(
  function ActivityTagSelectRef(props, ref) {
    const LoadingFallback = <TagInput {...props} options={[]} loading />;
    const errorFallbackRender = React.useCallback(() => null, []);
    const setRefreshFlag = useSetRecoilState(refreshTagListFlag);
    const refreshTagList = React.useCallback(() => setRefreshFlag(Date.now()), [setRefreshFlag]);

    // invalidate tag list when component is unmounted
    React.useEffect(() => refreshTagList, [refreshTagList]);

    return (
      <ErrorBoundary fallbackRender={errorFallbackRender}>
        <React.Suspense fallback={LoadingFallback}>
          <LoadableTagSelect {...props} ref={ref} />
        </React.Suspense>
      </ErrorBoundary>
    );
  },
);

export default ActivityTagSelect;
