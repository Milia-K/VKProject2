import { List, Avatar, Cell, Text, Separator } from "@vkontakte/vkui";
import myStore from "../store/MyStore";
import { observer } from "mobx-react";
import { runInAction } from "mobx";

const ShoppingCartList = observer(() => {

    const handleDecreaseCart = (product: any) => {  
        runInAction(() => { 
            product.quantity -= 1;  
            if (product.quantity === 0) {  
                myStore.removeFromCart(product); 
            }  
        });
    };  

    const handleIncreaseCart = (product: any)  => {
        runInAction(() => {
            if (product.quantity < 10) {
                product.quantity += 1;
                if (product.quantity === 10) {
                    myStore.setCountDisable(product.id);
                }
            }
        });
    }

    let totalSum = 0;

    myStore.cartItems.forEach(product => {
        const price = parseFloat(product.price);
        const productTotal = price * product.quantity;
        totalSum += productTotal;
    });

    return (
        <List>
            {myStore.cartItems .length === 0 ? <Cell> It's empty...</Cell> :
            (myStore.cartItems .map(product => (
                <div key={product.id}>
                    <Cell className="productCart"  before = {<Avatar  src={product.image} alt={product.title} size={64}/>}>
                        <p className="titleCart">{product.title}</p>
                        <button onClick={() => handleDecreaseCart(product)}>-</button>
                        <Text className="line">{product.quantity} </Text>
                        <button onClick={() => handleIncreaseCart(product)} disabled={product.isCountDisabled}>+</button>
                        <Text>$ {(product.price * product.quantity).toFixed(2)}</Text>
                    </Cell>
                </div>
            )))}
            <Separator />
            <Cell>Total amount: ${(totalSum).toFixed(2)}</Cell>
        </List>
    )
}
)

export default ShoppingCartList;