import { css, DefaultTheme } from 'styled-components';

const palette = {
  // Primary
  mainColor: '#E81818',
  subColor: '#222222',
  blackColor: '#000000',
  redColor: '#F24E1E',
  fontColor: '#ffffff',
  fontSubColor: '#999999',
  error: '#EB5757',
  subError: '#FFBA52',
  blueColor: '#0969da',

  // Gray
  gray100: '#F1F1F4',
  gray300: '#D7D7D9',
  gray500: '#78787B',
  gray700: '#454547',
  gray800: '#202021',
} as const;

const fontSize = {
  small: '12px',
  medium: '14px',
  large: '16px',
  xLarge: '20px',
} as const;

const fontWeight = {
  regular: '400',
  medium: '500',
  bold: '700',
} as const;

const lineHeight = {
  small: '16px',
  medium: '20px',
  large: '24px',
  xLarge: '28px',
} as const;

const textStyle = {
  regular: {
    1216: css`
      font-size: ${fontSize.small};
      font-weight: ${fontWeight.regular};
      line-height: ${lineHeight.small};
    `,
    1420: css`
      font-size: ${fontSize.medium};
      font-weight: ${fontWeight.regular};
      line-height: ${lineHeight.medium};
    `,
    1624: css`
      font-size: ${fontSize.large};
      font-weight: ${fontWeight.regular};
      line-height: ${lineHeight.large};
    `,
  },
  medium: {
    1420: css`
      font-size: ${fontSize.medium};
      font-weight: ${fontWeight.medium};
      line-height: ${lineHeight.medium};
    `,
    1624: css`
      font-size: ${fontSize.large};
      font-weight: ${fontWeight.medium};
      line-height: ${lineHeight.large};
    `,
  },
  bold: {
    1420: css`
      font-size: ${fontSize.medium};
      font-weight: ${fontWeight.bold};
      line-height: ${lineHeight.medium};
    `,
    1624: css`
      font-size: ${fontSize.large};
      font-weight: ${fontWeight.bold};
      line-height: ${lineHeight.large};
    `,
    2028: css`
      font-size: ${fontSize.xLarge};
      font-weight: ${fontWeight.bold};
      line-height: ${lineHeight.xLarge};
    `,
  },
} as const;

export type PaletteTypes = typeof palette;
export type PaletteKeyTypes = keyof typeof palette;
export type TextStyleTypes = typeof textStyle;
export type FontSizeTypes = typeof fontSize;
export type FontWeightTypes = typeof fontWeight;
export type LineHeightTypes = typeof lineHeight;

const theme: DefaultTheme = {
  palette,
  textStyle,
  fontSize,
  fontWeight,
  lineHeight,
};

export default theme;
