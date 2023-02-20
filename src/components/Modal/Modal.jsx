/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable react/function-component-definition */
/* eslint-disable no-unused-vars */
import { keyboard } from '@testing-library/user-event/dist/keyboard'
import { useEffect } from 'react'
import { createPortal } from 'react-dom'
import { motion, AnimatePresence } from 'framer-motion'
import styles from './Modal.module.css'

const modalWrVariants = {
  hidden: {
    opacity: 0,
    transition: {
      when: 'afterChildren',
    },
  },
  visable: {
    opacity: 1,
    transition: {
      when: 'beforeChildren',
    },
  },
}

const modalContentVariants = {
  hidden: {
    opacity: 0,
    y: 100,
  },
  visable: {
    opacity: 1,
    y: 0,
  },
}

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
    <motion.div
      className={styles.modalInner}
      variants={modalContentVariants}
      data-label="notNavigate"
    >
      {children}
    </motion.div>
  )
}

const Modal = ({ isOpen, closeHandler, children }) => {
  const renderContent = () => {
    if (!isOpen) return null
    const closeModalByClickHandler = (e) => {
      if (e.target === e.currentTarget) closeHandler()
    }

    return (
      <motion.div
        variants={modalWrVariants}
        initial="hidden"
        animate="visable"
        exit="hidden"
        onClick={closeModalByClickHandler}
        className={styles.modalWr}
        data-label="notNavigate"
      >
        <ModalInner closeHandler={closeHandler}>{children}</ModalInner>
      </motion.div>
    )
  }

  return createPortal(
    <AnimatePresence>{renderContent()}</AnimatePresence>,
    document.getElementById('modal-root'),
  )
}
export default Modal
