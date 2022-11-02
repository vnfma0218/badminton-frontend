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
    // <div className='toast toast-top toast-center'>
    //   <div className={`alert alert-${'primary'} bg-primary `}>
    //     <div>
    //       <span>{message}</span>
    //     </div>
    //   </div>
    // </div>
    <div className='toast toast-top toast-end mt-24'>
      <div className='alert alert-success'>
        <div>
          <span>{message}</span>
        </div>
      </div>
    </div>
  );
};
export default ToastModal;
