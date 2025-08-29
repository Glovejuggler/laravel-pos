// long-press.js
export default {
  mounted(el, binding) {
    let pressTimer = null

    const start = (e) => {
      if (e.type === 'click' && e.button !== 0) return // only left click
      if (pressTimer === null) {
        pressTimer = setTimeout(() => {
          binding.value(e) // call the function passed in
        }, 600) // 600ms threshold
      }
    }

    const cancel = () => {
      if (pressTimer !== null) {
        clearTimeout(pressTimer)
        pressTimer = null
      }
    }

    el.addEventListener('mousedown', start)
    el.addEventListener('touchstart', start)
    el.addEventListener('click', cancel)
    el.addEventListener('mouseout', cancel)
    el.addEventListener('mouseup', cancel)
    el.addEventListener('touchend', cancel)
    el.addEventListener('touchcancel', cancel)
  }
}
