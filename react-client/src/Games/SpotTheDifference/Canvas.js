import { useRef, useEffect } from "react";
import './SpotTheDifferenceStyles.css'

export default function Canvas({ height: Height, width: Width, HandleClick, StartingImageSource, SetCanvasContext }) {
  const canvas = useRef();

  useEffect(() => {
    const context = canvas.current.getContext('2d');

    SetCanvasContext((prev) => [...prev, context]);

    SetStartingImageForContext(context);
  }, []);

  function SetStartingImageForContext(context) {
    console.log(StartingImageSource)

    let image = new Image();
    image.src = StartingImageSource;

    //  Draw image
    image.onload = () => {

      //  Calculate the width and height of the image according to the canvas size
      let ratio = GetScaleRatio(image);
      let imageWidth = image.width * ratio;
      let imageHeight = image.height * ratio;

      context.drawImage(image, 0, 0, imageWidth, imageHeight)
    }
  }


  function GetScaleRatio(image) {
    let hRatio = Width / image.width;
    let vRatio = Height / image.height;
    return Math.min(hRatio, vRatio);
  }


  return (
    <canvas className="canvas" ref={canvas} height={Height} width={Width} onClick={(e) => HandleClick(e)} />
  );
};