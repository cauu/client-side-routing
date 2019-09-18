/**
 * @params Array<Object> routeConfig
 * [
 *  {
 *    path,     -- String
 *    name,     -- String
 *    template, -- String
 *    children  -- Array<routeConfig>
  * }
 * ]
 */
class Router {
  /**
   * @description 路由过程
   * 1. 根据路由配置routeConfig初始化路由
   * 2. 获取当前路由信息，将router节点中的内容替换为相应的template
   * 3. 实现push方法，用户可以手动触发前端路由
   * 4. 监听hash/path变化，当其变化时，执行操作2
   */
  routeConfig = null
  pathToRoute = {}
  toMatchPaths = [] // 匹配顺序：按声明顺序，从前往后，从子往父
  history = window.history
  location = window.location

  constructor (routeConfig) {
    this.routeConfig = routeConfig
    const _meta = this._initRoute(routeConfig)
    this.pathToRoute = _meta.pathToRoute
    this.toMatchPaths = _meta.toMatchPaths
  }

  _initRoute (routeConfig) {
    const toMatchPaths = []
    const pathToRoute = {}

    function appendRouteConfig (config, parent) {
      (config || []).map(route => {
        if (route.children && route.children.length) {
          appendRouteConfig(route.children, route)
        }
        pathToRoute[route.path] = Object.assign({}, route, {parent: parent})
        toMatchPaths.push(route.path)
      })
    }

    appendRouteConfig(routeConfig, null)

    return {
      toMatchPaths: toMatchPaths,
      pathToRoute: pathToRoute
    }
  }

  _matchUrlToRoute (url) {
    const matchedPath = this.toMatchPaths.find((path) => {
      /**
       * @description 此处用来实现url和path的匹配
       */
      return path === url
    })

    return this.pathToRoute[matchedPath]
  }

  _render (url) {
    const matchedRoute = this._matchUrlToRoute(url)

    function renderNode (node) {
      let routerOutletElement

      if (node && node.parent) {
        const parentTemplate = renderNode(node.parent)
        routerOutletElement = parentTemplate.querySelectorAll('[data-router-view]')[0];
      } else {
        routerOutletElement = document.querySelectorAll('[data-router-view]')[0];
      }

      routerOutletElement.innerHTML = node.template

      return routerOutletElement
    }

    return renderNode(matchedRoute)
  }
}