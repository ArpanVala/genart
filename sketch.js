const canvasSketch = require('canvas-sketch');
const {lerp}= require('canvas-sketch-util/math');
const random = require('canvas-sketch-util/random');
const colors = require('nice-color-palettes');
// const colorbrewer = require('colorbrewer');
const settings = {
  // dimensions: [2048, 2048 ],
  dimensions:[1080,1920]
  // dimensions: [1080,2408],
    //units: 'cm',
  
    //orientation: 'landscape',

  // for printing
  // dimensions: 'A4',
  // pixelsPerInch: 300, 
};

const sketch = () => {
  const palette = random.pick(colors);
  // const palette = colorbrewer.Set3[12];

  //this function will return point son a grid
  const createGrid = () => {
    const points = [];
    //size
    const count=30;
    //x cordinate
    for(let i=0;i<count;i++){
      //y cordinate
      for(let j=0;j<count;j++){
        const u= count <= 1 ? 0.5: i/(count-1);
        const v= count <= 1 ? 0.5: j/(count-1);
        const radius = Math.abs(random.noise2D(u,v))*0.9;
        points.push({
          colors:random.pick(palette),
          positions:[u,v],
          radius,
          rotation: random.noise2D(u * 0.5, v*0.5)
        });
      }
    }
    return points;
  }
  //calling the grid function
  // random.setSeed(5);
  const points = createGrid().filter(()=>{return random.value() > 0.4}); //filter is there for randomness
  const margin = 30;

  return ({ context, width, height }) => {
   context.fillStyle='black';
   context.fillRect(0,0,width,height);
   //loop through the points and draw them
   points.forEach(data =>{
    const {
      colors,
      positions,
      radius,
      rotation
    }= data;

    const [u,v]= positions;
     const x= lerp(margin, width-margin,u);
     const y=  lerp(margin, height-margin,v);

    //  context.beginPath();
    //  context.arc(x,y,radius * width,0,Math.PI*2,false);
    //  context.fillStyle=colors;
    //   context.fill();
    context.save();
    context.fillStyle=colors;
    context.font=`${radius * width }px "sans-serif"`;
    context.translate(x, y);
    context.rotate(rotation);
    context.fillText('=', 0,0);
    context.restore();
   });
   
  };
};

canvasSketch(sketch, settings);
