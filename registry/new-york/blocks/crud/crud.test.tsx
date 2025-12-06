import { render, screen, fireEvent, waitFor, act, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import { Crud, CrudForm, CrudFormType } from './index';
import { useState } from 'react';
import { useMediaQuery } from '../drawer-dialog/hooks/use-media-query';

// Mock useMediaQuery to force desktop view
jest.mock('../drawer-dialog/hooks/use-media-query');
const mockUseMediaQuery = useMediaQuery as jest.Mock;

type TestData = {
  id: string;
  name: string;
};

const defaultData: TestData = { id: '', name: '' };

const TestCrud = ({
  onCreate = jest.fn(),
  onEdit = jest.fn(),
  onDelete = jest.fn(),
  initialData = [] as TestData[],
}: {
  onCreate?: jest.Mock;
  onEdit?: jest.Mock;
  onDelete?: jest.Mock;
  initialData?: TestData[];
}) => {
  const [data, setData] = useState<TestData[]>(initialData);
  const formState = useState<CrudFormType<TestData>>({
    method: 'create',
    data: defaultData,
  });
  const [formType, setFormType] = formState;

  // Sync form data handling for the "form input" simulation
  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormType({ ...formType, data: { ...formType.data, name: e.target.value } });
  };

  return (
    <Crud
      name="Item"
      data={data}
      formState={formState}
      defaultData={defaultData}
      columns={[
        { accessorKey: 'id', header: 'ID' },
        { accessorKey: 'name', header: 'Name' },
      ]}
      onCreate={(d, e) => {
        onCreate(d, e);
        setData([...data, { ...d, id: 'new-id' }]); // Simulate add
      }}
      onEdit={(d, e) => {
        onEdit(d, e);
        setData(data.map(item => item.id === d.id ? d : item));
      }}
      onDelete={(d) => {
        onDelete(d);
        setData(data.filter(item => item.id !== d.id));
      }}
    >
      <CrudForm>
        <label htmlFor="name-input">Name</label>
        <input
          id="name-input"
          value={formType.data.name}
          onChange={handleNameChange}
        />
      </CrudForm>
    </Crud>
  );
};

describe('Crud Component', () => {
  beforeEach(() => {
    mockUseMediaQuery.mockReturnValue(true); // Desktop
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
    jest.clearAllMocks();
  });

  it('renders "Add Item" button and table', () => {
    render(<TestCrud />);
    expect(screen.getByText('Add Item')).toBeInTheDocument();
    expect(screen.getByText('No results.')).toBeInTheDocument();
  });

  it('opens add dialog and submits new item', async () => {
    const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });
    const onCreateStub = jest.fn();
    render(<TestCrud onCreate={onCreateStub} />);

    // Open Add Dialog
    await user.click(screen.getByText('Add Item'));

    expect(await screen.findByRole('heading', { name: 'Add Item' })).toBeInTheDocument(); // Dialog title

    // Fill form
    const input = screen.getByLabelText('Name');
    await user.type(input, 'New Item');

    // Submit
    const saveButton = screen.getByText('Save changes');
    await user.click(saveButton);

    // Initial state: submitting
    expect(screen.getByText('Saving...')).toBeInTheDocument();

    // Fast-forward timer
    act(() => {
      jest.runAllTimers();
    });

    await waitFor(() => {
      expect(onCreateStub).toHaveBeenCalled();
      expect(screen.getByText('New Item')).toBeInTheDocument(); // In table
    });
  });

  it('opens edit dialog and updates item', async () => {
    const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });
    const initialData = [{ id: '1', name: 'Existing Item' }];
    const onEditStub = jest.fn();
    render(<TestCrud initialData={initialData} onEdit={onEditStub} />);

    // Open Actions menu
    const actionsButton = screen.getByRole('button', { name: /open menu/i });
    await user.click(actionsButton);

    // Click Edit
    const editButton = await screen.findByText('Edit');
    await user.click(editButton);

    // Check Dialog Title
    expect(await screen.findByRole('heading', { name: 'Edit Item' })).toBeInTheDocument();

    // Check input has value
    const input = screen.getByLabelText('Name');
    expect(input).toHaveValue('Existing Item');

    // Change value
    await user.clear(input);
    await user.type(input, 'Updated Item');

    // Submit
    const saveButton = screen.getByText('Save changes');
    await user.click(saveButton);

    act(() => {
      jest.runAllTimers();
    });

    await waitFor(() => {
      expect(onEditStub).toHaveBeenCalled();
      expect(screen.queryByText('Existing Item')).not.toBeInTheDocument();
      expect(screen.getByText('Updated Item')).toBeInTheDocument();
    });
  });

  it('opens delete confirmation and deletes item', async () => {
    const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });
    const initialData = [{ id: '1', name: 'To Delete' }];
    const onDeleteStub = jest.fn();
    render(<TestCrud initialData={initialData} onDelete={onDeleteStub} />);

    // Verify item is there
    expect(screen.getByText('To Delete')).toBeInTheDocument();

    // Open Actions menu
    const actionsButton = screen.getByRole('button', { name: /open menu/i });
    await user.click(actionsButton);

    // Click Delete
    const deleteOption = await screen.findByText('Delete');
    await user.click(deleteOption);

    // Verify Alert Dialog
    expect(await screen.findByText('Are you absolutely sure?')).toBeInTheDocument();

    // Click Confirm Delete
    // The button usually has text "Delete" and specific class, let's find it.
    // In index.tsx: <AlertDialogAction ...>Delete</AlertDialogAction>
    // There might be multiple "Delete" texts (the menu item `Delete`), so scoped search or unique text is better.
    // The dialog should be top layer.
    const dialog = screen.getByRole('alertdialog');
    const deleteButton = within(dialog).getByText('Delete');

    await user.click(deleteButton);

    await waitFor(() => {
      expect(onDeleteStub).toHaveBeenCalled();
      expect(screen.queryByText('To Delete')).not.toBeInTheDocument();
    });
  });
});

