/* !simple-live Web Component
 *  https://unrelenting.technology */
(function () {
	'use strict'

	if (!window.EventSource)
		return

	class SimpleLive extends HTMLElement {
		connectedCallback () {
			setTimeout(() => {
				this.es = new EventSource(this.getAttribute('src'))
				this.es.addEventListener('change', e => {
					let loc = window.location.toString()
					const ind = loc.indexOf("#")
					if (ind > -1) {
						loc = loc.substring(0, ind)
					}
					loc = loc.replace('ruunvald.lan:3000', 'unrelenting.technology').replace('http', 'https')
					if (e.isTrusted && e.data.split(',').indexOf(loc) > -1) {
						this.es.close()
						this.removeAttribute('hidden')
					}
				})
			}, 700)
		}
	}

	customElements.define('simple-live', SimpleLive)
})()
