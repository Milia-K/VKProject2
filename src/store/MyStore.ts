import { makeAutoObservable, runInAction } from 'mobx';
import Get from '../services/Get'

interface IDataItem {
    id: number;
    title: string;
    description: string;
    image: string;
    price: any;
    stock: number;
    rating: IRatingItem[];
    quantity: number;
    isCountDisabled: boolean; 
}

interface IRatingItem {
    rate: number | string;
    count: number | string;
}

interface IMyStore {
    appData: IDataItem[];
    setAppData(newAppData: IDataItem[]): void;
    getDataServer(): Promise<void>;
}

class MyStore implements IMyStore {

    appData: IDataItem[] = [];
    cartItems: IDataItem[] = [];
    countDisable = false;
    quantity= 0; 

    constructor() {
        makeAutoObservable(this);
        this.getDataServer();
    }

    setAppData(newAppData: IDataItem[]) {
        this.appData = newAppData as IDataItem[];
    }

    async getDataServer() {
        const dataServer = await Get.getAppData();
        this.setAppData(dataServer);
    }

    addToCart(product: IDataItem) {
        const existingItem = this.cartItems.find(item => item.id === product.id);
        if (existingItem) {
            runInAction(() => {
                existingItem.quantity += 1;
                if (existingItem.quantity === 10) {
                    existingItem.isCountDisabled = true; 
                }
            });
        } else {
            runInAction(() => {
                this.cartItems.push({ ...product, isCountDisabled: false }); 
            });
        }
    }
    
    removeFromCart(product: IDataItem) {
        runInAction(() => {
            const index = this.cartItems.findIndex(item => item.id === product.id);
            if (index !== -1) {
                const removedItem = this.cartItems[index];
                this.cartItems.splice(index, 1);
                if (removedItem.quantity === 10) {
                    removedItem.isCountDisabled = false; 
                }
            }
        });
    }
    

    setCountDisable(value: boolean) {
        this.countDisable = value;
    }
}

const myStore = new MyStore();
export default myStore;
