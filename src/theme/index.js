import { extendTheme } from 'native-base';
/* import { useFonts } from 'expo-font'; */

// eslint-disable-next-line no-undef
export default customTheme = extendTheme({
  /*fontConfig: {
        OmedBrush: {
            100: {
                normal: "OmedBrush-Regular"
            }
        }
    },
    fonts: {
        heading: "OmedBrush",
        body: "OmedBrush",
        mono: "OmedBrush"
    }, */
  colors: {
    black: {
      100: '#C4C4C4',
      200: '#7C7C7C',
      300: '#292929',
      800: '#181725',
    },
    green: {
      300: '#53B175',
    },
    primary: {
      50: '#E3F2F9',
      100: '#C5E4F3',
      200: '#A2D4EC',
      300: '#7AC1E4',
      400: '#47A9DA',
      500: '#0088CC',
      600: '#007AB8',
      700: '#006BA1',
      800: '#005885',
      900: '#003F5E',
    },
    // Redefining only one shade, rest of the color will remain same.
    amber: {
      400: '#d97706',
    },
  },
  components: {
    /* Button: {
        // Can simply pass default props to change default behaviour of components.
        baseStyle: {
          rounded: 'md',
        },
        defaultProps: {
          colorScheme: 'red',
        },
      }, */
    Divider: {
      baseStyle: ({ colorMode }) => {
        return {
          backgroundColor: colorMode === 'dark' ? 'black.100' : 'black.200',
        };
      },
    },
    Heading: {
      baseStyle: ({ colorMode }) => {
        return {
          color: colorMode === 'dark' ? 'black.100' : 'primary.500',
        };
      },
      defaultProps: {
        size: 'xl',
        fontFamily: 'Arial',
      },
    },
    Text: {
      baseStyle: ({ colorMode }) => {
        return {
          color: colorMode === 'dark' ? 'black.100' : 'black.300',
        };
      },
      defaultProps: {
        size: 'md',
        /* fontFamily: 'Times New Roman', */
      },
      sizes: {
        xl: {
          fontSize: '64px',
        },
        lg: {
          fontSize: '32px',
        },
        md: {
          fontSize: '16px',
        },
        sm: {
          fontSize: '12px',
        },
      },
    },
  },
});
