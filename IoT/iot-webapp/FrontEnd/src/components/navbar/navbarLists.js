// import { MailOutlined, AppstoreOutlined, SettingOutlined } from '@ant-design/icons';

import { Icon } from 'semantic-ui-react';
import { RiTempHotLine } from "react-icons/ri";
import { Link } from 'react-router-dom';

import { Avatar, Image } from 'antd';

import { IoFileTrayStacked } from "react-icons/io5";
function getItem(label, key, icon, children, type) {
        return {
          key,
          icon,
          children,
          label,
          type,
        };
      }
      
    //   const items = [
    //     getItem('Temperature', 'sub1', <RiTempHotLine />, [
    //       getItem('Option 1', '1'),
    //       getItem('Option 2', '2'),
    //       getItem('Option 3', '3'),
    //       getItem('Option 4', '4'),
    //     ]),
    //     getItem('Humidity', 'sub2', <FaCloudversify />, [
    //       getItem('Option 5', '5'),
    //       getItem('Option 6', '6'),
    //       getItem('Submenu', 'sub3', null, [getItem('Option 7', '7'), getItem('Option 8', '8')]),
    //     ]),
    //     getItem('Observation Images', 'sub4', <AiOutlineCamera />, [
    //       getItem('Option 9', '9'),
    //       getItem('Option 10', '10'),
    //       getItem('Option 11', '11'),
    //       getItem('Option 12', '12'),
    //     ]),
    //   ];
export const farmNavItems = [
    getItem(<Link to="/farm/temperature">Temperature</Link>, '1', <RiTempHotLine />),
    getItem(<Link to="/farm/humidity">Humidity</Link>, '2', <Icon name="cloud" />),
    getItem(<Link to="/farm/co2">CO2</Link>, '3', <Icon name="cloudsmith" />),
    getItem(<Link to="/farm/observations">Observation Images</Link>, '4', <Icon name="camera" />)
    ];

export const incubationNavItems = [
    getItem(<Link to="/incubation/temperature">Temperature</Link>, '1', <RiTempHotLine />),
    getItem(<Link to="/incubation/humidity">Humidity</Link>, '2', <Icon name="cloud" />),
    getItem(<Link to="/incubation/contaminations">Contamination Checks</Link>, '3', <Icon name="bug" />),
    getItem(<Link to="/incubation/observations">Observation Images</Link>, '4', <Icon name="camera" />),
];
export const rackNavItems = [
    getItem(<Link to="/rack">Ongoing Phases</Link>, '1', <Icon name='sync alternate' />),
    getItem(<Link to="/rack/rack-cycles">Rack Cycles</Link>, '3', <Icon name="circle notch" />),
    getItem(<Link to="/rack/racks-all">All Racks</Link>, '2', <IoFileTrayStacked />),
    // getItem(<Link to="/rack-phases/new">Add a New Rack</Link>, '2', <Icon  name="add" />),
    
    // getItem(<Link to="/rack-phases/:rackId">Rack Details</Link>, '4', <Icon name="camera" />),
];

export const mainPageNavItems = [
    getItem(<div><Avatar style={{margin: "10px"}}>S</Avatar>Welcome Back, Stephanie!</div>, '1'),  
    
]

export const taskPageNavItems = [
    getItem(<Link to="/operator/my-tasks">My Tasks</Link>, '1', <Icon name="sticky note outline" />),
    // getItem(<Link to="/operator/profile">Operator Details</Link>, '2', <Icon name="user outline" />),
]

export const engineerPageNavItems = [
    getItem(<Link to="/engineer/assign-tasks">Tasks Assigned</Link>, '1', <Icon name="sticky note" />),    
    // getItem(<Link to="/engineer/my-tasks">My Tasks</Link>, '2', <Icon name="sticky note outline" />),
    // getItem(<Link to="/engineer/profile">Engineer Details</Link>, '3', <Icon name="user outline" />),
]
