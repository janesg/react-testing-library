import { render, screen } from '@testing-library/react';
import user from '@testing-library/user-event';
import App from './App';

test('enter a new user and display on list', async () => {
    render(<App />);

    const nameInput = screen.getByRole('textbox', { name: /Name/ });
    const emailInput = screen.getByRole('textbox', { name: /email/i });
    const button = screen.getByRole('button');

    await user.click(nameInput);
    await user.keyboard('Jane');

    await user.click(emailInput);
    await user.keyboard('jane@jane.com');

    await user.click(button);

    // screen.debug();

    const name = screen.getByRole('cell', { name: /Jane/ });
    const email = screen.getByRole('cell', { name: /jane@jane.com/i });

    expect(name).toBeInTheDocument();
    expect(email).toBeInTheDocument();
});