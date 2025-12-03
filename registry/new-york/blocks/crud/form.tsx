"use client"

type CrudFormProps = {
  children: React.ReactNode
}

const CrudForm = ({ children }: CrudFormProps) => {
  return (
    <form>
      {children}
    </form>
  )
}

export default CrudForm
