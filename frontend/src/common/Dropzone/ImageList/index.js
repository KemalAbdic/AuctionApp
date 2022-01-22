import React, {useRef} from "react";
import {useDrag, useDrop} from "react-dnd";

import '../dropzone.css'

const type = "Image";

const Image = ({image, index, moveImage}) => {
    const ref = useRef(null);

    const [, drop] = useDrop({
        accept: type,
        hover(item) {
            if (!ref.current) {
                return;
            }
            const dragIndex = item.index;
            const hoverIndex = index;
            if (dragIndex === hoverIndex) {
                return;
            }
            moveImage(dragIndex, hoverIndex);
            item.index = hoverIndex;
        }
    });

    const [{isDragging}, drag] = useDrag({
        type,
        item: {index},
        collect: monitor => ({
            isDragging: monitor.isDragging()
        })
    });

    drag(drop(ref));

    return (
        <div
            ref={ref}
            style={{opacity: isDragging ? 0 : 1}}
            className="file-item"
        >
            <img
                className="file-img"
                src={image.src}
                style={image.url !== undefined ? {border: '2px solid #8367D8'} : null}
                alt=""
            />
        </div>
    );
};

const ImageList = ({images, moveImage}) => {

    return (
        <div className="file-list">
            {images.map((image, index) =>
                <Image
                    image={image}
                    index={index}
                    key={index}
                    moveImage={moveImage}
                />
            )}
        </div>
    );
};

export default ImageList;
