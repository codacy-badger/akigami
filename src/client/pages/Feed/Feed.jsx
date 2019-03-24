import React, { Component } from 'react';

class Feed extends Component {
  render() {
    return (
      <div style={{ fontSize: 24, lineHeight: 4 }}>
        <div style={{ fontWeight: 300 }}>Проверка шрифта 300 / Test font 300 Light</div>
        <div style={{ fontWeight: 400 }}>Проверка шрифта 400 / Test font 400 Book</div>
        <div style={{ fontWeight: 500 }}>Проверка шрифта 500 / Test font 500 Medium</div>
        <div style={{ fontWeight: 600 }}>Проверка шрифта 600 / Test font 600 Demi</div>
        <div style={{ fontWeight: 700 }}>Проверка шрифта 700 / Test font 700 Heavy</div>
        <div style={{ fontWeight: 800 }}>Проверка шрифта 800 / Test font 800 Bold</div>
        <div style={{ fontWeight: 900 }}>Проверка шрифта 900 / Test font 900 Extra Bold</div>
      </div>
    );
  }
}

export default Feed;
