import {
  Checkbox,
  FormControlLabel,
  FormGroup,
  type CheckboxProps,
} from '@mui/material';

interface BaseCheckBoxSingleProps extends CheckboxProps {
  label: string;
}

function BaseCheckBoxSingle({ label, ...props }: BaseCheckBoxSingleProps) {
  return (
    <FormGroup
      sx={{
        width: 'fit-contet',
      }}
    >
      <FormControlLabel control={<Checkbox {...props} />} label={label} />
    </FormGroup>
  );
}

export default BaseCheckBoxSingle;
