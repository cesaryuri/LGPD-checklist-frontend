import { PrincipleDTO } from '../../dtos/principleDTO'
import api from '../../libs/api'

export const listPrinciplesServiceDefaultErrorMessage =
  'Não foi possível carregar a lista de princípios. Tente novamente mais tarde.'

interface ListPrinciplesServiceResponse {
  principles: PrincipleDTO[]
}

export const listPrinciplesService =
  async (): Promise<ListPrinciplesServiceResponse> => {
    const { data } = await api.get(`/principles`)
    return data
  }
