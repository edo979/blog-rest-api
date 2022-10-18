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

  return resData
}

export async function createPosts(data: {
  title: string
  body: string
  author: string
}): Promise<Post> {
  const id = Math.random().toString(36).substring(2, 9)
  const post = Object.assign(
    {
      id,
      createdAt: Date.now(),
    },
    data
  )

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
