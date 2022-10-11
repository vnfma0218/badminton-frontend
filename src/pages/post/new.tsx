import ToastModal from '@/components/Modal/ToastModal'
import { alertState, updateAlertState } from '@/store/slices/AlertSlice'
import { ChangeEvent, FormEvent, useState } from 'react'
import usePrivateAxios from 'src/hooks/usePrivateAxios'
import { useAppDispatch, useAppSelector } from 'src/store/hooks'

const RegisterPostPage = () => {
  const { show } = useAppSelector(alertState)

  const dispatch = useAppDispatch()
  const [content, setContent] = useState<string>('')
  const [showPopup, setShowPopup] = useState<boolean>(false)
  const privateAxios = usePrivateAxios()
  const submitPost = async (e: FormEvent) => {
    e.preventDefault()

    try {
      const res = await privateAxios({
        url: '/post/register',
        method: 'post',
        data: {
          content,
        },
      })
      if (res.data.message === '0000') {
        setContent('')
      }
      console.log(res.data)
    } catch (err) {
      console.log(err)
      dispatch(updateAlertState({ show: true, message: '로그인이 필요합니다', type: 'info' }))
    }
  }

  const onChangeContent = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value)
  }

  return (
    <div className='flex justify-center mt-7'>
      <form onSubmit={submitPost} className='flex flex-col w-1/2'>
        <label htmlFor='content'> </label>
        <textarea
          className='textarea textarea-primary w-full mb-6 h-40'
          onChange={onChangeContent}
          value={content}
          placeholder='포스트 작성해주세요'
        ></textarea>
        <button type='submit' className='btn btn-primary w-full mt-11'>
          글쓰기
        </button>
      </form>
    </div>
  )
}

export default RegisterPostPage
