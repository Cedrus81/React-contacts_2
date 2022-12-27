// import { Component } from 'react'
import { TransferPreview } from './transfer-preview.jsx'
// export class TransferList extends Component {
//     render() {

//         return (
//             <div>transfer-list</div>
//         )
//     }
// }

export function TransferList({ list }) {
    return (
        <article className="transfer-list-container">
            <h1>Transfer history:</h1>
            <ul className="transfer-list">
                {list.map(transfer => <TransferPreview transfer={transfer} />)}
            </ul>
        </article>

    )
}
