import { getObserverS } from "./observer.js";
import { key } from "./principal.js";
import { base_api } from "./principal.js";

let offsetS = 0;
let q = "";

const makeImgS = (element) => {
  const img = document.createElement("img");
  img.src = element.images.original.url;
  img.alt = element.title;
  return img;
};

const btn = document.getElementById("btn");
btn.onclick = () => {
  document.getElementById("root").innerHTML = "";
  q = document.getElementById("busqueda").value;

  const miLocalStorage = window.localStorage;
  miLocalStorage.setItem(`localSearch: ${q}`, `${q}`);
  document.getElementById(
    "saveSearch"
  ).innerHTML += `<input type="button" value="${q}" class="btn ${q}" id="local">`;

  principalFunctionS();

  setTimeout(() => {
    gifNotFound();
  }, 1000);
};
/*
if (q==""){

}
else{
  const localbtn = document.getElementById("local");
localbtn.onclick = () => {
  document.getElementById("root").innerHTML = "";
  q = document.getElementById("local").value;
  principalFunctionS();

  setTimeout(() => {
    gifNotFound();
  }, 1000);
}
}
*/
const gifNotFound = () => {
  if (document.getElementById("root").innerHTML == "") {
    document.getElementById(
      "root"
    ).innerHTML = `<h1 style="color:red">Error, Gif No encontrado</h1>`;
    setTimeout(() => {
      document.getElementById("root").innerHTML = "";
    }, 5000);
  }
};

const fecthBusqueda = async () => {
  const res = await fetch(
    `${base_api}/search?api_key=${key}&q=${q}&limit=10&offset=${offsetS}`
  );
  const { data } = await res.json();
  offsetS += 10;
  return data;
};
export const principalFunctionS = async () => {
  const data = await fecthBusqueda();

  const lastImgs = data.pop();
  const lastImgTemplateS = makeImgS(lastImgs);
  getObserverS(lastImgTemplateS);

  const templateS = data.map((img) => makeImgS(img));
  root.append(...templateS);
  root.append(lastImgTemplateS);
};

const searchLocal = () => {};
