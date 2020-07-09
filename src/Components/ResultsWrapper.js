import React from "react";
import {brown, yellow} from "../Misc/Colors";

/**
 * Wrapper for guess results
 * Used in Game and Game-End Screen
 * @param results
 * @returns {*}
 * @constructor
 */
const ResultsWrapper = ({results}) => {

    let comps = results.map((data, index) =>
        <ResultRow key={index} data={data}/>
    )

    return (
        <div style={{flexDirection: "column"}}>
            {comps}
        </div>
    )
}

export {ResultsWrapper}


/**
 * Row generated after every guess.
 * @param a
 * @param b
 * @param number
 * @returns {*}
 * @constructor
 */
const ResultRow = ({data}) => {

    let [number, a, b] = data;

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
