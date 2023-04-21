import {ETypographyVarient} from '_enums/ui';

const sizeVarient = {
  sm: 'text-xs md:text-sm',
  md: 'text-base font-semibold',
  lg: 'text-base',
  xl: 'text-base',
  '2xl': 'text-base',
  h1: 'text-3xl',
  h2: 'text-2xl',
  h3: 'text-lg md:text-xl',
  h4: 'text-sm md:text-lg',
  h5: 'text-base',
  h6: 'text-xs md:text-sm',
};

interface IIconProps {
  className?: string;
  children: JSX.Element | string;
  varient?: ETypographyVarient;
}
const Typography = ({
  children,
  varient = ETypographyVarient.MD,
  className = '',
}: IIconProps) => {
  return (
    <p className={`text-neutral-700 ${sizeVarient[varient]} ${className}`}>
      {children}
    </p>
  );
};
export default Typography;
