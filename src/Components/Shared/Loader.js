import { Icon } from '@iconify/react'
import React from 'react'

export default function Loader() {
    return (
        <div className='flex items-center justify-center animate-spin'> <Icon icon="teenyicons:loader-outline" width="30" height="30" color="white" />
        </div>
    )
}
