import axios from 'axios'
import { ChangeEvent, FormEvent, useState } from 'react'
import usePrivateAxios from 'src/hooks/usePrivateAxios'
import { useAppSelector } from 'src/store/hooks'
import { authState } from 'src/store/slices/authSlice'

const RegisterPostPage = () => {
  const [content, setContent] = useState<string>('')
  const privateAxios = usePrivateAxios()
  const submitPost = async (e: FormEvent) => {
    e.preventDefault()

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
  }

  const onChangeContent = (e: ChangeEvent<HTMLTextAreaElement>) => {
    if (!e.target.value) return
    setContent(e.target.value)
  }

  return (
    <div>
      <form onSubmit={submitPost} className='flex flex-col'>
        <label htmlFor='content'> </label>
        <textarea
          className='textarea textarea-info w-2/4 mb-6 h-40'
          onChange={onChangeContent}
          value={content}
          placeholder='포스트 작성해주세요'
        ></textarea>

        <button className='btn btn-info w-1/5' type='submit'>
          완료
        </button>
      </form>
    </div>
  )
}

export default RegisterPostPage
