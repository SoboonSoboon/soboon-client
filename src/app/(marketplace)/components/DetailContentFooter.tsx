export const DetailContentFooter = ({ createdAt }: { createdAt: string }) => {
  // 추후 타임스탬프 형식 변경 필요
  console.log(createdAt);

  return (
    <div className="text-text-sub2 mt-8 flex justify-end gap-4">
      <p>1시간 전</p>
      <p>조회 4,938</p>
    </div>
  );
};
