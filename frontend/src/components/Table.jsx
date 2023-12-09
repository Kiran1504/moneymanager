import React, { memo } from 'react'
import TableItem from './TableItem'

const Table = ({ tableItem, refreshPage }) => {

    const deleteExpense = () => {
        ; (refreshPage)()
    }

    return tableItem !== null ? (
        <div className='overflow-y-scroll overflow-x-hidden p-2'>
            <div className="w-full md:w-full border-2 border-gray-600 overflow-x-hidden overflow-y-scroll h-full m-auto my-2 lg:m-2 rounded-xl">
                <ul className="max-h-4/6">
                    {tableItem.toReversed().map((e) => {
                        return (
                            <TableItem key={e._id} id={e._id} category={e.category} date={e.date} amount={e.amount} deleteExp={deleteExpense} />
                        )
                    })}
                </ul>
            </div>
        </div>
    ) : (<div></div>)
}

export default memo(Table)
