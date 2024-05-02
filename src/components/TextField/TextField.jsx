import React from 'react';
import TextField from '@mui/material/TextField';
import InputMask from 'react-input-mask';
import { StyledTextFieldContainer, StyledTextField } from './TextField.styles';

const CustomTextField = ({ label, mask, ...rest }) => {
  const renderInput = (inputProps) => (
    <TextField
      {...inputProps}
      label={label}
      variant="outlined"
      fullWidth
      InputLabelProps={{ shrink: true }}
      {...rest}
    />
  );

  return (
    <React.Fragment>
      {mask ? (
        <InputMask mask={mask} value={rest.value} onChange={rest.onChange} autoFocus={false}>
          {(inputProps) => (
            <StyledTextField>
              {renderInput(inputProps)}
            </StyledTextField>
          )}
        </InputMask>
      ) : (
        <StyledTextField>
          {renderInput(rest)}
        </StyledTextField>
      )}
    </React.Fragment>
  );
}

export default CustomTextField;
