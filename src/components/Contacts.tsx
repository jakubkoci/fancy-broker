import React from 'react'
import CustomerList from './CustomerList'
import { fetchCustomersPage } from '../customers'
import { Customer } from '../types'

type State = {
  page: number
  pageCount: number
  visibleCustomers: Customer[]
}

const initialState = {
  page: 0,
  pageCount: 0,
  visibleCustomers: [],
}

export default class Contacts extends React.Component<{}, State> {
  state = initialState

  componentDidMount() {
    this.fetchCustomers()
  }

  fetchCustomers = () => {
    const { page } = this.state
    const customersPages = fetchCustomersPage(page)
    const { visibleCustomers, pageCount } = customersPages
    this.setState({ visibleCustomers, pageCount })
  }

  nextPage = () => {
    this.setState(prevState => {
      if (prevState.page < (prevState.pageCount - 1)) {
        const page = prevState.page + 1
        const customersPages = fetchCustomersPage(page)
        const { visibleCustomers, pageCount } = customersPages
        return { visibleCustomers, page, pageCount}
      }
      return null
    })
  }

  previousPage = () => {
    this.setState(prevState => {
      if (prevState.page > 0) {
        const page = prevState.page - 1
        const customersPages = fetchCustomersPage(page)
        const { visibleCustomers, pageCount } = customersPages
        return { visibleCustomers, page, pageCount}
      }
      return null
    })
  }

  render() {
    const { page, visibleCustomers } = this.state

    return (
      <div>
        <h1>Contacts</h1>
        <button onClick={this.previousPage}>Previous page</button>
        <span>{page + 1}</span>
        <button onClick={this.nextPage}>Next page</button>
        <CustomerList customers={visibleCustomers} />
      </div>
    )
  }
}
