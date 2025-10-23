export const CurrentPeople = ({
  currentMember,
  totalMember,
}: {
  currentMember: number;
  totalMember: number;
}) => {
  return (
    <div>
      <p>
        <span className="text-primary">
          {currentMember}&nbsp;/&nbsp;
          {totalMember}
        </span>
        &nbsp;명 모집중
      </p>
    </div>
  );
};
