import TextareaAutosize, {
  type TextareaAutosizeProps,
} from '@mui/material/TextareaAutosize';
import React from 'react';

type TextareaProps = {
  inputRef?: React.Ref<HTMLTextAreaElement>;
} & TextareaAutosizeProps

/**
 * Customized TextareaAutosize to be used with TextField
 * https://material-ui.com/components/text-fields/#integration-with-3rd-party-input-libraries
 */
const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  function Textarea(props, ref) {
    return <TextareaAutosize {...props} ref={ref} />;
  },
);

export default Textarea;
