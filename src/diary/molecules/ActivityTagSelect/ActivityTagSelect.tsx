import { Suspense } from 'react';
import type { TagInputProps } from '../../../common/atoms/TagInput/TagInput';
import TagInput from '../../../common/atoms/TagInput/TagInput';
import { useGetTagsQuery } from '../../hooks';

export type ActivityTagSelectProps = Omit<TagInputProps, 'options'>;

function LoadingSelect(props: ActivityTagSelectProps) {
  return <TagInput {...props} options={[]} loading />;
}

function DataFetchingSelect(props: ActivityTagSelectProps) {
  const tags = useGetTagsQuery();
  return <TagInput {...props} options={tags} />;
}

export default function ActivityTagSelect(props: ActivityTagSelectProps) {
  const loadingFallback = LoadingSelect(props);
  return (
    <Suspense fallback={loadingFallback}>
      <DataFetchingSelect {...props} />
    </Suspense>
  );
}
