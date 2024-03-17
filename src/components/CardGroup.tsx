
import CardComponent from "./CardComponent";
import { Group, CardGrid} from "@vkontakte/vkui";
import '@vkontakte/vkui/dist/vkui.css';


const CardGroup = () => {

    return (
        <div>
        <Group >
            <CardGrid size="s" className="grid">
                <CardComponent/> 
            </CardGrid>
        </Group>
        </div>
    )
}

export default CardGroup;