import { encryptData, decryptData } from '../crypto';

import { Status, STATUS_MESSAGES } from './constants';
import {
  getValue,
  setValue,
  getDataInput,
  getPasswordInput,
  getResultInput,
  getStatusElement,
  copyFromPasswordInput,
  setProgressStatus,
  setSuccessStatus,
  setErrorStatus,
} from './utils';

const getData = (): string => getValue(getDataInput());

const getPassword = (): string => getValue(getPasswordInput());

const setResult = (result: string): void => setValue(getResultInput(), result);

const clearResult = (): void => setResult('');

const copyResult = (): void => copyFromPasswordInput(getResultInput());

const setEncryptionInProgressStatus = (): void =>
  setProgressStatus(getStatusElement(), STATUS_MESSAGES.get(Status.ENCRYPTION_IN_PROGRESS));

const setDecryptionInProgressStatus = (): void =>
  setProgressStatus(getStatusElement(), STATUS_MESSAGES.get(Status.DECRYPTION_IN_PROGRESS));

const setEncryptionSuccessfulStatus = (): void =>
  setSuccessStatus(getStatusElement(), STATUS_MESSAGES.get(Status.ENCRYPTION_SUCCESSFUL));

const setDecryptionSuccessfulStatus = (): void =>
  setSuccessStatus(getStatusElement(), STATUS_MESSAGES.get(Status.DECRYPTION_SUCCESSFUL));

const setEncryptionFailedStatus = (): void =>
  setErrorStatus(getStatusElement(), STATUS_MESSAGES.get(Status.ENCRYPTION_FAILED));

const setDecryptionFailedStatus = (): void =>
  setErrorStatus(getStatusElement(), STATUS_MESSAGES.get(Status.DECRYPTION_FAILED));

export const encrypt = (): void => {
  try {
    clearResult();
    setEncryptionInProgressStatus();
    encryptData(getData(), getPassword())
      .then(setResult)
      .then(setEncryptionSuccessfulStatus)
      .catch(setEncryptionFailedStatus);
  } catch (error) {
    setEncryptionFailedStatus();
  }
};

export const decrypt = (): void => {
  try {
    clearResult();
    setDecryptionInProgressStatus();
    decryptData(getData(), getPassword())
      .then(setResult)
      .then(setDecryptionSuccessfulStatus)
      .catch(setDecryptionFailedStatus);
  } catch (error) {
    setDecryptionFailedStatus();
  }
};

export const copy = (): void => copyResult();
