import React, { memo, useEffect } from 'react'
import TableItem from './TableItem';

const Table = ({ tableItem }) => {
    useEffect(() => {
        console.log(tableItem);
    }, [tableItem])

    return (
        <div className='overflow-y-scroll p-2'>
            <div className="w-full md:w-full border-2 border-gray-600 no-scrollbar overflow-y-scroll h-full m-auto my-2 lg:m-2 rounded-xl">
                <ul className="max-h-4/6">
                    {tableItem.map((e) => {
                        return <TableItem key={e._id} id={e._id} date={e.date} category={e.category} amount={e.amount} />
                    })}
                </ul>
            </div>
        </div>
    )
}

export default memo(Table)
