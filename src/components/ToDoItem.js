import { useRef } from 'react'

export function TodoItem({ item, itemDelete, itemUpdate }) {
    const inputEl = useRef(null)
    const checkedEl = useRef(null)

    return (

        <div>
            <input ref={inputEl} onChange={() => { itemUpdate(item.id, inputEl.current.value, item.order, checkedEl.current.checked) }} value={item.title} />
            <input ref={checkedEl} onChange={() => { itemUpdate(item.id, inputEl.current.value, item.order, checkedEl.current.checked) }} checked={item.checked} type="checkbox" id="scales" name="scales" />
            <button onClick={() => { itemDelete(item.id) }}>delete</button>
        </div>
    )

}