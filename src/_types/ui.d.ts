export type TSizeTypes = {
  sm: string;
  md: string;
  lg: string;
  xl?: string;
  ['2xl']?: string;
};

export type TColorTypes = {
  primary: string;
  error?: string;
  warning?: string;
  success?: string;
};

export type TBreadCrumb = {
  title: string;
  url: string;
  active?: boolean;
};
