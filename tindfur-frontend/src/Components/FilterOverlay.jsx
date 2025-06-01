import './FilterOverlay.css';
import BrowsingFilter from './BrowsingFilter';
import { IoClose } from "react-icons/io5";


export default function FilterOverlay({ isOpen, submit, onClose }) {
    return (
        <>
            {isOpen && <div className='filter-dialogue'>
                <div id='filter-overlay-background'>
                    <div id='filter-overlay'>
                        <button onClick={onClose} id='close-button'>
                        <IoClose />
                        </button>
                        <BrowsingFilter onSubmit={submit} />
                    </div>
                </div>
            </div >}
        </>
    )
}
