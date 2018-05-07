/**
 * https://medium.com/@wwayne_me/let-s-drawing-charts-in-react-native-without-any-library-4c20ba38d8ab
 * Thanks to Zixiao Wang for help with the Charts
 */

import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import CurrencyFormatter from '../util/currency-formatter'
import Footer from '../components/Footer'
import * as NB from 'native-base'
import {
  Alert,
  Dimensions,
  Animated,
  StyleSheet,
} from 'react-native'
import palette from '../palette'

function underZero (n) {
  return n > 0 ? n : 0
}

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

  static propTypes = {
    // redux store
    stats: PropTypes.object.isRequired,
    jars: PropTypes.arrayOf(
      PropTypes.object
    ).isRequired,
    defaultCurrency: PropTypes.string.isRequired,
  }

  constructor (props) {
    super(props)
    // first set which Jar to graph
    const listJars = Object.keys(props.stats)

    // getWidths
    const width = this.getWidth(props.stats[listJars[0]])

    const lines = []
    width.lines.forEach(item => {
      lines.push(new Animated.Value(item))
    })

    this.state = {
      lines,
      labels: width.labels,
      listJars,
      whichJar: 0,
    }
  }

  getWidth (data) {
    const canvasWidth = (Dimensions.get('window').width - 50) || 350

    // Move amounts into its own array to calculate maxWidth
    // Move date into its own array for return
    const amountArr = []
    const labels = []
    data.forEach(item => {
      amountArr.push(underZero(item.amount))
      labels.push(item.date)
    })

    // set max width to find the percentage
    const maxWidth = Math.max(...amountArr)

    let lines = []
    data.forEach(item => {
      // React-Native bug: if width=0 at first time, the borderRadius can't be implemented in the View
      lines.push(((item.amount || 0) / maxWidth * canvasWidth) || 5)
    })

    return { lines, labels }
  }

  changeWhichJar (i) {
    const { listJars } = this.state

    const width = this.getWidth(this.props.stats[listJars[i]])

    const lines = []
    width.lines.forEach(item => {
      lines.push(new Animated.Value(item))
    })

    this.setState({
      ...this.state,
      lines,
      labels: width.labels,
      whichJar: i,
    })
  }

  renderGraph () {
    const { lines, labels, listJars } = this.state
    const { stats, defaultCurrency } = this.props
    const thisCurrency = new CurrencyFormatter(defaultCurrency)

    return (
      <NB.View style={styles.container}>
        {lines.length > 0
          ? lines.map((line, index) => {
            const amount = stats[listJars[this.state.whichJar]][index].amount
            const backgroundColor = amount < 0 ? palette.danger : palette.primaryColor
            return (
              <NB.Grid key={index}>
                <NB.Row>
                  <NB.Col>
                    <NB.Text>{labels[index]}</NB.Text>
                  </NB.Col>
                  <NB.Col>
                    <NB.Text style={{ textAlign: 'right' }}>{thisCurrency.format(amount)}</NB.Text>
                  </NB.Col>
                </NB.Row>
                <NB.Row>
                  <Animated.View style={[styles.points, { width: line, backgroundColor }]} />
                </NB.Row>
              </NB.Grid>
            )
          })
          : <NB.View>
            <NB.Icon style={styles.title} name='ban' />
            <NB.H2 style={styles.title}>There's no data yet...</NB.H2>
            <NB.Text style={styles.title}>This might mean this Jar does not repeat.</NB.Text>
          </NB.View>}
      </NB.View>
    )
  }

  render () {
    const { history } = this.context.router
    const { jars } = this.props

    return (
      <NB.Container>
        <NB.Header hasTabs>
          <NB.Body>
            <NB.Title>Stats</NB.Title>
          </NB.Body>
          <NB.Right>
            <NB.Button transparent
              onPress={() => {
                Alert.alert('What is this data?', `The amounts shown is the Costs made (or the total amount if a Savings jar).`)
              }}>
              <NB.Icon name='support' />
            </NB.Button>
          </NB.Right>
        </NB.Header>
        <NB.Content>
          <NB.Tabs
            style={{ backgroundColor: palette.primaryColor }}
            initialPage={0}
            onChangeTab={({ i, ref, from }) => this.changeWhichJar(i)}
            renderTabBar={() => <NB.ScrollableTab />}>
            {jars && jars.map((jar, key) => (
              <NB.Tab heading={jar.name} key={key} />
            ))}
          </NB.Tabs>
          {this.renderGraph()}
        </NB.Content>
        <Footer history={history} />
      </NB.Container>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    padding: 25,
  },
  points: {
    height: 14,
    marginRight: 5,
    paddingLeft: 5,
  },
  title: {
    textAlign: 'center',
    color: palette.grey,
    marginTop: 15,
  },
})

const mapStateToProps = (state) => {
  return {
    stats: state.stats,
    jars: state.jars, // change
    lastUpdate: state.lastUpdate,
    defaultCurrency: state.defaultCurrency,
  }
}

const mapDispatchToProps = (dispatch) => {
  return { }
}

export default connect(mapStateToProps, mapDispatchToProps)(Stats)
