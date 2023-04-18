import { render, screen } from '@testing-library/react';
import user from '@testing-library/user-event';
import UserForm from './UserForm';

test('form shows 2 inputs and a button', () => {
    // render the component
    render(<UserForm />);

    // manipulate component or find an element within it
    const inputs = screen.getAllByRole('textbox');
    const button = screen.getByRole('button');

    // make an assertion
    expect(inputs).toHaveLength(2);
    expect(button).toBeInTheDocument();
});

test('onUserAdd callback is called when form is submitted', async () => {

    const mock = jest.fn();

    render(<UserForm onUserAdd={mock}/>);

    const nameInput = screen.getByRole('textbox', { name: /Name/i });
    const emailInput = screen.getByRole('textbox', { name: /Email/i });
    const button = screen.getByRole('button');

    await user.click(nameInput);
    await user.keyboard('Jane');

    await user.click(emailInput);
    await user.keyboard('jane@jane.com');

    await user.click(button);

    expect(mock).toHaveBeenCalled();
    expect(mock).toHaveBeenCalledWith({ name: 'Jane', email: 'jane@jane.com' });
});

test('input fields cleared once submitted', async () => {
    // Note: empty callback function as not interested in it, but needed for submission
    render(<UserForm onUserAdd={() => {}} />);

    const nameInput = screen.getByRole('textbox', { name: /name/i });
    const emailInput = screen.getByRole('textbox', { name: /Email/ });
    const button = screen.getByRole('button');

    await user.click(nameInput);
    await user.keyboard('Jane');

    await user.click(emailInput);
    await user.keyboard('jane@jane.com');

    await user.click(button);

    expect(nameInput).toHaveValue('');
    expect(emailInput).toHaveValue('');
});