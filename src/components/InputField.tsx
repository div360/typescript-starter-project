import React, { useRef } from 'react'
import './styles.css'

interface Props{
    task: string;
    setTask: React.Dispatch<React.SetStateAction<string>>;
    handleAdd: (e: React.FormEvent) => void;
}

const InputField = ({task, setTask, handleAdd}:Props) => {
    const inputRef = useRef<HTMLInputElement>(null);
  return (
    <form className='input' onSubmit={(e)=>{
        handleAdd(e);
        inputRef.current?.blur();
    }}>
        <input ref={inputRef} type='input' value={task} onChange={(e)=>{setTask(e.target.value)}} placeholder='Enter a task...' className='input_box'/>
        <button className='input_submit' type='submit'>Add</button>
    </form>
  )
}

export default InputField
