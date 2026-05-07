import { useState } from 'react'
import { MainContainer } from '../../templates/MainContainer'
import { SectionContainer } from '../../templates/SectionContainer'
import { useTheme } from 'styled-components'
import { ChartsContainer } from '../ChartsContainer'
import { SectionTitleComponent } from '../SectionTitleComponent'
import { SectionWithItemsTableComponent } from '../SectionWithItemsTableComponent'
import { CheckboxesAnswerComponent } from '../CheckboxesAnswerComponent'
import { PrincipleDTO } from '../../dtos/principleDTO'
import { StepperSectionsComponent } from '../StepperSectionsComponent'
import { useChecklists } from '../../contexts/ChecklistsContext'
import { getItemValidationMessage } from '../../libs/business'

interface ItemsTablePageComponentProps {
  text: string
  isMandatory: boolean
  principles: PrincipleDTO[]
  action: () => void
}

export function ItemsTablePageComponent({
  text,
  isMandatory,
  principles,
  action,
}: ItemsTablePageComponentProps) {
  const theme = useTheme()
  const [activeStep, setActiveStep] = useState(0)
  const { filteredChecklist } = useChecklists()

  const colors = [
    theme.colors.green,
    theme.colors.red,
    theme.colors.wheat,
    theme.colors.contrast,
  ]

  const handleNext = () => {
    if (activeStep < principles.length - 1) setActiveStep((s) => s + 1)
    else action()
  }
  const handleBack = () => {
    if (activeStep > 0) setActiveStep((s) => s - 1)
  }

  // Função para checar se todos os itens de uma seção estão preenchidos
  function isPrincipleComplete(principleId: number) {
    const items = filteredChecklist(isMandatory, principleId)
    if (items.length === 0) return false
    return items.every((item) => {
      return item.answer && !getItemValidationMessage(item)
    })
  }

  // Array indicando se cada seção está completa
  const completedSteps = principles.map((principle) =>
    isPrincipleComplete(principle.id),
  )

  const hasPrinciples = principles && principles.length > 0

  return (
    <MainContainer hasTable>
      <CheckboxesAnswerComponent />
      <SectionContainer hasHeader>
        <SectionTitleComponent text={text} />
        {hasPrinciples && (
          <ChartsContainer isMandatory={isMandatory} colors={colors} />
        )}
      </SectionContainer>
      {hasPrinciples && (
        <strong>
          ATENÇÃO: Para todos os itens respondidos com &quot;Não&quot;, é
          obrigatório preencher o grau de severidade e o comentário do
          avaliador.
        </strong>
      )}
      {hasPrinciples ? (
        <>
          <StepperSectionsComponent
            principles={principles}
            activeStep={activeStep}
            onStepClick={setActiveStep}
            completedSteps={completedSteps}
            handleNext={handleNext}
            handleBack={handleBack}
          >
            {principles[activeStep] && (
              <SectionWithItemsTableComponent
                isMandatory={isMandatory}
                principles={[principles[activeStep]]}
              />
            )}
          </StepperSectionsComponent>
        </>
      ) : (
        <SectionContainer style={{ marginTop: 32, marginBottom: 32 }}>
          <SectionTitleComponent
            text="Nenhum item disponível para esta etapa."
            isSecondary
          />
          <p style={{ textAlign: 'center', margin: '24px 0' }}>
            Não há itens para serem preenchidos nesta etapa.
          </p>
        </SectionContainer>
      )}
    </MainContainer>
  )
}
