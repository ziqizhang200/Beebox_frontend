import { ref ,type Ref } from 'vue'
import type { Post } from '@/types'

export function useForumData(): {
  posts: Ref<Post[]>
  createPost: (post: Omit<Post, 'id'>) => void
  likePost: (postId: number) => void
  addComment: (postId: number) => void
} {
  const posts = ref<Post[]>([
    {
      id: 1,
      title: '如何优化 BeeBox 的温度监控？',
      author: '养蜂达人',
      date: '2024-01-15',
      preview: '分享一下我在使用 BeeBox 过程中的一些经验和技巧...',
      comments: 23,
      likes: 45
    },
    {
      id: 2,
      title: '蜂箱湿度控制的经验分享',
      author: '蜜蜂专家',
      date: '2024-01-14',
      preview: '最近天气多变，分享一下如何利用 BeeBox 做好蜂箱湿度管理...',
      comments: 15,
      likes: 38
    }
  ])

  // 发布新帖子
  const createPost = (post: Omit<Post, 'id'>) => {
    const newPost = {
      ...post,
      id: posts.value.length + 1
    }
    posts.value.unshift(newPost)
  }

  // 点赞帖子
  const likePost = (postId: number) => {
    const post = posts.value.find(p => p.id === postId)
    if (post) {
      post.likes++
    }
  }

  // 添加评论
  const addComment = (postId: number) => {
    const post = posts.value.find(p => p.id === postId)
    if (post) {
      post.comments++
    }
  }

  return {
    posts,
    createPost,
    likePost,
    addComment
  }
}