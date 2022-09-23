export const palette = {
  // Primary
  mainColor: '#091E3B',
  // subColor: '#222222',
  // blackColor: '#000000',
  // redColor: '#F24E1E',
  // fontColor: '#ffffff',
  // fontSubColor: '#999999',
  error: '#EB5757',
  // subError: '#FFBA52',
  // blueColor: '#0969da',

  // Gray
  gray100: '#F1F1F4',
  gray300: '#D7D7D9',
  gray500: '#78787B',
  gray700: '#454547',
  gray800: '#202021',
} as const;

export type PaletteTypes = typeof palette;
export type PaletteKeyTypes = keyof typeof palette;
