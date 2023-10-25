const axios = require("axios");
const { default: test } = require("node:test");
const fs = require("fs").promises;

const testImage = "./test.jpg";

async function loadImageBase64(filePath) {
  try {
    const fileData = await fs.readFile(filePath, { encoding: "base64" });

    return fileData;
  } catch (error) {
    throw error;
  }
}

(async () => {
  const image = await loadImageBase64(testImage);
  const predictionsArray = [];

  try {
    const response = await axios({
      method: "POST",
      url: "https://detect.roboflow.com/white-stone/1",
      params: {
        api_key: "nvoAQs0gPPDx9ef5z5Zj",
      },
      data: image,
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    });

    console.log(response.data);

    response.data.predictions.forEach((prediction) => {
      predictionsArray.push(prediction);
    });

    const htmlOutput = `<!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Draw Results on Image</title>
      </head>
      <body>
        <canvas id="resultCanvas" width="${
          response.data.image.width
        }" height="${response.data.image.height}"></canvas>
        <script>
          // Your prediction data
          const predictions = ${JSON.stringify(predictionsArray)}
      
          // Get the canvas element
          const canvas = document.getElementById('resultCanvas');
          const context = canvas.getContext('2d');
      
          // Load the image
          const image = new Image();
          image.src = '${testImage}'; // Fix the image source
      
          // When the image is loaded, draw it on the canvas and then draw the predictions
          image.onload = function() {
            // Draw the image on the canvas
            context.drawImage(image, 0, 0);
      
            // Draw predictions on the canvas
            predictions.forEach(prediction => {
              context.beginPath();
              context.rect(prediction.x - 60, prediction.y - 90, prediction.width, prediction.height);
              context.lineWidth = 2;
              context.strokeStyle = 'red';
              context.fillStyle = 'red';
              context.stroke();
              context.fillText(prediction.class, prediction.x, prediction.y - 95);
            });
          };
        </script>
      </body>
      </html>`;
    await fs.writeFile("./test.html", htmlOutput, { encoding: "utf-8" });
  } catch (error) {
    console.log(error.message);
  }
})();