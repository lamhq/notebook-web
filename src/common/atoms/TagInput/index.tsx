import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Autocomplete, { createFilterOptions } from '@material-ui/lab/Autocomplete';
import { TextField } from '../TextField';

const useStyles = makeStyles({
  tag: {
    height: '25px',
  },
});

const filter = createFilterOptions<string>();

export interface TagInputProps {
  value: string[];
  onChange: (value: string[]) => void;
  options: string[];
  creatable?: boolean;
}

export const TagInput: React.VFC<TagInputProps> = ({
  value,
  onChange,
  options,
  creatable = false,
}) => {
  const classes = useStyles();
  return (
    <Autocomplete
      fullWidth
      multiple
      clearOnBlur
      freeSolo={creatable}
      options={options}
      classes={{ tag: classes.tag }}
      value={value}
      onChange={(event, newValue) => {
        // Remove mark text from newly created item
        const modifiedValue = newValue.map((val) => val.replace(/^Add "/, '').replace(/"$/, ''));
        onChange(modifiedValue);
      }}
      filterOptions={(opts, params) => {
        const filtered = filter(opts, params);
        // Suggest the creation of a new value
        if (creatable && params.inputValue !== '' && !opts.includes(params.inputValue)) {
          filtered.unshift(`Add "${params.inputValue}"`);
        }
        return filtered;
      }}
      renderInput={(params) => <TextField {...params} label="Tags" />}
    />
  );
};
