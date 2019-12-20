import { redefine } from '../redefine'
import multibyte from 'core-js-pure/internals/string-multibyte'

redefine(String, 'includes', function (pos) {
  return multibyte.codeAt(this, pos)
})
