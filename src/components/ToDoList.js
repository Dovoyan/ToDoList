import { useRef, useState, useEffect } from 'react'
import { TodoItem } from './ToDoItem'



export function ToDoList() {
    const [items, setItems] = useState([])
    const [currentCard, setCurrentCard] = useState(null)
    const inputEl = useRef(null)

    useEffect(() => {
        fetch('https://kovalenkau-to-do.herokuapp.com/todo')
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                setItems(data)
                console.log(data);
            })
    }, []);

    function itemAdd() {
        const newItem = { title: inputEl.current.value, order: items.length + 1, checked: false };
        fetch('https://kovalenkau-to-do.herokuapp.com/todo', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newItem)
        }).then((response) => {
            return response.json();
        })
            .then((data) => {
                setItems([...items, data])
            })
    }

    function itemDelete(id) {
        fetch(`https://kovalenkau-to-do.herokuapp.com/todo/${id}`, {
            method: 'DELETE',
        }).then((response) => {
            return response.json();
        })
            .then((data) => {
                setItems(data)
            })
    }

    function itemUpdate(id, title, order, checked) {
        const newItem = { title: title, order: order, id: id, checked: checked }
        fetch(`https://kovalenkau-to-do.herokuapp.com/todo`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newItem)
        }).then((response) => {
            return response.json();
        })
            .then((data) => {
                setItems(data)
            })
    }


    function dragSartHandler(e, card) {
        setCurrentCard(card)
    }

    function dragEndHandler(e) {
        e.currentTarget.style.background = 'tomato'
    }

    function dragOverHandler(e) {
        e.preventDefault()
        e.currentTarget.style.background = 'lightgray'
    }

    function dropHandler(e, card) {
        e.preventDefault()
        setItems(items.map(item => {
            if (item.id === card.id) {
                itemUpdate(card.id, card.title, currentCard.order, card.checked)
                return { ...item, order: currentCard.order }
            }
            if (item.id === currentCard.id) {
                itemUpdate(currentCard.id, currentCard.title, card.order, currentCard.checked)
                return { ...item, order: card.order }
            }
            return item
        }))
        e.currentTarget.style.background = 'tomato'
    }

    const sortCards = (a, b) => {
        return a.order > b.order ? 1 : -1
    }


    return (
        <div>
            <button onClick={() => { itemAdd() }}>Add</button><input ref={inputEl} />
            <div className="itemTable">
                {
                    items.sort(sortCards).map((item, index) => {
                        return (
                            <div
                                key={index}
                                onDragStart={(e) => dragSartHandler(e, item)}
                                onDragLeave={(e) => dragEndHandler(e)}
                                onDragEnd={(e) => dragEndHandler(e)}
                                onDragOver={(e) => dragOverHandler(e)}
                                onDrop={(e) => dropHandler(e, item)}
                                className="todoItem"
                                draggable={true}
                            >
                                <TodoItem item={item} itemDelete={itemDelete} itemUpdate={itemUpdate} />
                            </div>
                        )
                    })

                }
            </div>
        </div>
    )

}