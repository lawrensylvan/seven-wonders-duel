
import anime from 'animejs'

export const animateElementOut = (el, i, onComplete) => {
    el.style.color = "red";
    anime({
      targets: el,
      opacity: 0,
      delay: i * 10,
      easing: "easeOutSine",
      complete: onComplete
    })
}

export const animateElementIn = (el, i) => {
    anime({
      targets: el,
      opacity: 1,
      delay: i * 10,
      easing: "easeOutSine"
    })
}