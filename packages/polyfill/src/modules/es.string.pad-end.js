import { redefine } from '../redefine'
import pad from 'core-js-pure/internals/string-pad'

redefine(String, 'padEnd', function (maxLength) {
  return pad.end(this, maxLength, arguments.length > 1 ? arguments[1] : undefined)
})
