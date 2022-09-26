async function request(method, url) {
  let res = await fetch(url, { method })
  let json = res.json()
  return json
}
export function get(url) {
  return request('GET', url)
}
