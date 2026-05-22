import { AnswerType, SeverityDegreeType } from '../@types'
import { DeviceDTO } from './deviceDTO'
import { ItemDTO } from './itemDTO'

export type ChecklistItemType = {
  item: ItemDTO
  answer?: AnswerType
  severityDegree?: SeverityDegreeType
  userComment?: string
  disabled?: boolean
}

export type ChecklistDTO = {
  id: number
  userId: number
  systemId: number
  checklistItems: ChecklistItemType[]
  deviceType: DeviceDTO['name']
  createdAt: Date
  updatedAt: Date
}

export type ParsedChecklistDTO = ChecklistDTO & {
  name: string
  createdAtParsed: string
  updatedAtParsed: string
}
