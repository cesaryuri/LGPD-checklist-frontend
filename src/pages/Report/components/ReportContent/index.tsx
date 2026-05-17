import { useTheme } from 'styled-components'
import { ChartsContainer } from '../../../../components/ChartsContainer'
import { SectionContainer } from '../../../../templates/SectionContainer'
import { SectionTitleComponent } from '../../../../components/SectionTitleComponent'
import { SectionWithItemsTableComponent } from '../../../../components/SectionWithItemsTableComponent'
import { useChecklists } from '../../../../contexts/ChecklistsContext'

export function ReportContent() {
  const { uniquePrinciples } = useChecklists()
  const theme = useTheme()

  const colors = [
    theme.colors.green,
    theme.colors.red,
    theme.colors.wheat,
    theme.colors.contrast,
  ]

  const principles = uniquePrinciples()
  const hasPrinciples = principles.length > 0

  return (
    <>
      <SectionContainer>
        <SectionTitleComponent text="Gráficos" isSecondary />
        {hasPrinciples && (
          <SectionContainer style={{ marginBottom: 20 }}>
            <SectionTitleComponent text="Gráficos Itens" isSecondary />
            <ChartsContainer colors={colors} />
          </SectionContainer>
        )}
        {!hasPrinciples && (
          <SectionTitleComponent
            text="Nenhum item disponível para exibir gráficos."
            isSecondary
          />
        )}
      </SectionContainer>
      <SectionContainer>
        <SectionTitleComponent text="Tabelas de Itens" isSecondary />
        {!hasPrinciples && (
          <SectionTitleComponent text="Nenhum item disponível." isSecondary />
        )}
        <SectionWithItemsTableComponent principles={principles} isReport />
      </SectionContainer>
    </>
  )
}
