import React from 'react';
import Button from '@mui/material/Button';

const CustomButton = ({ label, ...rest }) => {
  return (
    <Button {...rest}>{label}</Button>
  );
}

export default CustomButton;
