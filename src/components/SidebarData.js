import React from 'react';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import * as IoIcons from 'react-icons/io';
import * as RiIcons from 'react-icons/ri';

export const SidebarData = [
  {
    title: 'Home',
    path: '/home',
    icon: <AiIcons.AiFillHome />
  },
  {
    title: 'Sourcing',
    path: '/sourcing',
    icon: <IoIcons.IoIosPaper />,
    iconClosed: <RiIcons.RiArrowDownSFill />,
    iconOpened: <RiIcons.RiArrowUpSFill />,

    subNav: [
      {
        title: 'Nodes',
        path: '/sourcing/nodes',
        icon: <IoIcons.IoIosPaper />,
        cName: 'sub-nav'
      },
      {
        title: 'Rules',
        path: '/sourcing/rules',
        icon: <IoIcons.IoIosPaper />,
        cName: 'sub-nav'
      },
      {
        title: 'Configurations',
        path: '/sourcing/sourcingconfig',
        icon: <IoIcons.IoIosPaper />
      }
    ]
  },
  {
    title: 'Capacity',
    path: '/capacity',
    icon: <FaIcons.FaEnvelopeOpenText />,

    iconClosed: <RiIcons.RiArrowDownSFill />,
    iconOpened: <RiIcons.RiArrowUpSFill />,

    subNav: [
      {
        title: 'Capacity 1',
        path: '/capacity/capacity',
        icon: <FaIcons.FaEnvelopeOpenText />
      },
      {
        title: 'Capacity 2',
        path: '/capacity/capacity2',
        icon: <FaIcons.FaEnvelopeOpenText />
      }
    ]
  },
  {
    title: 'Availability',
    path: '/availability',
    icon: <IoIcons.IoMdPeople />,
    iconClosed: <RiIcons.RiArrowDownSFill />,
    iconOpened: <RiIcons.RiArrowUpSFill />,

    subNav: [
      {
        title: 'Soft Allocations',
        path: '/availability/softallocations',
        icon: <IoIcons.IoMdPeople />
      },
      {
        title: 'Availability 2',
        path: '/availability/availability2',
        icon: <IoIcons.IoMdPeople />
      }
    ]
  },
  {
    title: 'Audits',
    path: '/Audits',
    icon: <AiIcons.AiOutlineAudit />
  } 
];
