import { createContext, useContext } from "react"
import CrudTable, { CrudTableProps } from "./table"

const CrudContext = createContext(undefined)

export function useCrud() {
  return useContext(CrudContext)
}

export type CrudProps<TData, TValue> = {
} & CrudTableProps<TData, TValue>

export function Crud<TData, TValue>({ columns, data, onView, onEdit, onDelete }: CrudProps<TData, TValue>) {
  return (
    <CrudContext.Provider value={undefined}>
      <CrudTable columns={columns} data={data} onView={onView} onEdit={onEdit} onDelete={onDelete} />
    </CrudContext.Provider>
  )
}

export { CrudTable }