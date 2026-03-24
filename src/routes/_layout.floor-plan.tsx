import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_layout/floor-plan')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/_layout/floor-plan"!</div>
}
