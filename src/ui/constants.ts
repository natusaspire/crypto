export enum ElementId {
  DATA = 'data',
  PASSWORD = 'password',
  RESULT = 'result',
  STATUS = 'status',
  ENCRYPT = 'encrypt',
  DECRYPT = 'decrypt',
  COPY = 'copy',
}

export enum StatusType {
  PROGRESS,
  SUCCESS,
  ERROR,
}

export enum Status {
  ENCRYPTION_IN_PROGRESS,
  DECRYPTION_IN_PROGRESS,
  ENCRYPTION_SUCCESSFUL,
  DECRYPTION_SUCCESSFUL,
  ENCRYPTION_FAILED,
  DECRYPTION_FAILED,
}

export const STATUS_CLASSNAMES: ReadonlyMap<StatusType, string> = new Map<StatusType, string>()
  .set(StatusType.PROGRESS, 'status__text status__text--progress')
  .set(StatusType.SUCCESS, 'status__text status__text--success')
  .set(StatusType.ERROR, 'status__text status__text--error');

export const STATUS_MESSAGES: ReadonlyMap<Status, string> = new Map<Status, string>()
  .set(Status.ENCRYPTION_IN_PROGRESS, 'Encrypting...')
  .set(Status.DECRYPTION_IN_PROGRESS, 'Decrypting...')
  .set(Status.ENCRYPTION_SUCCESSFUL, 'Encryption successful')
  .set(Status.DECRYPTION_SUCCESSFUL, 'Decryption successful')
  .set(Status.ENCRYPTION_FAILED, 'Encryption failed')
  .set(Status.DECRYPTION_FAILED, 'Decryption failed, please check your data and password and try again');
