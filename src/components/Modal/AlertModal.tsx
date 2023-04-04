import { useEffect, useRef } from 'react';

interface AlertModalProps {
  show: boolean;
  title: string;
  confirmCbFn?: () => void;
}

const AlertModal = ({ show, title, confirmCbFn }: AlertModalProps) => {
  const modalRef = useRef(null);

  useEffect(() => {
    if (show) {
      (modalRef.current as any).click();
    }
  }, [show]);

  return (
    <>
      <label htmlFor='alert-modal' className='btn hidden' ref={modalRef}>
        open modal
      </label>

      <input type='checkbox' id='alert-modal' className='modal-toggle' />
      <div className='modal'>
        <div className='modal-box'>
          <h3 className='font-bold text-lg mr-3'>{title}</h3>

          <div className='modal-action'>
            <label htmlFor='alert-modal' className='btn'>
              취소
            </label>
            <label
              htmlFor='alert-modal'
              className='btn'
              onClick={() => {
                confirmCbFn && confirmCbFn();
              }}
            >
              확인
            </label>
          </div>
        </div>
      </div>
    </>
  );
};
export default AlertModal;
