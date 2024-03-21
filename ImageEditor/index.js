//
const file = document.querySelector("#file");
const canvas = document.querySelector("#canvas");

const brightness = document.querySelector("#brightness");
const saturation = document.querySelector("#saturation");
const blur = document.querySelector("#blur");
const inversion = document.querySelector("#inversion");
const canvasCtx = canvas.getContext("2d");
const btn = document.querySelector("#btn");
const saveBtn = document.querySelector('#saveBtn');

// thi object is use for to store the props of image like brighness and saturation...
const settings = {};
//this var image is for image to make an object for canvas
let image = null;

// to add defualt value to the props
function restSettings() {
  settings.brightness = "100";
  settings.saturation = "100";
  settings.blur = "0";
  settings.inversion = "0";

  brightness.value = settings.brightness;
  saturation.value = settings.saturation;
  blur.value = settings.blur;
  inversion.value = settings.inversion;
}
// this for when we load our page to rest every things
restSettings();

// function to update the setting of prop of the image, props: is for the brightness and .. value: is to get the value

function updateSettings(prop, value) {
  if (!image) return;
  settings[prop] = value;
  renderImage();
}
function generateFilter() {
  const { brightness, saturation, blur, inversion } = settings;
  return `brightness(${brightness}%) saturate(${saturation}%)  blur(${blur}px) invert(${inversion}%)`;
}

function renderImage() {
  canvasCtx.filter = generateFilter();
  canvasCtx.drawImage(image, 0, 0);
}

brightness.addEventListener("change", () =>
  updateSettings("brightness", brightness.value)
);
saturation.addEventListener("change", () =>
  updateSettings("saturation", saturation.value)
);
blur.addEventListener("change", () => updateSettings("blur", blur.value));
inversion.addEventListener("change", () =>
  updateSettings("inversion", inversion.value)
);

file.addEventListener("change", () => {
  image = new Image();

  image.addEventListener("load", () => {
    canvas.width = image.width;
    canvas.height = image.height;
    restSettings();
    renderImage();
  });

  image.src = URL.createObjectURL(file.files[0]);
});

// rest settings btn
btn.addEventListener("click", () => {
  restSettings();
  renderImage();
});

// save functionality
function saveImage() {

    
    canvas.width = image.width;
    canvas.height = image.height;

    canvasCtx.filter = generateFilter();
    canvasCtx.drawImage(image, 0, 0);

    const imageDataURL = canvas.toDataURL('image/png');

    const link = document.createElement('a');
    link.href = imageDataURL;
    link.download = 'edited_image.png'; 


    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

saveBtn.addEventListener('click', saveImage);