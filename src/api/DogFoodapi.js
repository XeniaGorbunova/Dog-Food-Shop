/* eslint-disable max-len */
class DogFoodApi {
  constructor({ baseUrl }) {
    this.baseUrl = baseUrl
    this.token = ''
  }

  setToken(token) {
    this.token = token
  }

  getAuthorizationToken() {
    return `Bearer ${this.token}`
  }

  checkToken() {
    if (!this.token) throw new Error('Отсутствует токен')
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

  getProductsByIds(ids) {
    this.checkToken()
    return Promise.all(ids.map((id) => fetch(`${this.baseUrl}/products/${id}`, {
      headers: {
        authorization: this.getAuthorizationToken(),
      },
    }).then((res) => res.json())))
  }

  async getAllProducts(search) {
    this.checkToken()
    const response = await fetch(`${this.baseUrl}/products/search?query=${search}`, {
      headers: {
        authorization: this.getAuthorizationToken(),
      },
    })

    if (response.status >= 400) {
      throw new Error(`${response.status}: Произошла ошибка при получении информации о товарах. Попробуйте сделать запрос позже.`)
    }

    return response.json()
  }
}
export const DogFoodApiConst = new DogFoodApi({ baseUrl: 'https://api.react-learning.ru' })
