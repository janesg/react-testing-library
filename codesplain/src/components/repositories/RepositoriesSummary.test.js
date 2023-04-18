import { render, screen } from '@testing-library/react';
import RepositoriesSummary from './RepositoriesSummary';

test('displays information about the repository', () => {
    // Note: we have purposely selected numbers containing no repeating numerals
    const repository = {
        language: 'JavaScript',
        stargazers_count: 234,
        forks: 56,
        open_issues: 1
    }

    render(<RepositoriesSummary repository={repository} />);

    for (let key in repository) {
        const value = repository[key];
        // Values and text are combined within the elements so an exact match
        // won't work.
        // To allow for part matches on numbers, get the set of matching values
        // const elements = screen.getAllByText(new RegExp(value));
        // const elements = screen.getAllByText(`/${value}/i`);

        // for (let element in elements) {
        //     expect(element).toBeInTheDocument();
        // }
        // // Match whole value only to avoid part matches on numbers
        // const exp = Number.isFinite(value) ? `\\^${value}\\$` : `${value}`;
        // const element = screen.getByText(new RegExp(exp));

        const element = screen.getByText(new RegExp(value));
        expect(element).toBeInTheDocument();
    }
});
