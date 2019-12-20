import { redefine } from '../redefine'
import includes from 'core-js-pure/internals/array-includes'

redefine(Array, 'includes', function (value) {
  return includes.includes(this, value, arguments.length > 1 ? arguments[1] : undefined)
})
