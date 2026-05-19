import { useTheme } from 'styled-components'
import { ChartsContainer } from '../../../../components/ChartsContainer'
import { SectionContainer } from '../../../../templates/SectionContainer'
import { SectionTitleComponent } from '../../../../components/SectionTitleComponent'
import { SectionWithItemsTableComponent } from '../../../../components/SectionWithItemsTableComponent'

export function ReportContent() {
  const theme = useTheme()

  const colors = [
    theme.colors.green,
    theme.colors.red,
    theme.colors.wheat,
    theme.colors.contrast,
  ]

  return (
    <>
      <SectionContainer>
        <SectionTitleComponent text="Gráficos" isSecondary />
        <SectionContainer style={{ marginBottom: 20 }}>
          <ChartsContainer colors={colors} />
        </SectionContainer>
      </SectionContainer>
      <SectionContainer>
        <SectionTitleComponent text="Tabelas de Itens" isSecondary />
        <SectionWithItemsTableComponent isReport />
      </SectionContainer>
    </>
  )
}
