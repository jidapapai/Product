import { render, screen, fireEvent } from '@testing-library/react'
import BaseSelect from './BaseSelect'
import { MenuItem } from '@mui/material'

const options = [
  { value: 'option1', label: 'Option 1' },
  { value: 'option2', label: 'Option 2' },
  { value: 'option3', label: 'Option 3' },
]

describe('BaseSelect', () => {
  it('renders the BaseSelect with label and options', () => {
    render(
      <BaseSelect label="Test Select" labelId="test-select" value="">
        {options.map((option) => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </BaseSelect>
    )
    
    expect(screen.getByLabelText('Test Select')).toBeInTheDocument()
    expect(screen.getByRole('combobox')).toBeInTheDocument()
  })

  it('renders all menu items as options', () => {
    render(
      <BaseSelect label="Test Select" labelId="test-select" value="">
        {options.map((option) => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </BaseSelect>
    )
    
    const select = screen.getByRole('combobox')
    fireEvent.mouseDown(select)
    
    options.forEach((option) => {
      expect(screen.getByText(option.label)).toBeInTheDocument()
    })
  })

  it('displays the selected value correctly', () => {
    render(
      <BaseSelect label="Test Select" labelId="test-select" value="option2">
        {options.map((option) => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </BaseSelect>
    )

    const select = screen.getByRole('combobox')
    fireEvent.mouseDown(select)
    const list = screen.getByRole('listbox')
    expect(list.querySelector('[data-value="option2"]')).toHaveClass('Mui-selected')
  })

  it('handles value change when option is selected', () => {
    const handleChange = vi.fn()
    
    render(
      <BaseSelect 
        label="Test Select" 
        labelId="test-select" 
        value="option1"
        onChange={handleChange}
      >
        {options.map((option) => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </BaseSelect>
    )
    
    const select = screen.getByRole('combobox')
    fireEvent.mouseDown(select)
    
    const option2 = screen.getByText('Option 2')
    fireEvent.click(option2)
    
    expect(handleChange).toHaveBeenCalled()
  })

  it('applies disabled state correctly', () => {
    render(
      <BaseSelect label="Test Select" labelId="test-select" value="" disabled>
        {options.map((option) => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </BaseSelect>
    )
    
    const select = screen.getByRole('combobox')
    expect(select).toHaveClass('Mui-disabled')
  })

  it('passes through additional props to Select component', () => {
    render(
      <BaseSelect 
        label="Test Select" 
        labelId="test-select" 
        value="" 
        data-testid="custom-select"
      >
        {options.map((option) => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </BaseSelect>
    )
    
    expect(screen.getByTestId('custom-select')).toBeInTheDocument()
  })
})