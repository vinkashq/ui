
import { render, screen, fireEvent } from '@testing-library/react';
import { DrawerDialog, DrawerDialogTrigger, DrawerDialogContent, DrawerDialogHeader, DrawerDialogTitle, DrawerDialogDescription, DrawerDialogFooter } from './drawer-dialog';
import { useMediaQuery } from './hooks/use-media-query';

jest.mock('./hooks/use-media-query');

const mockUseMediaQuery = useMediaQuery as jest.Mock;

describe('DrawerDialog', () => {
  it('renders as a dialog on desktop', () => {
    mockUseMediaQuery.mockReturnValue(true);

    render(
      <DrawerDialog>
        <DrawerDialogTrigger><button>Open</button></DrawerDialogTrigger>
        <DrawerDialogContent>
          <DrawerDialogHeader>
            <DrawerDialogTitle>Dialog Title</DrawerDialogTitle>
            <DrawerDialogDescription>Dialog Description</DrawerDialogDescription>
          </DrawerDialogHeader>
          <p>Dialog Content</p>
          <DrawerDialogFooter>
            <button>Close</button>
          </DrawerDialogFooter>
        </DrawerDialogContent>
      </DrawerDialog>
    );

    fireEvent.click(screen.getByText('Open'));

    expect(screen.getByText('Dialog Title')).toBeInTheDocument();
    expect(screen.getByText('Dialog Description')).toBeInTheDocument();
    expect(screen.getByText('Dialog Content')).toBeInTheDocument();
  });

  it('renders as a drawer on mobile', () => {
    mockUseMediaQuery.mockReturnValue(false);

    render(
      <DrawerDialog>
        <DrawerDialogTrigger><button>Open</button></DrawerDialogTrigger>
        <DrawerDialogContent>
          <DrawerDialogHeader>
            <DrawerDialogTitle>Drawer Title</DrawerDialogTitle>
            <DrawerDialogDescription>Drawer Description</DrawerDialogDescription>
          </DrawerDialogHeader>
          <p>Drawer Content</p>
          <DrawerDialogFooter>
            <button>Close</button>
          </DrawerDialogFooter>
        </DrawerDialogContent>
      </DrawerDialog>
    );

    fireEvent.click(screen.getByText('Open'));

    expect(screen.getByText('Drawer Title')).toBeInTheDocument();
    expect(screen.getByText('Drawer Description')).toBeInTheDocument();
    expect(screen.getByText('Drawer Content')).toBeInTheDocument();
  });
});
