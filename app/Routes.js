import React, { Component } from 'react'
import { NativeRouter, Route, Switch, BackButton } from 'react-router-native'

import Envelopes from './pages/Envelopes'
import AddTransaction from './pages/AddTransaction'
import Envelope from './pages/Envelope'
import EnvelopeEdit from './pages/EnvelopeEdit'
import Settings from './pages/Settings'
import Unsorted from './pages/Unsorted'

export default props => {
  return (
    <NativeRouter>
      <BackButton>
        <Switch>
          <Route exact path='/' component={Envelopes} />
          <Route path='/unsorted' component={Unsorted} />
          <Route path='/envelope/new' component={EnvelopeEdit} />
          <Route path='/envelope/:id/edit' component={EnvelopeEdit} />
          <Route path='/envelope/:id' component={Envelope} />
          <Route exact path='/add' component={AddTransaction} />
          <Route path='/add/:id' component={AddTransaction} />
          <Route path='/settings' component={Settings} />
        </Switch>
      </BackButton>
    </NativeRouter>
  )
}
