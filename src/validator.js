import * as Yup from 'yup'

export const SignUpFormValidationSchema = Yup.object({
  email: Yup.string()
    .email('Неверный адрес')
    .required('Поле обязательно'),
  group: Yup.string()
    .max(3, 'Не более 3 символов')
    .required('Поле обязательно'),
  password: Yup.string()
    .min(6, 'Пароль должен содержать не менее 6 символов')
    .max(12, 'Пароль должен содержать не более 12 символов')
    .required('Поле обязательно'),
})

export const SignInFormValidationSchema = Yup.object({
  email: Yup.string()
    .email('Неверный адрес')
    .required('Поле обязательно'),
  password: Yup.string()
    .min(6, 'Пароль должен содержать не менее 6 символов')
    .max(12, 'Пароль должен содержать не более 12 символов')
    .required('Поле обязательно'),
})

export const UserEditValidationSchema = Yup.object({
  name: Yup.string()
    .required('Поле обязательно'),
  about: Yup.string()
    .required('Поле обязательно'),
})

// eslint-disable-next-line max-len

export const UserEditAvatarValidationSchema = Yup.object({
  avatar: Yup.string()
    .required('Поле обязательно'),
})

export const ProductValidationSchema = Yup.object({
  available: Yup.boolean(),
  pictures: Yup.string()
    .required('Поле обязательно'),
  name: Yup.string()
    .required('Поле обязательно'),
  price: Yup.number()
    .required('Поле обязательно'),
  discount: Yup.number()
    .required('Поле обязательно'),
  stock: Yup.number()
    .required('Поле обязательно'),
  wight: Yup.string()
    .required('Поле обязательно'),
  description: Yup.string()
    .required('Поле обязательно'),

})

export const CommentFormValidationSchema = Yup.object({
  text: Yup.string()
    .required('Поле обязательно'),
  rating: Yup.number()
    .required('Поле обязательно'),
})
