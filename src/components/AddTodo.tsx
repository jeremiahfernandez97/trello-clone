import { useState } from 'react'
import { useAppDispatch, useAppSelector } from "../app/hooks";
import todoSlice, { addTodo, updateTodo } from "../features/todo/todoSlice";
import { Form, Button, Modal } from "react-bootstrap";

function AddTodo({ showAdd, handleHideAdd, in_queue }) {
    const dispatch = useAppDispatch();
    
    const [title, setTitle] = useState("");
    
    const handleClick = () => {
        if (title.trim() !== "") {
            dispatch(addTodo({
                title: title.trim(),
                order: in_queue.length
            }));
            handleHideAdd();
            setTitle("");
        }
    }
    
    const handleChange = (event) => {
        setTitle(event.target.value);
    }
    
    
    return (

        <div>
            <Modal fullscreen="true" dialogClassName="edit-modal" show={showAdd}>
            
                <Modal.Header>
                    <span style={{float: "right", padding: "4px 10px 0 0", cursor: "pointer", userSelect: "none"}} onClick={ handleHideAdd } className="close">✖</span>
                    <Modal.Title><div className="title" style={{display: "inline", padding: "5px"}}>Add todo</div></Modal.Title><br/>
                </Modal.Header>
                <Modal.Body>
                    
                <Form encType="multipart/form-data">
                    <Form.Group>
                        <Form.Control 
                            as="textarea"
                            placeholder="description"
                            name="description"
                            onChange={handleChange}
                            className="form-control"
                        />
                    </Form.Group>
                </Form>
                <Button className="submit-button" type="submit" onClick={handleClick}>
                Add Todo
                </Button>
                </Modal.Body>

            </Modal>
        </div>

    // <>
    //     {/* <input type="text" onChange= { handleChange } /> */}

    //     <div className="add-todo">
    //     <div className="title">Add new todo</div>
    //         <Form encType="multipart/form-data">
    //             <Form.Group>
    //                 <Form.Control 
    //                     as="textarea"
    //                     placeholder="description"
    //                     name="description"
    //                     onChange={handleChange}
    //                     className="form-control"
    //                 />
    //             </Form.Group>
    //         </Form>
    //         <Button className="submit-button" type="submit" onClick={handleClick}>
    //         Add Todo
    //         </Button>
    //     </div>
    // </>
    )
}

export default AddTodo;