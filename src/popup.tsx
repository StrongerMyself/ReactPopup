import React, { Component } from 'react'

interface State {
	hide: boolean
	children?: React.ReactNode
}

class Popup extends Component<{}, State> {
	static _this

	constructor(props) {
		super(props)
		this.state = { hide: true }
		Popup._this = this
	}

	componentDidMount() {
		window.removeEventListener('keydown', this.onKeyPress)
	}

	static show = (children: React.ReactNode) => {
		Popup._this.toggle(false, children)
	}

	static hide = () => {
		Popup._this.toggle(true)
	}

	toggle = (hide = !this.state.hide, children = null) => {
		if (!hide) {
			window.addEventListener('keydown', this.onKeyPress)
		} else {
			window.removeEventListener('keydown', this.onKeyPress)
		}
		this.setState({ hide })
		setTimeout(() => this.setState({ children }), 300)
	}

	onKeyPress = (e) => {
		if (e.key === 'Escape') {
			Popup.hide()
		}
	}

	render() {
		const { children, hide } = this.state
		const className = `popup ${hide ? ' popup--hide' : ' popup--show'}`
		return (
			<div className={className}>
				<div className="popup__bg" onClick={() => Popup.hide()}/>
				<div className="popup__content">
					<div className="popup__cross" onClick={() => Popup.hide()}/>
					{children && children}
				</div>
			</div>
		)
	}
}

export default Popup
