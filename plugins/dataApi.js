export default function(context, inject) {
  const appId = '2PTSPQFW4Y'
  const apiKey = 'aa3d4392845e89b4a2b2e37ac47a848d'
  const headers = {
    'X-Algolia-API-Key': apiKey,
    'X-Algolia-Application-Id': appId,
  }

  inject('dataApi', {
    getHome,
  })
  async function getHome(homeId) {
    try {
      return unwrap(
        await fetch(`https://${appId}-dsn.algolia.net/1/indexes/homes/${homeId}`, {
          headers,
        })
      )
    } catch (error) {
      return getErrorResponse(error)
    }
  }

  async function unwrap(response) {
    const json = await response.json()
    const { ok, status, statusText } = response
    return {
      json,
      ok,
      status,
      statusText,
    }
  }

  function getErrorResponse(error) {
    return {
      ok: false,
      status: 500,
      statusText: error.message,
      json: {},
    }
  }
}
