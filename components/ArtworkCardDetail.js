import Error from "next/error";
import useSWR from "swr";
import Card from 'react-bootstrap/Card';
import { Button } from "react-bootstrap";
import { useAtom } from 'jotai';
import { favouritesAtom } from '@/store';
import { useEffect, useState } from "react";
import { addToFavourites,removeFromFavourites } from "@/lib/userData";



export default function ArtworkCardDetail({objectID}){
    const { data, error } = useSWR(objectID ? `https://collectionapi.metmuseum.org/public/collection/v1/objects/${objectID}` : null);
    const [FavouritesList, setFavouritesList] = useAtom(favouritesAtom);
    // const [showAdded, setShowAdded] = useState(FavouritesList.includes(objectID));
    const [showAdded, setShowAdded] = useState(false);
    const [buttonName, setButtonName] = useState("+ Favourite");

    useEffect(() => {
        if(showAdded){
            setButtonName("+ Favourite (added)");
        }else{
            setButtonName("+ Favourite");

        }
        setShowAdded(FavouritesList?.includes(objectID))

    },[showAdded,FavouritesList]);

    // useEffect(()=>{
    //     setShowAdded(favouritesList?.includes(objectID))
    // }, [favouritesList])

    async function favouritesClicked(){
        if(showAdded){
            setFavouritesList(await removeFromFavourites(objectID))
            //setFavouritesList(current => current.filter(fav => fav != objectID));
            setShowAdded(false);

        }else{
            // setFavouritesList(current => [...current, objectID]);
            setFavouritesList(await addToFavourites(objectID))
            setShowAdded(true);
        }
    }
    function test(){
        console.log(FavouritesList.includes(objectID));
        console.log(FavouritesList);
    }
    let link = `/artwork/${objectID}`
    if(error){
        return (<>
                <Error statusCode={404} />      
            </>)
    }        
    else if(data == null){
        return (<>

        </>)
    }else{
        return(<>
            <Card>
             <Card.Img variant="top" src={data.primaryImageSmall ? `${data.primaryImageSmall}` : ""}/>
             <br/>

             <Card.Title>&nbsp;&nbsp;&nbsp;{data.title}</Card.Title>

             <Card.Body>
                Medium: {data.medium}
                <br/>
                <br/>
                Artist: {data?.artistDisplayName === "" ? "N/A" : `${data?.artistDisplayName}   `} 
                {data?.artistDisplayName === "" ? "" :<a href={data.artistWikidata_URL} target="_blank" rel="noreferrer" >wiki</a> }
                <br></br>
                Credit Line: {data.creditLine}<br></br>
                Dimention: {data.dimensions}<br></br>
                <br></br>
                
                <Button variant="outline-success" onClick={favouritesClicked}> {buttonName}</Button>

             </Card.Body>
            </Card>
            
        </>)
    }

}