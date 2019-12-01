import React from 'react';

import { Button, TextField } from '@material-ui/core';

import { IInputProps } from './Types';

import { BUTTON_STYLES } from '../../constants/styles';

const Input: React.FC<IInputProps> = ({ changeValue, handleSubmit, value }): JSX.Element => (
  <form style={{ margin: '15px 0' }} onSubmit={e => handleSubmit(e)}>
    <TextField value={value} onChange={e => changeValue(e.target.value)} />
    <Button style={BUTTON_STYLES} type="submit" variant="contained" color="primary">
      Save
    </Button>
  </form>
);

export default Input;
