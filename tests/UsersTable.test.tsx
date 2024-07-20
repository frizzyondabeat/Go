import RootLayout from '@/app/layout';
import { UsersTable } from '@/app/settings/users/_components/users-table';
import { User } from '@/types/general-types';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { http, HttpResponse } from 'msw';
import { setupServer } from 'msw/node';
import { afterAll, afterEach, beforeAll, beforeEach, describe, expect, it, vi } from 'vitest';
import { renderWithClient } from './utils/react-query-test-utils';

export const handlers = [
    http.get('*/users', () => {
        return HttpResponse.json([
            {
                id: 1,
                email: 'test@example.com',
                name: 'John Doe',
                role: 'Administrator',
                password: 'password',
            },
        ]);
    }),
];

const server = setupServer(...handlers);

vi.mock('next/font/local', () => ({
    default: vi.fn(() => ({
        localFont: vi.fn().mockReturnValue({
            fontFamily: 'Mocked Font Family',
        }),
    })),
}));

describe('Integration tests for UsersTable', () => {
    beforeAll(() => server.listen());

    afterEach(() => server.resetHandlers());

    afterAll(() => server.close());

    beforeEach(() => {
        vi.clearAllMocks();
    });

    it('should fetch users data and display in table when API call is successful', async () => {
        const { getByText } = renderWithClient(<UsersTable />);

        await waitFor(() => expect(getByText(/test@example.com/i)).toBeDefined());
    });

    it('should handle empty data response and show "No results" message', async () => {
        server.use(
            http.get('*/users', () => {
                return HttpResponse.json([]);
            })
        );

        const { getByText } = renderWithClient(<UsersTable />);

        await waitFor(() => expect(getByText(/No results/i)).toBeDefined());
    });

    it('should handle API error and show error toast message', async () => {
        server.use(
            http.get('*/users', () => {
                return HttpResponse.json({ message: 'Failed to fetch users' }, { status: 500 });
            })
        );

        renderWithClient(<UsersTable />);
        const { getByText } = render(<RootLayout> </RootLayout>);

        await waitFor(() => expect(getByText(/Failed to fetch users/i)).toBeDefined());
    });

    it('should apply sorting to columns and update table accordingly', async () => {
        const mockData: User[] = [
            { id: '1', email: 'b@example.com', name: 'Amaka Doe', role: 'administrator' },
            { id: '2', email: 'a@example.com', name: 'Jane Doe', role: 'sales-representative' },
        ];
        server.use(
            http.get('*/users', () => {
                return HttpResponse.json(mockData);
            })
        );
        const { getByText, getAllByRole } = renderWithClient(<UsersTable />);

        fireEvent.click(screen.getByText(/Email/i));

        await waitFor(() => {
            const rows = getAllByRole('row');
            expect(rows[1]).toContain(getByText(/a@example.com/i));
            expect(rows[2]).toContain(getByText(/b@example.com/i));
        });
    });

    it('should apply filtering on input change and update table accordingly', async () => {
        const mockData: User[] = [
            { id: '1', email: 'b@example.com', name: 'Amaka Doe', role: 'administrator' },
            { id: '2', email: 'a@example.com', name: 'Jane Doe', role: 'sales-representative' },
            { id: '3', email: 'jod@gmail.com', name: 'Jake Danuta', role: 'sales-representative' },
        ];

        server.use(
            http.get('*/users', () => {
                return HttpResponse.json(mockData);
            })
        );

        const { getByText, getAllByRole, getByPlaceholderText } = renderWithClient(<UsersTable />);

        const input = getByPlaceholderText(/Filter emails.../i);

        fireEvent.change(input, { target: { value: 'a@example.com' } });

        await waitFor(() => {
            const rows = getAllByRole('row');
            expect(rows[1]).toContain(getByText(/a@example.com/i));
        });
    });
});
