import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_layout/dish-categories')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/_layout/dish-categories"!</div>
}
