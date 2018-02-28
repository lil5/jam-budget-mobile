import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { SectionList } from 'react-native'
import * as NB from 'native-base'

class ListOfEnvelopes extends Component {
  static propTypes = {
    envelopes: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.string.isRequired,
      catId: PropTypes.string.isRequired,
    })).isRequired,
    renderItem: PropTypes.func.isRequired,
    // redux store
    catagories: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.string,
      name: PropTypes.string.isRequired,
    })).isRequired,
  }

  static defaultProps = {
    renderSectionHeader: ({section}) => (
      <NB.Separator bordered><NB.Text>{section.title.toUpperCase()}</NB.Text></NB.Separator>
    ),
  }

  renderList () {
    const { envelopes, catagories } = this.props
    const list = []

    catagories.forEach(cat => {
      list.push({
        title: cat.name,
        data: envelopes.filter(e => {
          return e.catId === cat.id
        }),
      })
    })

    return list
  }

  render () {
    /* eslint-disable react/prop-types */
    const { renderItem, renderSectionHeader } = this.props
    /* eslint-enable react/prop-types */

    return (
      <SectionList
        keyExtractor={(item, index) => item.id}
        sections={this.renderList()}
        renderSectionHeader={renderSectionHeader}
        renderItem={renderItem}
      />
    )
  }
}

const mapStateToProps = (state) => {
  return {
    catagories: state.catagories,
  }
}

export default connect(mapStateToProps)(ListOfEnvelopes)
