import { redefine } from '../redefine'
import copyWithin from 'core-js-pure/internals/array-copy-within'

redefine(Array, 'copyWithin', copyWithin)
