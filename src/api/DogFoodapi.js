/* eslint-disable max-len */
class DogFoodApi {
  constructor({ baseUrl }) {
    this.baseUrl = baseUrl
  }

  getAuthorizationToken() {
    return `Bearer ${this.token}`
  }

  async signUp(data) {
    const response = await fetch(`${this.baseUrl}/signup`, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(data),
    })
    return response.json()
  }

  async signIn(data) {
    const response = await fetch(`${this.baseUrl}/signin`, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(data),
    })
    return response.json()
  }

  getProductsByIds(ids, token) {
    return Promise.all(ids.map((id) => fetch(`${this.baseUrl}/products/${id}`, {
      headers: {
        authorization: `Bearer ${token}`,
      },
    }).then((res) => res.json())))
  }

  async getAllProducts(search, token) {
    const response = await fetch(`${this.baseUrl}/products/search?query=${search}`, {
      headers: {
        authorization: `Bearer ${token}`,
      },
    })

    if (response.status >= 400) {
      throw new Error(`${response.status}: Произошла ошибка при получении информации о товарах. Попробуйте сделать запрос позже.`)
    }

    return response.json()
  }
}
export const DogFoodApiConst = new DogFoodApi({ baseUrl: 'https://api.react-learning.ru' })
