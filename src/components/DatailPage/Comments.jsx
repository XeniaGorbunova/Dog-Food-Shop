/* eslint-disable max-len */
/* eslint-disable no-param-reassign */
/* eslint-disable react/no-array-index-key */
// import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import dayjs from 'dayjs'
import { useMutation, useQuery } from '@tanstack/react-query'
import {
  Formik, Form, Field, ErrorMessage,
} from 'formik'
import { useSelector } from 'react-redux'
import { CommentFormValidationSchema } from '../../validator'
import '../../index.css'
import { DogFoodApiConst } from '../../api/DogFoodapi'
import Loader from '../Loader/Loader'
import { getQueryCommentsKey } from '../Products/utils'
import './DetailPage.css'
import { getTokenSelector } from '../../redux/slices/userSlice'

function StarRating() {
  const [rating, setRating] = useState(0)
  const [hover, setHover] = useState(0)
  return (
    <div className="star-rating mb-2">
      {[...Array(5)].map((star, index) => {
        index += 1
        return (
          <button
            type="button"
            key={index}
            className={index <= (hover || rating) ? 'button__star on' : 'button__star off'}
            onClick={() => setRating(index)}
            onMouseEnter={() => setHover(index)}
            onMouseLeave={() => setHover(rating)}
          >
            <span className="star">&#9733;</span>
          </button>
        )
      })}
    </div>
  )
}

function Comments({ id, reloadKey, setReloadKey }) {
  const userToken = useSelector(getTokenSelector)
  const initialValues = {
    comment: '',
  }
  const {
    data, isLoading, isError, error,
  } = useQuery({
    queryKey: getQueryCommentsKey(reloadKey),
    queryFn: () => DogFoodApiConst.getComments(id, userToken),
    enabled: !!(userToken),
  })
  console.log({ comments: data })

  const {
    mutateAsync, isLoading: isEditLoading, isError: isEditError, error: errorEdit,
  } = useMutation({
    mutationFn: (comment) => DogFoodApiConst.addComment(id, comment),
  })

  const handleSubmit = async (values) => {
    await mutateAsync(id, values)
    setReloadKey(reloadKey + 1)
  }
  if (isLoading || isEditLoading) return <Loader />
  if (isError) return <p>{`${error} `}</p>
  if (isEditError) return <p>{`${errorEdit} `}</p>

  return (
    <div className="d-flex flex-column" style={{ width: '70%', paddingBottom: '90px' }}>
      <h5>Отзывы</h5>
      <Formik
        initialValues={initialValues}
        validationSchema={CommentFormValidationSchema}
        onSubmit={(values) => handleSubmit(values)}
      >
        <Form className="d-flex flex-column">
          <Field
            className="mb-3 form-control"
            name="comment"
            type="text"
            placeholder="Оставьте свой отзыв"
          />
          <ErrorMessage component="p" className="error" name="comment" />
          <div className="d-flex flex-row justify-content-between">
            <StarRating />
            <button type="submit" disabled={isLoading} className="btn btn-primary">
              Сохранить
            </button>
          </div>
        </Form>
      </Formik>
      {data.map((item) => (
        <div className="comment mt-4 text-justify float-left">
          <div className="d-flex flex-row gap-3 mb-1">
            <img src={item.author.avatar} alt="" className="rounded-circle" width="40" height="40" />
            <h4>{item.author.name}</h4>
          </div>
          <small>{dayjs(item.created_at).format('YYYY-MM-DD HH:mm:ss')}</small>
          <br />
          <p>{item.text}</p>
        </div>
      ))}
    </div>
  )
}

export default Comments
