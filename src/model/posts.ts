export type Post = {
  id: string
  createdAt?: string
  title: string
  author: string
}

const url = 'http://localhost:3000'

export async function getPosts() {
  const response = await fetch(`${url}/posts`)
  const resData: Post[] = await response.json()

  console.log(resData)
  return resData
}

export async function createPosts(data: { title: string }) {
  const id = Math.random().toString(36).substring(2, 9)
  const post = {
    id,
    createdAt: Date.now(),
    title: data.title,
    author: 'Me Atme',
  }

  const response = await fetch(`${url}/posts`, {
    method: 'POST',
    headers: {
      'Content-type': 'application/json',
    },
    body: JSON.stringify(post),
  })

  const resData = await response.json()
  return resData
}
