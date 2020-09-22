import 'isomorphic-fetch'
import JSZip from 'jszip'
import { SOURCEGRAPH_AUTH_HEADERS } from './sourcegraph'

export const getZipArchive = async (zipArchiveURL: string): Promise<JSZip> => {
    const resp = await fetch(zipArchiveURL, {
        headers: {
            ...SOURCEGRAPH_AUTH_HEADERS,
            Accept: 'application/zip',
        },
    })
    if (!resp.ok) {
        throw new Error(`HTTP ${resp.status} for ${zipArchiveURL}`)
    }

    const isBrowser = typeof window !== 'undefined' || typeof importScripts !== 'undefined'
    const nodeBuffer = await (isBrowser ? resp.blob() : (resp as any).buffer())
    const jszip = new JSZip()
    return jszip.loadAsync(nodeBuffer)
}
