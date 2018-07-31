import currency from 'currency.js'
import customers from './data.json'
import { Customer } from './types'

export function fetchStatistics() {
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