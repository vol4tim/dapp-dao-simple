import React, { Component } from 'react'
import style from './style.css'

export default class Footer extends Component {
    render() {
        return <footer className={style.footer}>
            <div className="container">
                <div><small>&copy;</small> <strong className="text-warning">2016</strong></div>
            </div>
        </footer>
    }
}
