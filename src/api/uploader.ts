export const uploadImage = (file: File) => {
  const preset = process.env.REACT_APP_CLOUDINARY_PRESET;
  const url = process.env.REACT_APP_CLOUDINARY_URL;
  if (!preset || !url) return;
  const transformUrl = url + "?width=512&height=$512";
  const data = new FormData();
  data.append("file", file);
  data.append("upload_preset", preset);
  return fetch(transformUrl, {
    method: "POST",
    body: data,
  })
    .then((res) => res.json())
    .then((data) => data.url);
};
