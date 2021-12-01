/* eslint-disable linebreak-style */
/* eslint-disable no-undef */
/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable linebreak-style */
import { render, screen } from '@testing-library/react'
import App from './App'

// eslint-disable-next-line no-undef
test('renders learn react link', () => {
  render(<App />)
  const linkElement = screen.getByText(/learn react/i)
  expect(linkElement).toBeInTheDocument()
})
