import React from 'react'
import Button from './Button'

<Button name='News' />
const list = ['All', 'Gaming', 'Songs', 'Live', 'Soccer', 'Cricket', 'Cooking', 'News']


const ButtonList = () => {
    return (
        <div className='flex space-x-2'>
            {list.map((name, index) => (
                <Button key={index} name={name} />
            )
            )}
        </div>
    )
}

export default ButtonList;