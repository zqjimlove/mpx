import { redefine } from '../redefine'
import pad from 'core-js-pure/internals/string-pad'

redefine(String, 'padStart', function (maxLength) {
  return pad.start(this, maxLength, arguments.length > 1 ? arguments[1] : undefined)
})
