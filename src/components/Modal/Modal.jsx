/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable react/function-component-definition */
/* eslint-disable no-unused-vars */
import { keyboard } from '@testing-library/user-event/dist/keyboard'
import { useEffect } from 'react'
import { createPortal } from 'react-dom'
import styles from './Modal.module.css'

const ModalInner = ({ closeHandler, children }) => {
  const closeModalByEscape = (e) => {
    if (e.key === 'Escape') closeHandler()
  }
  useEffect(() => {
    document.addEventListener('keydown', closeModalByEscape)
    return () => {
      document.removeEventListener('keydown', closeModalByEscape)
    }
  }, [])

  return (
    <div className={styles.modalInner}>
      {children}
    </div>
  )
}

const Modal = ({ isOpen, closeHandler, children }) => {
  if (!isOpen) return null

  const closeModalByClickHandler = (e) => {
    if (e.target === e.currentTarget) closeHandler()
  }

  return createPortal(
    <div onClick={closeModalByClickHandler} className={styles.modalWr}>
      <ModalInner closeHandler={closeHandler}>
        {children}
      </ModalInner>
    </div>,
    document.getElementById('modal-root'),
  )
}
export default Modal
