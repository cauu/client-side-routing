class HashRouter extends Router {
  constructor (props) {
    super(props)

    const _that = this
    this.onHashRouteChange()
    window.addEventListener('hashchange', function () {
      _that.onHashRouteChange()
    })
  }

  onHashRouteChange () {
    const hash = this.location.hash

    const hashUrl = hash.split('#').slice(1)[0]

    this._render(hashUrl || '/')
  }

  push (url) {
    /**
     * @description pushState没有触发hashRouteChange
     */
    // window.history.pushState({}, matchedRoute.name, `#${hashUrl}`)
    location.hash = `#${url}`
  }
}