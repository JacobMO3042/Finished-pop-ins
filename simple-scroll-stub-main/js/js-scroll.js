// BIDMAS Applies
const scrollElements = document.querySelectorAll('.js-scroll')
scrollElements.forEach((el) => {
  if (elementInView(el, 0.5)) {
    console.log('displayElement')
    displayScrollElement(el)
  }

}

)
window.addEventListener('scroll', throttle(handleScrollAnimation,100))
// display functions
// check element is in viewable area
// el = element
function elementInView(el, amountInView = 1) {
  const elTop = el.getBoundingClientRect().top;
  const elHeight = el.getBoundingClientRect().height;
  return (
    elTop + (elHeight * amountInView) <= document.documentElement.
    clientHeight && elTop + (elHeight * amountInView) > 0
  )
}
// Checks is out of viewable area
function elementOutOfView(el) {
  const elTop = el.getBoundingClientRect().top;
  const elBottom = el.getBoundingClientRect().bottom;
  return (
    elTop >= document.documentElement.clientHeight || elBottom
    < 0
  )
}
//show element
function displayScrollElement(el) {
  el.classList.add("scrolled");
}
//hide element
function hideScrollElement(el) {
  el.classList.remove("scrolled")
}
function handleScrollAnimation() {
  console.log('eventcalled')
  scrollElements.forEach((el) => {
    if (elementInView(el, 0.5)) {
      displayScrollElement(el)
    } else if (elementOutOfView(el)) {
      hideScrollElement(el)
    }
  }

  )
}
//UTILITY
// throttle - fn = function to call, wait = interval in ms
function throttle(fn, wait) {
  let inThrottle, lastFn, lastTime;
  return function () {
    const context = this,
      args = arguments;
    if (!inThrottle) {
      fn.apply(context, args);
      lastTime = Date.now();
      inThrottle = true;
    } else {
      clearTimeout(lastFn);
      lastFn = setTimeout(function () {
        if (Date.now() - lastTime >= wait) {
          fn.apply(context, args);
          lastTime = Date.now();
        }
      }, Math.max(wait - (Date.now() - lastTime), 0));
    }
  };
};
