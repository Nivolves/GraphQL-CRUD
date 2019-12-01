import React, { useCallback, useEffect, useReducer } from 'react';
import gql from 'graphql-tag';
import { useMutation, useQuery } from '@apollo/react-hooks';

import { Button, Typography } from '@material-ui/core';

import Input from '../../components/Input/Input';
import List from '../../components/List/TodoList';

import context from '../../context';

import { Reducer } from '../../store/types';

import { initialState } from '../../store/initialState';
import { reducer } from '../../store/reducer';

import {
  ADD_TODO,
  CLEAR_COMPLETED,
  ERROR,
  LOADING,
  SET_INPUT_VALUE,
  SET_TODOS,
  TOGGLE_ALL,
} from '../../constants/actions';
import { BUTTON_STYLES } from '../../constants/styles';
import { SERVER_ERROR } from '../../constants/errors';

import './Todo.scss';

const ADD_TODO_QUERY = gql`
  mutation AddTodo($title: String!) {
    add(title: $title) {
      id
      title
      completed
    }
  }
`;

const CLEAR_COMPLETED_QUERY = gql`
  mutation clearCompleted {
    clearCompleted {
      title
      id
      completed
    }
  }
`;

const GET_TODOS_QUERY = gql`
  {
    todos {
      completed
      id
      title
    }
  }
`;

const TOGGLE_ALL_QUERY = gql`
  mutation toggleAll($checked: Boolean!) {
    toggleAll(checked: $checked) {
      id
    }
  }
`;

const Todo: React.FC = (): JSX.Element => {
  const [state, dispatch] = useReducer<Reducer<any, any>>(reducer, initialState());
  const { error, loading, data } = useQuery(GET_TODOS_QUERY);
  const [addTodo, { data: updatedData }] = useMutation(ADD_TODO_QUERY);
  const [clearCompleted] = useMutation(CLEAR_COMPLETED_QUERY);
  const [toggleAll] = useMutation(TOGGLE_ALL_QUERY);

  const { inputValue } = state;

  useEffect(() => {
    if (loading) {
      dispatch({ type: LOADING });
    } else if (error) {
      dispatch({ type: LOADING });
      dispatch({ type: ERROR });
    } else {
      const { todos } = data;
      dispatch({ type: LOADING });
      dispatch({ type: SET_TODOS, payload: todos.reverse() });
    }
  }, [data, error, loading]);

  useEffect(() => {
    if (updatedData) {
      const { add } = updatedData;
      dispatch({ type: ADD_TODO, payload: add });
    }
  }, [updatedData]);

  const handleClearCompleted = useCallback(() => {
    clearCompleted();
    dispatch({ type: CLEAR_COMPLETED });
  }, [clearCompleted]);

  const handleSubmit = useCallback(
    e => {
      e.preventDefault();
      if (inputValue.length > 2) {
        addTodo({ variables: { title: inputValue } });
        dispatch({ type: SET_INPUT_VALUE, payload: '' });
      }
    },
    [addTodo, inputValue],
  );

  const handleToggleAll = useCallback(
    checked => {
      toggleAll({ variables: { checked } });
      dispatch({ type: TOGGLE_ALL, payload: checked });
    },
    [toggleAll],
  );

  return (
    <context.Provider value={[state, dispatch]}>
      <div className="container">
        <div className="row">
          <Input
            value={inputValue}
            changeValue={useCallback(value => {
              dispatch({ type: SET_INPUT_VALUE, payload: value });
            }, [])}
            handleSubmit={handleSubmit}
          />
        </div>
        <Button color="primary" style={BUTTON_STYLES} variant="contained" onClick={() => handleToggleAll(true)}>
          Complete all
        </Button>
        <Button style={BUTTON_STYLES} variant="contained" onClick={() => handleToggleAll(false)}>
          Mark all as uncompleted
        </Button>
        <Button color="primary" style={BUTTON_STYLES} variant="contained" onClick={handleClearCompleted}>
          Clear completed
        </Button>
        {state.error ? (
          <Typography
            variant="h4"
            component="h2"
            style={{ textAlign: 'center', textTransform: 'uppercase', margin: '20px 0' }}
            color="error"
          >
            {SERVER_ERROR}
          </Typography>
        ) : (
          <List />
        )}
      </div>
    </context.Provider>
  );
};

export default Todo;
