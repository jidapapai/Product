import { render, screen } from '@testing-library/react'
import BaseCheckBoxSingle from './BaseCheckboxSingle'

describe('BaseCheckBoxSingle with label', () => {

  it('renders the BaseCheckBoxSingle without label', () => {
    render(<BaseCheckBoxSingle name="test" />)
    const label = screen.getByTestId('test');
    const element = label.querySelector('.MuiFormControlLabel-label')
    expect(element).not.toBeInTheDocument()
  })

  it('renders the BaseCheckBoxSingle with label', () => {
    render(<BaseCheckBoxSingle name="test" label="Test" />)
    const label = screen.getByTestId('test');
    const element = label.querySelector('.MuiFormControlLabel-label')
    expect(element?.innerHTML).toBe('Test')
  })

  it('renders the BaseCheckBoxSingle with unchecked', () => {
    render(<BaseCheckBoxSingle  label="Test" checked={false} />)
    const element = screen.getByRole('checkbox', { name: 'Test', checked: false })
    expect(element).toBeInTheDocument()
  })

  it('renders the BaseCheckBoxSingle with checked', () => {
    render(<BaseCheckBoxSingle  label="Test" checked={true} />)
    const element = screen.getByRole('checkbox', { name: 'Test', checked: true })
    expect(element).toBeInTheDocument()
  })

  it('renders the BaseCheckBoxSingle state to change', () => {
    render(<BaseCheckBoxSingle  label="Test" />)
    const element = screen.getByRole('checkbox', { name: 'Test'})
    element.click();
    expect(element).toBeChecked()
    element.click();
    expect(element).not.toBeChecked()
  })
})