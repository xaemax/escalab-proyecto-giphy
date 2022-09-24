import { getObserver } from "./observer.js";

export const key = "EFdHR4IEaZ6bLIe66aNkiSJ914kiYWBx";
export const base_api = "https://api.giphy.com/v1/gifs";

const gifis = document.getElementById("root");

let offset = 0;

/*const getLocalStorage = () => {
    return JSON.parse (localStorage.getItem('lastSearch'));
}*/

const makeImg = (element) => {
  const img = document.createElement("img");
  img.src = element.images.original.url;
  img.alt = element.title;
  return img;
};

const fecthData = async () => {
  const res = await fetch(
    `${base_api}/trending?api_key=${key}&limit=10&offset=${offset}`
  );
  const { data } = await res.json();
  offset += 10;
  return data;
};
export const principalFunction = async () => {
  const data = await fecthData();

  const lastImg = data.pop();
  const lastImgTemplate = makeImg(lastImg);
  getObserver(lastImgTemplate);

  const template = data.map((img) => makeImg(img));
  root.append(...template);
  root.append(lastImgTemplate);
};
window.addEventListener("load", principalFunction);
