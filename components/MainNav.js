import { useRouter } from 'next/router'
import { useForm } from 'react-hook-form';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Form from 'react-bootstrap/Form';
import Link from "next/link";
import Button from 'react-bootstrap/Button';
import { useState } from 'react';
import { NavDropdown } from 'react-bootstrap';
import { searchHistoryAtom } from '@/store';
import { useAtom } from 'jotai';
import { addToHistory } from '@/lib/userData';
import { readToken,removeToken } from '@/lib/authenticate';


function BasicExample() {
  const router = useRouter()
  const [searchHistory,setSearchHistory] = useAtom(searchHistoryAtom);
  let token = readToken();


  const [isExpanded, setIsExpanded] = useState(false);
   const { register, handleSubmit } = useForm({
        defaultValues: {
            q : "",
        },
    });

  async function submitForm(data) {
      let queryString = `title=true&q=${data.q}`;
      router.push(`/artwork?title=true&q=${data.q}`);
      setIsExpanded(false);
      setSearchHistory(await addToHistory(`title=true&q=${data.q}`))

      //setSearchHistory(current => [...current, queryString]);

  }

  const toggle = () => {
    setIsExpanded(!isExpanded);
  };

  function logout(){
    setIsExpanded(false);
    removeToken();
    router.push(`/login`)
  }

  return (<>
    <Navbar expand="lg" expanded = {isExpanded} className="fixed-top navbar-dark bg-black">
      <Container>
        <Navbar.Brand >Aldrin Fernandez</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" toggle = {toggle} />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
                <Link href="/" passHref legacyBehavior><Nav.Link active={router.pathname === "/"} onClick={() =>setIsExpanded(false)} >Home</Nav.Link></Link>
                {token && <Link href="/search" passHref legacyBehavior><Nav.Link active={router.pathname === "/search"} onClick={() =>setIsExpanded(false)}>Advance Search</Nav.Link></Link>}

          </Nav>
            {!token && 
              <Nav>
                <Link href="/register" passHref legacyBehavior><Nav.Link active={router.pathname === "/register"} onClick={() =>setIsExpanded(false)}  >
                  Register
                </Nav.Link></Link>
                <Link href="/login" passHref legacyBehavior><Nav.Link active={router.pathname === "/login"} onClick={() =>setIsExpanded(false)} >
                  Log in
                </Nav.Link></Link>
              </Nav>}
            {token &&
              <Form className="d-flex" onSubmit={handleSubmit(submitForm)}>
                  <Form.Control
                  type="search"
                  placeholder="Search"
                  className="me-2"
                  aria-label="Search"
                  {...register("q")}
                  />  
                  <Button variant="primary outline-success" type="submit" >Search</Button> 
              </Form>
            }

            &nbsp;
            {token &&
            <Nav>
              <NavDropdown title={token.userName} id="basic-nav-dropdown">
                <Link href="/favourites" passHref legacyBehavior><Nav.Link active={router.pathname === "/favourites"} >
                  <NavDropdown.Item href="/favourites">
                    Favourites
                  </NavDropdown.Item>
                </Nav.Link></Link>
                <Link href="/history" passHref legacyBehavior><Nav.Link active={router.pathname === "/history"}>
                  <NavDropdown.Item href="/history">
                    Search History
                  </NavDropdown.Item>
                </Nav.Link></Link>
                <Link href="/login" passHref legacyBehavior><Nav.Link active={router.pathname === "/login"}>
                  <NavDropdown.Item href="/login" onClick={logout}>
                    Log Out
                  </NavDropdown.Item>
                </Nav.Link></Link>
              </NavDropdown>
            </Nav>
            }
        </Navbar.Collapse>
      </Container>
    </Navbar>
    <br/>
    <br/>
    </>);
}

export default BasicExample;