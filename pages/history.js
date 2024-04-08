import { useAtom } from 'jotai';
import { searchHistoryAtom } from '@/store';
import { useRouter } from 'next/router';
import { Button } from 'react-bootstrap';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import styles from '@/styles/History.module.css';
import { removeFromHistory } from '@/lib/userData';

export default function History(){
    const [searchHistory,setSearchHistory] = useAtom(searchHistoryAtom);
    const router = useRouter();
    if(!searchHistory) return null;

    let parsedHistory = [];
    searchHistory.forEach(h => {
        let params = new URLSearchParams(h);
        let entries = params.entries();
        parsedHistory.push(Object.fromEntries(entries));
    });

    function historyClicked(e, index){
        router.push(`/artwork?${searchHistory[index]}`);
    }

    async function removeHistoryClicked(e,index){
        e.stopPropagation(); // stop the event from trigging other events
        setSearchHistory(await removeFromHistory(searchHistory[index]))

        // setSearchHistory(current => {
        //     let x = [...current];
        //     x.splice(index, 1)
        //     return x;
        // });
    }


    if(parsedHistory.length ==0){
        return(<>
            <Card >
                <Card.Body>
                    <h4>Nothing Here</h4>Try searching for somethingelse
                </Card.Body>
            </Card>
        </>)
    }else{
        return(<>
            <ListGroup>     
                {parsedHistory.map((item,index) =><>
                    <ListGroup.Item onClick={()=>historyClicked(item,index)} className={styles.historyListItem}>{Object.keys(item).map(key => (<>{key}: <strong>{item[key]}</strong>&nbsp; </>))}
                    <Button className="float-end" variant="danger" size="sm"onClick={e => removeHistoryClicked(e, index)}>&times;</Button>
                    </ListGroup.Item></>)}
            </ListGroup>
            
        </>)
    }
    
    

}