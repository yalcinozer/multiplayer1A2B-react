import React from 'react';
import {yellow, brown} from '../Misc/Colors';

/**
 * Row generated after every guess.
 * @param a
 * @param b
 * @param number
 * @returns {*}
 * @constructor
 */
const ResultRow = ({a, b, number}) => {
    return (
        <div style={{
            flexDirection    : 'row',
            alignItems       : 'center',
            paddingVertical  : 4,
            borderBottomWidth: 1,
            borderBottomColor: '#dfdfdf',
            justifyContent   : 'center'
        }}>
            <span style={{fontSize: 18, marginHorizontal: 12, minWidth: 50,}}>
                {number}
            </span>
            <span style={{fontSize: 18, color: yellow, marginRight: 8}}>
                {a}A
            </span>
            <span style={{fontSize: 18, color: brown}}>
                {b}B
            </span>
        </div>
    )
}

export default ResultRow;
