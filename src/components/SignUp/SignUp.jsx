/* eslint-disable max-len */
import { useNavigate } from 'react-router-dom'
import { useMutation } from '@tanstack/react-query'
import {
  Formik, Form, Field, ErrorMessage,
} from 'formik'
import { SignUpFormValidationSchema } from '../../validator'
import '../../index.css'

function SignUp() {
  const initialValues = {
    email: '',
    group: 'sm9',
    password: '',
  }

  const navigate = useNavigate()

  const { mutateAsync, isLoading } = useMutation({
    mutationFn: (data) => fetch('https://api.react-learning.ru/signup', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(data),
    }),
  })

  const handleSubmit = async (values) => {
    await mutateAsync(values)
    navigate('/signin')
  }

  return (
    <>
      <h1>Регистрация</h1>
      <Formik
        initialValues={initialValues}
        validationSchema={SignUpFormValidationSchema}
        onSubmit={(values) => handleSubmit(values)}
      >
        <Form className="d-flex flex-column" style={{ width: '30%' }}>
          <Field className="mb-3 form-control" name="email" type="email" placeholder="email here" />
          <ErrorMessage component="p" className="error" name="email" />

          <Field className="mb-3 form-control" name="group" type="text" placeholder="sm9" />
          <ErrorMessage component="p" className="error" name="group" />

          <Field className="mb-3 form-control" name="password" type="password" placeholder="password here" />
          <ErrorMessage component="p" className="error" name="password" />

          <button type="submit" disabled={isLoading} className="btn btn-primary">Зарегистрироваться</button>
        </Form>
      </Formik>
    </>
  )
}

export default SignUp
