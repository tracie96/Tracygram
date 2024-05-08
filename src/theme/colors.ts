export type Props = {
  readonly white: string;
  readonly black: string;
  readonly inputBackground: string;
  readonly placeHolderColor: string;
  readonly btnBackground: string;
  readonly boldTextColor: string;
  readonly lightTextColor: string;
  readonly orange: string;
  readonly red: string;
  readonly green: string;
  readonly label: string;
  readonly inputText: string;
  readonly btnColor: string;
  readonly primary: string;
  readonly redTint: string;
  readonly secondary: string;
  readonly gray100: string;
  readonly gray200: string;
  readonly gray300: string;
  readonly gray400: string;
  readonly textBold: string;
  readonly textLight: string;
  readonly borderColor: string;
  readonly redLight: string;
};

export const colors: Props = {
  white: 'white',
  black: 'black',
  inputBackground: '#F0F5F9',
  placeHolderColor: '#8C8CA1',
  btnBackground: '#413F46',
  boldTextColor: '#0E0E2C',
  lightTextColor: '#4A4A68',
  redTint: '#FCEAEA',
  orange: '#FFC300',
  red: '#DD2C2C',
  redLight: 'rgba(234,7,34,0.11)',
  green: '#37BB30',
  inputText: '#8C8CA1',
  label: '#0E0E2C',
  btnColor: 'white',
  primary: '#EF6924',
  secondary: '#413F46',
  textBold: '#0E0E2C',
  textLight: '#4A4A68',
  gray100: '#868C98',
  gray200: '#525866',
  gray300: '#0A0D14',
  gray400: '#525866',
  borderColor: '#E2E4E9'
};

// https://colors.artyclick.com/color-name-finder/
// const isDarkMode = useColorScheme() === 'dark';
