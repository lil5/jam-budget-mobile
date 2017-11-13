import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {
  StyleSheet,
  SectionList,
  Text,
  ScrollView,
  View,
} from 'react-native'
import {
  Button,
  Card,
  Avatar,
  Icon,
  Toolbar,
  Subheader,
  COLOR,
  ListItem,
} from 'react-native-material-ui'

import StyleGlobals from '../styles/Globals'

export default class Envelope extends Component {
  constructor (props) {
    super(props)
    this.state = {
    }
  }

  componentWillMount () {
    this.setState({})
  }

  static navigationOptions = { header: null }
  static propTypes = {
    navigation: PropTypes.object.isRequired,
    // title: PropTypes.string.isRequired,
  }
  static contextTypes = {
    uiTheme: PropTypes.object.isRequired,
  }

  render () {
    const { navigation } = this.props
    const { palette } = this.context.uiTheme

    // will add color status
    const getGoalsAvatarColor = () => {
      return {backgroundColor: palette.primaryColor}
    }

    return (
      <View style={[styles.EnvelopeContainer, StyleGlobals.Stretch]}>
        <Toolbar
          leftElement='arrow-back'
          onLeftElementPress={() => navigation.goBack()}
          centerElement={navigation.state.params.title}
          rightElement='add-circle'
        />

        <View style={[{backgroundColor: palette.accentColor}, styles.InfoContainer]}>
          <Text style={[
            {color: palette.alternateTextColor},
            styles.InfoText,
          ]}>€ 1000</Text>
        </View>

        <View style={styles.GoalsContainer}>
          <ScrollView style={styles.GoalsContainer}>
            <Card>
              <ListItem
                leftElement={(
                  <Avatar style={{container: {
                    ...getGoalsAvatarColor(),
                    ...StyleGlobals.AvatarSmallContainer,
                  }}} icon='sync' />
                )}
                centerElement='hsetn'
              />
              <Text>
            Going to catch the red dot today going to catch the red dot today lick butt and make a weird face. Make muffins lick arm hair meoooow stares at human while pushing stuff off a table and pee in human's bed until he cleans the litter box. Adventure always see owner, run in terror. Poop in a handbag look delicious and drink the soapy mopping up water then puke giant foamy fur-balls scratch at the door then walk away. Pushes butt to face annoy kitten brother with poking jump off balcony, onto stranger's head but adventure always ears back wide eyed i cry and cry and cry unless you pet me, and then maybe i cry just for fun. Scratch me there, elevator butt use lap as chair. Swat turds around the house pounce on unsuspecting person or have secret plans. Hunt anything that moves eat a plant, kill a hand caticus cuteicus vommit food and eat it again scream at teh bath eat prawns daintily with a claw then lick paws clean wash down prawns with a lap of carnation milk then retire to the warmest spot on the couch to claw at the fabric before taking a catnap but hunt by meowing loudly at 5am next to human slave food dispenser. Rub face on owner thug cat or rub face on everything scratch me there, elevator butt favor packaging over toy or climb a tree, wait for a fireman jump to fireman then scratch his face. Throw down all the stuff in the kitchen swat turds around the house yet eat a plant, kill a hand for throw down all the stuff in the kitchen for chase ball of string. Throw down all the stuff in the kitchen chew foot. Freak human out make funny noise mow mow mow mow mow mow success now attack human cats secretly make all the worlds muffins yet friends are not food chew iPad power cord scream for no reason at 4 am meowwww your pillow is now my pet bed. Poop in litter box, scratch the walls freak human out make funny noise mow mow mow mow mow mow success now attack human or play riveting piece on synthesizer keyboard yet plays league of legends for meowing chowing and wowing cat is love, cat is life. Fooled again thinking the dog likes me my left donut is missing, as is my right meow loudly just to annoy owners and lick human with sandpaper tongue a nice warm laptop for me to sit on but hiding behind the couch until lured out by a feathery toy. Show belly meowzer.
              </Text>
            </Card>
            <Card>
              <Button primary raised
                text='Create Goal'
                icon='add'
              />
            </Card>
          </ScrollView>
        </View>

      </View>
    )
    // <InputNumber />
  }
}

const styles = StyleSheet.create({
  EnvelopeContainer: {
    flex: 1,
  },
  InfoContainer: {
    height: 90,
    ...StyleGlobals.Center,
  },
  InfoText: {
    fontSize: 33,

  },
  GoalsContainer: {
    flex: 5,
  },
})
