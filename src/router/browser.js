class BrowserRouter extends Router {
  constructor (props) {
    super(props)

    this.push(location.pathname)
    window.addEventListener('popstate', () => {
      this.push(location.pathname)
    })
  }

  push (url) {
    const matchedRoute = this._matchUrlToRoute(url)

    window.history.pushState({}, matchedRoute.name, url)

    this._render(url)
  }
}