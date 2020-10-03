import { Table } from 'antd'
import PropTypes from 'prop-types'
import React, { memo } from 'react'

import schema from './schema'

const History = ({ history }) => {
  return (
    <>
      {history.length > 0 && (
        <>
          <h4>History</h4>
          <Table dataSource={history} columns={schema} />
        </>
      )}
    </>
  )
}
export default memo(History)

History.propTypes = {
  history: PropTypes.array.isRequired,
}
