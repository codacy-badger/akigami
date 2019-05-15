import {
  withOpacity,
  darken,
  lighten,
  transition,
} from './mixins';

export default {
  fontFamily: '\'Futura PT\'',
  shadow: '0 3px 16px -4px rgba(0, 0, 0, 0.25)',
  borderRadius: '6px',
  borderRadiusCircle: '100vw',
  breakpoints: ['768px', '992px', '1280px', '1490px'],
  containers: ['680px', '890px', '940px', '1150px'],
  colors: {
    sidenav: '#ffffff',
    brand: '#d54343',
    // background: '#fafafb',
    background: '#EFEAEA',
    primary: '#0b78ff',
    success: '#3ed485',
    warning: '#f5ad45',
    danger: '#fd5b77',
    info: '#a63ed4',
    default: '#2f333a',
    white: '#ffffff',
    gray: '#7f8fa4',
    border: '#d5dfe7',
  },
  mixins: {
    withOpacity,
    darken,
    lighten,
    transition,
  },
};
