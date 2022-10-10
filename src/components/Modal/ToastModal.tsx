import { useAppDispatch, useAppSelector } from '@/store/hooks'
import { alertState, removeAlert } from '@/store/slices/AlertSlice'
import { useEffect } from 'react'

const ToastModal = () => {
  const dispatch = useAppDispatch()
  const { show, message, duration, type } = useAppSelector(alertState)

  console.log(show, message, duration, type)
  useEffect(() => {
    setTimeout(() => {
      dispatch(removeAlert())
    }, duration)

    return () => {}
  }, [])

  return (
    <div className={`${show ? '' : 'hidden'} toast absolute left-1/2`}>
      <div className={`alert alert-${type}`}>
        <div>
          <span>{message}</span>
        </div>
      </div>
    </div>
  )
}
export default ToastModal
