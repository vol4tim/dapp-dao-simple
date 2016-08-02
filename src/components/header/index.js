import React, { Component } from 'react'
import style from './style.css'

export default class Header extends Component {
    render() {
        return <nav className={style.main +' navbar navbar-inverse navbar-static-top'}>
            <div className="container">
                <div className="navbar-header">
                    <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
                        <span className="sr-only">Toggle navigation</span>
                        <span className="icon-bar"></span>
                        <span className="icon-bar"></span>
                        <span className="icon-bar"></span>
                    </button>
                    <a className="navbar-brand" href="#">Dapp DAO simple</a>
                </div>
            </div>
        </nav>
    }
}
