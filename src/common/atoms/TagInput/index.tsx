import React from 'react';
import Autocomplete, { createFilterOptions } from '@material-ui/lab/Autocomplete';
import { TextField } from '../TextField';

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
  return (
    <Autocomplete
      multiple
      freeSolo={creatable}
      clearOnBlur
      value={value}
      onChange={(event, newValue) => {
        const modifiedValue = newValue.map((val) => val.replace(/^Add "/, '').replace(/"$/, ''));
        onChange(modifiedValue);
      }}
      options={options}
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
