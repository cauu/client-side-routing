const routerConfig = [
  {
    path: '/',
    name: 'HOME',
    template: '<div><h1>Home</h1><div data-router-view></div></div>',
    children: [
      {
        path: '/test',
        template: '<h2>Children1</h2>'
      }
    ]
  },
  {
    path: '/about',
    name: 'ABOUT',
    template: '<h1>About</h1>',
  },
  {
    path: '/contact',
    name: 'CONTACT',
    template: '<h1>Contact</h1>',
  }
]

const router = new BrowserRouter(routerConfig)
// const router = new HashRouter(routerConfig)

function init () {
  const btnToHome = document.getElementById('toHome')
  const btnToAbout = document.getElementById('toAbout')
  const btnToConcact = document.getElementById('toContact')

  btnToHome.onclick = function () {
    router.push('/test')
  }

  btnToAbout.onclick = function () {
    router.push('/about')
  }

  btnToConcact.onclick = function () {
    router.push('/contact')
  }
}

init()
