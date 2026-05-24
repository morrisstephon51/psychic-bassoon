import { useState } from 'react'
import { useQuery, useMutation } from '@tanstack/react-query'
import { getBrand, updateBrand, getPlatforms, updatePlatform } from '../lib/api'
import { queryClient } from '../lib/queryClient'
import { useNotificationStore } from '../store/notificationStore'
import { Card, CardHeader, CardBody } from '../components/ui/Card'
import { Button } from '../components/ui/Button'
import { Input, Textarea } from '../components/ui/Input'
import type { Brand, Platform } from '../types'

function BrandSettings() {
  const { add: notify } = useNotificationStore()
  const { data: brand } = useQuery({ queryKey: ['brand'], queryFn: getBrand })
  const [form, setForm] = useState<Partial<Brand>>({})

  const mutation = useMutation({
    mutationFn: (data: Partial<Brand>) => updateBrand(data),
    onSuccess: () => {
      notify({ type: 'success', title: 'Brand settings saved' })
      queryClient.invalidateQueries({ queryKey: ['brand'] })
    },
  })

  const values = { ...brand, ...form }

  return (
    <Card>
      <CardHeader><span className="font-medium text-text-primary">Brand Settings</span></CardHeader>
      <CardBody className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <Input label="Brand Name" value={values.name ?? ''} onChange={(e) => setForm({ ...form, name: e.target.value })} />
          <Input label="Handle" value={values.handle ?? ''} onChange={(e) => setForm({ ...form, handle: e.target.value })} />
        </div>
        <Input label="Niche" value={values.niche ?? ''} onChange={(e) => setForm({ ...form, niche: e.target.value })} />
        <Textarea label="Brand Voice" rows={3} value={values.voice ?? ''} onChange={(e) => setForm({ ...form, voice: e.target.value })} />
        <Textarea label="Default Hashtags" rows={2} value={values.hashtags ?? ''} onChange={(e) => setForm({ ...form, hashtags: e.target.value })} />
        <Button onClick={() => mutation.mutate(form)} loading={mutation.isPending} disabled={Object.keys(form).length === 0}>
          Save Changes
        </Button>
      </CardBody>
    </Card>
  )
}

function PlatformRow({ platform }: { platform: Platform }) {
  const { add: notify } = useNotificationStore()
  const [enabled, setEnabled] = useState(platform.enabled)

  const mutation = useMutation({
    mutationFn: (data: Partial<Platform>) => updatePlatform(platform.name, data),
    onSuccess: () => {
      notify({ type: 'success', title: `${platform.name} updated` })
      queryClient.invalidateQueries({ queryKey: ['platforms'] })
    },
  })

  const toggle = () => {
    const next = !enabled
    setEnabled(next)
    mutation.mutate({ enabled: next })
  }

  return (
    <div className="flex items-center justify-between py-3 border-b border-surface-3 last:border-0">
      <div>
        <p className="text-sm font-medium text-text-primary capitalize">{platform.name}</p>
        <p className="text-xs text-text-muted">
          {platform.totalPosts} posts · {platform.lastPostAt ? `last: ${new Date(platform.lastPostAt).toLocaleDateString()}` : 'never posted'}
        </p>
      </div>
      <div className="flex items-center gap-3">
        {!platform.credentials && (
          <span className="text-xs text-yellow-400">No credentials</span>
        )}
        <button
          onClick={toggle}
          className={`relative w-10 h-5 rounded-full transition-colors duration-200 ${
            enabled ? 'bg-accent' : 'bg-surface-3'
          }`}
        >
          <span className={`absolute top-0.5 left-0.5 w-4 h-4 rounded-full bg-white transition-transform duration-200 ${
            enabled ? 'translate-x-5' : 'translate-x-0'
          }`} />
        </button>
      </div>
    </div>
  )
}

export default function Settings() {
  const { data: platforms } = useQuery({ queryKey: ['platforms'], queryFn: getPlatforms })

  return (
    <div className="space-y-5 max-w-2xl">
      <div>
        <h2 className="text-xl font-bold text-text-primary">Settings</h2>
        <p className="text-sm text-text-muted mt-0.5">Configure your brand and platform connections</p>
      </div>

      <BrandSettings />

      <Card>
        <CardHeader><span className="font-medium text-text-primary">Platform Connections</span></CardHeader>
        <CardBody className="py-0">
          {platforms?.map((p) => <PlatformRow key={p.name} platform={p} />)}
        </CardBody>
      </Card>

      <Card>
        <CardHeader><span className="font-medium text-text-primary">About</span></CardHeader>
        <CardBody className="text-sm text-text-secondary space-y-1">
          <p>Content Engine v1.0.0</p>
          <p>Built for The Plug AI — autonomous social media content generation.</p>
          <p className="text-text-muted text-xs">
            Powered by Claude AI · Pollinations.ai · edge-tts · FFmpeg
          </p>
        </CardBody>
      </Card>
    </div>
  )
}
