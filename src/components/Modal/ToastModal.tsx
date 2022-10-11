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
    <div className='absolute left-1/3 bottom-7'>
      <div className={`alert alert-${'primary'} bg-primary`}>
        <div>
          <span>{message}</span>
        </div>
      </div>
    </div>
  )
}
export default ToastModal
