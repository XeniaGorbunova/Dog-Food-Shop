/* eslint-disable max-len */
import { Link } from 'react-router-dom'
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
  return (
    <>
      <h1>Регистрация</h1>
      <Formik
        initialValues={initialValues}
        validationSchema={SignUpFormValidationSchema}
        onSubmit={(values) => console.log(values)}
      >
        <Form className="d-flex flex-column" style={{ width: '30%' }}>
          <Field className="mb-3 form-control" name="email" type="email" placeholder="email here" />
          <ErrorMessage component="p" className="error" name="email" />

          <Field className="mb-3 form-control" name="group" type="text" placeholder="sm9" />
          <ErrorMessage component="p" className="error" name="group" />

          <Field className="mb-3 form-control" name="password" type="password" placeholder="password here" />
          <ErrorMessage component="p" className="error" name="password" />

          <button type="submit" className="btn btn-primary">Зарегистрироваться</button>
        </Form>
      </Formik>
      <Link to="/signin" className="btn btn-primary">
        Войти
      </Link>
    </>
  )
}

export default SignUp
