import React, { Component } from 'react'


const TableHeader = (props) => {
    const headerNames = props.headerNames.map((col,index) => {
        return (
                <th key={index}> {col}</th>
        )
    })
    return <thead><tr>{headerNames}</tr></thead>
}

const TableBody = (props) => {
    const rows = props.resultsData.map((row, index) => {
        const cells = row.map((entry,idx) => {
            return <td key={idx}>{entry}</td>
        })
    return (
        <tr key={index}>{cells}</tr>
    )
})

return <tbody>{rows}</tbody>
}

class Table extends Component {
render() {
    const { resultsData, headerNames} = this.props
    return (
    <table>
        <TableHeader headerNames={headerNames}/>
        <TableBody resultsData={resultsData}/>
    </table>
    )
}
}

export default Table