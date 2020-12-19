export default function(context, inject) {
  const appId = '2PTSPQFW4Y'
  const apiKey = 'aa3d4392845e89b4a2b2e37ac47a848d'

  inject('dataApi', {
    getHome,
  })
  async function getHome(homeId) {
    const response = await fetch(`https://${appId}-dsn.algolia.net/1/indexes/homes/${homeId}`, {
      headers: {
        'X-Algolia-API-Key': apiKey,
        'X-Algolia-Application-Id': appId,
      },
    })
    const json = await response.json()
    return json
  }
}
