import "../../styles/tableGalleryStyle.css";
import humanIcon from "../../assets/humanIcon.png";
import carIcon from "../../assets/carIcon.png";
import {pedestrianImages} from "../helperFunctions/pedestrianArray";
import {useEffect, useState} from "react";
import {VscArrowSmallLeft, VscArrowSmallRight} from "react-icons/vsc";
import {carImages} from "../helperFunctions/carArray";

export const TableGallery = (props) => {
    const [images, setImages] = useState(pedestrianImages);
    const [image, setImage] = useState(images[0]);

    useEffect(() => {
        setImage(images[0]);
    }, [images]);


    const chooseImageWithArrow = (where) => {
        const currentIndex = images.indexOf(image);
        let newIndex;

        if (where === "left") {
            newIndex = currentIndex - 1;
            if (newIndex < 0) {
                newIndex = images.length - 1;
            }
        } else if (where === "right") {
            newIndex = currentIndex + 1;
            if (newIndex >= images.length) {
                newIndex = 0;
            }
        }

        setImage(images[newIndex]);
    };

    return (
        <>
            <div className={'tableGallerySpace'}>
                <div className={'tableCloseBtn'} onClick={() => {
                    props.onHide();
                }}>
                    გასვლა
                </div>
                <div className={'tableGallery'}>
                    <div className={'gallery'}>
                        <div className={'galleryItem'} onClick={() => {
                            setImages(pedestrianImages)
                        }}>
                            <img className={'galleryItemIcon'} src={humanIcon} alt={'humanIcon'}/>
                        </div>
                        <div className={'galleryItem'} onClick={() => {
                            setImages(carImages)
                        }}>
                            <img className={'galleryItemIcon'} src={carIcon} alt={'carIcon'}/>
                        </div>
                    </div>
                    <div className={'album'}>
                        <h1 className={'albumTitle'}>
                            {images[0] === pedestrianImages[0] ? "ქვეითის" : "მანქანის"} ალბომი
                        </h1>
                        <div className={'albumBody'}>
                            <VscArrowSmallLeft className={'albumBodyArrow'} size={80} onClick={() => {
                                chooseImageWithArrow("left")
                            }}/>
                            <div className={'chosenImageSpace'}>
                                <img className={'chosenImage'} src={image} alt={'table foto'}/>
                            </div>
                            <VscArrowSmallRight className={'albumBodyArrow'} size={80} onClick={() => {
                                chooseImageWithArrow("right")
                            }}/>
                        </div>
                        <div className={'albumImagesSpace'}>
                            {
                                images.map((item, index) => (
                                    <div key={index} className={'albumImages'} onClick={() => {
                                        setImage(item);
                                    }}>
                                        <img className={'albumImage'} src={item} alt={'table foto from album'}/>
                                    </div>
                                ))
                            }
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}