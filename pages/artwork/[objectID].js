import ArtworkCardDetail from '@/components/ArtworkCardDetail';
import { useRouter } from 'next/router';
import { Col, Row } from 'react-bootstrap';



export default function Object(){
    const Router = useRouter();

    const { objectID } = Router.query;
    return(<>
        <Row>
            <Col>
                <ArtworkCardDetail objectID={objectID} />
            </Col>
        </Row>
    </>)

}