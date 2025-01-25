const canvasSketch = require('canvas-sketch');
const {lerp}= require('canvas-sketch-util/math');
const settings = {
  dimensions: [ 2048, 2048 ],
    //units: 'cm',
  
    //orientation: 'landscape',

  // for printing
  // dimensions: 'A4',
  // pixelsPerInch: 300, 
};

const sketch = () => {
  const createGrid = () => {
    const points = [];
    const count=5;
    for(let i=0;i<count;i++){
      for(let j=0;j<count;j++){
        const u= count <= 1 ? 0.5: i/(count-1);
        const v= count <= 1 ? 0.5: j/(count-1);
        points.push([u,v]);
      }
    }
    return points;
  }

  const points = createGrid();
  const margin = 400;

  return ({ context, width, height }) => {
   context.fillStyle='black';
   context.fillRect(0,0,width,height);
   
   points.forEach(([u,v])=>{
     const x= lerp(margin, width-margin,u);
     const y=  lerp(margin, height-margin,v);
     context.beginPath();
     context.arc(x,y,100,0,Math.PI*2,false);
     context.fillStyle='white';
     context.fill();
   });
   
  };
};

canvasSketch(sketch, settings);
