const importDynamic = new Function('modulePath', 'return import(modulePath)')

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const fetch = async (...args: any[]) => {
  const module = await importDynamic('node-fetch')
  return module.default(...args)
}

export default fetch
