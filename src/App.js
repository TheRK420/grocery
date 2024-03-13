import React, { useState, useEffect } from 'react';
import './App.css';

const LocalTasker = () => {
  // State variables to manage tasks and input
  const [tasks, setTasks] = useState([]);
  const [inputValue, setInputValue] = useState('');

  // Load tasks from local storage on initial render
  useEffect(() => {
    const storedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
    console.log("Stored tasks:", storedTasks);
    setTasks(storedTasks);
  }, []);

  // Update local storage whenever tasks change
  useEffect(() => {
    console.log("Tasks updated:", tasks);
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  // Function to handle task creation
  const addTask = () => {
    if (inputValue.trim() !== '') {
      const newTask = { id: Date.now(), description: inputValue, completed: false };
      setTasks(prevTasks => [...prevTasks, newTask]);
      setInputValue('');
    }
  };

  // Function to handle task deletion
  const deleteTask = (taskId) => {
    const updatedTasks = tasks.filter(task => task.id !== taskId);
    setTasks(updatedTasks);
  };

  // Function to handle task completion
  const toggleCompletion = (taskId) => {
    const updatedTasks = tasks.map(task =>
      task.id === taskId ? { ...task, completed: !task.completed } : task
    );
    setTasks(updatedTasks);
  };

  // Function to clear completed tasks
  const clearCompletedTasks = () => {
    const updatedTasks = tasks.filter(task => !task.completed);
    setTasks(updatedTasks);
  };

  return (
    <div className='main'>
      <h1>Grocery Bud</h1>
      <input className='task'
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        placeholder="Enter task description"
      />
      <button className='button1' onClick={addTask}>Add Task</button>
      <ul className='list'>
        {tasks.map(task => (
          <li key={task.id}>
            <input className='checkbox'
              type="checkbox"
              checked={task.completed}
              onChange={() => toggleCompletion(task.id)}
            />
            <span style={{ textDecoration: task.completed ? 'line-through' : 'none' }}>{task.description}</span>
            <button className='button2' onClick={() => deleteTask(task.id)}>Delete</button>
          </li>
        ))}
      </ul>
      <button className='button3' onClick={clearCompletedTasks}>Clear Completed</button>
    </div>
  );
};

export default LocalTasker;
