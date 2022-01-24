import React from 'react';
import {Button} from 'react-bootstrap';
import './sellPageButton.css'
const SellPageButton = ({onBack, lastStep, loading, uploading}) => {

    const renderNextButton = () => {
        return lastStep === true ? "DONE" : uploading === true ? "UPLOADING" : "NEXT";
    }

    return (
        <div className="button-container">
            <Button
                className="sell-back-button"
                onClick={onBack}
                disabled={loading}
            >
                BACK
            </Button>
            <Button
                className="sell-next-button"
                type="submit"
                style={lastStep === true ? {background: "#8367D8", color: "#FCFCFC"} : {background: "inherit", color: "#000000"}}
                disabled={loading}
            >
                {renderNextButton()}
            </Button>
        </div>
    );
}

export default SellPageButton;
