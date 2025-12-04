"use client"

import { Crud, CrudForm } from "@/registry/new-york/blocks/crud"
import { useState } from "react"

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
]

export default function CrudExample() {
  const [data, setData] = useState(payments)
  return (
    <Crud name="Payment" data={data} columns={[
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
    ]} onEdit={(row) => {
      setData(data.map((item) => item.id === row.id ? row : item))
    }} onDelete={(row) => {
      setData(data.filter((item) => item.id !== row.id))
    }} onCreate={(e) => {
      setData([...data, {
        id: crypto.randomUUID(),
        amount: 100,
        status: "pending",
        email: "m@example.com",
      }])
    }}>
      <CrudForm>
        <div>Form Content</div>
      </CrudForm>
    </Crud>
  )
}