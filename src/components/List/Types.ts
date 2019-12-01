import { ITodo } from '../../types/common';

export interface IListItemProps extends ITodo {
  dispatch: (value: any) => void
}
