import { useState } from 'react'
import { useAppDispatch, useAppSelector } from "../app/hooks";
import todoSlice, { addTodo, updateTodo } from "../features/todo/todoSlice";
import { Form, Button, Modal } from "react-bootstrap";

function UpdateTodo({ showUpdate, handleHideUpdate, update, setUpdate }) {
    const dispatch = useAppDispatch();
    const [title, setTitle] = useState("");

    const handleChange = (event) => {
        // console.log(todo);
        setUpdate({
            ...update,
            [event.target.name]: event.target.value
        });    
    }
    
    const handleClick = () => {
        if (update.title.trim() !== "") {
            dispatch(updateTodo({
                id: update.id,
                title: update.title.trim()
            }));
            handleHideUpdate();
        }
    }

    return (
        <div>
            <Modal fullscreen="true" dialogClassName="edit-modal" show={showUpdate}>
            
                <Modal.Header>
                    <span style={{float: "right", padding: "4px 10px 0 0", cursor: "pointer", userSelect: "none"}} onClick={ handleHideUpdate } className="close">✖</span>
                    <Modal.Title><div className="title" style={{display: "inline", padding: "5px"}}>Update todo</div></Modal.Title><br/>
                </Modal.Header>
                <Modal.Body>
                    <Form encType="multipart/form-data">
                        <Form.Group>
                            <Form.Control 
                                as="textarea"
                                name="title"
                                value={update.title}
                                onChange={handleChange}
                                className="form-control"
                            />
                        </Form.Group>
                    </Form>
                    <br/>
                    <Button className="submit-button" type="submit" onClick={handleClick}>
                    Update
                    </Button>
                </Modal.Body>

            </Modal>
        </div>
    )
}

export default UpdateTodo
