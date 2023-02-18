import { useDispatch } from 'react-redux'
import { deleteProduct } from '../../redux/slices/cartSlice'
import Modal from '../Modal/Modal'

/* eslint-disable react/function-component-definition */
const DeleteItemModal = ({
  setIsDeleteModalOpen, isOpen, id, title,
}) => {
  const dispatch = useDispatch()
  const deleteHandler = () => {
    dispatch(deleteProduct(id))
  }
  const closeDeleteModalHandler = () => {
    setIsDeleteModalOpen(false)
  }
  return (
    <Modal isOpen={isOpen} closeHandler={closeDeleteModalHandler}>
      <p>
        Are you sure? Delete this task?
      </p>
      {' '}
      <b>
        &quot;
        {title}
        &quot;
      </b>
      <div className="d-flex justify-content-around align-items-center mt-4">
        <button
          type="button"
          className="btn btn-success mx-2"
          onClick={closeDeleteModalHandler}
        >
          Cancel
        </button>
        <button onClick={deleteHandler} type="submit" className="btn btn-danger mx-2">
          Delete
        </button>
      </div>
    </Modal>
  )
}

export default DeleteItemModal
