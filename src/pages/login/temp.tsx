const Temp = () => {
  return (
    <div className='w-full h-full m-auto border p-3 bg-gray-100 flex justify-center items-center'>
      <form className='max-w-sm p-8 bg-white rounded-3xl'>
        <h1 className='text-2xl text-center font-bold mb-14'>회원가입</h1>
        <input type='text' placeholder='email' className='input input-primary w-full mb-4' />
        <input type='password' placeholder='password' className='input input-primary w-full' />

        <button type='submit' className='btn btn-primary w-full mt-11'>
          로그인
        </button>
      </form>
    </div>
  )
}
export default Temp
