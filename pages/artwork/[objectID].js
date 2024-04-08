import ArtworkCardDetail from '@/components/ArtworkCardDetail';
import { useRouter } from 'next/router';
import { Col, Row } from 'react-bootstrap';

const router = useRouter();


export default function object(){
    const { objectID } = router.query;
    return(<>
        <Row>
            <Col>
                <ArtworkCardDetail objectID={objectID} />
            </Col>
        </Row>
    </>)

}