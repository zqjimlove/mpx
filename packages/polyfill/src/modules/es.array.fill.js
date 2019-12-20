import { redefine } from '../redefine'
import fill from 'core-js-pure/internals/array-fill'

redefine(Array, 'fill', fill)
