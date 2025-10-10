import { Button, Logo, ProfileImg } from '../../Atoms';

type User = {
  name: string;
  image: string;
};

export interface HeaderProps {
  user?: User;
  onLogin?: () => void;
  // onLogout?: () => void;
  onCreateAccount?: () => void;
  onCreateGather?: () => void;
}

export const Header = ({
  user,
  onLogin,
  // onLogout,
  onCreateAccount,
  onCreateGather,
}: HeaderProps) => (
  <header className="border-gray-10 h-15 border-b bg-white dark:bg-black">
    <div className="text-text-main mx-auto flex h-full max-w-[1344px] items-center justify-between bg-white px-12 dark:bg-black dark:text-white">
      <div className="flex items-center gap-6">
        <Logo width={75} height={28} />
        <nav className="flex items-center gap-6 text-base font-normal">
          <a href="#" className="font-memomentKkukkkuk hover:text-primary whitespace-nowrap">
            함께 장보기
          </a>
          <a href="#" className="font-memomentKkukkkuk hover:text-primary whitespace-nowrap">
            함께 소분하기
          </a>
        </nav>
      </div>
      <div className="flex items-center gap-5">
        {user ? (
          <>
            <span className="flex items-center gap-[10px]">
              <div className="h-10 w-10 overflow-hidden rounded-full">
                <ProfileImg profile={user.image} />
              </div>
              <b className="text-text-main hidden text-base font-semibold md:block dark:text-white">
                {user.name}
              </b>
            </span>
            <Button primary size="small" onClick={onCreateGather} label="모임 만들기" />
            {/* <Button size="small" onClick={onLogout} label="로그아웃" /> */}
          </>
        ) : (
          <>
            <Button size="small" onClick={onLogin} label="로그인" />
            <Button primary size="small" onClick={onCreateAccount} label="회원가입" />
          </>
        )}
      </div>
    </div>
  </header>
);
