import { Params, redirect } from 'react-router-dom'
import { deletePost } from '../model/posts'

export async function action({ params }: { params: Params }) {
  if (!params.postId) throw new Error("Can't delete post!")
  await deletePost(params.postId)

  return redirect('/blog')
}
