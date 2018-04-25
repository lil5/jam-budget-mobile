import React, { Component } from 'react'
import { connect } from 'react-redux'
import { updateDefaultCurrency } from '../redux/actions'
import PropTypes from 'prop-types'
import SelectCurrency from '../components/SelectCurrency'
import Footer from '../components/Footer'
import * as NB from 'native-base'
import { Dimensions } from 'react-native'
import color from 'color'
import palette from '../palette'

class Stats extends Component {
  static contextTypes = {
    router: PropTypes.shape({
      history: PropTypes.shape({
        push: PropTypes.func.isRequired,
        replace: PropTypes.func.isRequired,
      }).isRequired,
      staticContext: PropTypes.object,
    }).isRequired,
  }

  constructor (props) {
    super(props)

    this.state = {}
  }

  // static propTypes = {
  //   // redux store
  //   stats: PropTypes.shape({
  //
  //   }).isRequired,
  //   // redux actions
  //   updateDefaultCurrency: PropTypes.func.isRequired,
  // }

  render () {
    const { history } = this.context.router
    // const { stats } = this.props
    const random = () => Math.floor(Math.random() * 100)

    return (
      <NB.Container>
        <NB.Header>
          <NB.Body>
            <NB.Title>Stats</NB.Title>
          </NB.Body>
        </NB.Header>
        <NB.Content>
          <NB.Text>hi</NB.Text>
        </NB.Content>
        <Footer history={history} />
      </NB.Container>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    stats: state.stats,
  }
}

const mapDispatchToProps = (dispatch) => {
  return { }
}

export default connect(mapStateToProps, mapDispatchToProps)(Stats)
