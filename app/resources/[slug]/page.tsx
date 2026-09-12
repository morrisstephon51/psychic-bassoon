import { notFound } from 'next/navigation'
import { resources } from '@/lib/data/resources'
import { SITE_URL } from '@/lib/site'
import ResourceDetailClient from '@/components/shared/ResourceDetailClient'

interface ResourcePageProps {
  params: { slug: string }
}

export async function generateStaticParams() {
  return resources.map((resource) => ({ slug: resource.slug }))
}

export async function generateMetadata({ params }: ResourcePageProps) {
  const resource = resources.find((r) => r.slug === params.slug)
  if (!resource) return {}
  const url = `${SITE_URL}/resources/${resource.slug}`
  return {
    title: resource.title,
    description: resource.description,
    alternates: { canonical: url },
    openGraph: {
      title: `${resource.title} | The Plug AI`,
      description: resource.description,
      type: 'article',
      url,
      siteName: 'The Plug AI',
    },
    twitter: {
      card: 'summary_large_image',
      title: resource.title,
      description: resource.description,
    },
  }
}

export default function ResourceDetailPage({ params }: ResourcePageProps) {
  const resource = resources.find((r) => r.slug === params.slug)
  if (!resource) notFound()

  return <ResourceDetailClient resource={resource} />
}
