import React, { Component } from 'react'
import { connect } from 'react-redux'
import { updateDefaultCurrency } from '../actions/settings'
import PropTypes from 'prop-types'
import { SectionList } from 'react-native'
import SelectCurrency from '../components/SelectCurrency'
import * as NB from 'native-base'

class Settings extends Component {
  constructor (props) {
    super(props)

    this.state = {}
  }

  static navigationOptions = {
    header: null,
  }
  static propTypes = {
    // redux store
    settings: PropTypes.shape({
      defaultCurrency: PropTypes.string.isRequired,
    }).isRequired,
    // redux actions
    updateDefaultCurrency: PropTypes.func.isRequired,
  }

  render () {
    return (
      <NB.Container>
        <NB.Header>
          <NB.Body>
            <NB.Title>Settings</NB.Title>
          </NB.Body>
        </NB.Header>
        <NB.Content padder>
          <NB.Separator bordered style={{paddingLeft: 0}}>
            <NB.Text>{'defaults'.toUpperCase()}</NB.Text>
          </NB.Separator>
          <NB.Form>
            <SelectCurrency
              defaultValue={this.props.settings.defaultCurrency}
              onChangeText={value => this.props.updateDefaultCurrency(value)}
            />
          </NB.Form>
        </NB.Content>
      </NB.Container>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    settings: state.settings,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    updateDefaultCurrency: (e) => {
      dispatch(updateDefaultCurrency(e))
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Settings)
