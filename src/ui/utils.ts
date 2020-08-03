import { ElementId, StatusType, STATUS_CLASSNAMES } from './constants';

const getElement = (id: string): HTMLElement => document.getElementById(id);

export const getValue = ({ value }: HTMLInputElement): string => value;

export const setValue = (input: HTMLInputElement, value: string): void => {
  input.value = value;
};

export const getDataInput = (): HTMLInputElement => getElement(ElementId.DATA) as HTMLInputElement;

export const getPasswordInput = (): HTMLInputElement => getElement(ElementId.PASSWORD) as HTMLInputElement;

export const getResultInput = (): HTMLInputElement => getElement(ElementId.RESULT) as HTMLInputElement;

export const getStatusElement = (): HTMLElement => getElement(ElementId.STATUS);

export const copyFromPasswordInput = (input: HTMLInputElement): void => {
  input.setAttribute('type', 'text');
  input.select();
  document.execCommand('copy');
  input.setAttribute('type', 'password');
};

export const setProgressStatus = (element: HTMLElement, text: string): void => {
  element.textContent = text;
  element.className = STATUS_CLASSNAMES.get(StatusType.PROGRESS);
};

export const setSuccessStatus = (element: HTMLElement, text: string): void => {
  element.textContent = text;
  element.className = STATUS_CLASSNAMES.get(StatusType.SUCCESS);
};

export const setErrorStatus = (element: HTMLElement, text: string): void => {
  element.textContent = text;
  element.className = STATUS_CLASSNAMES.get(StatusType.ERROR);
};
