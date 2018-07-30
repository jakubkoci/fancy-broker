import React from 'react'
import { Customer } from '../types'
import { fullTextSearch } from '../search'

const initialState = {
  searchText: '',
  result: [],
}

export default class Search extends React.Component {
  state = initialState

  // TODO Better type for event parameter
  handleSearchTextChange = (e: any) => this.setState({ searchText: e.target.value })

  handleSearchSubmit = () => {
    const { searchText } = this.state
    const result = fullTextSearch(searchText)
    this.setState({ result })
  }

  render() {
    const { searchText, result } = this.state

    return (
      <div>
        <h1>Search</h1>
        <input type="text" value={searchText} onChange={this.handleSearchTextChange} />
        <button type="text" onClick={this.handleSearchSubmit}>
          Serach
        </button>
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
            </tr>
          </thead>
          <tbody>
            {result.map((customer: Customer) => (
              <CustomerListItem key={customer._id} customer={customer} />
            ))}
          </tbody>
        </table>
      </div>
    )
  }
}

function CustomerListItem({ customer }: { customer: Customer }) {
  return (
    <tr>
      <td>
        {customer._id}
      </td>
      <td>
        {customer.name.last}&nbsp;{customer.name.first}
      </td>
    </tr>
  )
}
