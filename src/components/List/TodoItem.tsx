import React, { useCallback, useState } from 'react';
import gql from 'graphql-tag';
import { useMutation } from '@apollo/react-hooks';

import {
  Button,
  Divider,
  IconButton,
  ListItem,
  ListItemIcon,
  Checkbox,
  ListItemSecondaryAction,
  ListItemText,
} from '@material-ui/core';

import CloseIcon from '@material-ui/icons/Close';
import DeleteIcon from '@material-ui/icons/Delete';

import Input from '../Input/Input';

import { IListItemProps } from './Types';

import { CHANGE_TASK, COMPLETE_TASK, DELETE_TASK } from '../../constants/actions';

import { BUTTON_STYLES } from '../../constants/styles';

const CHANGE_TODO_QUERY = gql`
  mutation changeTodo($id: String!, $title: String!) {
    save(id: $id, title: $title) {
      id
    }
  }
`;

const COMPLETE_TODO_QUERY = gql`
  mutation AddTodo($id: String!) {
    toggle(id: $id) {
      id
    }
  }
`;

const DELETE_TODO_QUERY = gql`
  mutation deleteTodo($id: String!) {
    destroy(id: $id) {
      id
    }
  }
`;

const TodoItem: React.FC<IListItemProps> = ({ completed, dispatch, id, title }): JSX.Element => {
  const [isChangeFieldOpen, openChangeTaskField] = useState<boolean>(false);
  const [changeFieldValue, setChangeFieldValue] = useState<string>(title);

  const [changeTodo] = useMutation(CHANGE_TODO_QUERY);
  const [completeTodo] = useMutation(COMPLETE_TODO_QUERY);
  const [deleteTodo] = useMutation(DELETE_TODO_QUERY);

  const closeTaskField = useCallback(() => {
    setChangeFieldValue(title);
    openChangeTaskField(false);
  }, [title]);

  const handleCheck = useCallback(() => {
    dispatch({ type: COMPLETE_TASK, payload: id });
    completeTodo({ variables: { id } });
  }, [completeTodo, dispatch, id]);

  const handleDelete = useCallback(() => {
    dispatch({ type: DELETE_TASK, payload: id });
    deleteTodo({ variables: { id } });
  }, [deleteTodo, dispatch, id]);

  const handleSubmit = useCallback(
    e => {
      e.preventDefault();
      if (changeFieldValue.length > 2) {
        changeTodo({ variables: { id, title: changeFieldValue } });
        dispatch({ type: CHANGE_TASK, payload: { id, title: changeFieldValue } });
        openChangeTaskField(false);
      }
    },
    [changeFieldValue, changeTodo, dispatch, id],
  );

  return (
    <>
      <ListItem button>
        <ListItemIcon>
          <Checkbox
            checked={completed}
            value={completed}
            edge="start"
            tabIndex={-1}
            disableRipple
            onChange={handleCheck}
          />
        </ListItemIcon>
        {isChangeFieldOpen ? (
          <>
            <Input
              changeValue={value => setChangeFieldValue(value)}
              handleSubmit={handleSubmit}
              value={changeFieldValue}
            />
            <IconButton onClick={closeTaskField}>
              <CloseIcon style={{ color: 'red' }} />
            </IconButton>
          </>
        ) : (
          <ListItemText
            onClick={() => openChangeTaskField(true)}
            style={{ width: '60%', flex: 'inherit' }}
            primary={title}
          />
        )}
        <ListItemSecondaryAction style={{ margin: '0px 30px' }}>
          <Button style={BUTTON_STYLES} variant="contained" onClick={() => openChangeTaskField(true)}>
            Edit
          </Button>
        </ListItemSecondaryAction>
        <ListItemSecondaryAction>
          <IconButton onClick={handleDelete} edge="end">
            <DeleteIcon style={{ color: 'red' }} />
          </IconButton>
        </ListItemSecondaryAction>
      </ListItem>
      <Divider />
    </>
  );
};

export default TodoItem;
