import { AnswerType, SeverityDegreeType } from '../../@types'
import api from '../../libs/api'

const editChecklistServiceDefaultErrorMessage =
  'Não foi possível salvar a checklist. Tente novamente mais tarde.'

export interface EditChecklistServiceRequest {
  id: number
  systemId: number
  deviceType: string
  items: {
    id: number
    answer: AnswerType
    severityDegree: SeverityDegreeType
    userComment?: string
  }[]
}

async function editChecklistService(
  data: EditChecklistServiceRequest,
): Promise<void> {
  await api.put(`/checklists/${data.id}`, {
    systemId: data.systemId,
    deviceType: data.deviceType,
    items: data.items,
  })
}

export { editChecklistServiceDefaultErrorMessage, editChecklistService }
