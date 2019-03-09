/* eslint-disable */
function _hexToRgb(hex) {
  const shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
  hex = hex.replace(shorthandRegex, function(m, r, g, b) {
      return r + r + g + g + b + b;
  });

  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return (
    result
      ? `${parseInt(result[1], 16)}, ${parseInt(result[2], 16)}, ${parseInt(result[3], 16)}`
      : `0, 0, 0`
  );
}

function _shadeColor(color, percent) {
  let R = parseInt(color.substring(1,3),16);
  let G = parseInt(color.substring(3,5),16);
  let B = parseInt(color.substring(5,7),16);

  R = parseInt(R * (100 + percent) / 100);
  G = parseInt(G * (100 + percent) / 100);
  B = parseInt(B * (100 + percent) / 100);

  R = (R<255)?R:255;
  G = (G<255)?G:255;
  B = (B<255)?B:255;

  const RR = ((R.toString(16).length===1)?"0"+R.toString(16):R.toString(16));
  const GG = ((G.toString(16).length===1)?"0"+G.toString(16):G.toString(16));
  const BB = ((B.toString(16).length===1)?"0"+B.toString(16):B.toString(16));

  return "#"+RR+GG+BB;
}
/* eslint-enable */

function convertPercentToInt(string) {
  return Number(/(^\d+)%$/.exec(string)[1]);
}

export function withOpacity(hex, opacity) {
  return `rgba(${_hexToRgb(hex)}, ${opacity})`;
}

export function darken(hex, percent) {
  return _shadeColor(hex, -convertPercentToInt(percent));
}

export function lighten(hex, percent) {
  return _shadeColor(hex, convertPercentToInt(percent));
}

export function transition(properties, timing = '0.2s', effect = 'ease-out') {
  let transitions = '';
  properties.split(' ').forEach((prop, index) => {
    let composing = `${prop} ${timing} ${effect}`;
    if (index < properties.split(' ').length - 1) {
      composing += ', ';
    }
    transitions += composing;
  });
  const changes = properties.split(' ').join(', ');
  return `
    transition: ${transitions};
    will-change: ${changes};
  `;
}
