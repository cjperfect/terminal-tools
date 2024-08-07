import Link from 'next/link'

export default function Home() {
  return (
    <main className="min-h-screen p-24">
      <p>首页</p>
      <Link href="/post">点击跳转文章页面</Link>
    </main>
  )
}
