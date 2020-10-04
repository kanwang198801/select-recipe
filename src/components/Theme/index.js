import { Layout } from 'antd'
import PropTypes from 'prop-types'
import React, { memo } from 'react'

const { Footer, Content } = Layout

const Theme = ({ children }) => {
  return (
    <Layout className="layout" style={{ backgroundColor: '#fff' }}>
      <Content style={{ padding: '50px' }}>
        <div className="container">
          <div className="site-layout-content">{children}</div>
        </div>
      </Content>
      <Footer style={{ textAlign: 'center' }}>Created By Kan Wang</Footer>
    </Layout>
  )
}
export default memo(Theme)

Theme.propTypes = {
  children: PropTypes.node.isRequired,
}
