import React, { createContext, FormEvent, useContext, useState } from "react"
import CrudTable, { CrudTableProps } from "./table"
import { DrawerDialog, DrawerDialogContent, DrawerDialogContentWrapper, DrawerDialogFooter, DrawerDialogHeader, DrawerDialogTitle } from "../drawer-dialog/drawer-dialog"
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "../../ui/alert-dialog"
import { Button } from "../../ui/button"
import CrudForm from "./form"
import { Plus } from "lucide-react"

const CrudContext = createContext(undefined)

export function useCrud() {
  return useContext(CrudContext)
}

export type CrudProps<TData, TValue> = {
  name: string
  children: React.ReactNode
  onCreate: (e: FormEvent<HTMLFormElement>) => void
} & CrudTableProps<TData, TValue>

export function Crud<TData, TValue>({ name, children, columns, data, onCreate, onEdit, onDelete }: CrudProps<TData, TValue>) {
  const [dialogOpen, setDialogOpen] = useState(false)
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [deleteRow, setDeleteRow] = useState<TData | null>(null)
  const [editRow, setEditRow] = useState<TData | null>(null)
  const [submitting, setSubmitting] = useState(false)

  const onCrudEdit = (row: TData) => {
    onEdit?.(row)
    setDialogOpen(true)
    setEditRow(row)
  }
  const onCrudDelete = (row: TData) => {
    if (!onDelete) return
    setDeleteDialogOpen(true)
    setDeleteRow(row)
  }
  const Form = React.Children.toArray(children).find((child) => {
    if (React.isValidElement(child) && child.type === CrudForm) {
      return child
    }
  })
  const Content = React.Children.toArray(children).filter((child) => {
    if (React.isValidElement(child) && child.type !== CrudForm) {
      return child
    }
  })
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setSubmitting(true)
    setTimeout(() => {
      if (editRow) {
        onEdit?.(editRow)
      } else {
        onCreate(e)
      }
      setSubmitting(false)
      setDialogOpen(false)
    }, 1000)
  }
  return (
    <CrudContext.Provider value={undefined}>
      <div className="flex flex-col gap-2">
        <div className="flex justify-end">
          <Button size="sm" onClick={() => setDialogOpen(true)}>
            <Plus />
            Add {name}
          </Button>
        </div>
        <CrudTable columns={columns} data={data} onEdit={onCrudEdit} onDelete={onCrudDelete} />
        {Content}
      </div>
      <DrawerDialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DrawerDialogContent>
          <form onSubmit={handleSubmit}>
            <DrawerDialogHeader>
              <DrawerDialogTitle>{editRow ? "Edit" : "Add"} {name}</DrawerDialogTitle>
            </DrawerDialogHeader>
            <DrawerDialogContentWrapper>
              <div className="grid gap-4 py-4">
                {Form}
              </div>
            </DrawerDialogContentWrapper>
            <DrawerDialogFooter>
              <Button type="submit" disabled={submitting}>
                {submitting ? 'Saving...' : 'Save changes'}
              </Button>
            </DrawerDialogFooter>
          </form>
        </DrawerDialogContent>
      </DrawerDialog>
      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the {name.toLowerCase()} record.
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
    </CrudContext.Provider >
  )
}

export { CrudTable, CrudForm }