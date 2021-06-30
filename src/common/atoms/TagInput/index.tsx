import React from 'react';
import Autocomplete, { createFilterOptions } from '@material-ui/lab/Autocomplete';
import TextField from '@material-ui/core/TextField';

const filter = createFilterOptions<string>();

export interface TagInputProps {
  value?: string[];
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
  return (
    <Autocomplete
      multiple
      clearOnBlur
      freeSolo={creatable}
      options={options}
      value={value}
      onChange={(event, newValue) => {
        // remove mark text from newly created item
        const modifiedValue = newValue.map((val) => val.replace(/^Add "/, '').replace(/"$/, ''));
        onChange(modifiedValue);
      }}
      filterOptions={(opts, params) => {
        const filtered = filter(opts, params);
        // suggest the creation of a new value
        if (creatable && params.inputValue !== '' && !opts.includes(params.inputValue)) {
          filtered.unshift(`Add "${params.inputValue}"`);
        }
        return filtered;
      }}
      renderInput={(params) => <TextField {...params} label="Tags" />}
    />
  );
};
