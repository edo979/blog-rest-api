export type Post = {
  id: string
  createdAt?: string
  title: string
  body: string
  author: string
}

const url = 'http://localhost:3000'

export async function getPosts() {
  const response = await fetch(`${url}/posts`)
  const resData: Post[] = await response.json()

  return resData
}

export async function getPost(id: string) {
  const response = await fetch(`${url}/posts/${id}`)

  if (!response.ok) throw new Error('Cant find that post')

  const resData: Post = await response.json()
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

export async function updatePost(
  id: string,
  update: {
    title: string
    body: string
    author: string
  }
) {
  const response = await fetch(`${url}/posts/${id}`, {
    method: 'PATCH',
    headers: {
      'Content-type': 'application/json',
    },
    body: JSON.stringify(update),
  })

  if (!response.ok) throw new Error('Cant update post')

  return await response.json()
}

export async function deletePost(id: string) {
  const response = await fetch(`${url}/posts/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-type': 'application/json',
    },
  })

  if (!response.ok) throw new Error("Can't delete post")

  const resData = await 'Resource Deleted'
  return resData
}
