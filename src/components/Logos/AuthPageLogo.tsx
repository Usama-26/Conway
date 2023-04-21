import Image from 'next/image';
import Link from 'next/link';

interface IAuthPageLogoProps {
  className?: string;
}

const AuthPageLogo = ({className}: IAuthPageLogoProps) => {
  return (
    <div className={className || 'mb-16'}>
      <Link href={'/'}>
        <Image
          src={'/images/logo.png'}
          height={103}
          width={252}
          alt={'Conway Machines Logo'}
          className={'mx-auto mb-8'}
        />
      </Link>
    </div>
  );
};
export default AuthPageLogo;
