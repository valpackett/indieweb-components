/*! indie-action Web Component (loosely based on the original implementation by Pelle Wessman, voxpelli.com)
 *  https://unrelenting.technology */
(function () {
	'use strict'

	/* Ignore unsupported browsers */
	if (!window.navigator.registerProtocolHandler)
		return false

	let config

	let isLoading = false
	let stopTimeout
	const clickQueue = []

	class IndieAction extends HTMLElement {
		setIndieConfig (config) {
			this.$a.removeEventListener('click', this._clickHandler)
			if (typeof(config) !== 'object') return
			var href = config[this.getAttribute('do')]
			if (typeof(href) !== 'string') return
			this._setHref(href)
			this.setAttribute('indie-configured', '')
		}
		_setHref (newHref) {
			// NOTE: relative URLs are resolved by setting .href and reading it again!
			this.$a.href = this.hasAttribute('with') ? this.getAttribute('with') : location.href
			this.$a.href = newHref.replace('{url}', encodeURIComponent(this.$a.href))
		}
		_clickHandler (e) {
			e.preventDefault()
			clickQueue.push(this)
			if (!isLoading) {
				stopTimeout = setTimeout(stopHandling, 5000)
				document.body.appendChild(configFrame)
				isLoading = true
			}
		}
		connectedCallback () {
			this.$a = this.querySelector('a')
			if (this.$a === undefined) return
			this._setHref(this.$a.href.replace('%7Burl%7D', '{url}')) // Replace {url} if it's in the fallback link
			if (config !== undefined)
				this.setIndieConfig(config)
			document.addEventListener('IndieConfigReady', function (e) {
				this.setIndieConfig(e.detail)
			}.bind(this))
			if (!this.hasAttribute('indie-configured'))
				this.$a.addEventListener('click', this._clickHandler)
		}
	}

	window.IndieAction = IndieAction
	customElements.define('indie-action', IndieAction)

	let configFrame = document.createElement('iframe')
	configFrame.style.display = 'none'
	configFrame.src = 'web+action:load'

	const stopHandling = function () {
		window.removeEventListener('message', loadConfig)
		configFrame.parentNode.removeChild(configFrame)
		configFrame = undefined
		clearTimeout(stopTimeout)
		while (clickQueue[0])
			clickQueue.shift().dispatchEvent(new MouseEvent('click'))
	}

	var loadConfig = function (message) {
		if (message.source !== configFrame.contentWindow) return
		try {
			config = JSON.parse(message.data)
			document.dispatchEvent(new CustomEvent('IndieConfigReady', { detail: config }))
			stopHandling()
		} catch (_) {}
	}

	window.addEventListener('message', loadConfig)

})()
