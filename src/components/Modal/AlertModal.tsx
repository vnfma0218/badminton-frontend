interface AlertModalProps {
  title: String;
  confirmCbFn: () => void;
}

const AlertModal = ({ title, confirmCbFn }: AlertModalProps) => {
  return (
    <>
      <input type='checkbox' id='alert-modal' className='modal-toggle' />
      <div className='modal'>
        <div className='modal-box'>
          <h3 className='font-bold text-lg mr-3'>{title}</h3>

          <div className='modal-action'>
            <label htmlFor='alert-modal' className='btn'>
              취소
            </label>
            <label htmlFor='alert-modal' className='btn' onClick={confirmCbFn}>
              확인
            </label>
          </div>
        </div>
      </div>
    </>
  );
};
export default AlertModal;
