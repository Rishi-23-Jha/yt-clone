import React from 'react';



const commentData = [
    {
        name: 'ABC',
        text: 'Lorem ipsum dolor sit',
        replies: [
            {
                name: 'ABC',
                text: 'Lorem ipsum dolor sit',
                replies: []
            }
        ]
    },
    {
        name: 'ABC',
        text: 'Lorem ipsum dolor sit',
        replies: [
            {
                name: 'ABC',
                text: 'Lorem ipsum dolor sit',
                replies: []
            }
        ]
    },
    {
        name: 'ABC',
        text: 'Lorem ipsum dolor sit',
        replies: []
    }
]

const Comment = ({ data }) => {
    const { name, text, replies } = data;
    return <div className="flex shadow-sm bg-gray-200 p-2 rounded-lg mt-3">
        <img alt="Comment" className='w-12 h-12' src='https://www.iconpacks.net/icons/2/free-user-icon-3296-thumb.png' />
        <div className='px-3'>
            <p className='font-bold '>{name}</p>
            <p>{text}</p>
        </div>
    </div>

}

const CommentsList = ({ comments }) => {
    return comments.map((comments, index) => (
        <div>
            <Comment key={index} data={comments} />
            <div className="pl-5 border border-l-black ml-5">
                <CommentsList comments={comments.replies} />

            </div>
        </div>
    ))
}
const CommentsContainer = () => {
    return (
        <div className='m-5 p-2'>
            <h2 className='text-2xl font-bold'>Comments</h2>
            <CommentsList comments={commentData} />
        </div>
    )
}

export default CommentsContainer;