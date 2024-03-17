import React from "react";
import "./styles.css";
import { Task } from "../model/Task";
import SingleTask from "./SingleTask";
import { Actions } from "../Reducer";
import { Droppable } from "react-beautiful-dnd";

interface Props {
  tasks: Task[];
  // setTasks: React.Dispatch<React.SetStateAction<Task[]>>;
  dispatch: React.Dispatch<Actions>;
}

const TaskList = ({ tasks, dispatch }: Props) => {
  return (
    // <div className='tasks'>
    //     {tasks.map((task)=>{
    //         return <SingleTask task={task} tasks={tasks} dispatch={dispatch}/>
    //     })}
    // </div>
    <div className="container">
      <Droppable droppableId="TasksPending">
        {(provided) => (
          <div
            className="tasks pending"
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            <span className="tasks_heading">Pending Tasks</span>
            {tasks.map((task, index) => {
              if(task.status === "pending"){
                return (
                  <SingleTask
                    index={index}
                    key={task.id}
                    task={task}
                    tasks={tasks}
                    dispatch={dispatch}
                  />
                );
              }
            })}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
      <Droppable droppableId="TasksOngoing">
        {(provided) => (
          <div
            className="tasks ongoing"
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            <span className="tasks_heading">Ongoing Tasks</span>
            {tasks.map((task, index) => {
              if(task.status === "ongoing"){
                return (
                  <SingleTask
                    index={index}
                    key={task.id}
                    task={task}
                    tasks={tasks}
                    dispatch={dispatch}
                  />
                );
              }
            })}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
      <Droppable droppableId="TasksCompleted">
        {(provided) => (
          <div
            className="tasks completed"
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            <span className="tasks_heading">Completed Tasks</span>
            {tasks.map((task, index) => {
              if(task.status === "completed"){
                return (
                  <SingleTask
                    index={index}
                    key={task.id}
                    task={task}
                    tasks={tasks}
                    dispatch={dispatch}
                  />
                );
              }
            })}
            {provided.placeholder}
          </div>
        )}
      </Droppable> 
      {/* <div className="tasks completed">
        <span className="tasks_heading">Completed Tasks</span>
      </div> */}
    </div>
  );
};

export default TaskList;
