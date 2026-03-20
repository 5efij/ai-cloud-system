let model;

mobilenet.load().then((loadedModel) => {
  model = loadedModel;
});

const upload = document.getElementById("upload");
const image = document.getElementById("image");
const result = document.getElementById("result");

upload.addEventListener("change", (e) => {
  const file = e.target.files[0];

  if (!file) return;

  // عرض الصورة مباشرة (بدون انتظار الكلاود)
  const localURL = URL.createObjectURL(file);
  image.src = localURL;

result.innerText =
  "Detected: " + predictions[0].className +
  "\nAccuracy: " + (predictions[0].probability * 100).toFixed(2) + "%";
  // AI تحليل
  setTimeout(() => {
    model.classify(image).then((predictions) => {
      result.innerText = predictions[0].className;
    });
  }, 1500);
});
