export function fileToBlobURL(file, type) {
  return new Promise(res => {
    const reader = new FileReader();
    reader.onloadend = () => {
      const blob = new Blob([reader.result], { type });
      const url = URL.createObjectURL(blob);
      res(url);
    };
    reader.readAsArrayBuffer(file);
  });
}

export const temp = 1337;

export function getDisplayName(WrappedComponent) {
  return WrappedComponent.displayName || WrappedComponent.name || 'Component';
}
