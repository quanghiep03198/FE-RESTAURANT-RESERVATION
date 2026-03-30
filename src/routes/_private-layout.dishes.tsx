import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_private-layout/dishes')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/_layout/dishes"!</div>
}
