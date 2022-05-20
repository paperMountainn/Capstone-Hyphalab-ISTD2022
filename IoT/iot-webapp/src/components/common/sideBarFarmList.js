import { Icon } from 'semantic-ui-react';
import { RiTempHotLine } from "react-icons/ri";
import { GoLightBulb } from "react-icons/go";
import { AiOutlineCamera } from "react-icons/ai";
const sideBarFarmList = [
    {
        title:"Temperature",
        link:"/farm/temp/",
        icon:<Icon circular inverted color='orange'><RiTempHotLine /></Icon>

    }, 
    {
        title:"Humidity",
        link:"/farm/humid/",
        icon:<Icon name="cloud" circular inverted color='orange'/>
    }, 
    {
        title:"Light",
        link:"/farm/light",
        icon:<Icon circular inverted color='orange'><GoLightBulb /></Icon>
    }, 
    {
        title:"Camera",
        link:"/farm/cam",
        icon:<Icon circular inverted color='orange'><AiOutlineCamera /></Icon>
    }

]

export {sideBarFarmList};