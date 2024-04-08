import { favouritesAtom } from '@/store';
import { useAtom } from 'jotai';
import { useState, useEffect } from "react";
import useSWR from "swr";
import Card from 'react-bootstrap/Card';
import { Col, Row } from "react-bootstrap";
import ArtworkCard from "@/components/ArtworkCard";


export default function Favourites(){  
    const [FavouritesList] = useAtom(favouritesAtom);

    if(!FavouritesList){
        return null
    }else{
       
        if(FavouritesList.length >0){
            return(<>
            
                <Row className="gy-4">
                    {FavouritesList.map(item =><>
                        <Col lg={3} key={item}><ArtworkCard objectID={item} /></Col>
                    </>

                    )}
                </Row>
            </>)
        }else if(FavouritesList.length ==0){
            return(<>
                <Card className='bg-light'>
                    <Card.Body>
                        <h4>Nothing Here</h4>Try searching for somethingelse
                    </Card.Body>
                </Card>
            </>)
        }else if(!FavouritesList){
            return null
        }

    }
}