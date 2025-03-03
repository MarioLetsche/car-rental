export interface Customer {
  customerId?: bigint,
  firstName: string,
  lastName: string,
  email: string
}

export interface CustomerList {
  customerList: Customer[]
}
