import Form from 'react-bootstrap/Form';
import { useRouter } from 'next/router';
import { Button, Col, Row } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { searchHistoryAtom } from '@/store';
import { useAtom } from 'jotai';




export default function Search(){
    var queryString = ""
    const router = useRouter()
    const [searchHistory,setSearchHistory] = useAtom(searchHistoryAtom);


    const { register, handleSubmit } = useForm({
        defaultValues: {
            searchBy : "",
            geoLocation: "",
            medium: "",
            isOnView: false,
            isHighlight: false,
            q : "",
        },
    });

    function submitForm(data) {
        
        queryString = `${data.searchBy}=true&${data.geoLocation ? `geoLocation=${data.geoLocation}&` : ""}${data.medium ? `medium=${data.medium}` :""}isOnView=${data.isOnView}&isHighlight=${data.isHighlight}&q=${data.q}`
        router.push(`/artwork?${queryString}`)
        setSearchHistory(current => [...current, queryString]);

    }

    return(<>
    
        <Form onSubmit={handleSubmit(submitForm)}>
            
            <Row>
                <Col>
                <Form.Group className="mb-3">
                    <Form.Label>Search Query</Form.Label>
                    <Form.Control type="text" placeholder="" name="q" {...register("q",{ required: true})}/>
                </Form.Group>
                </Col>
            </Row>
            <Row>
                <Col md={4}>
                <Form.Label>Search By</Form.Label>
                <Form.Select name="searchBy" className="mb-3" {...register("searchBy")}>
                    <option value="title" selected>Title</option>
                    <option value="tags">Tags</option>
                    <option value="artistOrCulture">Artist or Culture</option>
                </Form.Select>
                </Col>
                <Col md={4}>
                <Form.Group className="mb-3">
                    <Form.Label>Geo Location</Form.Label>
                    <Form.Control type="text" placeholder="" name="geoLocation"  {...register("geoLocation")}/>
                    <Form.Text className="text-muted" >
                    Case Sensitive String (ie &quot;Europe&quot;, &quot;France&quot;, &quot;Paris&quot;, &quot;China&quot;, &quot;New York&quot;, etc.), with multiple values separated by the | operator
                </Form.Text>
                </Form.Group>
                </Col>
                <Col md={4}>
                <Form.Group className="mb-3">
                    <Form.Label>Medium</Form.Label>
                    <Form.Control type="text" placeholder="" name="medium"  {...register("medium")}/>
                    <Form.Text className="text-muted" >
                    Case Sensitive String (ie: &quot;Ceramics&quot;, &quot;Furniture&quot;, &quot;Paintings&quot;, &quot;Sculpture&quot;, &quot;Textiles&quot;, etc.), with multiple values separated by the | operator
                </Form.Text>
                </Form.Group>
                </Col>
            </Row>
            <Row>
                <Col>
                <Form.Check
                    type="checkbox"
                    label="Highlighted"
                    name="isHighlight"
                    {...register("isHighlight")}
                />
                <Form.Check
                    type="checkbox"
                    label="Currently on View"
                    name="isOnView"
                    {...register("isOnView")}
                />
                </Col>
            </Row>
            <Row>
                <Col>
                <br />
                <Button variant="primary" type="submit">
                    Submit
                </Button>
                </Col>
            </Row>
        </Form>
    </>)

}