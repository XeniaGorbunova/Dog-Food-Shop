import { useMutation } from '@tanstack/react-query'
import { useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { DogFoodApiConst } from '../../api/DogFoodapi'
import { getTokenSelector } from '../../redux/slices/userSlice'
import Loader from '../Loader/Loader'
import Modal from '../Modal/Modal'
import SuccessModal from './SuccessModal'

/* eslint-disable react/function-component-definition */
const DeleteProductModal = ({
  setIsDeleteModalOpen, isOpen, id, title,
}) => {
  const navigate = useNavigate()

  const [action, setAction] = useState('')
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false)
  const userToken = useSelector(getTokenSelector)
  const {
    mutateAsync, isLoading, isError, error,
  } = useMutation({
    mutationFn: () => DogFoodApiConst.deleteProduct(id, userToken)
      .then(() => {
        setAction('удалили')
        setIsSuccessModalOpen(true)
      }),
  })

  const closeDeleteModalHandler = () => {
    setIsDeleteModalOpen(false)
  }
  const deleteHandler = async () => {
    await mutateAsync()
    navigate('/products')
  }
  if (isLoading) return <Loader />
  if (isError) return <p>{`${error} `}</p>

  return (
    <Modal isOpen={isOpen} closeHandler={closeDeleteModalHandler}>
      <p>
        Вы уверены что хотите удалить этот товар?
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
      <SuccessModal
        isOpen={isSuccessModalOpen}
        setIsSuccessModalOpen={setIsSuccessModalOpen}
        action={action}
      />
    </Modal>
  )
}

export default DeleteProductModal
