import {
  ADD_TODO,
  CLEAR_COMPLETED,
  COMPLETE_ALL_TODOS,
  COMPLETE_TODO,
  DELETE_TODO,
  EDIT_TODO
} from "../constants/ActionTypes";

// Just a small thought process piece, We could use date for completed on or added on by just updating, but this is a way to possibly "future proof" in my eyes in a real app so we could show a history etc. Such as added @ time done @ time, average completed time of tasks etc etc.
const initialState = [
  {
    text: "Buy milk and cookies",
    completed: true,
    id: 0,
    date: new Date("1/17/2020 10:00:00"),
    completed_at: new Date("1/17/2020 10:04:00")
  },
  {
    text: "Eat cookies",
    completed: false,
    id: 1,
    date: new Date("1/17/2020 10:01:00")
  },
  {
    text: "Read README.md",
    completed: false,
    id: 2,
    date: new Date("1/17/2020 10:02:00")
  }
];

export default function todos(state = initialState, action) {
  switch (action.type) {
    case ADD_TODO:
      return [
        ...state,
        {
          id: state.reduce((maxId, todo) => Math.max(todo.id, maxId), -1) + 1,
          completed: false,
          date: new Date(),
          text: action.text
        }
      ];

    case DELETE_TODO:
      return state.filter(todo => todo.id !== action.id);

    case EDIT_TODO:
      return state.map(todo =>
        todo.id === action.id ? { ...todo, text: action.text } : todo
      );

    case COMPLETE_TODO:
      return state.map(todo =>
        todo.id === action.id
          ? {
              ...todo,
              completed: true,
              completed_at: new Date()
            }
          : todo
      );

    case COMPLETE_ALL_TODOS:
      const areAllMarked = state.every(todo => todo.completed);
      return state.map(todo => ({
        ...todo,
        completed: !areAllMarked
      }));

    case CLEAR_COMPLETED:
      return state.filter(todo => todo.id === null);

    default:
      return state;
  }
}
