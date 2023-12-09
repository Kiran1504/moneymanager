import React, { memo } from 'react'
import TableItem from './TableItem'

const Table = ({ tableItem, refreshPage }) => {

    const deleteExpense = () => {
        ; (refreshPage)()
    }

    return tableItem ? (
        <div className="w-full md:w-full border-2 h-5/6 border-gray-600 overflow-x-hidden overflow-y-scroll  m-auto my-0 lg:m-2 rounded-xl">
            <ul className="max-h-4/6">
                {tableItem.toReversed().map((e) => {
                    return (
                        <TableItem key={e._id} id={e._id} category={e.category} date={e.date} amount={e.amount} deleteExp={deleteExpense} />
                    )
                })}
            </ul>
        </div>
    ) : (<div>{" "}</div>)
}

export default memo(Table)
