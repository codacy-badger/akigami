import {
  withOpacity,
  darken,
  lighten,
  transition,
} from './mixins';

export default {
  fontFamily: '\'Futura PT\'',
  borderRadius: '4px',
  borderRadiusCircle: '100vw',
  breakpoints: ['768px', '52em', '64em'],
  colors: {
    sidenav: '#ffffff',
    background: '#fafafb',
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
