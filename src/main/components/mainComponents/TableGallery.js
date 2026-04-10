import "../../styles/tableGalleryStyle.css";
import humanIcon from "../../assets/humanIcon.png";
import carIcon from "../../assets/carIcon.png";
import { pedestrianImages } from "../helperFunctions/pedestrianArray";
import { useEffect, useState } from "react";
import { VscArrowSmallLeft, VscArrowSmallRight, VscClose } from "react-icons/vsc";
import { carImages } from "../helperFunctions/carArray";

export const TableGallery = ({ onHide }) => {
    const [images, setImages] = useState(pedestrianImages);
    const [image, setImage] = useState(images[0]);
    const [isActive, setIsActive] = useState(false);

    // Trigger entrance animation
    useEffect(() => {
        setIsActive(true);
        setImage(images[0]);
    }, [images]);

    const chooseImageWithArrow = (where) => {
        const currentIndex = images.indexOf(image);
        let newIndex;

        if (where === "left") {
            newIndex = currentIndex === 0 ? images.length - 1 : currentIndex - 1;
        } else {
            newIndex = currentIndex === images.length - 1 ? 0 : currentIndex + 1;
        }
        setImage(images[newIndex]);
    };

    return (
        <div className={`tableGalleryOverlay ${isActive ? 'active' : ''}`}>
            <div className="tableGallerySpace">
                <button className="tableCloseBtn" onClick={onHide}>
                    <VscClose size={24} /> <span>გასვლა</span>
                </button>

                <div className="tableGalleryMain">
                    {/* Side Navigation */}
                    <nav className="gallerySideNav">
                        <div
                            className={`navItem ${images === pedestrianImages ? 'active' : ''}`}
                            onClick={() => setImages(pedestrianImages)}
                        >
                            <img src={humanIcon} alt="human" />
                            <span className="navLabel">ქვეითი</span>
                        </div>
                        <div
                            className={`navItem ${images === carImages ? 'active' : ''}`}
                            onClick={() => setImages(carImages)}
                        >
                            <img src={carIcon} alt="car" />
                            <span className="navLabel">ტრანსპორტი</span>
                        </div>
                    </nav>

                    {/* Content Area */}
                    <div className="albumContainer">
                        <header className="albumHeader">
                            <h2 className="albumTitle">
                                {images === pedestrianImages ? "ქვეითის მონაცემთა ბაზა" : "სატრანსპორტო მონაცემთა ბაზა"}
                            </h2>
                            <div className="albumSubtitle">მოცემული მონაცემები გამოიყენება კალკულაციისთვის</div>
                        </header>

                        <div className="albumViewer">
                            <VscArrowSmallLeft className="arrowBtn" onClick={() => chooseImageWithArrow("left")} />

                            <div className="imageDisplay">
                                <div className="displayCorner tl"></div>
                                <div className="displayCorner tr"></div>
                                <div className="displayCorner bl"></div>
                                <div className="displayCorner br"></div>
                                <img className="mainImage" src={image} alt="Selected forensic data" />
                            </div>

                            <VscArrowSmallRight className="arrowBtn" onClick={() => chooseImageWithArrow("right")} />
                        </div>

                        <div className="thumbnailStrip">
                            {images.map((item, index) => (
                                <div
                                    key={index}
                                    className={`thumbWrapper ${image === item ? 'selected' : ''}`}
                                    onClick={() => setImage(item)}
                                >
                                    <img src={item} alt={`thumbnail ${index}`} />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};