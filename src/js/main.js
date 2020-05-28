const Methods = {
  init: function () {
    Methods.initMatrix()
  },

  initMatrix: function () {
    const canvas = document.querySelector("canvas");
    Methods.beginMatrix(canvas);
  },

  beginMatrix: function (_neo) {
    const props = {
      screen: window.screen,
      canvas: _neo,
      width: _neo.width = screen.width,
      height: _neo.height = screen.height,
      letters: Array(256).join(1).split("")
    }
    Methods.printMatrix(props);
  },

  printMatrix: function (_props) {
    _props.canvas.getContext('2d').fillStyle = 'rgba(0,0,0)';
    _props.canvas.getContext('2d').fillRect(0, 0, _props.width, _props.height);
    _props.canvas.getContext('2d').fillStyle = '#0F0';
    setInterval(function () {
      _props.letters.map(function (_positionY, _index) {
        const text = String.fromCharCode(48 + Math.random() * 33);
        const positionX = _index * 10;
        _props.canvas.getContext('2d').fillText(text, positionX, _positionY );
        _props.letters[_index] = (_positionY > 758 * Math.random() * 164) ? 0 : _positionY + 10;
      })
    }, 60)
  }
}

export default Methods;
