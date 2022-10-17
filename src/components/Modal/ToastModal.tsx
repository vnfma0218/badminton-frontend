import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { alertState, removeAlert } from '@/store/slices/AlertSlice';
import { useEffect } from 'react';

const ToastModal = () => {
  const dispatch = useAppDispatch();
  const { message, duration } = useAppSelector(alertState);

  useEffect(() => {
    setTimeout(() => {
      dispatch(removeAlert());
    }, duration);
  }, []);

  return (
    <div className='toast toast-center toast-bottom w-52 mb-40 '>
      <div className={`alert alert-${'primary'} bg-primary w-full`}>
        <div>
          <div>{message}</div>
        </div>
      </div>
    </div>
  );
};
export default ToastModal;
