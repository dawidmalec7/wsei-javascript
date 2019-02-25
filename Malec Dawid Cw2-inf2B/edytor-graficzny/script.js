document.addEventListener('DOMContentLoaded', appStart);

function appStart(){
  let plik = document.querySelector("#grafika");
  let plotno = document.querySelector("#plotno");
  let btnJasnosc = document.querySelector('#jasnosc');
  let btnGreyscale = document.querySelector('#greyscale');
  let btnKontrast = document.querySelector('#kontrast');
  let negatyw = document.querySelector('#negatyw');
  let nasycenie = document.querySelector("#nasycenie");
  let nasycenie1 = document.querySelector("#nasycenie1");
  let nasycenie2 = document.querySelector("#nasycenie2");
  let nasycenie_counter = document.querySelector("#nasycenie-counter");

  const zdjecie = "./img.jpg";
  let ctx = plotno.getContext('2d');
  let img = new Image();
    img.src = zdjecie;
    img.addEventListener('load', (e)=>{
        ctx.drawImage(img, 0, 0, plotno.width, plotno.height);
  });
  /*
  * Przerysowanie obrazka
  */
  function redraw(){
    ctx.drawImage(img, 0, 0, plotno.width, plotno.height)
  }

  function truncateColor(value) {
    if (value < 0) {
      value = 0;
    } else if (value > 255) {
      value = 255;
    }

    return value;
  }
   /*
    * GreyScale
   */
  btnGreyscale.addEventListener('click', (e) =>{
   let imageData = ctx.getImageData(0, 0, plotno.width, plotno.height)
    for (let i = 0; i < imageData.data.length; i+= 4) {
    let value = (imageData.data[i] + imageData.data[i + 1] + imageData.data[i + 2]) / 3
        imageData.data[i]     = value;
        imageData.data[i + 1] = value;
        imageData.data[i + 2] = value;
    }
    ctx.putImageData(imageData, 0, 0);
  });
   /*
    * Negatyw
   */
  negatyw.addEventListener('click', (e) => {
   redraw();
   let imageData = ctx.getImageData(0, 0, plotno.width, plotno.height)
    for (let i = 0; i < imageData.data.length; i+= 4) {
        imageData.data[i]     = imageData.data[i] ^ 255;
        imageData.data[i + 1] = imageData.data[i] ^ 255;
        imageData.data[i + 2] = imageData.data[i] ^ 255;
    }
    ctx.putImageData(imageData, 0, 0);
  })

   /*
    * Jasnosc
   */
  btnJasnosc.addEventListener("change", (e)=>{
      redraw();
      let imageData = ctx.getImageData(0, 0, plotno.width, plotno.height);
      let value = parseInt(e.target.value, 10) / 100;
       document.getElementById("jasnoscValue").innerHTML = value;
     for (var i = 0; i < imageData.data.length; i+= 4) {
        imageData.data[i] += 255 * value;
        imageData.data[i+1] += 255 * value;
        imageData.data[i+2] += 255 * value;
      }
      ctx.putImageData(imageData, 0, 0);
  })

   /*
    * Kontrast
   */
  btnKontrast.addEventListener("change", (e)=>{
    redraw();
     let imageData = ctx.getImageData(0, 0, plotno.width, plotno.height);
     let contrast = parseInt(e.target.value, 10) * 2;
     document.getElementById("kontrastValue").innerHTML = e.target.value;
    var factor = (259.0 * (contrast + 255.0)) / (255.0 * (259.0 - contrast));
     for (var i = 0; i < imageData.data.length; i+= 4) {
        imageData.data[i] += truncateColor(factor * (imageData.data[i] - 128.0) + 128.0);
        imageData.data[i+1] += truncateColor(factor * (imageData.data[i+1] - 128.0) + 128.0);
        imageData.data[i+2] += truncateColor(factor * (imageData.data[i+2] - 128.0) + 128.0);
      }
      ctx.putImageData(imageData, 0, 0);
  });

   /*
    * Nasycenie
   */
  nasycenie.addEventListener("change", (e)=>{
    nasycenie_counter.innerHTML = `hsl(${nasycenie.value}, ${nasycenie1.value}%, ${nasycenie2.value}%)`;
    ctx.globalCompositeOperation = "saturation";
    ctx.fillStyle = `hsl(${e.target.value},${nasycenie1.value}%,${nasycenie2.value}%)`;
    ctx.fillRect(0,0,plotno.width,plotno.height);
  })
  nasycenie1.addEventListener("change", (e)=>{
    nasycenie_counter.innerHTML = `hsl(${nasycenie.value}, ${nasycenie1.value}%, ${nasycenie2.value}%)`;
    ctx.globalCompositeOperation = "saturation";
    ctx.fillStyle = `hsl(${nasycenie.value},${e.target.value}%,${nasycenie2.value}%)`;
    ctx.fillRect(0,0,plotno.width,plotno.height);
  })
  nasycenie2.addEventListener("change", (e)=>{
    nasycenie_counter.innerHTML = `hsl(${nasycenie.value}, ${nasycenie1.value}%, ${nasycenie2.value}%)`;
    ctx.globalCompositeOperation = "saturation";
    ctx.fillStyle = `hsl(${nasycenie.value},${nasycenie2.value}%,${e.target.value}%)`;
    ctx.fillRect(0,0,plotno.width,plotno.height);
})
}