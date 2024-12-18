/**
 * Push send entity.
 */
export function isPushSendIndividual(push: PushSend): push is PushSendIndividual {
  return push.id === PushSendId.INDIVIDUAL
}

interface PushSendBase {
  id: PushSendId
  application: string
}

export function isPushSendMassive(push: PushSend): push is PushSendMassive {
  return push.id === PushSendId.MASSIVE
}

export enum PushSendId {
  INDIVIDUAL = 'individual',
  MASSIVE = 'massive'
}

export type PushSend = PushSendIndividual | PushSendMassive

export interface PushSendIndividual extends PushSendBase {
  dni: string
  id: PushSendId.INDIVIDUAL
  message: string
}

export interface PushSendMassive extends PushSendBase {
  file: File
  id: PushSendId.MASSIVE
}
