import styled from 'styled-components'

interface CheckboxComponentProps {
  value: string
  labelText: string
  checked: boolean
  onChange: React.ChangeEventHandler<HTMLInputElement> | undefined
  type?: 'checkbox' | 'radio'
  name?: string
}

export function CheckboxComponent({
  value,
  labelText,
  checked,
  onChange,
  type = 'checkbox',
  name,
}: CheckboxComponentProps) {
  return (
    <CheckboxComponentContainer>
      <label htmlFor={value}>{labelText}</label>
      <input
        type={type}
        id={value}
        name={name}
        value={value}
        checked={checked}
        onChange={onChange}
      />
    </CheckboxComponentContainer>
  )
}

const CheckboxComponentContainer = styled.div`
  display: flex;
  flex-direction: row-reverse;
  justify-content: flex-end;
  align-items: center;
  gap: 0.5rem;

  input[type='checkbox'],
  input[type='radio'] {
    width: 1.25rem;
    height: 1.25rem;
    accent-color: ${({ theme }) => theme.colors.contrast};
  }
`
