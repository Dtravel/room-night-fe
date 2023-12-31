module.exports = {
  content: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        black: '#000',
        white: '#fff',
        'white-0': '#ffffff00',
        red: '#A32A2F',
        grey: '#6A6A6A',
        'black-40': '#404040',
        'black-1': '#111111',
        'black-50': '#1A1D1F',
        'black-100': '#272B30',
        'black-200': '#333',
        'black-300': '#0B2336',
        'black-400': '#32302D',
        'white-50': '#9D9D9D',
        'white-100': '#FFFDFD',
        'grey-50': '#E5E5E5',
        'grey-100': '#F2F2F2',
        'grey-200': '#CFCFCF',
        'grey-500': '#EFEFEF',
        'grey-600': '#DEDEDE',
        'grey-700': '#3D3D3D',

        // -------------NEW COLOR START-------------
        // red
        'red-1': '#FAEDEE',
        'red-2': '#EBDFE1',
        'red-3': '#E2CBCD',
        'red-4': '#D8A5A8',
        'red-5': '#C46569',
        'red-6': '#A32A30',
        'red-7': '#6F0F12',
        'red-8': '#39080A',
        'red-25': '#FFFAFA',
        'red-50': '#FCEFF0',
        'red-100': '#F9E8E9',
        'red-200': '#FED3D5',
        'red-300': '#F9B3B7',
        'red-400': '#F78086',
        'red-500': '#ED5960',
        'red-600': '#D84950',
        'red-700': '#A32A30',
        'red-800': '#6D2327',
        'red-900': '#2E1516',
        // sand
        sand: '#FAF9F9',
        'sand-1': '#FCFAFA',
        'sand-2': '#F9F7F7',
        'sand-3': '#EBE8E6',
        'sand-4': '#D1CDCB',
        'sand-5': '#AEA8A5',
        // 'sand-6': '#6F6B69',
        'sand-6': '#625F5C',
        'sand-7': '#32302D',
        'sand-8': '#171716',
        //sun
        sun: '#F8F3EB',
        'sun-1': '#FCF6EA',
        'sun-2': '#F8ECDA',
        'sun-3': '#EDD2A8',
        'sun-4': '#E6BB7B',
        'sun-5': '#D0A058',
        'sun-6': '#967320',
        'sun-7': '#8C6325',
        'sun-8': '#5F4013',
        'sun-25': '#FDFBF6',
        'sun-50': '#F9F4E7',
        'sun-100': '#FBF1DA',
        'sun-200': '#FDEDC6',
        'sun-300': '#FAE09F',
        'sun-400': '#F4CF7E',
        'sun-500': '#EEC15E',
        'sun-600': '#D7A433',
        'sun-700': '#986A00',
        'sun-800': '#8B6611',
        'sun-900': '#312A1B',
        //ocean
        ocean: '#3A7A92',
        'ocean-1': '#E8EFF1',
        'ocean-2': '#D4E4EA',
        'ocean-3': '#B8D5DF',
        'ocean-4': '#8EBBCB',
        'ocean-5': '#66A0B5',
        'ocean-6': '#3A7A92',
        'ocean-7': '#25586A',
        'ocean-8': '#113846',
        'ocean-25': '#F0FAFC',
        'ocean-50': '#E1F6F9',
        'ocean-100': '#D0EEF2',
        'ocean-200': '#C5E5E9',
        'ocean-300': '#A9DEE4',
        'ocean-400': '#7AD4DF',
        'ocean-500': '#51C1CF',
        'ocean-600': '#31A3B0',
        'ocean-700': '#257F8A',
        'ocean-800': '#1A555B',
        'ocean-900': '#1B3538',
        //forest
        forest: '#336148',
        'forest-1': '#EFF7F3',
        'forest-2': '#D1E6DB',
        'forest-3': '#B6DAC7',
        'forest-4': '#88BCA0',
        'forest-5': '#4B8666',
        'forest-6': '#327140',
        'forest-7': '#244835',
        'forest-8': '#0F291B',
        'forest-25': '#EDF8EC',
        'forest-50': '#EDF6EC',
        'forest-100': '#E5F4E4',
        'forest-200': '#B0E9AE',
        'forest-300': '#96DE93',
        'forest-400': '#75CF71',
        'forest-500': '#56B952',
        'forest-600': '#40993D',
        'forest-700': '#3F753C',
        'forest-800': '#2A5328',
        'forest-900': '#20311F',
        // Neutral
        'neutral-1': '#FBFAFA',
        'neutral-2': '#F6F5F5',
        'neutral-3': '#EBE9E9',
        'neutral-4': '#DDDBDB',
        'neutral-5': '#9C9896',
        'neutral-6': '#625F5C',
        'neutral-7': '#32302D',
        'neutral-8': '#171716',
        'neutral-25': '#FDFDFC',
        'neutral-50': '#FBFBF8',
        'neutral-100': '#F6F6F4',
        'neutral-200': '#F0F0EE',
        'neutral-300': '#E3E3DE',
        'neutral-400': '#CFCFCB',
        'neutral-500': '#8C8C88',
        'neutral-600': '#6A6A68',
        'neutral-700': '#50504E',
        'neutral-800': '#292926',
        'neutral-900': '#0F0F0E',

        // grayscale
        'grayscale-25': '#FBFBFB',
        'grayscale-50': '#F9F9F9',
        'grayscale-100': '#F6F6F4',
        'grayscale-200': '#F0F0EC',
        'grayscale-300': '#DEDED9',
        'grayscale-400': '#CFCFCB',
        'grayscale-500': '#8C8C88',
        'grayscale-600': '#6B6B6B',
        'grayscale-700': '#4E4E4E',
        'grayscale-800': '#2C2C2C',
        'grayscale-900': '#0F0F0F',
        // -------------NEW COLOR END-------------
        seafoam: '#D4EEE9',
      },
      lineClamp: {
        1: '1',
        2: '2',
        3: '3',
        4: '4',
        5: '5',
        6: '6',
        7: '7',
        8: '8',
        9: '9',
        10: '10',
      },
      scale: {
        110: '1.1',
      },
      content: {
        down: 'url("../assets/icons/ic_chevron_down.svg")',
      },
    },
    screens: {
      sm: '640px',
      // => @media (min-width: 640px) { ... }

      md: '768px',
      // => @media (min-width: 768px) { ... }

      lg: '1024px',
      // => @media (min-width: 1024px) { ... }

      xl: '1280px',
      // => @media (min-width: 1280px) { ... }

      xxl: '1536px',
      // => @media (min-width: 1536px) { ... }

      '2xl': '1536px',
      // => @media (min-width: 1536px) { ... }
    },
    fontFamily: {
      'maison-neue-light': ['Maison Neue Light'],
      'maison-neue': ['Maison Neue Regular'],
      'maison-neue-medium': ['Maison Neue Medium'],
      'maison-neue-demi': ['Maison Neue Demi'],
      'maison-neue-bold': ['Maison Neue Bold'],
      'editorial-new': ['Editorial New Regular'],
      'monument-extended': ['Monument Extended Regular'],
      'monument-extended-bold': ['Monument Extended Bold'],
      'pp-monument-extended-bold': ['PPMonument Extended Bold'],
      'inter-900': ['Inter Black'],
      'inter-800': ['Inter Bold'],
      'inter-700': ['Inter ExtraBold'],
      'inter-600': ['Inter SemiBold'],
      'inter-500': ['Inter Medium'],
      'inter-400': ['Inter Regular'],
      'inter-300': ['Inter Light'],
      'inter-200': ['Inter ExtraLight'],
      'inter-100': ['Inter Thin'],
    },
    fontSize: {
      '10-10': ['10px', '10px'],
      '10-12': ['10px', '12px'],
      '12-12': ['12px', '12px'],
      '12-14': ['12px', '14px'],
      '12-16': ['12px', '16px'],
      '14-14': ['14px', '14px'],
      '14-16': ['14px', '16px'],
      '14-18': ['14px', '18px'],
      '14-20': ['14px', '20px'],
      '14-22': ['14px', '22px'],
      '16-16': ['16px', '16px'],
      '16-18': ['16px', '18px'],
      '16-20': ['16px', '20px'],
      '16-22': ['16px', '22px'],
      '16-24': ['16px', '24px'],
      '16-28': ['16px', '28px'],
      '18-18': ['18px', '18px'],
      '18-24': ['18px', '24px'],
      '18-28': ['18px', '28px'],
      '18-32': ['18px', '32px'],
      '20-24': ['20px', '24px'],
      '20-28': ['20px', '28px'],
      '20-32': ['20px', '32px'],
      '22-28': ['22px', '28px'],
      '24-29': ['24px', '29px'],
      '24-30': ['24px', '30px'],
      '24-32': ['24px', '32px'],
      '24-36': ['24px', '36px'],
      '28-32': ['28px', '32px'],
      '28-36': ['28px', '36px'],
      '28-40': ['28px', '40px'],
      '32-32': ['32px', '32px'],
      '32-40': ['32px', '40px'],
      '40-40': ['40px', '40px'],
      '40-48': ['40px', '48px'],
      '48-48': ['48px', '48px'],
      '48-64': ['48px', '64px'],
      '56-64': ['56px', '64px'],
      '64-64': ['64px', '64px'],
      '64-76': ['64px', '76px'],
      '88-88': ['88px', '88px'],
      '240-290': ['240px', '290px'],
      '400-484': ['400px', '484px'],
    },
    backgroundSize: {
      auto: 'auto',
      cover: 'cover',
      contain: 'contain',
      '110%': '110%',
    },
  },
  plugins: [require('@tailwindcss/line-clamp')],
}
