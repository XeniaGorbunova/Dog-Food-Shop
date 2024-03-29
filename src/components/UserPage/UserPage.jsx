/* eslint-disable jsx-a11y/control-has-associated-label */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable max-len */
import { useNavigate } from 'react-router-dom'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import {
  Formik, Form, Field, ErrorMessage,
} from 'formik'
import { useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import { UserEditValidationSchema } from '../../validator'
import '../../index.css'
import { DogFoodApiConst } from '../../api/DogFoodapi'
import Loader from '../Loader/Loader'
import { getQueryUserKey } from '../Products/utils'
import { getTokenSelector, getUserSelector } from '../../redux/slices/userSlice'
import EditAvatarForm from './EditAvatarForm'
import './UserPage.css'

function UserPage() {
  const navigate = useNavigate()
  const queryClient = useQueryClient()

  const userToken = useSelector(getTokenSelector)
  const { group } = useSelector(getUserSelector)
  const [isAvatarEditing, setIsAvatarEditing] = useState(false)
  useEffect(() => {
    if (!userToken) {
      navigate('/signin')
    }
  }, [userToken])

  const {
    data, isLoading, isError, error,
  } = useQuery({
    queryKey: getQueryUserKey(),
    queryFn: () => DogFoodApiConst.getUser(group, userToken),
    enabled: !!(userToken),
  })

  const {
    mutateAsync, isLoading: isEditLoading, isError: isEditError, error: errorEdit,
  } = useMutation({
    mutationFn: (dataEdit) => DogFoodApiConst.editUserInfo(group, dataEdit, userToken)
      .then(() => queryClient.invalidateQueries({ queryKey: getQueryUserKey() })),
  })

  const handleSubmit = async (values) => {
    await mutateAsync(values)
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
          isAvatarEditing={isAvatarEditing}
          setIsAvatarEditing={setIsAvatarEditing}
        />
        )}
        <img className="card-img-top" src={data.avatar} alt="user" />

        <button
          className="button__edit btn btn-light"
          type="button"
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
