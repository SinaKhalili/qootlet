class QRChunk {
  constructor(data) {
    this.full_data = data; // TODO: Remove this
    let tmp_data = data.split(":");
    this.header = tmp_data.shift();
    this.curr_chunk = tmp_data.shift();
    this.num_chunks = tmp_data.shift();
    this.data = tmp_data.join(":");
  }
}

class QRChunkPooler {
  constructor(num_chunks) {
    this.num_chunks = 0;
    this.chunks = [];
  }
  add_chunk(qrchunk) {
    if (this.num_chunks == 0) {
      // this is the first chunk we've seen
      this.num_chunks = qrchunk.num_chunks;
      this.chunks.push(qrchunk);
    } else if (
      this.chunks.filter((chunk) => chunk.curr_chunk === qrchunk.curr_chunk)
        .length === 0
    ) {
      this.chunks.push(qrchunk);
    }
  }
  chunk_status() {
    let chunk_ids = this.chunks.reduce((dat, chunk) => {
      return dat + "," + chunk.curr_chunk.toString();
    }, "");
    let str = "";
    for (let i = 1; i <= this.num_chunks; i++) {
      let chunk_status =
        this.chunks.filter((chunk) => chunk.curr_chunk === i.toString())
          .length !== 0
          ? "✅"
          : "❌";

      str += `${i.toString()} : ${chunk_status} \n`;
    }
    return str;
  }
  finished_chunking() {
    console.log(this.chunks);
    return this.chunks.length == this.num_chunks;
  }
  get_pooled_data() {
    this.chunks.sort((a, b) => a.curr_chunk - b.curr_chunk);
    return this.chunks.reduce((data_so_far, qrchunk) => {
      return data_so_far + qrchunk.data;
    }, "");
  }
}
