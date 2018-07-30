import React from 'react'
import { Customer } from '../types'

type Props = {
  customers: Customer[]
}

export default function CustomerList({ customers }: Props) {
  return (
    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>Name</th>
        </tr>
      </thead>
      <tbody>
        {customers.map(customer => (
          <CustomerListItem key={customer._id} customer={customer} />
        ))}
      </tbody>
    </table>
  )
}

function CustomerListItem({ customer }: { customer: Customer }) {
  return (
    <tr>
      <td>{customer._id}</td>
      <td>
        {customer.name.last}
        &nbsp;
        {customer.name.first}
      </td>
    </tr>
  )
}