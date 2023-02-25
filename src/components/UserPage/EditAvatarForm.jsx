import { useMutation } from '@tanstack/react-query'
import {
  Formik, Form, Field, ErrorMessage,
} from 'formik'
import { useSelector } from 'react-redux'
import { UserEditAvatarValidationSchema } from '../../validator'
import '../../index.css'
import { DogFoodApiConst } from '../../api/DogFoodapi'
import Loader from '../Loader/Loader'
import { getTokenSelector, getUserSelector } from '../../redux/slices/userSlice'

function EditAvatarForm({
  userAvatar, setReloadKey, reloadKey,
  setIsAvatarEditing, isAvatarEditing,
}) {
  const userToken = useSelector(getTokenSelector)
  const { group } = useSelector(getUserSelector)

  const {
    mutateAsync, isLoading, isError, error,
  } = useMutation({
    mutationFn: (dataEdit) => DogFoodApiConst.editUserAvatar(group, dataEdit, userToken),
  })

  const handleSubmit = async (values) => {
    await mutateAsync(values)
    setReloadKey(reloadKey + 1)
    setIsAvatarEditing(!isAvatarEditing)
  }

  if (isLoading) return <Loader />
  if (isError) return <p>{`${error} `}</p>

  const initialValues = {
    avatar: userAvatar || '',
  }

  return (

    <div className="m-2">
      <Formik
        initialValues={initialValues}
        validationSchema={UserEditAvatarValidationSchema}
        onSubmit={(values) => handleSubmit(values)}
      >
        <Form className="d-flex flex-column" style={{ width: '100%' }}>
          <Field className="mb-1 form-control" name="avatar" type="text" />
          <ErrorMessage component="p" className="error" name="avatar" />
          <small>Введите url вашего аватара</small>
          <button type="submit" disabled={isLoading} className="btn btn-primary">
            Сохранить
          </button>
        </Form>
      </Formik>
    </div>
  )
}

export default EditAvatarForm
