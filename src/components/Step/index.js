import { Button } from 'antd'
import PropTypes from 'prop-types'
import React, { memo } from 'react'

import styles from './styles.module.css'

const Step = ({ title, showing, children }) => {
  return (
    <div className={showing ? '' : 'hidden'}>
      <h3>{title}</h3>
      {children}
    </div>
  )
}
export default memo(Step)

Step.propTypes = {
  showing: PropTypes.bool.isRequired,
  title: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
}
