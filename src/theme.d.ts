import 'styled-components';
import { PaletteOptions } from '@mui/material/styles';

declare module '@mui/material/styles' {
  interface Palette {
    link: {
      default: string;
      hover: string;
    };
    category: string;
    creator: string;
    pubDate: string;
    syllabusText: string;
  }

  interface PaletteOptions {
    link?: {
      default: string;
      hover: string;
    };
    category?: string;
    creator?: string;
    pubDate?: string;
    syllabusText?: string;
  }
}

declare module 'styled-components' {
  export interface DefaultTheme extends Theme {}
}
