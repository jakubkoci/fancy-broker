import currency from 'currency.js'
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

export function fetchHomeData() {
  const customerCount = customers.length
  const sumAge = customers.reduce((sum, customer) => sum + customer.age, 0)
  const averageAge = sumAge / customerCount
  const debtStandardDeviation = calcDebtStandardDeviation(customers)
  const locations = customers.map(customer => {
    const { _id, name, latitude, longitude, ...rest } = customer
    
    return {
      id: _id,
      name,
      latitude: parseFloat(latitude),
      longitude: parseFloat(longitude),
    }
  })

  return {
    customerCount,
    averageAge,
    debtStandardDeviation,
    locations,
  }
}

function calcDebtStandardDeviation(customers: Customer[]) {

  const debts = customers.map((customer: Customer) => {
    return currency(customer.balance).value
  })

  const debtsCount = debts.length
  const debtsSum = debts.reduce((sum, debt) => sum + debt, 0)
  const debtAverage = debtsSum / debtsCount

  const differencesSum = debts.reduce((sum, debt) => {
    const squaredDifference = Math.pow(debt - debtAverage, 2)
    return sum + squaredDifference
  }, 0)

  const variance = differencesSum / debtsCount
  const debtStandardDeviation = Math.sqrt(variance)
  
  return debtStandardDeviation
}
