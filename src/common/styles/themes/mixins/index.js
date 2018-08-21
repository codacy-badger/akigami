function transitions(properties, timing = '0.25s', effect = 'ease-in-out') {
  let transition = '';
  properties.split(' ').forEach((prop, index) => {
    let composing = `${prop} ${timing} ${effect}`;
    if (index < properties.split(' ').length - 1) {
      composing += ', ';
    }
    transition += composing;
  });
  const changes = properties.split(' ').join(', ');
  return `
    transition: ${transition};
    will-change: ${changes};
  `;
}

export default { transitions };
