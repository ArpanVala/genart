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
  return ({ context, width, height }) => {
    context.fillStyle = 'orange';
    context.fillRect(0, 0, width, height);

    context.beginPath();
    context.arc(width/2,height/2.5,width*0.2,0,Math.PI,false);
    context.fillStyle = 'red';
    context.fill();
    context.lineWidth = width*0.02;
    context.strokeStyle = 'darkgreen';
    context.stroke();
    
  };
};

canvasSketch(sketch, settings);
