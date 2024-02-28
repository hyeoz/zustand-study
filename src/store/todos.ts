import { create } from 'zustand';

export type TodoType = {
  id: number;
  done: boolean;
  description: string;
};

type TodoStoreType = {
  data: TodoType[];
  add: (value: string) => void;
  update: (value: TodoType) => void;
  delete: (value: TodoType) => void;
};

export const todoStore = create<TodoStoreType>()((set) => {
  let uid = 1;

  return {
    data: [],
    add: (value) =>
      set((state) => ({
        ...state,
        data: [
          ...state.data,
          {
            id: ++uid,
            done: false,
            description: value,
          },
        ],
      })),
    update: (value) =>
      set((state) => ({
        ...state,
        data: [
          ...state.data.filter((d) => d.id !== value.id),
          {
            ...value,
            done: !value.done,
          },
        ],
      })),
    delete: (value) =>
      set((state) => ({
        ...state,
        data: [...state.data.filter((d) => d.id !== value.id)],
      })),
  };
});
