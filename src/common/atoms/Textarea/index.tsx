import React from 'react';
import TextareaAutosize, { TextareaAutosizeProps } from '@material-ui/core/TextareaAutosize';

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

export default Textarea;
