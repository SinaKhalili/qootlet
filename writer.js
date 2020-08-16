function _base64ToArrayBuffer(base64) {
  let binary_string = window.atob(base64);
  let len = binary_string.length;
  let bytes = new Uint8Array(len);
  for (let i = 0; i < len; i++) {
    bytes[i] = binary_string.charCodeAt(i);
  }
  return bytes.buffer;
}

let thresh = 500;

let openFile = function (event) {
  const input = event.target;

  const reader = new FileReader();
  reader.readAsDataURL(input.files[0]);

  reader.onload = function () {
    let res = reader.result;
    let result_slices = [];
    const output = document.getElementById("output");

    let chunk_num = 1;
    let num_chunks = Math.ceil(res.length / thresh);
    while (res.length > thresh) {
      let curr_chunk = res.slice(0, thresh);
      result_slices.push(
        `QOT:${chunk_num.toString()}:${num_chunks.toString()}:${curr_chunk}`
      );
      res = res.slice(thresh);
      chunk_num += 1;
    }
    result_slices.push(
      `QOT:${chunk_num.toString()}:${num_chunks.toString()}:${res}`
    );
    result_slices.forEach((chunk) => drawToCanvas(chunk));
  };
};

function drawToCanvas(datum) {
  return QRCode.toCanvas(datum, {}, (error, canvas) => {
    if (error) {
      console.error(error);
    }
    let qr_area = document.getElementById("qr_area");
    qr_area.appendChild(canvas);
  });
}
