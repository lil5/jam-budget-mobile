import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { SectionList } from 'react-native'
import * as NB from 'native-base'

class ListOfEnvelopes extends Component {
  static propTypes = {
    search: PropTypes.string,
    // renderItem: PropTypes.func.isRequired,
    // renderSectionHeader: PropTypes.func.isRequired,
    // redux store
    envelopes: PropTypes.shape({
      data: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.string,
        name: PropTypes.string,
        catId: PropTypes.string,
        desc: PropTypes.string,
        amount: PropTypes.number,
        goal: PropTypes.object,
      })),
      catagories: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.string,
        name: PropTypes.string,
      })),
    }),
  }

  static defaultProps = {
    search: '',
    renderSectionHeader: ({section}) => <NB.Separator bordered><NB.Text>{section.title}</NB.Text></NB.Separator>,
  }

  renderList () {
    const { data, catagories } = this.props.envelopes
    const list = []

    catagories.forEach((cat, indexCat) => {
      list.push({
        title: cat.name,
        data: data.filter(e => {
          let search = true
          if (this.props.search !== '') {
            search = e.name.includes(this.props.search)
          }

          return ((e.catId === cat.id) && search)
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
    envelopes: state.envelopes,
  }
}

export default connect(mapStateToProps)(ListOfEnvelopes)
