import React from 'react';
import TextareaAutosize, { TextareaAutosizeProps } from '@mui/material/TextareaAutosize';

interface TextareaProps extends TextareaAutosizeProps {
  inputRef?: React.Ref<HTMLTextAreaElement>;
}

/**
 * Customized TextareaAutosize to be used with TextField
 * https://material-ui.com/components/text-fields/#integration-with-3rd-party-input-libraries
 */
const Textarea: React.FC<TextareaProps> = (props) => {
  const { inputRef = undefined, ...other } = props;
  return <TextareaAutosize {...other} ref={inputRef} />;
};

Textarea.defaultProps = {
  inputRef: undefined,
};

export default Textarea;
