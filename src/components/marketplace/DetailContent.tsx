export const DetailContent = ({ description }: { description: string }) => {
  return (
    <div className="mt-8 flex w-full flex-col gap-8 break-words">
      <p>{description}</p>
    </div>
  );
};
