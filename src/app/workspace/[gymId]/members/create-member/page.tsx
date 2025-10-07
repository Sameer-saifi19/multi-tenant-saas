import MemberForm from '@/components/global/memberform'
import React from 'react'

type Props = {}

const Page = (props: Props) => {
  return (
    <>
        <div>
            <div>
                <h1 className='text-2xl'>Add new member</h1>
            </div>
            <div>
                <MemberForm/>
            </div>
        </div>
    </>
  )
}

export default Page