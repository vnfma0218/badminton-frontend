import { useAppDispatch, useAppSelector } from '@/store/hooks'
import { alertState, removeAlert } from '@/store/slices/AlertSlice'
import { useEffect } from 'react'

const ToastModal = () => {
  const dispatch = useAppDispatch()
  const { message, duration } = useAppSelector(alertState)

  useEffect(() => {
    setTimeout(() => {
      dispatch(removeAlert())
    }, duration)
  }, [])

  return (
    <div className='toast'>
      <div className={`alert alert-${'primary'}`}>
        <div>
          <span>{message}</span>
        </div>
      </div>
    </div>
  )
}
export default ToastModal
