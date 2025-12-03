import { createContext, useContext, useState } from "react"
import CrudTable, { CrudTableProps } from "./table"
import { DrawerDialog, DrawerDialogContent } from "../drawer-dialog/drawer-dialog"
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "../../ui/alert-dialog"
import { Button } from "../../ui/button"

const CrudContext = createContext(undefined)

export function useCrud() {
  return useContext(CrudContext)
}

export type CrudProps<TData, TValue> = {
} & CrudTableProps<TData, TValue>

export function Crud<TData, TValue>({ columns, data, onView, onEdit, onDelete }: CrudProps<TData, TValue>) {
  const [dialogOpen, setDialogOpen] = useState(false)
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [deleteRow, setDeleteRow] = useState<TData | null>(null)
  const onCrudView = (row: TData) => {
    onView?.(row) && setDialogOpen(true)
  }
  const onCrudEdit = (row: TData) => {
    onEdit?.(row) && setDialogOpen(true)
  }
  const onCrudDelete = (row: TData) => {
    if (!onDelete) return
    setDeleteDialogOpen(true)
    setDeleteRow(row)
  }
  return (
    <CrudContext.Provider value={undefined}>
      <div className="flex flex-col gap-2">
        <div className="flex justify-end">
          <Button onClick={() => setDialogOpen(true)}>
            Add
          </Button>
        </div>
        <CrudTable columns={columns} data={data} onView={onCrudView} onEdit={onCrudEdit} onDelete={onCrudDelete} />
      </div>
      <DrawerDialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DrawerDialogContent><div>Drawer Content</div></DrawerDialogContent>
      </DrawerDialog>
      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the record.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => deleteRow && onDelete?.(deleteRow)}
              className="bg-red-600 hover:bg-red-700"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </CrudContext.Provider>
  )
}

export { CrudTable }