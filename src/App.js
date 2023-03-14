import React, { useState } from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import uuid from "uuid/v4";

export const itemsFromBackend = [
    { id: uuid(), content: "First task" },
    { id: uuid(), content: "Second task" },
];


const columnsFromBackend = [
    {
        id: uuid(),
        name: "Requested",
        items: itemsFromBackend
    },
    {
        id: uuid(),
        name: "To do",
        items: []
    },
    {
        id: uuid(),
        name: "In Progress",
        items: []
    },
    {
        id: uuid(),
        name: "Done",
        items: []
    }
]





const onDragEnd = (result, columns, setColumns) => {
    if (!result.destination) return;
    const { source, destination } = result;


    if (source.droppableId !== destination.droppableId) {

        const sourceColumn = columns.find(c => c.id === source.droppableId);
        const sourceItems = sourceColumn.items;


        const destColumn = columns.find(c => c.id === destination.droppableId);
        const destItems = destColumn.items;

        const [removed] = sourceItems.splice(source.index, 1);
        destItems.splice(destination.index, 0, removed);

        console.log(columns)

        setColumns([...columns]);
    } else {

        const column = columns.find(c => c.id === source.droppableId);

        const copiedItems = [...column.items];

        const [removed] = copiedItems.splice(source.index, 1);
        copiedItems.splice(destination.index, 0, removed);

        column.items = [...copiedItems]
        console.log(columns)

        
        setColumns([...columns]);
    }
};




function App() {


    const [columns, setColumns] = useState([...columnsFromBackend]);
    return (
        <div style={{ display: "flex", justifyContent: "center", height: "100%" }}>
            <DragDropContext onDragEnd={result => onDragEnd(result, columns, setColumns)} >
                {columns.map((Coluna) => {
                    return (
                        <div
                            style={{
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "center"
                            }}
                            key={Coluna.id}
                        >
                            <h2>{Coluna.id}</h2>
                            <div style={{ margin: 8 }}>
                                <Droppable droppableId={Coluna.id} key={Coluna.id}>
                                    {(provided, snapshot) => {
                                        return (
                                            <div
                                                {...provided.droppableProps}
                                                ref={provided.innerRef}
                                                style={{
                                                    background: snapshot.isDraggingOver
                                                        ? "lightblue"
                                                        : "lightgrey",
                                                    padding: 4,
                                                    width: 250,
                                                    minHeight: 500
                                                }}
                                            >
                                                {Coluna.items.map((item, index) => {
                                                    return (
                                                        <Draggable
                                                            key={item.id}
                                                            draggableId={item.id}
                                                            index={index}
                                                        >
                                                            {(provided, snapshot) => {
                                                                return (
                                                                    <div
                                                                        ref={provided.innerRef}
                                                                        {...provided.draggableProps}
                                                                        {...provided.dragHandleProps}
                                                                        style={{
                                                                            userSelect: "none",
                                                                            padding: 16,
                                                                            margin: "0 0 8px 0",
                                                                            minHeight: "50px",
                                                                            backgroundColor: snapshot.isDragging
                                                                                ? "#263B4A"
                                                                                : "#456C86",
                                                                            color: "white",
                                                                            ...provided.draggableProps.style
                                                                        }}
                                                                    >
                                                                        {item.content}
                                                                    </div>
                                                                );
                                                            }}
                                                        </Draggable>
                                                    );
                                                })}
                                                {provided.placeholder}
                                            </div>
                                        );
                                    }}
                                </Droppable>
                            </div>
                        </div>
                    );
                })}
            </DragDropContext>
        </div>
    );
}

export default App;
