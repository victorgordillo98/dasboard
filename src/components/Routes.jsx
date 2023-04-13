import React from 'react'

import { Route, Switch } from 'react-router-dom'

import Perfiles from '../pages/Perfiles'
import Customers from '../pages/Customers'
import Lineas from '../pages/Lineas'

const Routes = () => {
    return (
        <Switch>
            <Route path='/' exact component={Perfiles}/>
            <Route path='/listas' component={Customers}/>
            <Route path='/lineas' component={Lineas}/>
        </Switch>
    )
}

export default Routes