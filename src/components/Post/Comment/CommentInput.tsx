import { Dispatch, SetStateAction } from 'react';

interface CommentInputProps {
  nickname: string;
  addComment: string;
  onCommentFocus: () => void;
  setAddComment: Dispatch<SetStateAction<string>>;
}
const CommentInput = ({
  nickname,
  addComment,
  onCommentFocus,
  setAddComment,
}: CommentInputProps) => {
  return (
    <div className='flex'>
      <div className='w-16 h-14 border border-primary rounded-full flex items-center justify-center'>
        <p className='text-base linehei'>{nickname}</p>
      </div>
      <input
        type='text'
        className='border-b-2 border-slate-400 focus:outline-0  w-full focus:border-slate-700 ml-3'
        placeholder='댓글 추가...'
        value={addComment}
        onFocus={onCommentFocus}
        onChange={(e) => {
          setAddComment(e.target.value);
        }}
      />
    </div>
  );
};
export default CommentInput;
