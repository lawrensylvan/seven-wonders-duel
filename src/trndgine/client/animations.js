
import anime from 'animejs'

export const rotateIn = (el, i) => {
  anime({
    targets: el,
    scale: [{value: 1}, {value: 1.4}, {value: 1, delay: 2500}],
    delay: i * 1000,
    rotateY: [{value: '+=180', delay: 2000}],
    easing: 'easeInOutSine'
  })
}

export const fadeIn = (el, i) => {
  anime({
    targets: el,
    opacity: 1,
    delay: i * 100,
    easing: "easeOutSine"
  })
}

export const fadeOut = (el, i, onComplete) => {
    anime({
      targets: el,
      opacity: 0,
      delay: i * 100,
      easing: "easeOutSine",
      complete: onComplete
    })
    return onComplete
}

export const enterTopLeft = (el, i) => {
  const {bottom, left, right} = el.getBoundingClientRect()
  anime({
    begin: () => {
      el.style.opacity = null
    },
    targets: el,
    translateX: left - right,
    translateY: bottom - window.innerHeight,
    direction: 'reverse',
    duration: 750,
    easing: 'easeOutSine',
    endDelay: 100 * i,
  })
}

export const enterBottomLeft = (el, i) => {
  const {top, left, right} = el.getBoundingClientRect()
  anime({
    begin: () => {
      el.style.opacity = null
    },
    targets: el,
    translateX: left - right,
    translateY: window.innerHeight - top,
    direction: 'reverse',
    duration: 750,
    easing: 'easeOutSine',
    endDelay: 100 * i,
  })
}

export const enterBottomRight = (el, i) => {
  const {top, left, right} = el.getBoundingClientRect()
  anime({
    begin: () => {
      el.style.opacity = null
    },
    targets: el,
    translateX: right - left,
    translateY: window.innerHeight - top,
    direction: 'reverse',
    duration: 750,
    easing: 'easeOutSine',
    endDelay: 100 * i,
  })
}

export const leaveBottomRight = (el, i, removeElement) => {
  const {top, left, right} = el.getBoundingClientRect()
  anime({
    targets: el,
    translateX: right - left,
    translateY: window.innerHeight - top,
    duration: 500,
    easing: 'easeInSine',
    delay: 100 * i,
    complete: removeElement,
  })
  return removeElement
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
