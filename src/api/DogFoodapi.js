class DogFoodApi {
 constructor({baseUrl}) {
  this.baseUrl = baseUrl;
 }

async SignIn(data) {
  const response = await fetch(`${this.baseUrl}/signin`, {
    method: 'POST',
    headers: {
      'Content-type': 'application/json',
    },
    body: JSON.stringify(data),
  })
  return response.json()
}

}

export const DogFoodApi = new DogFoodApi({ baseUrl: 'https://api.react-learning.ru' })