import styled, { CSSProperties } from 'styled-components'
import { ItemsTableComponent } from '../ItemsTableComponent'
import { SectionContainer } from '../../templates/SectionContainer'
import { SectionTitleComponent } from '../SectionTitleComponent'

interface SectionWithItemsTableComponentProps {
  style?: CSSProperties
  title?: string
  isReport?: boolean
}

export function SectionWithItemsTableComponent({
  style,
  title,
  isReport = false,
}: SectionWithItemsTableComponentProps) {
  return (
    <SectionWithItemsTable $isReport={isReport}>
      {title && <SectionTitleComponent text={title} isSecondary />}
      <SectionContainer style={style}>
        <ItemsContainer>
          <ItemsTableComponent isReport={isReport} />
        </ItemsContainer>
      </SectionContainer>
    </SectionWithItemsTable>
  )
}

const ItemsContainer = styled.div`
  display: flex;
  flex-direction: column;

  @media (max-width: 1000px) {
    overflow: scroll;
  }
`

interface SectionWithItemsTableProps {
  $isReport: boolean
}

const SectionWithItemsTable = styled.div<SectionWithItemsTableProps>`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: ${({ $isReport }) => ($isReport ? '2rem' : '0')};
`
