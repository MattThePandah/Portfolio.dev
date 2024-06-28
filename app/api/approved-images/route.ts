import { NextRequest, NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'

export async function GET(req: NextRequest) {
    const approvedImageDir = path.join(process.cwd(), 'public/static/images/approved-404')
    
    try {
        const files = fs.readdirSync(approvedImageDir)
        const images = files.map(file => `/static/images/approved-404/${file}`)
        return NextResponse.json(images)
    } catch (error) {
        console.error('Error reading approved images:', error)
        return NextResponse.json({ error: 'Failed to read approved images' }, { status: 500 })
    }
}
