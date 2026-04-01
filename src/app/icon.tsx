import { ImageResponse } from 'next/og'
import { readFile } from 'fs/promises'
import { join } from 'path'

export const size = { width: 64, height: 64 }
export const contentType = 'image/png'

export default async function Icon() {
  const logoData = await readFile(
    join(process.cwd(), 'public/images/logos/applied-ai-transparent.png')
  )
  const logoBase64 = `data:image/png;base64,${logoData.toString('base64')}`

  return new ImageResponse(
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'white',
      }}
    >
      <img src={logoBase64} width={64} height={64} style={{ objectFit: 'contain' }} />
    </div>,
    { ...size }
  )
}
