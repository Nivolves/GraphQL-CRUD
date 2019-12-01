import { IStore } from './types';
import {
  ADD_TODO,
  CHANGE_TASK,
  TOGGLE_ALL,
  CLEAR_COMPLETED,
  COMPLETE_TASK,
  DELETE_TASK,
  ERROR,
  LOADING,
  SET_INPUT_VALUE,
  SET_TODOS,
} from '../constants/actions';

export const reducer = (state: IStore, { type, payload }: any) => {
  switch (type) {
    case ADD_TODO:
      return {
        ...state,
        todos: [payload, ...state.todos],
      };
    case CHANGE_TASK:
      return {
        ...state,
        todos: [...state.todos].map(task => {
          if (task.id === payload.id) {
            task.title = payload.title;
          }
          return task;
        }),
      };
    case TOGGLE_ALL:
      return {
        ...state,
        todos: [...state.todos].map(task => {
          task.completed = payload;
          return task;
        }),
      };
    case CLEAR_COMPLETED:
      return {
        ...state,
        todos: [...state.todos].filter(task => !task.completed),
      };
    case COMPLETE_TASK:
      return {
        ...state,
        todos: [...state.todos].map(task => {
          if (task.id === payload) {
            task.completed = !task.completed;
          }
          return task;
        }),
      };
    case DELETE_TASK:
      return {
        ...state,
        todos: [...state.todos].filter(task => task.id !== payload),
      };
    case ERROR:
      return {
        ...state,
        error: !state.error,
      };
    case LOADING:
      return {
        ...state,
        loading: !state.loading,
      };
    case SET_INPUT_VALUE:
      return {
        ...state,
        inputValue: payload,
      };
    case SET_TODOS:
      return {
        ...state,
        todos: payload,
      };
    default:
      return state;
  }
};
