import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import configureStore from './config/store'
import { Router, hashHistory } from 'react-router'
import { routes } from './config/routes'

const store = configureStore()

render(
    <Provider store={store}>
        <Router history={hashHistory} routes={routes(store)} />
    </Provider>,
    document.getElementById('root')
)
