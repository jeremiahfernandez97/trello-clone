import { Form, Button, Modal } from "react-bootstrap";
import { useAppDispatch } from "../app/hooks";
import todoSlice, { deleteTodo } from "../features/todo/todoSlice";

// const handleDelete = (id) => {
//   dispatch(deleteTodo({
//     id: id
//   }))
// }

function DeleteTodo ({ showDelete, handleHideDelete, toDeleteTodo }: { showDelete: any, handleHideDelete: any, toDeleteTodo: any }) {
    const dispatch = useAppDispatch();
    
    const handleClick = () => {
        dispatch(deleteTodo({
            id: toDeleteTodo.id
        }))
        handleHideDelete()
    }

    return (
        <div>
            <Modal fullscreen="true" dialogClassName="edit-modal" show={showDelete}>
            
                <Modal.Header>
                    <span style={{float: "right", padding: "4px 10px 0 0", cursor: "pointer", userSelect: "none"}} onClick={ handleHideDelete } className="close">✖</span>
                    <Modal.Title><div className="title" style={{display: "inline", padding: "5px"}}>Delete todo</div></Modal.Title><br/>
                </Modal.Header>
                <Modal.Body>
                    <div className="preview-delete">
                        {toDeleteTodo.title}
                    </div>

                    <br/>
                    <Button className="submit-button-delete" type="submit" onClick={ handleClick }>
                    Delete
                    </Button>
                    <Button className="submit-button" type="submit" onClick={handleHideDelete}>
                    Cancel
                    </Button>
                </Modal.Body>

            </Modal>
        </div>
    )
}

export default DeleteTodo