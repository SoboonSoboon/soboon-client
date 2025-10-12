import { TextInput } from '@/components';
import { Button } from '@/components';

export const CommentInputContainer = () => {
  return (
    <div className="mb-6 flex gap-3">
      <TextInput placeholder="댓글을 입력해주세요." />
      <Button
        label="작성"
        className="border-primary text-primary w-20 shrink-0"
      />
    </div>
  );
};
