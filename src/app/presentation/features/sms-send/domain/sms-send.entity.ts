/**
 * Sms send entity.
 */
export function isSmsSendIndividual(sms: SmsSend): sms is SmsSendIndividual {
  return sms.id === SmsSendId.INDIVIDUAL
}

interface SmsSendBase {
  id: SmsSendId
}

export function isSmsSendMassive(sms: SmsSend): sms is SmsSendMassive {
  return sms.id === SmsSendId.MASSIVE
}

export enum SmsSendId {
  INDIVIDUAL = 'individual',
  MASSIVE = 'massive'
}

export type SmsSend = SmsSendIndividual | SmsSendMassive

export interface SmsSendIndividual extends SmsSendBase {
  id: SmsSendId.INDIVIDUAL
  message: string
  phone: string
}

export interface SmsSendMassive extends SmsSendBase {
  id: SmsSendId.MASSIVE
  file: File
}
