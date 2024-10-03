import { Outlet } from "react-router-dom";

import MainNavigation from '../components/MainNavigation.jsx'
export default function RootLayoutPage() {
    // const navigation =useNavigation();

    return (
        <>
            <MainNavigation />
            <main>
                {/* {navigation.state === 'loading' && <p>Loading ...</p>} */}
                <Outlet />
            </main>
        </>
    );
}