export function redefine (target, el, value) {
  if (!target.prototype[el]) {
    Object.defineProperty(target.prototype, el, {
      value: value
    })
  }
}
