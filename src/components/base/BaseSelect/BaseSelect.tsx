import {
  FormControl,
  InputLabel,
  Select,
  type SelectProps,
} from '@mui/material';

type BaseSelectProps = SelectProps & {
  labelId: string;
  label: string;
  children: React.ReactNode;
};

function BaseSelect({ labelId, label, children, ...props }: BaseSelectProps) {
  return (
    <FormControl fullWidth>
      <InputLabel id={labelId}>{label}</InputLabel>
      <Select labelId={labelId} label={label} {...props}>
        {children}
      </Select>
    </FormControl>
  );
}

export default BaseSelect;
