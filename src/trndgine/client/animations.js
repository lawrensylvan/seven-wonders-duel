
import anime from 'animejs'

export const fadeOut = (el, i, onComplete) => {
    anime({
      targets: el,
      opacity: 0,
      delay: i * 10,
      easing: "easeOutSine",
      complete: onComplete
    })
}

export const fadeIn = (el, i) => {
    anime({
      targets: el,
      opacity: 1,
      delay: i * 10,
      easing: "easeOutSine"
    })
}

export const rotateOut = (el, i, onComplete) => {
  anime({
    targets: el,
    rotateY: [{ value: "180deg", duration: 100 }],
    delay: i * 10,
    easing: "easeOutSine",
    complete: onComplete
  })
}