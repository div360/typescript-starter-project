import React, { useEffect } from "react";
import { useState, useRef } from "react";
import { Task } from "../model/Task";
import { Draggable } from "react-beautiful-dnd";
import { Actions } from "../Reducer";
import { promises } from "dns";
import { MdEdit } from "react-icons/md";
import { TiDelete } from "react-icons/ti";
import { MdDone } from "react-icons/md";
import "./styles.css";

interface Props {
  index: number;
  task: Task;
  tasks: Task[];
  // setTasks: React.Dispatch<React.SetStateAction<Task[]>>;
  dispatch: React.Dispatch<Actions>;
}

const SingleTask = ({ index, task, tasks, dispatch }: Props) => {
  const [isEditOn, setisEditOn] = useState<boolean>(false);
  const [editText, setEditText] = useState<string>(task.task);
  const editInput = useRef<HTMLInputElement>(null);

  const handleDone = (id: number) => {
    dispatch({ type: "TOGGLE_TASK", payload: id });
  };

  const handleDelete = (id: number) => {
    dispatch({ type: "DELETE_TASK", payload: id });
  };

  const handleEdit = (e: React.FormEvent, task: Task) => {
    e.preventDefault();
    if (editText) {
      dispatch({ type: "EDIT_TASK", payload: { id: task.id, task: editText } });
      setisEditOn(!isEditOn);
    }
  };

  useEffect(() => {
    if (isEditOn) {
      editInput.current?.focus();
    }
  }, [isEditOn]);

  return (
    <Draggable draggableId={task.id.toString()} index={index}>
      {(provided, snapshot) => (
        <form
          className={`tasks_single ${snapshot.isDragging ? "dragging" : ""}`}
          onSubmit={(e) => handleEdit(e, task)}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
        >
          {isEditOn ? (
            <input
              ref={editInput}
              value={editText}
              onChange={(e) => {
                setEditText(e.target.value);
              }}
              className="tasks_single--text"
            />
          ) : !task.isDone ? (
            <span className="tasks_single--text">{task.task}</span>
          ) : (
            <s className="tasks_single--text">{task.task}</s>
          )}

          <div className="icon-container">
            <span
              className="icon"
              onClick={() => {
                if (!isEditOn && !task.isDone) {
                  setisEditOn(!isEditOn);
                }
              }}
            >
              <MdEdit />
            </span>
            <span className="icon" onClick={() => handleDelete(task.id)}>
              <TiDelete />
            </span>
            <span className="icon" onClick={() => handleDone(task.id)}>
              <MdDone />
            </span>
          </div>
        </form>
      )}
    </Draggable>
  );
};

export default SingleTask;
