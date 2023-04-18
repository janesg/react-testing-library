import { render, screen, within } from '@testing-library/react';
import UserList from './UserList';

const users = [
    { name: 'Jane', email: 'jane@jane.com' },
    { name: 'Sam', email: 'sam@sam.com' }
];

function renderComponent() {
    render(<UserList users={ users } />);
}

test('render 1 row per user', () => {
    // If don't want to introduce test ids into code then can use query selector
    // const { container } = render(<UserList users={ users } />);

    // eslint-disable-next-line
    // const rows = container.querySelectorAll('tbody tr');

    renderComponent();

    // screen.logTestingPlaygroundURL();
    const rows = within(screen.getByTestId('user-rows')).getAllByRole('row');

    expect(rows).toHaveLength(2);
}); 

test('render name and email of each user', () => {
    renderComponent();

    for (let user of users) {
        const name = screen.getByRole('cell', { name: user.name });
        const email = screen.getByRole('cell', { name: user.email });

        expect(name).toBeInTheDocument();
        expect(email).toBeInTheDocument();
    }
}); 
