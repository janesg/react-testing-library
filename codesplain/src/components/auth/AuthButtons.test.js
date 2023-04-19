import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { createServer } from '../../test/server';
import { SWRConfig } from 'swr';
import AuthButtons from './AuthButtons';

async function renderComponent() {
    // Configure SWR with a provided Map to avoid it using its own
    // internal global caching of data between tests
    // Wrap component in router as contains Link which requires router context
    render(
        <SWRConfig value={{ provider: () => new Map() }}>
            <MemoryRouter>
                <AuthButtons />
            </MemoryRouter>
        </SWRConfig>
    );

    // Look at screen output before and after a short pause to see
    // what element(s) we should wait for in our async query
    // screen.debug();
    // await pause();
    // screen.debug();

    await screen.findAllByRole('link');
}

// const pause = () => {
//     return new Promise((resolve) => {
//         return setTimeout(resolve, 100);
//     });
// }

// Use describe to organise tests into groups that use common setup
describe('when user is not signed in', () => {
    createServer([
        { 
            path: '/api/user',
            res: () => {
                return { user: null };
            }
        }
    ]);

    // test.only('sign in and sign up are visible', async () => {
    //     debugger;

    // Once we've added a 'debugger' statement to the code:
    //  - In terminal > npm run test:debug
    //  - In Chrome:
    //      - go to 'about:inspect'
    //      - wait for Remote Target #LOCALHOST to appear
    //      - click 'inspect' link to launch DevTools debugger window
    //      - fast forward to location of debugger statement

    test('sign in and sign up are visible', async () => {
        await renderComponent();

        const signInButton = screen.getByRole('link', {
            name: /sign in/i
        });
        expect(signInButton).toBeInTheDocument();
        expect(signInButton).toHaveAttribute('href', '/signin');

        const signUpButton = screen.getByRole('link', {
            name: /sign up/i
        });
        expect(signUpButton).toBeInTheDocument();
        expect(signUpButton).toHaveAttribute('href', '/signup');
    });
    
    test('sign out is not visible', async () => {
        await renderComponent();

        const signOutButton = screen.queryByRole('link', {
            name: /sign out/i
        });
        expect(signOutButton).not.toBeInTheDocument();
    });
});

// use describe.only to only run the tests included
// use test.only to only run the specific test

describe('when user is signed in', () => {
    createServer([
        { 
            path: '/api/user',
            res: () => {
                return { user: { id: 3, email: 'bob@bobbins.com' } };
            }
        }
    ]);

    test('sign out is visible', async () => {
        await renderComponent();

        const signOutButton = screen.getByRole('link', {
            name: /sign out/i
        });
        expect(signOutButton).toBeInTheDocument();
        expect(signOutButton).toHaveAttribute('href', '/signout');
    });
    
    test('sign in and sign up are not visible', async () => {
        await renderComponent();

        const signInButton = screen.queryByRole('link', {
            name: /sign in/i
        });
        expect(signInButton).not.toBeInTheDocument();

        const signUpButton = screen.queryByRole('link', {
            name: /sign up/i
        });
        expect(signUpButton).not.toBeInTheDocument();
    });    
});
