import lunr from 'lunr'
import customers from './data.json'
import { Customer } from './types'

// Create search index once when module is loaded into memory
const searchIndex = initSearchIndex()

export function fullTextSearch(text: string) {
  const cusomerIds = searchIndex.search(text).map(match => match.ref)
  return customers.filter(customer => cusomerIds.includes(customer._id))
}

function initSearchIndex() {
  const searchIndex = lunr(function () {
    Object.keys(customers[0]).forEach(customerAttribute => {
      this.field(customerAttribute)
    })
    this.field('name_first')
    this.field('name_last')
    this.ref('_id')
    
    // Search library does not support deep search in JS object, so we need to flat deeper attributes to 1st level
    // TODO Setup index to search also into `friends` attribute
    customers.map(searchIndexMapper).forEach(customer => {
      this.add(customer)
    })
  })

  return searchIndex
}

function searchIndexMapper(customer: Customer) {
  return {
    ...customer,
    'name_first': customer.name.first,
    'name_last': customer.name.last,
  }
}