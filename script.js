const resizerFile = document.querySelector('.resizer__file');
const resizerInputWidth = document.querySelector('.resizer__input--width');
const resizerInputHeight = document.querySelector('.resizer__input--height');
const resizerAspect = document.querySelector('.resizer__aspect');
const resizerCanvas = document.querySelector('.resizer__canvas');
const zim = resizerCanvas.getContext('2d');
let activeImage;
let originalWidthToHeightRatio;
resizerFile.addEventListener('change',(event) => {
     const fileReader = new FileReader();
     fileReader.addEventListener('load',() => {
          openImage(fileReader.result);
     });
     fileReader.readAsDataURL(event.target.files[0]);
});
resizerInputWidth.addEventListener('change',() => {
     if(!activeImage) return;
     const heightValue = resizerAspect.checked ? resizerInputWidth.value / originalWidthToHeightRatio : resizerInputHeight.value;
     resize(resizerInputWidth.value,heightValue);
});
resizerInputHeight.addEventListener('change',() => {
     if(!activeImage) return;
     const widthValue = resizerAspect.checked ? resizerInputHeight.value * originalWidthToHeightRatio : resizerInputWidth.value;
     resize(widthValue,resizerInputHeight.value);
});
function openImage(imageSource){
     activeImage = new Image();
     activeImage.addEventListener('load',() => {
          originalWidthToHeightRatio = activeImage.width / activeImage.height;
          resize(activeImage.width,activeImage.height);
     });
     activeImage.src = imageSource;
}
function resize(width,height){
     resizerCanvas.width = Math.floor(width);
     resizerCanvas.height = Math.floor(height);
     resizerInputWidth.value = Math.floor(width);
     resizerInputHeight.value = Math.floor(height);
     zim.drawImage(activeImage,0,0,Math.floor(width),Math.floor(height));
}