import { useNavigate, useParams } from 'react-router-dom'
import { ButtonComponent } from '../../components/ButtonComponent'
import { MainContainer } from '../../templates/MainContainer'
import { SectionContainer } from '../../templates/SectionContainer'
import { ActionsFooterContainer } from '../../templates/ActionsFooterContainer'
import { useChecklists } from '../../contexts/ChecklistsContext'
import { CheckboxComponent } from '../../components/CheckboxComponent'
import { useEffect, useState } from 'react'
import { AppError } from '../../utils/AppError'
import { useToast } from '../../contexts/ToastContext'
import {
  listPrinciplesService,
  listPrinciplesServiceDefaultErrorMessage,
} from '../../services/principle/listPrinciples'
import { PrincipleDTO } from '../../dtos/principleDTO'
import styled from 'styled-components'

export function PrincipleFamilies() {
  const { principles, onSetPrinciples } = useChecklists()
  const { toastError } = useToast()
  const { id } = useParams()
  const navigate = useNavigate()
  const [allPrinciples, setAllPrinciples] = useState<PrincipleDTO[]>([])
  const [selectedPrincipleIds, setSelectedPrincipleIds] = useState<string[]>([])

  const goToChecklistFamilies = () => {
    if (id) {
      navigate(`/checklist-families/${id}`)
    } else {
      navigate('/checklist-families')
    }
  }

  useEffect(() => {
    const fetchPrinciples = async () => {
      try {
        const data = await listPrinciplesService()
        setAllPrinciples(data.principles)
        if (principles && principles.length > 0) {
          setSelectedPrincipleIds(principles.map((p) => String(p.id)))
        }
      } catch (error) {
        const isAppError = error instanceof AppError
        const title = isAppError
          ? error.message
          : listPrinciplesServiceDefaultErrorMessage
        toastError(title)
      }
    }
    fetchPrinciples()
  }, [principles, toastError])

  const handlePrincipleCheckboxChange = (principleId: number) => {
    const idStr = String(principleId)
    setSelectedPrincipleIds((prev) =>
      prev.includes(idStr)
        ? prev.filter((id) => id !== idStr)
        : [...prev, idStr],
    )
  }

  const handleContinue = () => {
    if (selectedPrincipleIds.length === 0) {
      toastError('Selecione pelo menos um princípio para continuar.')
      return
    }
    const filteredPrinciples = allPrinciples.filter((p) =>
      selectedPrincipleIds.includes(String(p.id)),
    )
    onSetPrinciples(filteredPrinciples)
    goToChecklistFamilies()
  }

  return (
    <MainContainer>
      <SectionContainer hasHeader>
        <PrinciplesContainer>
          <p>
            Selecione abaixo quais princípios você quer incluir nessa avaliação:
          </p>
          <form>
            {allPrinciples &&
              allPrinciples.length > 0 &&
              allPrinciples.map((principle) => (
                <CheckboxComponent
                  key={principle.id}
                  value={String(principle.id)}
                  checked={selectedPrincipleIds.includes(String(principle.id))}
                  labelText={principle.name}
                  onChange={() => handlePrincipleCheckboxChange(principle.id)}
                />
              ))}
          </form>
        </PrinciplesContainer>
      </SectionContainer>
      <ActionsFooterContainer hasMessage>
        <ButtonComponent text="Voltar" action={() => navigate('/')} />
        <ButtonComponent
          text="Continuar"
          action={handleContinue}
          disabled={selectedPrincipleIds.length === 0}
        />
      </ActionsFooterContainer>
    </MainContainer>
  )
}

const PrinciplesContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  padding: 1rem;

  form {
    display: flex;
    flex-direction: column;
    gap: 1rem;

    input[type='checkbox'] {
      width: 1.25rem;
      height: 1.25rem;
      accent-color: ${({ theme }) => theme.colors.contrast};
    }
  }
`
