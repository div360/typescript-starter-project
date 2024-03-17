import { Task } from "./model/Task";
import { status } from "./model/Task";

export type Actions =
  | {
      type: "ADD_TASK";
      payload: string;
    }
  | {
      type: "DELETE_TASK";
      payload: number;
    }
  | {
      type: "TOGGLE_TASK";
      payload: number;
    }
  | {
      type: "EDIT_TASK";
      payload: { id: number; task: string };
    }
  | {
      type: "UPDATE_TASK_STATUS";
      payload: { id: number; status: status };
    };   

const initialState: Task[] = [];

export const TaskReducer = (state: Task[], action: Actions) => {
  switch (action.type) {
    case "ADD_TASK":
      const newTask: Task = {
        id: new Date().getTime(),
        task: action.payload,
        status: "pending",
        isDone: false,
      };
      return [...state, newTask];

    case "DELETE_TASK":
      return state.filter((task) => task.id !== action.payload);

    case "TOGGLE_TASK":
      return state.map((task) => {
        if (task.id === action.payload) {
          return { ...task, isDone: !task.isDone };
        } else {
          return task;
        }
      });

    case "EDIT_TASK":
      return state.map((task) => {
        if (task.id === action.payload.id) {
          return { ...task, task: action.payload.task };
        } else {
          return task;
        }
      });

   case "UPDATE_TASK_STATUS":
      return state.map((task) => {
        if (task.id === action.payload.id) {
         console.log(task);
          return { ...task, status: action.payload.status };
        } else {
         console.log(task);
          return task;
        }
      });

    default:
      return state;
  }
};
