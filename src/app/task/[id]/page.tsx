interface PageProps {
  params: {
    id: string
  }
}

export default function task({ params }: PageProps) {
  return (
    <div>
      <h1>{params.id}</h1>
    </div>
  )
}
