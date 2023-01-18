/* eslint-disable max-len */
import { useNavigate } from 'react-router-dom'
import { useMutation } from '@tanstack/react-query'
import {
  Formik, Form, Field, ErrorMessage,
} from 'formik'
import { SignInFormValidationSchema } from '../../validator'
import '../../index.css'

function SignIn() {
  const initialValues = {
    email: '',
    password: '',
  }

  const navigate = useNavigate()

  const { mutateAsync, isLoading } = useMutation({
    mutationFn: (data) => fetch('https://api.react-learning.ru/signin', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(data),
    }),
  })

  const handleSubmit = async (values) => {
    await mutateAsync(values)
    navigate('/products')
  }

  return (
    <div className="container d-flex flex-column align-items-center">
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
    </div>
  )
}

export default SignIn
