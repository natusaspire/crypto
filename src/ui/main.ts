import { ElementId } from './constants';
import { encrypt, decrypt, copy } from './core';

document.getElementById(ElementId.ENCRYPT).addEventListener('click', encrypt);

document.getElementById(ElementId.DECRYPT).addEventListener('click', decrypt);

document.getElementById(ElementId.COPY).addEventListener('click', copy);
