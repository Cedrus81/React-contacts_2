import { utilService } from "../services/util.service"

export function TransferPreview({ transfer }) {
    return (
        <li className="transfer-preview flex column">
            <h4>Contact: {transfer.to}</h4>
            <p>Amount: {transfer.amount}</p>
            <p>{utilService.timeSince(transfer.at)}</p>
        </li>
    )
}