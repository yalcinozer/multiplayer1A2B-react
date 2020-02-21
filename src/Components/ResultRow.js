import React from 'react';

import { View } from './AllComponents';
import { yellow, brown } from '../Misc/Colors';


const ResultRow = (props) => {
    return (
        <View style={{
            flexDirection: 'row',
            alignItems: 'center',
            paddingVertical: 4,
            borderBottomWidth: 1,
            borderBottomColor: '#dfdfdf',
            justifyContent: 'center'
        }}>
            <span style={{
                fontSize: 18,
                marginHorizontal: 12,
                minWidth: 50,
            }}>{props.number}</span>
            <span style={{
                fontSize: 18,
                color: yellow,
                marginRight: 8
            }}>{props.a}A</span>
            <span style={{
                fontSize: 18,
                color: brown
            }}>{props.b}B</span>
        </View>
    )
}

export default ResultRow;