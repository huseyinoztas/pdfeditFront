const API = import.meta.env.VITE_API_URL || '/api'

export function formatBytes(bytes) {
  if (bytes < 1024) return bytes + ' B'
  if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB'
  return (bytes / (1024 * 1024)).toFixed(1) + ' MB'
}

export function triggerDownload(blob, filename) {
  const url = URL.createObjectURL(blob)
  const a = Object.assign(document.createElement('a'), { href: url, download: filename })
  document.body.appendChild(a)
  a.click()
  setTimeout(() => { URL.revokeObjectURL(url); a.remove(); }, 1000)
}

export async function apiPost(endpoint, formData, setLoading) {
  if (setLoading) setLoading(true)

  try {
    const res = await fetch(`${API}/${endpoint}`, { method: 'POST', body: formData })
    if (!res.ok) {
      const err = await res.json().catch(() => ({ detail: 'Bilinmeyen hata' }))
      throw new Error(err.detail || 'Sunucu hatası')
    }
    const blob = await res.blob()
    return { success: true, blob }
  } catch (e) {
    return { success: false, error: e.message }
  } finally {
    if (setLoading) setLoading(false)
  }
}

export async function apiPostJson(endpoint, jsonBody, setLoading) {
  if (setLoading) setLoading(true)
  try {
    const res = await fetch(`${API}/${endpoint}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(jsonBody),
    })
    if (!res.ok) {
      const err = await res.json().catch(() => ({ detail: 'Bilinmeyen hata' }))
      throw new Error(err.detail || 'Sunucu hatası')
    }
    const blob = await res.blob()
    return { success: true, blob }
  } catch (e) {
    return { success: false, error: e.message }
  } finally {
    if (setLoading) setLoading(false)
  }
}