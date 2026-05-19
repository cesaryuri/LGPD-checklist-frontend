import { AnswerType, SeverityDegreeType } from '../../@types'
import { ChecklistDTO } from '../../dtos/checklistDTO'
import api from '../../libs/api'

const createChecklistServiceDefaultErrorMessage =
  'Não foi possível salvar a checklist. Tente novamente mais tarde.'

export interface CreateChecklistServiceRequest {
  userId: number
  systemId: number
  deviceType: string
  items: {
    id: number
    answer: AnswerType
    severityDegree: SeverityDegreeType
    userComment?: string
  }[]
}

export interface CreateChecklistServiceResponse {
  checklist: ChecklistDTO
}

async function createChecklistService(
  data: CreateChecklistServiceRequest,
): Promise<CreateChecklistServiceResponse> {
  const { data: responseData } = await api.post('/checklists', {
    userId: data.userId,
    systemId: data.systemId,
    deviceType: data.deviceType,
    items: data.items,
  })

  return responseData
}

export { createChecklistServiceDefaultErrorMessage, createChecklistService }
