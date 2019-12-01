import { ITodo } from '../types/common';

export interface IStore {
  error: boolean
  inputValue: string
  loading: boolean
  todos: ITodo[]
}

export type Reducer<S, A> = (prevState: S, action: A) => S;
