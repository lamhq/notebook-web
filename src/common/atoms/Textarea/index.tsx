import React from 'react';
import TextareaAutosize, { TextareaAutosizeProps } from '@mui/material/TextareaAutosize';

interface TextareaProps extends TextareaAutosizeProps {
  inputRef?: React.Ref<HTMLTextAreaElement>;
}

/**
 * Customized TextareaAutosize to be used with TextField
 * https://material-ui.com/components/text-fields/#integration-with-3rd-party-input-libraries
 */
const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(function Textarea(
  props,
  ref,
) {
  return <TextareaAutosize {...props} ref={ref} />;
});

Textarea.defaultProps = {
  inputRef: undefined,
};

export default Textarea;
