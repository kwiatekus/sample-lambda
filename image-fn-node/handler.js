const axios = require('axios');
const { PassThrough } = require("stream");
const mime = require("content-type");


module.exports = {
  main: async function (event, context) {
    return new Promise(async (resolve, reject) => {

      const stream = getResponseStream("image/png", event.extensions.response);
      stream.on("finish", resolve);
      stream.on("error", reject);

      const url = "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d3/Fischotter%2C_Lutra_Lutra.JPG/640px-Fischotter%2C_Lutra_Lutra.JPG";
  
      const downloadStream = await axios({
        url,
        method: 'GET',
        responseType: 'stream'
      })

      downloadStream.data.pipe(stream)
    });
  },
};

function getResponseStream(ct, response) {
  if (ct) {
    setResponseType(ct, response);
  }

  const rs = new PassThrough();
  rs.pipe(response, { end: true });

  return rs;
}

function setResponseType(ct, response) {
  mime.parse(ct);
  response.set("content-type", ct);
}

