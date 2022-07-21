import React, { useState, useEffect, useCallback, useMemo } from 'react';

import './index.css';
const JqueryWookMarkLoad = () => {
    const arr = [1234, 1234567, 1234, 12, 12, 1234567812345, 12, 1234, 1234];
    const [rowList, setRowList] = useState([]);
    useEffect(() => {
        const array = fn;
        setRowList(array);
        let num1 = fn2(1)(2);
        let num2 = fn2(2)(3);
        console.log(num1, num2)
    }, []);

    const fn = useMemo(() => {
        let rowArr = [];
        let small = null;
        let middle = null;
        let max = null;
        arr.forEach((item) => {
            let str = '' + item;
            if (str.length <= 2) {
                if (rowArr.length === 0) {
                    small = 0;
                    rowArr[small] = { type: 'small', child: [item] };
                } else if (
                    typeof small === 'number' &&
                    rowArr[small].child.length < 3
                ) {
                    rowArr[small].child.push(item);
                } else {
                    small = rowArr.length;
                    rowArr[small] = { type: 'small', child: [item] };
                }
            }
            if (str.length >= 3 && str.length < 5) {
                if (rowArr.length === 0) {
                    middle = 0;
                    rowArr[middle] = { type: 'middle', child: [item] };
                } else if (
                    typeof middle === 'number' &&
                    rowArr[middle].child.length < 2
                ) {
                    rowArr[middle].child.push(item);
                } else {
                    middle = rowArr.length;
                    rowArr[middle] = { type: 'middle', child: [item] };
                }
            }
            if (str.length >= 5) {
                max = rowArr.length;
                rowArr[max] = { type: 'max', child: [] };
                for (let i = 0; i < str.length;) {
                    rowArr[max].child.push(str.substring(i, i + 8));
                    i += 8;
                }
            }
        });
        return rowArr
    }, [])

    const fn2 = useCallback((a) => {
        return (b) => {
            return a + b
        }
    }, [])


    return (
        <>
            <div className="box">
                {rowList.map((item, index) => {
                    return (
                        <div className={`row row-${item.type}`} key={index}>
                            {item.child.map((value, index) => {
                                return (
                                    <div className="block" key={index}>
                                        {value}
                                    </div>
                                );
                            })}
                        </div>
                    );
                })}
            </div>
        </>
    );
}
export default JqueryWookMarkLoad