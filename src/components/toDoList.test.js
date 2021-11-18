import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'

import { ToDoList } from './ToDoList'

describe('ToDoList compnent', () => {
    it('ToDoList renders', () => {
        render(<ToDoList />)

        expect(screen.getByText('delete')).toBeInTheDocument();
        expect(screen.getByText('Add')).toBeInTheDocument();
    })
})