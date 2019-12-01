import React, { useContext } from 'react';

import { List } from '@material-ui/core';
import TodoItem from './TodoItem';

import context from '../../context';

const TodoList: React.FC = (): JSX.Element => {
  const [{ todos }, dispatch] = useContext(context);

  return (
    <List>
      {todos &&
        todos.map(({ id, completed, title }): JSX.Element | undefined =>
          title ? <TodoItem key={id} title={title} id={id} completed={completed} dispatch={dispatch} /> : undefined,
        )}
    </List>
  );
};

export default TodoList;
