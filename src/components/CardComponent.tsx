import myStore from "../store/MyStore";
import { Card, Text} from "@vkontakte/vkui";
import '@vkontakte/vkui/dist/vkui.css';
import { Icon24SartOutline, Icon24DollarOutline, Icon24Favorite, Icon24DeleteOutline  } from "@vkontakte/icons";
import { observer } from "mobx-react";
import { runInAction } from "mobx";

const CardComponent = observer(() => {
    const products = myStore.appData;

    const handleAddToCart = (product: any) => {
        const existingProduct = myStore.cartItems.find(item => item.id === product.id);
        if (existingProduct) {
            runInAction(() => {
                myStore.cartItems = myStore.cartItems.map(item =>
                    item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
                );
            });
        } else {
            runInAction(() => {
                runInAction(() => {
                    myStore.addToCart({ ...product, quantity: 1 });
                })
            });
        }
    };

    const handleDeleteCart = (productToDelete: any) => {  
        myStore.removeFromCart(productToDelete);  
    };     
    

    return (
        <div className="grid">
            {products.map(product => (
                <Card  className="product" key={product.id}>
                    <div>
                        <p className="title">{product.title}</p>
                        <div className="imageProduct">
                            <img className="image" src={product.image} alt={product.title} />
                        </div>
                        <Text className="line"><Icon24DollarOutline />{product.price}</Text>
                        <Text className="line"><Icon24Favorite /> {product.rating.rate} ({product.rating.count} reviews)</Text>
                        <p className="text">{product.description}</p>
                        <button onClick={() => handleAddToCart(product)}><Icon24SartOutline /></button>
                        <button onClick={() => handleDeleteCart(product)}><Icon24DeleteOutline /></button>
                        
                    </div>
                </Card>
                
            ))}

        </div>
    );
});

export default CardComponent;
