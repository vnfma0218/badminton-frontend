import ReactDOM from 'react-dom';

interface ConfirmModalProps {
  description: string;
  title: string;
  children?: React.ReactNode;
}

const ConfirmModal = ({ title, description, children }: ConfirmModalProps) => {
  const selectedElement = document.getElementById('_modal');
  if (selectedElement === null) {
    //null에 대한 에러 처리를 할 수 있다.
    return <div></div>;
  }
  return (
    <>
      {/* <label htmlFor='my-modal' className='btn modal-button'>
        open modal
      </label> */}
      {ReactDOM.createPortal(
        <>
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
        </>,
        selectedElement,
      )}
    </>
  );
};
export default ConfirmModal;
