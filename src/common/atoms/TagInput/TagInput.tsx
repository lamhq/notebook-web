import Autocomplete, {
  type AutocompleteProps,
  createFilterOptions,
} from '@mui/material/Autocomplete';
import CircularProgress from '@mui/material/CircularProgress';
import TextField from '@mui/material/TextField';
import { type ReactNode, forwardRef } from 'react';

const filter = createFilterOptions<string>();

export type TagInputProps = {
  label?: ReactNode;
} & Omit<AutocompleteProps<string, true, false, true>, 'renderInput'>;

const TagInput = forwardRef<unknown, TagInputProps>(
  function TagInputRef(props, ref) {
    const { loading, freeSolo, onChange, label, ...rest } = props;
    return (
      <Autocomplete<string, true, false, true>
        {...rest}
        ref={ref}
        multiple
        clearOnBlur
        loading={loading}
        freeSolo={freeSolo}
        filterOptions={(opts, params) => {
          const filtered = filter(opts, params);
          // suggest the creation of a new value
          if (
            freeSolo &&
            params.inputValue !== '' &&
            !opts.includes(params.inputValue)
          ) {
            filtered.unshift(`Add "${params.inputValue}"`);
          }
          return filtered;
        }}
        onChange={(event, newValue, reason, details) => {
          if (onChange) {
            // remove mark text from newly created item
            const modifiedValue = newValue.map((val) =>
              val.replace(/^Add "/, '').replace(/"$/, ''),
            );
            onChange(event, modifiedValue, reason, details);
          }
        }}
        renderInput={(params) => (
          <TextField
            label={label}
            {...params}
            slotProps={{
              input: {
                endAdornment: (
                  <>
                    {loading ? <CircularProgress color="inherit" size={20} /> : null}
                    {params.InputProps.endAdornment}
                  </>
                ),
              },
            }}
          />
        )}
      />
    );
  },
);

export default TagInput;
