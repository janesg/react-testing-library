import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import RepositoriesListItem from './RepositoriesListItem';

const repository = {
    full_name: 'testing-course/fake-repo', 
    language: 'JavaScript', 
    description: 'Some description about the repository', 
    owner: {
        login: 'testing-course'
    }, 
    name: 'fake-repo',
    html_url: 'https://github.com/testing-course/fake-repo' 
};

// Create a module mock for the problematic component
// jest.mock('../tree/FileIcon', () => {
//     // Mocks the content of FileIcon.js
//     return () => {
//         return 'File Icon Component';
//     };
// });

function renderComponent() {
    // <List> component requires a router context
    render(
        <MemoryRouter>
            <RepositoriesListItem repository={repository} />
        </MemoryRouter>
    );
}

// const pause = () => {
//     return new Promise(resolve => {
//         setTimeout(() => {
//             resolve();
//         }, 100);
//     });
// };

test('shows a link to the GitHub homepage for this repository', async () => {

    renderComponent();

    // screen.debug();
    // pause();
    // screen.debug();

    // This is an absolute last resort to fixing the 'act' warning
    // await act(async () => {
    //     await pause(); 
    // });

    // The FileIcon only appears after it's useEffect has completed
    // Use the async 'find..' method which uses react-dom 'act' behind the scenes
    await screen.findByRole('img', { name: 'JavaScript' });

    const link = screen.getByRole('link', {
        name: /github repository/i
    });

    expect(link).toHaveAttribute('href', repository.html_url);
});

test('shows file icon with the appropriate icon', async () => {
    renderComponent();

    const icon = await screen.findByRole('img', { name: 'JavaScript' });

    expect(icon).toHaveClass('js-icon');
});

test('shows a link to the code editor page', async () => {
    renderComponent();

    await screen.findByRole('img', { name: 'JavaScript' });

    const link = await screen.findByRole('link', {
        name: new RegExp(repository.owner.login)
    });

    expect(link).toHaveAttribute('href', `/repositories/${repository.full_name}`);
});