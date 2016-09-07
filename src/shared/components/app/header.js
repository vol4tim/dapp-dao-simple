import React, { PropTypes, Component } from 'react'
import { Link } from 'react-router'

export default class Header extends Component {
    render() {
        return <nav className="navbar navbar-inverse navbar-static-top">
			<div className="container">
				<div className="navbar-header">
					<button type="button" className="navbar-toggle collapsed">
						<span className="sr-only">Toggle navigation</span>
						<span className="icon-bar"></span>
						<span className="icon-bar"></span>
						<span className="icon-bar"></span>
					</button>
                    <Link to={this.props.address!='' ? '/app/'+ this.props.address : '/'} className="navbar-brand">{this.props.title}</Link>
				</div>
                {this.props.address!='' &&
                    <div className="collapse navbar-collapse">
                        <p className="navbar-text navbar-right">{this.props.address} <Link to="/" className="navbar-link glyphicon glyphicon-retweet"></Link></p>
                    </div>
                }
			</div>
		</nav>
    }
}

Header.propTypes = {
    title: PropTypes.string.isRequired,
    address: PropTypes.string
}
