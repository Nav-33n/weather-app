import React, { useEffect } from "react";

export default function Search(props) {
   
    const [place, setPlace] = React.useState('');
    let search = document.getElementById("searchbar");
    let region = props.region === "" ? props.country : props.region;
    
    let places = `${props.place}, ${region}`;
     useEffect(() => {
        setPlace(places);
     }, [places])

    function handleSubmit(event) {
        let searchValue = "";
        
        if(event.keyCode === 13){
            searchValue = search.value;
            props.search(searchValue)
            search.value = "";
            
        }
    }

    
    return(
        <div className="searchbar">
            <input type="text" id="searchbar" onKeyDown={handleSubmit} autocomplete="off" placeholder={place}></input>
        </div>
    )
}