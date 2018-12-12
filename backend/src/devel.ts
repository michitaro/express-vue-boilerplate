import { Express } from "express";


export function setup(app: Express) {
  // show routes
  app.use('/express/info/routes', (req, res) => {
    const routes = getRoutes(app)
    res.send(`
    <table border="1">
      <thead><tr><th>method</th><th>path</th></tr></thead>
      <tbody>${
      routes.map(({ method, path }) => {
        return `<tr><td>${method}</td><td>${path}</td></tr>`
      }).join('')}</tbody>
    </table>
    `)
  })

  // app.use((req, res, next) => {
  //   setTimeout(() => {
  //     next()
  //   }, 500)
  // })
}


// https://stackoverflow.com/a/46397967/2741327
function getRoutes(app: Express) {
  const done: Set<string> = new Set()
  const routes: { path: string, method: string }[] = []

  function print(path: any, layer: any) {
    if (layer.route) {
      layer.route.stack.forEach(print.bind(null, path.concat(split(layer.route.path))))
    } else if (layer.name === 'router' && layer.handle.stack) {
      layer.handle.stack.forEach(print.bind(null, path.concat(split(layer.regexp))))
    } else if (layer.method) {
      const route = {
        method: layer.method.toUpperCase(),
        path: path.concat(split(layer.regexp)).filter(Boolean).join('/')
      }
      const key = `${route.method}:${route.path}`
      if (!done.has(key)) routes.push(route)
      done.add(key)
    }
  }

  function split(thing: any) {
    if (typeof thing === 'string') {
      return thing.split('/')
    } else if (thing.fast_slash) {
      return ''
    } else {
      var match = thing.toString()
        .replace('\\/?', '')
        .replace('(?=\\/|$)', '$')
        .match(/^\/\^((?:\\[.*+?^${}()|[\]\\\/]|[^.*+?^${}()|[\]\\\/])*)\$\//)
      return match
        ? match[1].replace(/\\(.)/g, '$1').split('/')
        : '<complex:' + thing.toString() + '>'
    }
  }
  app._router.stack.forEach(print.bind(null, []))
  return routes
}