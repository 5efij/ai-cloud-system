const upload = document.getElementById("upload");
const image = document.getElementById("image");

upload.addEventListener("change", () => {
  const file = upload.files[0];

  const storage = firebase.storage();
  const storageRef = storage.ref(file.name);

  storageRef.put(file).then(() => {
    storageRef.getDownloadURL().then((url) => {
      image.src = url;
      alert("Uploaded to Cloud 😎");
    });
  });
});
