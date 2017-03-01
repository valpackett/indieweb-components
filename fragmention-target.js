/*! fragmention-target Web Component (based on <https://github.com/chapmanu/fragmentions>)
 *  Requires: findAndReplaceDOMText
 *  https://unrelenting.technology */
'use strict'

location.fragmention = location.fragmention || ''

class FragmentionTarget extends HTMLElement {
	static getElementsByText (scope, text) {
		for (var all = scope.childNodes, index = 0, element, list = []; (element = all[index]); ++index)
			if (element.nodeType === 1 && (element.innerText || element.textContent || '').replace(/\s+/g, ' ').indexOf(text) !== -1)
				list = list.concat(FragmentionTarget.getElementsByText(element, text))
		return list.length ? list : scope
	}

	highlight () {
		if (this.replacer)
			this.replacer.revert()
		if (this.$hl)
			this.$hl.removeAttribute('fragmention', '')
		const id = location.href.match(/#((?:#|%23)?)(.+)/) || [0,'','']
		const node = this.querySelector('[id="'+id[1]+id[2]+'"], [name="'+id[1]+id[2]+'"]') // non-fragmention anchor
		const match = decodeURIComponent(id[2].replace(/\+/g, ' ')).split('  ')
		location.fragmention = match[0]
		location.fragmentionIndex = parseFloat(match[1]) || 0
		if (!node && location.fragmention) {
			const text     = location.fragmention
			const elements = FragmentionTarget.getElementsByText(this, text)
			const length   = elements.length
			const modulus  = length && location.fragmentionIndex % length
			const index    = length && modulus >= 0 ? modulus : length + modulus
			this.$hl       = length && elements[index]
			if (this.$hl) {
				this.$hl.setAttribute('fragmention', '')
				if (this.hasAttribute('exact'))
					this.replacer = findAndReplaceDOMText(this.$hl, { find: text, wrap: 'fragmention-exact' })
				this.$hl.scrollIntoView()
			} else {
				this.$hl = null
			}
		}
	}

	connectedCallback () {
		window.addEventListener('hashchange', this.highlight.bind(this))
		document.addEventListener('readystatechange', this.highlight.bind(this))
		this.highlight()
	}
}

customElements.define('fragmention-target', FragmentionTarget)
