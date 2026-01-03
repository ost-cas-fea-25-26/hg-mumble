export const getAvatarInitials = (name?: string | null): string => {
  if (!name) return '??'
  const parts = name.trim().split(/\s+/).filter(Boolean)

  if (parts.length === 0) return '??'
  if (parts.length >= 2) {
    return (parts[0][0] + parts[1][0]).toUpperCase()
  }

  return parts[0].substring(0, 2).toUpperCase()
}
