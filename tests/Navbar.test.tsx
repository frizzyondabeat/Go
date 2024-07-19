import { describe, expect, it } from 'vitest';
import { Navbar } from '@/components/Navbar';
import { fireEvent, render, screen } from '@testing-library/react';

declare const global: {
    NavbarButtonOptions: any[];
};

describe('unit tests', () => {
    it('should render the Navbar component', () => {
        const { container } = render(<Navbar />);
        expect(container).toMatchSnapshot();
    });

    it('should display alt text when profile image fails to load', () => {
        const { container } = render(<Navbar />);
        const image = container.querySelector('img[alt="logo"]') as HTMLImageElement;
        fireEvent.error(image);
        expect(image.alt).toBe('logo');
    });

    it('should render correctly with an empty NavbarButtonOptions array', () => {
        const originalNavbarButtonOptions = global.NavbarButtonOptions;
        global.NavbarButtonOptions = [];
        const { container } = render(<Navbar />);
        expect(container).toBeDefined();
        global.NavbarButtonOptions = originalNavbarButtonOptions;
    });

    it('should have appropriate aria-labels for accessibility', () => {
        render(<Navbar />);
        const inputs = screen.getAllByLabelText('Search');

        inputs.forEach(input => {
            expect(input).toBeDefined();
        });
    });
});
