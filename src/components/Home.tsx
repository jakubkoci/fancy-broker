import React from 'react'
import { fetchStatistics } from '../statistics'
import Map from './Map'

type HomeData = {
  customerCount: number
  averageAge: number
  debtStandardDeviation: number
  locations: any[]
}

type State = {
  loading: boolean
  error?: string
  data: HomeData | {}
}

export default class Home extends React.Component<{}, State> {
  state = {
    loading: false,
    data: {
      customerCount: 0,
      averageAge: 0,
      debtStandardDeviation: 0,
      locations: []
    },
  }

  componentDidMount() {
    this.fetchHomeData()
  }

  fetchHomeData = async () => {
    this.setState({ loading: true })
    try {
      const data = fetchStatistics()
      this.setState({ loading: false, data: { ...data } })
    } catch (error) {
      this.setState({ loading: false, error: 'Something went wrong :(' })
    }
  }

  render() {
    console.log('render', this.state)
    const { customerCount, averageAge, debtStandardDeviation, locations } = this.state.data
    return (
      <div>
        <h1>Home</h1>
        <div>Customer count: {customerCount}</div>
        <div>Average age: {averageAge}</div>
        <div>Debt standard deviation: {debtStandardDeviation}</div>
        <Map locations={locations} />
      </div>
    )
  }
}

type LoaderProps = {
  loading: boolean
  children: any
}

function Loader({ loading, children }: LoaderProps) {
  if (loading) {
    return <div>Loading...</div>
  }

  return children
}
