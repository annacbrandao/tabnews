vi.mock('next/router', () => ({
  useRouter: vi.fn(() => ({
    push: vi.fn(),
    asPath: '/',
    pathname: '/',
    query: {},
  })),
}));

vi.mock('@/TabNewsUI', () => ({
  Box: ({ children, ...props }) => <div {...props}>{children}</div>,
  Header: () => <header data-testid="mock-header">Header</header>,
  Footer: () => <footer>Footer</footer>,
}));

vi.mock('pages/interface', () => ({
  Head: () => <head />,
}));

vi.mock('@tabnews/ui', () => ({
  GoToTopButton: () => <button>GoToTop</button>,
}));

import { render, fireEvent, screen } from '@testing-library/react';
import { vi } from 'vitest';
import { useRouter } from 'next/router';
import DefaultLayout from 'pages/interface/components/DefaultLayout';

describe('DefaultLayout Keyboard Shortcuts', () => {
  it('should navigate to homepage when "r" key is pressed', () => {
    const mockPush = vi.fn();
    
    useRouter.mockImplementation(() => ({
      push: mockPush,
      asPath: '/',
      pathname: '/',
      query: {},
    }));

    render(<DefaultLayout />);
    fireEvent.keyDown(window, { key: 'r' });
    
    expect(mockPush).toHaveBeenCalledWith('/');
  });

  it('should ignore "r" key when typing in input', () => {
    const mockPush = vi.fn();
    
    useRouter.mockImplementation(() => ({
      push: mockPush,
      asPath: '/',
      pathname: '/',
      query: {},
    }));

    render(
      <div>
        <DefaultLayout />
        <input data-testid="test-input" />
      </div>
    );
    
    const input = screen.getByTestId('test-input');
    fireEvent.keyDown(input, { key: 'r' });
    
    expect(mockPush).not.toHaveBeenCalled();
  });
});