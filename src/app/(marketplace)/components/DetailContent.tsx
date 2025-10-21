export const DetailContent = ({ description }: { description: string }) => {
  return (
    <div className="mt-8 flex w-full flex-col gap-8 break-words">
      <p>{description}</p>
      {/* URL을 넣을지 말지 의논 후 수정 필요 */}
      <p className="text-primary">
        https://smartstore.naver.com/janginthe_online/products/11012723669?nl-query=%EC%9E%A5%EC%9D%B8%EC%95%BD%EA%B3%BC&nl-ts-pid=jMiS%2FlqVOZCssjJLKCZssssssQG-233744&NaPm=ct%3Dmghyd01c%7Cci%3D8242da10d139a51c280c128cfd3ddccd5411ee10%7Ctr%3Dsls%7Csn%3D11727604%7Chk%3Da7d4233b647d639717afc568890db6abff366d13
      </p>
    </div>
  );
};
