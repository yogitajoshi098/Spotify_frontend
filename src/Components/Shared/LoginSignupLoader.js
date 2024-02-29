import { Icon } from '@iconify/react'
import React from 'react'

export default function LoginSignupLoader() {
    return (
        <div className="fixed top-0 left-0 flex items-center justify-center w-screen h-screen bg-white bg-opacity-70"
        >
            <div
                className="bg-white"
            >
                <Icon icon="tabler:loader-3" width="30" height="30" color="green" className='animate-spin' />
            </div>

        </div>
    )
}
