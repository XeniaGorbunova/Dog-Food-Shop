/* eslint-disable no-underscore-dangle */
/* eslint-disable max-len */
import { useNavigate, Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { useMutation } from '@tanstack/react-query'
import {
  Formik, Form, Field, ErrorMessage,
} from 'formik'
import { SignInFormValidationSchema } from '../../validator'
import '../../index.css'
import { DogFoodApiConst } from '../../api/DogFoodapi'

import { setNewUser } from '../../redux/slices/userSlice'
import { DOGFOOD_CART_LS_KEY } from '../../redux/constants'
import { cartInitialize } from '../../redux/slices/cartSlice'

function SignIn() {
  const initialValues = {
    email: '',
    password: '',
  }
  const dispatch = useDispatch()

  const navigate = useNavigate()

  const { mutateAsync, isLoading } = useMutation({
    mutationFn: (values) => DogFoodApiConst.signIn(values)
      .then((user) => {
        const cartFromLS = window.localStorage.getItem(DOGFOOD_CART_LS_KEY)
        if (cartFromLS) {
          const cartForCurrentUser = JSON.parse(cartFromLS)[user.data._id]
          dispatch(cartInitialize(cartForCurrentUser ?? []))
        }
        dispatch(setNewUser(user.data._id, user.token, user.data.email, user.data.group))
      }),
  })

  const handleSubmit = async (values) => {
    await mutateAsync(values)
    setTimeout(() => { navigate('/Dog-Food-Shop/products') })
  }

  return (
    <div className="container d-flex flex-column align-items-center mt-5">
      <h1 className="mb-5">Войти</h1>
      <Formik
        initialValues={initialValues}
        validationSchema={SignInFormValidationSchema}
        onSubmit={(values) => handleSubmit(values)}
      >
        <Form className="d-flex flex-column" style={{ width: '30%' }}>
          <Field className="mb-3 form-control" name="email" type="email" placeholder="email here" />
          <ErrorMessage component="p" className="error" name="email" />

          <Field className="mb-3 form-control" name="password" type="password" placeholder="password here" />
          <ErrorMessage component="p" className="error" name="password" />

          <button type="submit" disabled={isLoading} className="btn btn-primary">Войти</button>
        </Form>
      </Formik>
      <Link to="/signup" className="btn btn-primary mt-5">
        Регистрация
      </Link>
    </div>
  )
}

export default SignIn
