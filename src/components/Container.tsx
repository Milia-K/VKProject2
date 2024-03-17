import { useEffect, useState } from "react";
import Loader from "./Loader";
import Get from "../services/Get";
import myStore from "../store/MyStore";
import CardGroup from "./CardGroup";
import ShoppingCart from "./ShoppingCart";
import { SplitCol, SplitLayout, PanelHeader, Header} from "@vkontakte/vkui";
import '@vkontakte/vkui/dist/vkui.css';



const Container = () => {

    const [isLoading, setIsLoading] = useState(true); 

    useEffect(() => {
        setTimeout(() => {
            async function fetchData() {
                const data = await Get.getAppData();
                myStore.setAppData(data);
                setIsLoading(false);
            }
            fetchData();
        }, 1000);
    }, []);


    return (
        <div>
            {isLoading ? <Loader /> :
            (<div>
            <PanelHeader>UrbanStyle</PanelHeader>
            <SplitLayout>
                <SplitCol className="splitcol" style={{flex:3}}>
                    <Header> Products</Header>
                    <CardGroup />
                </SplitCol>
                <SplitCol className="splitcol" style={{flex:1}}>
                    <Header> Shopping cart </Header>
                    <ShoppingCart />
                </SplitCol>
            </SplitLayout>
            </div>)
}
        </div>
    );
};

export default Container;

