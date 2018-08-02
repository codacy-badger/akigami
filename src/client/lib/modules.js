export const socket = (
  typeof window !== 'undefined'
    ? require('socket.io-client')({ transports: ['websocket'], upgrade: false }).connect()
    : null
);

export default { socket };
