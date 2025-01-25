const canvasSketch = require('canvas-sketch');

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

  return ({ context, width, height }) => {
   context.fillStyle='black';
   context.fillRect(0,0,width,height);
   
   points.forEach(([u,v])=>{
     const x= u * width;
     const y= v * height;
     context.beginPath();
     context.arc(x,y,360,0,Math.PI*2,false);
     context.strokeStyle='white';
     context.lineWidth=5;
     context.stroke();
   });
   
  };
};

canvasSketch(sketch, settings);
