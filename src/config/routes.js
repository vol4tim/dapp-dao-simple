import React from 'react'
import { Route, IndexRoute } from 'react-router'
import App from '../shared/containers/app'
import NotFound from '../shared/components/app/notFound'
import { Start } from '../routes/start'
import { Wrap } from '../routes/main'
import { Main } from '../routes/main'
import { Core } from '../routes/core'
import { Token } from '../routes/token'

export const routes = () => {
    return (
        <div>
            <Route path='/' component={App}>
                <IndexRoute component={Start} />
                <Route path='app/:address' component={Wrap}>
                    <IndexRoute component={Main} />
                    <Route path='core' component={Core} />
                    <Route path='token/:module' component={Token} />
                </Route>
            </Route>
            <Route path='*' component={NotFound} />
        </div>
    )
}
