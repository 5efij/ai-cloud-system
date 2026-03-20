let model;

mobilenet.load().then((loadedModel) => {
  model = loadedModel;
});

const upload = document.getElementById("upload");
const image = document.getElementById("image");

upload.addEventListener("change", () => {
  const file = upload.files[0];

  const storage = firebase.storage();
  const storageRef = storage.ref("images/" + Date.now());

  storageRef.put(file).then(() => {
    storageRef.getDownloadURL().then((url) => {

      image.src = url;

      setTimeout(() => {
        model.classify(image).then((predictions) => {
          document.getElementById("result").innerText =
            predictions[0].className;
        });
      }, 2000);

    });
  });
});
