import { Group} from "@vkontakte/vkui";
import '@vkontakte/vkui/dist/vkui.css';
import ShoppingCartList from "./ShoppingCartList";

const ShoppingCart = () => {
    return (
        <div className="shoppingCart">
            <Group>
                <ShoppingCartList />
            </Group>
        </div>
    )
}

export default ShoppingCart;