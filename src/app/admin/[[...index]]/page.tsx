'use client'

import { NextStudio } from 'next-sanity/studio'
import config from '../../../../sanity.config'

export const viewport = {
    themeColor: '#0047AB',
}


export default function AdminPage() {
    return (
        <div style={{ margin: 0, padding: 0, height: '100vh' }}>
            <NextStudio config={config} />
        </div>
    )
}
