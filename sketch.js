const canvasSketch = require('canvas-sketch');
const {lerp}= require('canvas-sketch-util/math');
const random = require('canvas-sketch-util/random');
const colors = require('nice-color-palettes');
const settings = {
  dimensions: [2048, 2048 ],
  // dimensions:[1080,1920]
  // dimensions: [1080,2408],
    //units: 'cm',
  
    //orientation: 'landscape',

  // for printing
  // dimensions: 'A4',
  // pixelsPerInch: 300, 
};

const sketch = () => {
  const palette = random.pick(colors);
  const createGrid = () => {
    const points = [];
    const count=30;
    for(let i=0;i<count;i++){
      for(let j=0;j<count;j++){
        const u= count <= 1 ? 0.5: i/(count-1);
        const v= count <= 1 ? 0.5: j/(count-1);
        const radius = Math.abs(random.noise2D(u,v))*0.2;
        points.push({
          colors: random.pick(palette),
          positions:[u,v],
          radius,
          rotation: random.noise2D(u,v)
        });
      }
    }
    return points;
  }
  // random.setSeed(5);
  const points = createGrid().filter(()=>{return random.value() > 0.2});
  const margin = 400;

  return ({ context, width, height }) => {
   context.fillStyle='black';
   context.fillRect(0,0,width,height);
   
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
    context.fillText('/', 0,0);
    context.restore();
   });
   
  };
};

canvasSketch(sketch, settings);
