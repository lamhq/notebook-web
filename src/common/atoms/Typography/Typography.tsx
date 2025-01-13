import MuiTypography, { type TypographyProps } from '@mui/material/Typography';

export default function Typography({ sx, variant, ...rest }: TypographyProps) {
  let customSx = sx;
  variant = variant ?? 'body1';

  switch (variant) {
    case 'h1':
      customSx = {
        ...customSx,
        fontSize: '1.3125rem',
        fontWeight: 'bold',
      };
      break;

    case 'h2':
      customSx = {
        ...customSx,
        fontSize: '1.375rem',
        marginBottom: '1.5625rem',
        fontWeight: 'bold',
      };
      break;

    case 'h3':
      customSx = {
        ...customSx,
        fontSize: '1.25rem',
      };
      break;

    case 'h4':
      customSx = {
        ...customSx,
        fontSize: '1.0625rem',
        fontWeight: 'bold',
      };
      break;

    case 'body2':
      customSx = {
        ...customSx,
        fontSize: '0.75rem',
      };
      break;

    case 'body1':
      customSx = {
        ...customSx,
        fontSize: '1rem',
        marginBottom: '1rem',
      };
      break;

    default:
      break;
  }
  return <MuiTypography variant={variant} sx={customSx} {...rest} />;
}
