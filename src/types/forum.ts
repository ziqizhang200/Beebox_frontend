
// 论坛帖子接口定义
export interface Post {
  id: number
  title: string
  author: string
  date: string
  preview: string
  comments: number
  likes: number
}

// 评论接口定义
export interface Comment {
  id: number
  postId: number
  author: string
  content: string
  date: string
  likes: number
}

// 用户接口定义
export interface ForumUser {
  id: number
  username: string
  avatar?: string
  postCount: number
  commentCount: number
}
