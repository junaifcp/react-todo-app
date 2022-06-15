import React,{useState,useEffect} from 'react'
import './Todo.css'
function Todo() {
    const getLocalData=()=>{
        const list=localStorage.getItem('myTodoList')
        if(list){
            return JSON.parse(list)
        }else{
            return [];
        }
    }
  const [todos,setTodos]=useState(getLocalData());
  const [todo,setTodo]=useState("");
  
  //add the items  to todos
  const addItem=()=>{
      if(!todo){
          alert('please add the item to input')
      }else{
          const myNewTodos={
              id:new Date().getTime().toString(),
              name:todo,
         }
          setTodos([...todos,myNewTodos])
          setTodo("")
    }

  }
  const deleteTodo=(id)=>{
       const updatedItem=todos.filter((index)=>{
           return index.id!==id
       })
       setTodos(updatedItem)
  }
  useEffect(()=>{
    localStorage.setItem("myTodoList",JSON.stringify(todos))
  },[todos])
  const current = new Date();
  const date = `${current.getDate()}/${current.getMonth()+1}/${current.getFullYear()}`;
  return (
    <>
        <div className="app">
      <div className="mainHeading">
        <h1>ToDo List</h1>
      </div>
      <div className="subHeading">
        <br />
        <h2>Whoop, it's {date} 🌝 ☕ </h2>
      </div>
      <div className="input">
        <input type="text" placeholder="🖊️ Add item..." value={todo} onChange={(e)=>{setTodo(e.target.value)}} />
        <i className="fas fa-plus" onClick={addItem}></i>
      </div>
      {
          todos.map((value)=>{
              return(

      <div className="todos">
        <div className="todo">
          <div className="left">
            <p>{value.name}</p>
          </div>
          <div className="right">
            <i className="fas fa-times" onClick={()=>{deleteTodo(value.id)}}></i>
          </div>
          
        </div>
      </div>
              )
          })
      }
      <button onClick={()=>{setTodos([])}}>clear all</button>

    </div>
    </>
  )
}

export default Todo