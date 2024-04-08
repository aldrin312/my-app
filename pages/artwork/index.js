import Error from "next/error";
import { useState, useEffect } from "react";
import useSWR from "swr";
import Card from 'react-bootstrap/Card';
import { useRouter } from "next/router";
import ArtworkCard from "@/components/ArtworkCard";
import { Col, Pagination, Row } from "react-bootstrap";
import validObjectIDList from '@/public/data/validObjectIDList.json'

var PER_PAGE = 12
export default function Home(){
    const [artworkList, setArtworkList] = useState([]);
    const [page, setPage] = useState(1);

       

    const router = useRouter();
    let finalQuery = router.asPath.split('?')[1];

    const { data, error } = useSWR(`https://collectionapi.metmuseum.org/public/collection/v1/search?${finalQuery}`);

    function previousPage(){
        if (page >1) {
            setPage(page-1)
        }
    }
      
    function nextPage(){
        if(page < artworkList.length){
            setPage(page+1);
        }
    }

    useEffect(() => { 
            let result = []

            if (data) {

                let filteredResults = validObjectIDList.objectIDs.filter(x => data.objectIDs?.includes(x));
                for (let i = 0; i < filteredResults.length; i += PER_PAGE) {
                    const chunk = filteredResults.slice(i, i + PER_PAGE);
                    result.push(chunk);
                }
                // for (let i = 0; i < data?.objectIDs?.length; i += PER_PAGE) {
                // const chunk = data?.objectIDs.slice(i, i + PER_PAGE);
                // result.push(chunk);
                // }
                setArtworkList(result)
                setPage(1)
            }
    }, [data]);

    if(error){
        return(<>
            <Error statusCode={404} />
        </>)
    }else if(!artworkList){
        return null
    }else{
       
        if(artworkList.length >0){
            return(<>
            
                <Row className="gy-4">
                    {artworkList[page - 1].map(item =><>
                        <Col lg={3} key={item}><ArtworkCard objectID={item} /></Col>
                    </>

                    )}
                </Row>

                <Pagination>
                    <Pagination.Prev onClick={previousPage}/>
                    <Pagination.Item>{page}</Pagination.Item>
                    <Pagination.Next onClick={nextPage} />
                </Pagination> 

            </>)
        }else if(artworkList.length ==0){
            return(<>
                <Card className='bg-light'>
                    <Card.Body>
                        <h4>Nothing Here</h4>Try searching for somethingelse
                    </Card.Body>
                </Card>
            </>)
        }else if(!artworkList){
            return null
        }

    }


}