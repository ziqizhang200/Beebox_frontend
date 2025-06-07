<template>
  <div class="forum-page">
    <div class="forum-header">
      <h1>BeeBox 论坛</h1>
      <div class="forum-actions">
        <button class="create-post-btn" @click="handleCreatePost">发布帖子</button>
      </div>
    </div>
    
    <div class="forum-content">
      <div class="post-list">
        <div v-for="post in posts" :key="post.id" class="post-card">
          <div class="post-header">
            <h3>{{ post.title }}</h3>
            <span class="post-meta">{{ post.author }} · {{ post.date }}</span>
          </div>
          <p class="post-preview">{{ post.preview }}</p>
          <div class="post-footer">
            <span class="post-stat" @click="handleAddComment(post.id)">
              <i class="icon-comment"></i> {{ post.comments }}
            </span>
            <span class="post-stat" @click="handleLike(post.id)">
              <i class="icon-like"></i> {{ post.likes }}
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useForumData } from './index'

const { posts, createPost, likePost, addComment } = useForumData()

const handleCreatePost = () => {
  // 示例：创建新帖子
  createPost({
    title: '新的讨论帖',
    author: '测试用户',
    date: new Date().toLocaleDateString(),
    preview: '这是一个新的讨论帖...',
    comments: 0,
    likes: 0
  })
}

const handleLike = (postId: number) => {
  likePost(postId)
}

const handleAddComment = (postId: number) => {
  addComment(postId)
}
</script>

<style scoped>
.forum-page {
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto;
  min-height: 100vh;
  background-color: #f5f7fa;
}

.forum-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;
}

.forum-header h1 {
  margin: 0;
  color: #303133;
}

.create-post-btn {
  background-color: #409eff;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
  transition: background-color 0.3s;
}

.create-post-btn:hover {
  background-color: #66b1ff;
}

.post-list {
  display: grid;
  gap: 20px;
}

.post-card {
  background: white;
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  transition: transform 0.3s;
  cursor: pointer;
}

.post-card:hover {
  transform: translateY(-2px);
}

.post-header {
  margin-bottom: 10px;
}

.post-header h3 {
  margin: 0 0 5px 0;
  color: #303133;
}

.post-meta {
  font-size: 12px;
  color: #909399;
}

.post-preview {
  color: #606266;
  margin: 10px 0;
  line-height: 1.5;
}

.post-footer {
  display: flex;
  gap: 15px;
}

.post-stat {
  display: flex;
  align-items: center;
  gap: 5px;
  color: #909399;
  font-size: 14px;
  cursor: pointer;
  transition: color 0.3s;
}

.post-stat:hover {
  color: #409eff;
}

.icon-comment::before {
  content: "💬";
}

.icon-like::before {
  content: "👍";
}
</style>