import React from 'react'
import Navbar from './components/Navbar'
import { useState , useEffect } from 'react'
import { FiEdit } from "react-icons/fi";
import { MdDelete } from "react-icons/md";
import { v4 as uuidv4 } from 'uuid';

const App = () => {
  const [todo, settodo] = useState("")
const [showFinished, setshowFinished] = useState(false)
  const [todos, settodos] = useState(()=>{
let savedTodo = localStorage.getItem("todos");
if(savedTodo)
{
return JSON.parse(savedTodo);
}
else{
  return []
}
  })
  

 useEffect(() => {
  localStorage.setItem("todos" , JSON.stringify(todos))
 }, [todos])
 

 
const toggeled = ()=>{
  setshowFinished(!showFinished)

}

  const handleEdit = (e,id) =>{
let editTodo = todos.filter(item=> item.id === id)
settodo(editTodo[0].todo)

let deleteTodo = todos.filter(item=> item.id !==id);
settodos(deleteTodo)
 


  }

  const handleDelete = (e,id) =>{

 let deleteTodo = todos.filter(item=>{
  return item.id !== id

})


settodos(deleteTodo)
  

  }

  const handleAdd = () =>{
    settodos([...todos , {todo, id:uuidv4() , isCompleted: false}])
      
    settodo("")

 
  
    
  }

  const handleCheckbox = (e) =>{
    let id = e.target.name;

    
    let index = todos.findIndex(item=>{
 return item.id === id;


    })

    
    let newtodos = [...todos]

    newtodos[index].isCompleted = !newtodos[index].isCompleted;
    settodos(newtodos)
    
  }


const handleChange = (e) =>{
settodo(e.target.value)
}

  return (
    <>
<Navbar/>
<div className='container mx-auto my-5 rounded-xl p-5 bg-violet-100 min-h-[80vh] w-1/2 '  >
<h1 className='font-bold text-center text-xl' >iTask - Manage your todos at one place</h1>
  <div className='addTodo flex flex-col gap-4  my-5' >
    <h1 className='font-bold' > Add a todo</h1>
    <input onChange={handleChange} value={todo} className='p-2 rounded-full p-4 bg-white w-1/2 px-5 py-1 w-full ' type="text" placeholder='add a todo' /> 
  <button onClick={handleAdd} disabled={todo.length <=3 } className='bg-violet-800 cursor-pointer hover:bg-violet-950 p-2.5 text-white rounded-md rounded-xl text-sm font-bold '  >Save</button>
  </div>
  <input type="checkbox" onChange={toggeled} checked={showFinished}  className='mr-2 ' />Show Finished
 <h1 className='text-xl font-bold' >Your todos</h1>

 
<div className="todos">
  {todos.length > 0 ? (
    todos.map((item) => {
      return (
        (showFinished || !item.isCompleted) && (
          <div
            key={item.id}
            className="todo flex w-full items-center justify-between gap-3 my-4 rounded-xl bg-white p-4 shadow-sm"
          >
            <div className="flex min-w-0 flex-1 items-center gap-3">
              <input
                name={item.id}
                onChange={handleCheckbox}
                type="checkbox"
                checked={item.isCompleted}
                className="h-4 w-4 shrink-0 accent-violet-700"
              />

              <div
                className={`min-w-0 break-words ${
                  item.isCompleted
                    ? "line-through text-gray-400"
                    : "text-gray-800"
                }`}
              >
                {item.todo}
              </div>
            </div>

            <div className="buttons ml-auto flex shrink-0 gap-2">
              <button
                name={item.id}
                onClick={(e) => handleEdit(e, item.id)}
                className="rounded-lg bg-violet-800 p-2 text-white hover:bg-violet-950"
              >
                <FiEdit />
              </button>

              <button
                onClick={(e) => handleDelete(e, item.id)}
                className="rounded-lg bg-violet-800 p-2 text-white hover:bg-violet-950"
              >
                <MdDelete />
              </button>
            </div>
          </div>
        )
      );
    })
  ) : (
    <div className="my-7 w-full text-center text-violet-800">
      No todos available...
    </div>
  )}
</div>

  



</div>





    </>
  )
}

export default App