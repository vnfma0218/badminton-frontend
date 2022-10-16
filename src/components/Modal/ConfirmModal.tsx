import { useAppSelector } from '@/store/hooks';
import { modalState } from '@/store/slices/ModalSlice';

interface ConfirmModalProps {
  description: string;
  title: string;
  children?: React.ReactNode;
}

const ConfirmModal = ({ title, description, children }: ConfirmModalProps) => {
  const {
    confirmModal: { show },
  } = useAppSelector(modalState);

  return (
    <>
      {/* <label htmlFor='my-modal' className='btn modal-button'>
        open modal
      </label> */}

      <input type='checkbox' id='my-modal' className='modal-toggle' />
      <div className='modal'>
        <div className='modal-box'>
          <h3 className='font-bold text-lg'>{title}</h3>
          <p className='py-4'>{description}</p>
          <div className='modal-action'>
            <label htmlFor='my-modal' className='btn'>
              취소
            </label>
            {children}
          </div>
        </div>
      </div>
    </>
  );
};
export default ConfirmModal;
