import React from 'react';
import Autocomplete, { createFilterOptions } from '@material-ui/lab/Autocomplete';
import TextField from '@material-ui/core/TextField';
import CircularProgress from '@material-ui/core/CircularProgress';

const filter = createFilterOptions<string>();

export interface TagInputProps {
  value?: string[];
  onChange: (value: string[]) => void;
  options: string[];
  creatable?: boolean;
  loading?: boolean;
}

export const TagInput: React.VFC<TagInputProps> = ({
  value,
  onChange,
  options,
  creatable = false,
  loading = false,
}) => {
  return (
    <Autocomplete
      multiple
      clearOnBlur
      loading={loading}
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
      renderInput={(params) => (
        <TextField
          {...params}
          label="Tags"
          InputProps={{
            ...params.InputProps,
            endAdornment: (
              <>
                {loading ? <CircularProgress color="inherit" size={20} /> : null}
                {params.InputProps.endAdornment}
              </>
            ),
          }}
        />
      )}
    />
  );
};
