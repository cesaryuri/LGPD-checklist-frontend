import { MainContainer } from '../../templates/MainContainer'
import { SectionContainer } from '../../templates/SectionContainer'
import { useTheme } from 'styled-components'
import { ChartsContainer } from '../ChartsContainer'
import { SectionTitleComponent } from '../SectionTitleComponent'
import { SectionWithItemsTableComponent } from '../SectionWithItemsTableComponent'
import { CheckboxesAnswerComponent } from '../CheckboxesAnswerComponent'
import { useNavigate } from 'react-router-dom'
import { ActionsFooterContainer } from '../../templates/ActionsFooterContainer'
import { ButtonComponent } from '../ButtonComponent'

interface ItemsTablePageComponentProps {
  text: string
  action: () => void
}

export function ItemsTablePageComponent({
  text,
  action,
}: ItemsTablePageComponentProps) {
  const navigate = useNavigate()
  const theme = useTheme()

  const colors = [
    theme.colors.green,
    theme.colors.red,
    theme.colors.wheat,
    theme.colors.contrast,
  ]

  return (
    <MainContainer hasTable>
      <CheckboxesAnswerComponent />
      <SectionContainer hasHeader>
        <SectionTitleComponent text={text} />
        <ChartsContainer colors={colors} />
      </SectionContainer>
      <strong>
        ATENÇÃO: Para todos os itens respondidos com &quot;Não&quot;, é
        obrigatório preencher o grau de severidade e o comentário do avaliador.
      </strong>
      <SectionWithItemsTableComponent />
      <ActionsFooterContainer hasMessage>
        <ButtonComponent text="Voltar" action={() => navigate(-1)} />
        <ButtonComponent text="Continuar" action={action} />
      </ActionsFooterContainer>
    </MainContainer>
  )
}
