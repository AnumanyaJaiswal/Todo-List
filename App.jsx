import { useState, useEffect } from 'react'
import './App.css'
import { v4 as uuidv4 } from 'uuid';


function App() {
  const [todo, settodo] = useState("")
  const [Todos, setTodos] = useState([])
  const [showFinished, setShowFinished] = useState(true)

  useEffect(() => {
    let todoString = localStorage.getItem("Todos")

    if (todoString) {
      let saveTodods = JSON.parse(localStorage.getItem("Todos"))
      setTodos(saveTodods)
    }

  }, [])

  useEffect(() => {
    localStorage.setItem("Todos", JSON.stringify(Todos))
  }, [Todos])


  const handleAdd = () => {
    if (todo.length <= 3) {
      alert("Todo is very small")
      return
    }
    setTodos([...Todos, { id: uuidv4(), todo, isCompleted: false }])
    settodo("")

  }

  const handlechange = (e) => {
    settodo(e.target.value)
  }

  const handleEdit = (e) => {
    let id = e.target.id;
    let t = Todos.find(i => {
      return i.id === id
    })
    settodo(t.todo)
    setTodos(Todos.filter(item => item.id !== id))

  }

  const handleDelete = (e) => {
    let id = e.target.id;
    setTodos(Todos.filter(item => item.id !== id))

  }

  const handleCheckbox = (e) => {

    let id = e.target.name;
    setTodos(Todos.map(item => {
      return item.id === id
        ? { ...item, isCompleted: !item.isCompleted }
        : item
    }))

  }

  const toogleFinished = (e) => {
    setShowFinished(!showFinished)
  }
  

  return (
    <>
      <div className="container">
        <div className="todo-list">
          <h1>Manage your todos</h1>

          <div className="addTodo">
            <h2>Add a todo</h2>
            <div className="input">
              <input type="text" name='' className='text' value={todo} onChange={handlechange} />
              <button className='Add btn-design' onClick={handleAdd}>Add</button>
            </div>
            <br />
            <br />
            <input type="checkbox" checked = {showFinished} onChange={toogleFinished} /> Show all
          </div>
          <hr />

          <div className="heading">Your Todos</div>
          <div className="showTodo">
            {Todos.length === 0 && <div>No todos yet</div>}

            {Todos.map(item => {
              return (showFinished || item.isCompleted === false) && <div key={item.id} className="todo-item">
                <div className="items">
                  <input type="checkbox" className='check' name={item.id} onChange={handleCheckbox} checked={item.isCompleted} />
                  <span className={item.isCompleted ? "dashed" : ""}>{item.todo}</span>
                </div>
                <div className="btn">
                  <button className="edit btn-design" id={item.id} onClick={handleEdit}>Edit</button>
                  <button className="delete btn-design" id={item.id} onClick={handleDelete}>Delete</button>
                </div>
              </div>
            })}

          </div>
        </div>
      </div>
    </>
  )
}

export default App
