import React from 'react'
import CustomerList from './CustomerList'
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
        <CustomerList customers={result} />
      </div>
    )
  }
}
