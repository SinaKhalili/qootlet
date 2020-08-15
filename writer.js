function _base64ToArrayBuffer(base64) {
  var binary_string = window.atob(base64);
  var len = binary_string.length;
  var bytes = new Uint8Array(len);
  for (var i = 0; i < len; i++) {
    bytes[i] = binary_string.charCodeAt(i);
  }
  return bytes.buffer;
}

var mybytes; // TODO: Remove this
let openFile = function (event) {
  const input = event.target;

  const reader = new FileReader();
  reader.readAsDataURL(input.files[0]);

  reader.onload = function () {
    const res = reader.result;
    const output = document.getElementById("output");
    mybytes = res;

    debugger;
    // TODO: Add automatic compression if possible
    // const pak = pako.deflate(view);

    drawToCanvas(res);
  };
};

function drawToCanvas(datum) {
  QRCode.toCanvas(document.getElementById("canvas"), datum, {}, (error) => {
    if (error) {
      console.error(error);
    }
    console.log(datum);
  });
}
