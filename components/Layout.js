import MainNav from "./MainNav";
import { Container} from "react-bootstrap";
import { useRouter } from 'next/router'
import { useForm } from 'react-hook-form';

export default function Layout(props,staticPost){
    return (<>

    <MainNav /><br /><Container>{props.children}</Container><br />

    </>);
}