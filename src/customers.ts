import customers from './data.json'
import { Customer } from './types'

const CUSTOMERS_PER_PAGE = 10

type CustomersPage = {
  pageCount: number
  visibleCustomers: Customer[]
}

export function fetchCustomersPage(page: number): CustomersPage {
  const visibleCustomers = customers.slice(page * CUSTOMERS_PER_PAGE, page * CUSTOMERS_PER_PAGE + CUSTOMERS_PER_PAGE)
  const pageCount = Math.floor(customers.length / CUSTOMERS_PER_PAGE) + 1
  return {
    visibleCustomers,
    pageCount
  }
}
