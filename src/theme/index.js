import { extendTheme } from 'native-base';

// eslint-disable-next-line no-undef
export default customTheme = extendTheme({
  colors: {
    primary: {
      100: '#FCF5EA',
    },
    secondary: {
      100: '#891D47',
    },
    // Redefining only one shade, rest of the color will remain same.
    amber: {
      400: '#d97706',
    },
    gray: {
      100: 'gray',
    },
  },
  components: {
    Button: {
      baseStyle: ({ colorMode }) => {
        return {
          bg: colorMode === 'dark' ? '#FCF5EA' : '#515050',
        };
      },
    },

    // helle farbe '#FCF5EA'
    // dunkle farbe '#515050'
    View: {
      baseStyle: ({ colorMode }) => {
        return {
          backgroundColor: colorMode === 'dark' ? '#515050' : '#FCF5EA',
        };
      },
      defaultProps: {
        paddingTop: '10%',
        minHeight: '100%',
      },
    },
    Input: {
      baseStyle: ({ colorMode }) => {
        return {
          backgroundColor: colorMode === 'dark' ? '#FCF5EA' : '#891D4710',
        };
      },
      defaultProps: {
        color: 'black',
      },
    },
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
        paddingLeft: 5,
      },
    },
    Text: {
      baseStyle: ({ colorMode }) => {
        return {
          color: colorMode === 'dark' ? '#FCF5EA' : '#515050',
        };
      },
      defaultProps: {
        size: 'md',
        /* paddingLeft: 5, */
        /* fontFamily: 'Times New Roman', */
      },
      sizes: {
        xl: {
          fontSize: '64px',
        },
        lg: {
          fontSize: '24px',
        },
        md: {
          fontSize: '18px',
        },
        sm: {
          fontSize: '12px',
        },
      },
    },
  },
});
