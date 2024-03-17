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

export const initializeState = () => {
      const tasks = localStorage.getItem('tasks');
      return tasks ? JSON.parse(tasks) : [];
    };
    

export const TaskReducer = (state: Task[] , action: Actions) => {
   let newState;
  switch (action.type) {
    case "ADD_TASK":
      const newTask: Task = {
        id: new Date().getTime(),
        task: action.payload,
        status: "pending",
        isDone: false,
      };
      newState= [...state, newTask];
      break;

    case "DELETE_TASK":
      newState= state.filter((task) => task.id !== action.payload);
      break;

    case "TOGGLE_TASK":
      newState= state.map((task) => {
        if (task.id === action.payload) {
          return { ...task, isDone: !task.isDone };
        } else {
          return task;
        }
      });
      break;

    case "EDIT_TASK":
      newState = state.map((task) => {
        if (task.id === action.payload.id) {
          return { ...task, task: action.payload.task };
        } else {
          return task;
        }
      });
      break;

   case "UPDATE_TASK_STATUS":
      newState = state.map((task) => {
        if (task.id === action.payload.id) {
         console.log(task);
          return { ...task, status: action.payload.status };
        } else {
         console.log(task);
          return task;
        }
      });
      break;

    default:
      return state;
  }

   localStorage.setItem('tasks', JSON.stringify(newState));
   return newState;
};
