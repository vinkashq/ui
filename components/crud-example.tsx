"use client"

import { Crud, CrudForm, CrudFormType } from "@/registry/new-york/blocks/crud"
import { Input } from "@/registry/new-york/ui/input"
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
  const defaultPayment = {
    id: "",
    amount: 0,
    status: "pending",
    email: "",
  } as Payment
  const formState = useState<CrudFormType<Payment>>({
    method: 'create',
    data: defaultPayment,
  })
  const [formType, setFormType] = formState
  const formData = formType.data
  const setFormData = (data: Payment) => setFormType({ ...formType, data })
  return (
    <Crud
      formState={formState}
      defaultData={defaultPayment}
      name="Payment"
      data={data}
      columns={[
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
        setData([...data, formData])
      }}>
      <CrudForm>
        <Input type="number" name="amount" value={formData.amount} onChange={(e) => setFormData({ ...formData, amount: Number(e.target.value) })} />
        <Input type="text" name="email" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} />
        <Input type="text" name="status" value={formData.status} onChange={(e) => setFormData({ ...formData, status: e.target.value as "pending" | "processing" | "success" | "failed" })} />
        <Input type="text" name="id" value={formData.id} onChange={(e) => setFormData({ ...formData, id: e.target.value })} />
      </CrudForm>
    </Crud>
  )
}