import React from "react";

const CategoryList = ({ change, val }) => {
    // const chng = () => null;

    return (
        <div>
            <input
                className=" outline-none text-center bg-transparent cursor-pointer"
                name="cat"
                onClick={change}
                onChange={change}
                value={val}
            />
        </div>
    );
};

export default CategoryList;