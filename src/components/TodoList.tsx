import React from "react";
import { useAppSelector, useAppDispatch } from "../app/hooks";
import {useState, useRef} from "react";
import todoSlice, { deleteTodo, changeStatusInProgress, changeStatusInQueue, changeStatusCompleted } from "../features/todo/todoSlice";
// import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

function TodoList({ handleUpdate, handleDelete, in_queue, in_progress, completed }: { handleUpdate: any, handleDelete: any, in_queue: any, in_progress: any, completed: any }) {
    const dispatch = useAppDispatch();

    // const [todos, setTodos] = useState([])

    // const dragItem = useRef<any>()
    // const dragOverItem = useRef<any>()

    // const onDragStart = (e:React.DragEvent<HTMLDivElement>, index:number) => {
    //   console.log("drag started", index)
    // }
    
    // const onDragEnter = (e:React.DragEvent<HTMLDivElement>, index:number) => {
    //   console.log("drag enter", index)
    // // }

    // const handleDelete = (id) => {
    //   dispatch(deleteTodo({
    //     id: id
    //   }))
    // }
    
    let currentDrag = "";
    let previousOrder = "";
    let previousStatus = "";

    const dragStarted = (e: any, id: any, order: any, status: any) => {
      console.log("drag started " + id);
      // e.dataTransfer.setData("todoId", id);
      e.target.style.opacity = .25;
      currentDrag = id;
      previousOrder = order;
      previousStatus = status;
    }

    const dragEnded = (e: any, id: any) => {
      console.log("drag ended " + id);
      // e.dataTransfer.setData("todoId", id);
      e.target.style.opacity = 1;
      currentDrag = id;
    }

    const draggingOver = (e: any) => {
      e.preventDefault();
      // e.target.style.opacity = .5;
      console.log(e.target);
    }

    const dragDroppedInProgress = (e: any, previousOrder: any, previousStatus: any) => {
      console.log("drag dropped");
      // let transferredTodoId = e.dataTransfer.getData("todoId")

      if (previousStatus !== "in progress") {
        dispatch(changeStatusInProgress({
          id: currentDrag,
          previousStatus: previousStatus,
          previousOrder: previousOrder,
          currentOrder: in_progress.length
        }))
      }
    }

    const dragDroppedInQueue = (e: any, previousOrder: any, previousStatus: any) => {
      console.log("drag dropped");
      // let transferredTodoId = e.dataTransfer.getData("todoId")
      if (previousStatus !== "in queue") {
        dispatch(changeStatusInQueue({
          id: currentDrag,
          previousStatus: previousStatus,
          previousOrder: previousOrder,
          currentOrder: in_queue.length
        }))
      }
    }

    const dragDroppedCompleted = (e: any, previousOrder: any, previousStatus: any) => {
      console.log("drag dropped");
      // let transferredTodoId = e.dataTransfer.getData("todoId")
      if (previousStatus !== "completed") {
        dispatch(changeStatusCompleted({
          id: currentDrag,
          previousStatus: previousStatus,
          previousOrder: previousOrder,
          currentOrder: completed.length
        }))
      }
    }

    // const handleSort = () => {
    //   let _todos=[...todos]

    //   const draggedItemContent = _todos.splice(dragItem.current, 1)[0]

    //   _todos.splice(dragOverItem.current, 0, draggedItemContent)

    //   dragItem.current = null
    //   dragOverItem.current = null

    //   setTodos(_todos);
    // }

    return (
        <>
        <div className="row">
          
          <div className="column">
            <div className="title">Todo</div>
            <div data-droppable onDragOver={(e) => draggingOver(e)} onDrop={(e) => dragDroppedInQueue(e, previousOrder, previousStatus)} className="card-container in-queue">
              {
                  in_queue.length > 0 ? in_queue.map((todo: any, index: any) => 
                  <div
                    className="todo"
                    draggable
                    key={index}
                    onDragStart={(e) => dragStarted(e, todo.id, todo.order, todo.status)}
                    onDragEnd={(e) => dragEnded(e, todo.id)}
                  >
                    <span className="todo-actions">
                      <span className="todo-action-update" onClick={() => {handleUpdate(todo)}}><span className="todo-action-label"></span>✎</span>
                      <br/>
                      &nbsp;<span className="todo-action-delete" onClick={() => {handleDelete(todo)}}><span className="todo-action-label"></span>🗑</span>
                    </span>
                    {todo.title}
                    <br />
                    <br />
                  </div>
                ) : <div style={{textAlign:"center", color:"rgb(220 220 220)"}}>nothing here</div>
              }
            </div>
          </div>

          <div className="column">
            <div className="title">Doing</div>
            <div data-droppable="true" onDragOver={(e) => draggingOver(e)} onDrop={(e) => dragDroppedInProgress(e, previousOrder, previousStatus)} className="card-container in-progress">
              {
                  in_progress.length > 0 ? in_progress.map((todo: any, index: any) => 
                  <div
                    className="todo"
                    draggable
                    key={index}
                    onDragStart={(e) => dragStarted(e, todo.id, todo.order, todo.status)}
                    onDragEnd={(e) => dragEnded(e, todo.id)}
                  >
                    <span className="todo-actions">
                      <span className="todo-action-update" onClick={() => {handleUpdate(todo)}}><span className="todo-action-label"></span>✎</span>
                      <br/>
                      &nbsp;<span className="todo-action-delete" onClick={() => {handleDelete(todo)}}><span className="todo-action-label"></span>🗑</span>
                    </span>
                    {todo.title}
                    <br />
                    <br />
                  </div>
                ) : <div style={{textAlign:"center", color:"rgb(220 220 220)"}}>nothing here</div>
              }
            </div>
          </div>

          <div className="column">
            <div className="title">Done</div>
            <div data-droppable="true" onDragOver={(e) => draggingOver(e)} onDrop={(e) => dragDroppedCompleted(e, previousOrder, previousStatus)} className="card-container completed">
              {
                  completed.length > 0 ? completed.map((todo: any, index: any) => 
                  <div
                    className="todo"
                    draggable
                    key={index}
                    onDragStart={(e) => dragStarted(e, todo.id, todo.order, todo.status)}
                    onDragEnd={(e) => dragEnded(e, todo.id)}
                  >
                    <span className="todo-actions">
                      <span className="todo-action-update" onClick={() => {handleUpdate(todo)}}><span className="todo-action-label"></span>✎</span>
                      <br/>
                      &nbsp;<span className="todo-action-delete" onClick={() => {handleDelete(todo)}}><span className="todo-action-label"></span>🗑</span>
                    </span>
                    {todo.title}
                    <br />
                    <br />
                  </div>
                ) : <div style={{textAlign:"center", color:"rgb(220 220 220)"}}>nothing here</div>
              }
            </div>
            <div></div>
          </div>
          
        </div>

          
        {/* <DragDropContext>
          <Droppable droppableId="todos">
            <Draggable></>
          </Droppable>
        </DragDropContext> */}

        </>
    )
}

export default TodoList