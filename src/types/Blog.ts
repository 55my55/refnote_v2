export interface Blog {
  id: string
  title: string
  slug: string
  body: string
  eyecatch?: {
    url: string
    height?: number
    width?: number
  }
  publishedAt: string
  revisedAt?: string
}

export interface BlogListResponse {
  contents: Blog[]
  total: number
  limit: number
  offset: number
}
