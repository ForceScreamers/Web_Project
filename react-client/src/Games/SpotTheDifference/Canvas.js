import { useRef, useEffect } from "react";

export default function Canvas({ height, width, HandleClick, StartingImageSource, SetCanvasContext }) {
  const canvas = useRef();

  useEffect(() => {
    const context = canvas.current.getContext('2d');

    SetCanvasContext((prev) => [...prev, context]);

    SetStartingImageForContext(context);
  }, []);

  function SetStartingImageForContext(context) {

    let image = new Image();

    image.src = StartingImageSource;

    //  Draw image
    image.onload = () => {
      context.drawImage(image, 0, 0)
    }
  }


  return (
    <canvas style={{ border: 'solid black' }} ref={canvas} height={height} width={width} onClick={(e) => HandleClick(e)} />
  );
};