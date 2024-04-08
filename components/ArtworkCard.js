import Error from "next/error";
import useSWR from "swr";
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Link from "next/link";


export default function ArtworkCard(objectID){
    const { data, error } = useSWR(`https://collectionapi.metmuseum.org/public/collection/v1/objects/${objectID.objectID}`);
    let link = `/artwork/${objectID.objectID}`
    if(error){
        return (<>
                <Error statusCode={404} />  
            </>)
    }        
    else if(data == null){
        return null
    }else{
        return(<>
             <Card style={{ width: '18rem' }}>
                <Card.Img variant="top" src={data.primaryImageSmall ? `${data.primaryImageSmall}` : "https://via.placeholder.com/375x375.png?text=[+Not+Available+]"}/>
                <Card.Body>
                    <Card.Title>{data.title === "" ? "N/A" : data.title}</Card.Title>
                    <Card.Text>
                        Date: {data.objectDate === "" ? "N/A" : data.objectDate} <br></br>
                        Classification: {data.classification === "" ? "N/A" : data.classification} <br></br>
                        Medium: {data.medium === "" ? "N/A" : data.medium} <br></br>
                    </Card.Text>
                    
                    <Link href={link} passHref legacyBehavior>
                        <Button variant="outline-success">ID : {data.objectID}</Button>
                    </Link>
                </Card.Body>
            </Card>
        </>)
    }

}