import React, { useState } from 'react';
import './Extra.css';

function TodoList() {
  const [inputValue, setInputValue] = useState('');
  const [tasks, setTasks] = useState([]);
  const [activeTasks, setActiveTasks] = useState([]);
  const [completedTasks, setCompletedTasks] = useState([]);
  const [activeSection, setActiveSection] = useState('all');

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleAddTask = () => {
    if (inputValue.trim() !== '') {
      const newTask = {
        id: new Date().getTime(),
        text: inputValue,
        completed: false,
      };

      setTasks([...tasks, newTask]);
      setActiveTasks([...activeTasks, newTask]);

      setInputValue('');
    }
  };

  const handleTaskComplete = (taskId) => {
    const updatedTasks = tasks.map((task) =>
      task.id === taskId ? { ...task, completed: true } : task
    );

    setTasks(updatedTasks);

    const completedTask = activeTasks.find((task) => task.id === taskId);
    const updatedActiveTasks = activeTasks.filter((task) => task.id !== taskId);
    setCompletedTasks([...completedTasks, completedTask]);
    setActiveTasks(updatedActiveTasks);
  };

  const handleTaskActivate = (taskId) => {
    const updatedTasks = tasks.map((task) =>
      task.id === taskId ? { ...task, completed: false } : task
    );

    setTasks(updatedTasks);

    const activatedTask = completedTasks.find((task) => task.id === taskId);
    const updatedCompletedTasks = completedTasks.filter(
      (task) => task.id !== taskId
    );
    setActiveTasks([...activeTasks, activatedTask]);
    setCompletedTasks(updatedCompletedTasks);
  };

  const handleSectionChange = (section) => {
    setActiveSection(section);
  };
  const [isvisible,setIsVisible]=useState(false);
  let displayedTasks = tasks;
  if (activeSection === 'active') {
    displayedTasks = activeTasks;
    if (isvisible) {
        setIsVisible(false);
    }
  } else if (activeSection === 'completed' ) {
    displayedTasks = completedTasks;
    if (!isvisible) {
        setIsVisible(true);
    }
  }
  const DeleteAll=()=>{
    setCompletedTasks([]);
  };


  return (
    <div className='main'>
      <h1>#To-Do List</h1>
      <nav>
        <section>
            <input
                type="text"
                placeholder="Add a task"
                value={inputValue}
                onChange={handleInputChange}
            />
            <button  onClick={handleAddTask}>Add Task</button>
        </section>
        <div className='variety'>
            <button onClick={() => handleSectionChange('all')}><span >All</span></button>
            <button onClick={() => handleSectionChange('active')}><span >Active</span></button>
            <button onClick={() => handleSectionChange('completed')}><span >Completed</span></button>
        </div>
      </nav>
      <h2>{activeSection === 'completed' ? 'Completed Tasks' : 'Tasks'}</h2>
      
        <ul>
            {displayedTasks.map((task) => (
            <li className='display' key={task.id}>
                <input
                className='custom-checkbox'
                type="checkbox"
                checked={task.completed}
                onChange={() =>
                    task.completed
                    ? handleTaskActivate(task.id)
                    : handleTaskComplete(task.id)
                }
                />
                <span style={{ textDecoration: task.completed ? 'line-through' : 'none' }}>
                {task.text}
                </span>
            </li>
            ))}
        </ul>
        {isvisible && <button id='deletebtn' onClick={DeleteAll}>Delete All</button>}
    </div>
  );
}

export default TodoList;
