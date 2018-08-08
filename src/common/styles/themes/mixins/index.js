function transitions(properties, timing = '0.3s', effect = 'ease-in-out') {
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

export default { transitions };
