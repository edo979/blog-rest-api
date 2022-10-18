export type Post = {
  id: number
  title: string
  author: string
}

export async function getPosts() {
  const response = await fetch('http://localhost:3000/posts')
  const resData: Post[] = await response.json()

  console.log(resData)
  return resData
}
