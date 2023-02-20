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
        Вы уверены что хотите удалить этот товар из корзины?
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
          data-label="notNavigate"
          className="btn btn-success mx-2"
          onClick={closeDeleteModalHandler}
        >
          Cancel
        </button>
        <button
          onClick={deleteHandler}
          type="submit"
          className="btn btn-danger mx-2"
          data-label="notNavigate"
        >
          Delete
        </button>
      </div>
    </Modal>
  )
}

export default DeleteItemModal
