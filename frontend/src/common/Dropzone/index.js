import React from "react";
import {useDropzone} from "react-dropzone";
import {DndProvider} from "react-dnd";
import {HTML5Backend} from "react-dnd-html5-backend";
import {TouchBackend} from "react-dnd-touch-backend";
import update from "immutability-helper";

import './dropzone.css';
import ImageList from "./ImageList";

const isTouchDevice = () => {
    return "ontouchstart" in window;

};

const backendForDND = isTouchDevice() ? TouchBackend : HTML5Backend;

const getClassName = (className, isActive) => {
    if (!isActive) return className;
    return `${className} ${className}-active`;
};

const Dropzone = ({onDrop, accept, images, setImages}) => {
    const {getRootProps, getInputProps, isDragActive} = useDropzone({
        onDrop,
        accept
    });

    const moveImage = (dragIndex, hoverIndex) => {
        const draggedImage = images[dragIndex];
        setImages(
            update(images, {
                $splice: [[dragIndex, 1], [hoverIndex, 0, draggedImage]]
            })
        );
    };

    return (
        <div className={getClassName("dropzone", isDragActive)} {...getRootProps()}>
            <input className="dropzone-input" {...getInputProps()} />
            <div className="dropzone-content">
                <div>
                    {isDragActive ? (
                        "Release to drop the image here"
                    ) : (<div> { images.length === 0 ? <div className="dropzone-text">
                                <span style={{color: '#8367D8', fontWeight: 700}}>
                                    Upload photos
                                </span>
                            <span className="middle-text">or just drag and drop</span>
                            <span className="bottom-text">+Add at least 3 photos</span>
                        </div> : null}

                        </div>

                    )}
                </div>
            </div>
            <DndProvider backend={backendForDND}>
                <ImageList images={images} moveImage={moveImage}/>
            </DndProvider>
        </div>
    );
};

export default Dropzone;
