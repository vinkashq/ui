"use client"

import { Crud, CrudForm } from "@/registry/new-york/blocks/crud"

type Payment = {
  id: string
  amount: number
  status: "pending" | "processing" | "success" | "failed"
  email: string
}

export const payments: Payment[] = [
  {
    id: "728ed52f",
    amount: 100,
    status: "pending",
    email: "m@example.com",
  },
  {
    id: "489e1d42",
    amount: 125,
    status: "processing",
    email: "example@gmail.com",
  },
  // ...
]

export default function CrudExample() {
  return (
    <Crud name="Payment" data={payments} columns={[
      {
        accessorKey: "id",
        header: "ID",
      },
      {
        accessorKey: "amount",
        header: "Amount",
      },
      {
        accessorKey: "status",
        header: "Status",
      },
      {
        accessorKey: "email",
        header: "Email",
      },
    ]} onEdit={(row) => console.log(row)} onDelete={(row) => console.log(row)} onCreate={(e) => console.log(e)}>
      <CrudForm>
        <div>Form Content</div>
      </CrudForm>
    </Crud>
  )
}