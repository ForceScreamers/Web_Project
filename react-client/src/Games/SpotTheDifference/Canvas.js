import { useRef, useEffect } from "react";

export default function Canvas({ height: Height, width: Width, HandleClick, StartingImageSource, SetCanvasContext }) {
  const canvas = useRef();

  useEffect(() => {
    const context = canvas.current.getContext('2d');

    SetCanvasContext((prev) => [...prev, context]);

    SetStartingImageForContext(context);
  }, []);

  function SetStartingImageForContext(context) {

    let image = new Image();
    let sizeRatio = Height / Width;
    image.src = StartingImageSource;


    var hRatio = Width / image.width;
    var vRatio = Height / image.height;
    var ratio = Math.min(hRatio, vRatio);


    //  Draw image
    image.onload = () => {
      context.drawImage(image, 0, 0, image.width * ratio, image.height * ratio)
    }
  }


  return (
    <canvas style={{ border: 'solid black' }} ref={canvas} height={Height} width={Width} onClick={(e) => HandleClick(e)} />
  );
};