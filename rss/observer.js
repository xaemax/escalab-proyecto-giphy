import { principalFunction } from "./principal.js";
import { principalFunctionS } from "./search.js";
const inViewPort = ([e]) => {
  const { isIntersecting, target } = e;

  if (isIntersecting) {
    principalFunction();
    observer.unobserve(target);
  }
};
const observer = new IntersectionObserver(inViewPort);

export const getObserver = (node) => {
  observer.observe(node);
};

//observer search

const inViewPortS = ([e]) => {
  const { isIntersecting, target } = e;

  if (isIntersecting) {
    principalFunctionS();
    observerS.unobserve(target);
  }
};
const observerS = new IntersectionObserver(inViewPortS);

export const getObserverS = (node) => {
  observerS.observe(node);
};
