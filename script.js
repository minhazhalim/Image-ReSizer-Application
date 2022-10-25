const uploadBox = document.querySelector('.upload-box');
const previewImage = uploadBox.querySelector('img');
const input = uploadBox.querySelector('input');
const widthInput = document.querySelector('.width input');
const heightInput = document.querySelector('.height input');
const ratioInput = document.querySelector('.ratio input');
const qualityInput = document.querySelector('.quality input');
const downloadButton = document.querySelector('.download-button');
let ogImageRatio;
const loadFile = (event) => {
     const file = event.target.files[0];
     if(!file) return;
     previewImage.src = URL.createObjectURL(file);
     previewImage.addEventListener('load',() => {
          widthInput.value = previewImage.naturalWidth;
          heightInput.value = previewImage.naturalHeight;
          ogImageRatio = previewImage.naturalWidth / previewImage.naturalHeight;
          document.querySelector('.wrapper').classList.add('active');
     });
};
widthInput.addEventListener('keyup',() => {
     const height = ratioInput.checked ? widthInput.value / ogImageRatio : heightInput.value;
     heightInput.value = Math.floor(height);
});
heightInput.addEventListener('keyup',() => {
     const width = ratioInput.checked ? heightInput.value * ogImageRatio : widthInput.value;
     widthInput.value = Math.floor(width);
});
const resizeAndDownload = () => {
     const canvas = document.createElement('canvas');
     const a = document.createElement('a');
     const zim = canvas.getContext('2d');
     const imageQuality = qualityInput.checked ? 0.5 : 1.0;
     canvas.width = widthInput.value;
     canvas.height = heightInput.value;
     zim.drawImage(previewImage,0,0,canvas.width,canvas.height);
     a.href = canvas.toDataURL('image/jpeg',imageQuality);
     a.download = new Date().getTime();
     a.click();
};
downloadButton.addEventListener('click',resizeAndDownload);
uploadBox.addEventListener('click',() => input.click());
input.addEventListener('change',loadFile);