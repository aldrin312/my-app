import { useAtom } from "jotai";
import { favouritesAtom,searchHistoryAtom } from "@/store";
import { getFavourites,getHistory } from "@/lib/userData";
import { useEffect } from "react";
import { useRouter } from "next/router";
import { isAuthenticated } from "@/lib/authenticate";
import { useState } from "react";

const PUBLIC_PATHS = ['/login', '/', '/_error','/register'];


export default function RouteGuard(props) {
    const [FavouritesList,setFavouritesList] = useAtom(favouritesAtom);
    const [searchHistory,setSearchHistory] = useAtom(searchHistoryAtom);
    const router = useRouter();
    const [authorized, setAuthorized] = useState(false);

    async function updateAtoms(){
        setFavouritesList(await getFavourites());
        setSearchHistory(await getHistory());
    }
    useEffect(() => {
        updateAtoms();
        authCheck(router.pathname);
        router.events.on('routeChangeComplete', authCheck);
        return () => {
            router.events.off('routeChangeComplete', authCheck);
        };

    },[]);

    function authCheck(url) {
        const path = url.split('?')[0];
        if (!isAuthenticated() && !PUBLIC_PATHS.includes(path)) {
            setAuthorized(false);
            router.push('/login');
          } else {
            setAuthorized(true);
          }
        
      }

    return <>{authorized && props.children}</>
}