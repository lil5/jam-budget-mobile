import React, { Component } from 'react'
import { NativeRouter, Route, Switch, BackButton } from 'react-router-native'

import Jars from './pages/Jars'
import AddTransaction from './pages/AddTransaction'
import Jar from './pages/Jar'
import JarEdit from './pages/JarEdit'
import Settings from './pages/Settings'
import Unsorted from './pages/Unsorted'

export default props => {
  return (
    <NativeRouter>
      <BackButton>
        <Switch>
          <Route exact path='/' component={Jars} />
          <Route path='/unsorted' component={Unsorted} />
          <Route path='/jar/new' component={JarEdit} />
          <Route path='/jar/:id/edit' component={JarEdit} />
          <Route path='/jar/:id' component={Jar} />
          <Route exact path='/add' component={AddTransaction} />
          <Route path='/add/:id' component={AddTransaction} />
          <Route path='/settings' component={Settings} />
        </Switch>
      </BackButton>
    </NativeRouter>
  )
}
