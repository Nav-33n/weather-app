import React, { useEffect } from "react";
import { createClient } from "pexels";

export default function CurrentWeather(props){

    const [image, setImage] = React.useState(null);
    const client = createClient(`${process.env.REACT_APP_PHOTO_API_KEY}`);
    const query = `${props.condition}`

 useEffect(() => {
    const query = `${props.condition}`
    client.photos.search({ query, per_page: 5 }).then(photos => setImage(photos));

 }, [props.condition])

    if(image === null){
        return <div>Loading...</div>
    }
    
    let randomNumber = Math.floor(Math.random() * 5);
    let body = document.body;
    let leftContainer = document.querySelector(".left-container");
    let rightContainer = document.querySelector(".right-container");
    let text = document.querySelector(".condition");
    
    body.style.backgroundImage = `url(${image.photos[randomNumber].src.landscape})`
    leftContainer.style.backgroundImage = `url(${image.photos[randomNumber].src.landscape})`
    rightContainer.style.backgroundColor = `${image.photos[randomNumber].avg_color}`;

    function handleWord(word){
    const words = word.split(" ");
    const wordCount = words.length;
    return wordCount
    }
    return (
        <div className={handleWord(props.condition) > 3 ? "text-wrap" : "condition"}>
            <p>{props.condition} </p>
        </div>
    )
}
