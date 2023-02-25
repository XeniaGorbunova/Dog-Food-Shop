/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable max-len */
import { useNavigate } from 'react-router-dom'
import { useMutation, useQuery } from '@tanstack/react-query'
import {
  Formik, Form, Field, ErrorMessage,
} from 'formik'
import { useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import { UserEditValidationSchema } from '../../validator'
import '../../index.css'
import { DogFoodApiConst } from '../../api/DogFoodapi'
import Loader from '../Loader/Loader'
import pen from '../../assets/pen.svg'
import { getQueryUserKey } from '../Products/utils'
import { getTokenSelector, getUserSelector } from '../../redux/slices/userSlice'
import EditAvatarForm from './EditAvatarForm'

function UserPage() {
  // const { id } = useParams()
  const navigate = useNavigate()
  const userToken = useSelector(getTokenSelector)
  const { group } = useSelector(getUserSelector)
  const [isAvatarEditing, setIsAvatarEditing] = useState(false)
  const [reloadKey, setReloadKey] = useState(0)
  useEffect(() => {
    if (!userToken) {
      navigate('/signin')
    }
  }, [userToken])

  const {
    data, isLoading, isError, error,
  } = useQuery({
    queryKey: getQueryUserKey(reloadKey),
    queryFn: () => DogFoodApiConst.getUser(group, userToken),
    enabled: !!(userToken),
  })

  const {
    mutateAsync, isLoading: isEditLoading, isError: isEditError, error: errorEdit,
  } = useMutation({
    mutationFn: (dataEdit) => DogFoodApiConst.editUserInfo(group, dataEdit, userToken),
  })

  const handleSubmit = async (values) => {
    await mutateAsync(values)
    setReloadKey(reloadKey + 1)
  }
  const handleAvatarEdit = () => {
    setIsAvatarEditing(!isAvatarEditing)
  }
  if (isLoading || isEditLoading) return <Loader />
  if (isError) return <p>{`${error} `}</p>
  if (isEditError) return <p>{`${errorEdit} `}</p>

  const initialValues = {
    name: data.name ? data.name : '',
    about: data.about ? data.about : '',
  }

  return (
    <div className="d-flex align-items-center" style={{ paddingBottom: '90px' }}>
      <div className="card m-3" style={{ width: '25rem' }}>
        {isAvatarEditing && (
        <EditAvatarForm
          userAvatar={data.avatar}
          setReloadKey={setReloadKey}
          reloadKey={reloadKey}
          isAvatarEditing={isAvatarEditing}
          setIsAvatarEditing={setIsAvatarEditing}
        />
        )}
        <img className="card-img-top" src={data.avatar} alt="user" />
        <img
          src={pen}
          alt="edit"
          style={{
            position: 'absolute', top: '15px', right: '15px', cursor: 'pointer', width: '25px', height: '25px',
          }}
          onClick={handleAvatarEdit}
        />
        <div className="card-body">
          <Formik
            initialValues={initialValues}
            validationSchema={UserEditValidationSchema}
            onSubmit={(values) => handleSubmit(values)}
          >
            <Form className="d-flex flex-column" style={{ width: '100%' }}>
              <Field className="mb-3 form-control" name="name" type="text" />
              <ErrorMessage component="p" className="error" name="name" />
              <Field className="mb-3 form-control" name="about" type="text" />
              <ErrorMessage component="p" className="error" name="about" />
              <p>
                <b>Группа:</b>
                {' '}
                {data.group}
              </p>
              <p>
                <b>Email:</b>
                {' '}
                {data.email}
              </p>
              <button type="submit" disabled={isLoading} className="btn btn-primary">
                Сохранить
              </button>
            </Form>
          </Formik>
        </div>
      </div>
    </div>
  )
}

export default UserPage
