import './App.css'
import AddTodo from "./components/AddTodo"
import UpdateTodo from "./components/UpdateTodo"
import TodoList from "./components/TodoList"
import DeleteTodo from "./components/DeleteTodo"
import {useState, useEffect} from "react";
import { Button } from "react-bootstrap";
import { useAppDispatch, useAppSelector } from "./app/hooks";

function App() {
  
  const todos = useAppSelector((state) => state.todos);
    
  const in_queue_unsort = todos.filter((todo) => todo.status === "in queue")
  const in_progress_unsort = todos.filter((todo) => todo.status === "in progress")
  const completed_unsort = todos.filter((todo) => todo.status === "completed")

  const sortByKey = (array, key) => {
    return array.sort(function(a, b) {
        var x = a[key]; var y = b[key];
        return ((x < y) ? -1 : ((x > y) ? 1 : 0));
    });
  }

  const in_queue = sortByKey(in_queue_unsort, "order");
  const in_progress = sortByKey(in_progress_unsort, "order");
  const completed = sortByKey(completed_unsort, "order");

  console.log(in_queue);
  console.log(in_progress);
  console.log(completed);

  
  const [showUpdate, setShowUpdate] = useState(false);

  const handleShowUpdate = () => {
    setShowUpdate(true);
  }
  const handleHideUpdate = () => {
    setShowUpdate(false);
  }
  
  const [showAdd, setShowAdd] = useState(false);

  const handleShowAdd = () => {
    setShowAdd(true);
  }
  const handleHideAdd = () => {
    setShowAdd(false);
  }

  const [update, setUpdate] = useState({});

  const handleUpdate = (todo) => {
    console.log(todo);
    setUpdate(todo);
    handleShowUpdate();
  }

  const [toDeleteTodo, setToDeleteTodo] = useState("");

  const handleDelete = (todo) => {
    // console.log(todo);
    setToDeleteTodo(todo);
    handleShowDelete();
  }
  
  const [showDelete, setShowDelete] = useState(false);

  const handleShowDelete = () => {
    setShowDelete(true);
  }
  const handleHideDelete = () => {
    setShowDelete(false);
  }
  
  return (
    <div className="App">
      <Button className="submit-button-add" type="submit" onClick={ handleShowAdd }>
      Add todo
      </Button>
      
      <br/>

      <UpdateTodo showUpdate={ showUpdate } handleHideUpdate={ handleHideUpdate } update={ update } setUpdate={ setUpdate }/>
      <DeleteTodo showDelete={ showDelete } handleHideDelete={ handleHideDelete } toDeleteTodo={ toDeleteTodo }/>
      <AddTodo showAdd={ showAdd } handleHideAdd={ handleHideAdd } in_queue={ in_queue }/>
      <br/>
      <TodoList handleUpdate={ handleUpdate } handleDelete={ handleDelete } in_queue = { in_queue } in_progress = { in_progress } completed = { completed }/>
    </div>
  )
}

export default App
