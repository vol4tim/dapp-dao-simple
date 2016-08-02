import React from 'react'
import { Route, IndexRoute } from 'react-router'

import App from './containers/App'
import NotFound from './components/NotFound'
import Main from './components/main'
import View from './containers/view'

export const routes = () => {
    return (
        <div>
            <Route path='/' component={App}>
                <IndexRoute component={Main} />
                <Route path='view/:address' component={View} />
            </Route>
            <Route path='*' component={NotFound} />
        </div>
    )
}
