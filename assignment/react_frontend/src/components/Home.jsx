import React from 'react'
import { dataTestIds } from '../tests/constants/components'

const Home = () => {
  const { containerId } = dataTestIds;
  return (
    <div data-testid={containerId.main}>
      This is home
    </div>
  )
}

export default Home

