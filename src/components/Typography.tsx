import React from 'react';

type TypographyBaseProps = {
  as?: 'a' | 'p' | 'span';
  text?: string;
  children?: React.ReactNode;
  variant?: 'heading' | 'subheading' | 'body' | 'caption';
  weight?: 'light' | 'normal' | 'medium' | 'semibold' | 'bold';
  textColor?: 'gary' | 'default' | 'light' | 'lighter' | 'white';
  className?: string;
  href?: string;
  target?: '_blank' | '_self' | '_parent' | '_top';
  rel?: 'noopener' | 'noreferrer' | 'nofollow' | 'external';
} & React.HTMLAttributes<HTMLElement>;

export const Typography = ({
  as = 'p',
  text,
  children,
  variant = 'body',
  weight = 'normal',
  className = '',
  textColor = 'default',
  ...rest
}: TypographyBaseProps) => {
  const Component = as;

  const baseClasses = {
    heading: 'text-2xl md:text-3xl',
    subheading: 'text-xl',
    body: 'text-base',
    caption: 'text-sm',
  };

  const weightClasses = {
    light: 'font-light',
    normal: 'font-normal',
    medium: 'font-medium',
    semibold: 'font-semibold',
    bold: 'font-bold',
  };

  const textColorClasses = {
    gary: '#808080',
    light: '#F5F5F7',
    lighter: '#D2D2D7',
    white: '#FFFFFF',
    default: '#121212',
    // Add more colors as needed
  };

  const classes = `${baseClasses[variant]} ${weightClasses[weight]} ${textColorClasses[textColor]} ${className}`;
  return (
    <Component className={classes} {...rest}>
      {text || children}
    </Component>
  );
};
