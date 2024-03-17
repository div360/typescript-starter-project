import React, { useReducer, useState } from 'react';
import './App.css';
import background from './assets/background.svg';
import InputField from './components/InputField';
import { Task } from './model/Task';
import TaskList from './components/TaskList';
import { TaskReducer, initializeState } from './Reducer';
// @ts-ignore
import {DragDropContext} from 'react-beautiful-dnd';
import { status } from './model/Task';
const App: React.FC= () =>{
  const [task, setTask] = useState<string>('');
  const initialState: Task[] = [];
  const [state, dispatch] = useReducer(TaskReducer,undefined,initializeState);

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if(task){
      dispatch({type: 'ADD_TASK', payload: task});
      setTask('');
    }
  };

  const handleDragEnd=(result: any)=>{
    const {destination, source} = result;

    if (!destination || (destination.droppableId === source.droppableId && destination.index === source.index)) {
      return;
    }
    
    console.log(result);
    const taskId = state[source.index].id;
    let newStatus:status;
    switch (destination.droppableId) {
      case 'TasksPending':
        newStatus = 'pending';
        break;
      case 'TasksOngoing':
        newStatus = 'ongoing';
        break;
      case 'TasksCompleted':
        newStatus = 'completed';
        break;
      default:
        newStatus = 'pending';
        break;
    }

    dispatch({ type: 'UPDATE_TASK_STATUS', payload: { id: taskId, status: newStatus } });    
  }

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <div className="App">
        <span className="heading">Task<p>IO</p></span>
        <InputField task={task} setTask= {setTask} handleAdd={handleAdd}/>
        <TaskList tasks={state} dispatch={dispatch}/>
      </div>
    </DragDropContext>
  );
}

export default App;
