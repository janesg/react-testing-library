import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import HomeRoute from './HomeRoute';
import { createServer } from '../test/server';

// Create server handling return of fake data for specific API URLs
createServer([
    {
        path: '/api/repositories',
        res: (req) => {
            const language = req.url.searchParams.get('q').split('language:')[1];
            return {
                items: [
                    { id: 1, full_name: `${language}_one`},
                    { id: 2, full_name: `${language}_two`}
                ]
            }
        }
    }
]);

// const pause = () => {
//     return new Promise((resolve) => {
//         setTimeout(resolve, 100);
//     });
// };

test('renders two links for each language', async () => {
    // HomeRoute uses RepositoriesTable which uses Link which needs router context
    render(
        <MemoryRouter>
            <HomeRoute />
        </MemoryRouter>
    );

    // await pause();
    // screen.debug();

    const languages = [
        'javascript', 'typescript', 'rust', 'go', 'python', 'java'
    ];

    for (let language of languages) {
        const links = await screen.findAllByRole('link', {
            name: new RegExp(`${language}_`)
        });

        expect(links).toHaveLength(2);
        expect(links[0]).toHaveTextContent(`${language}_one`);
        expect(links[1]).toHaveTextContent(`${language}_two`);
        expect(links[0]).toHaveAttribute('href', `/repositories/${language}_one`);
        expect(links[1]).toHaveAttribute('href', `/repositories/${language}_two`);
    }
});


