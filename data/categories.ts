import { TbBeach, TbMountain, TbPool } from 'react-icons/tb';
import {
  GiBarn,
  GiBoatFishing,
  GiCactus,
  GiCastle,
  GiCaveEntrance,
  GiForestCamp,
  GiIsland,
  GiWindmill,
} from 'react-icons/gi';
import { FaSkiing } from 'react-icons/fa';
import { BsSnow } from 'react-icons/bs';
import { IoDiamond } from 'react-icons/io5';
import { MdOutlineVilla } from 'react-icons/md';

export const categories = {
  Beach: {
    icon: TbBeach,
    description: 'This property is close to the beach!',
  },
  Windmills: {
    icon: GiWindmill,
    description: 'This property has windmills!',
  },
  Modern: {
    icon: MdOutlineVilla,
    description: 'This property is modern!',
  },
  Countryside: {
    icon: TbMountain,
    description: 'This property is in the countryside!',
  },
  Pools: {
    icon: TbPool,
    description: 'This is property has a beautiful pool!',
  },
  Islands: {
    icon: GiIsland,
    description: 'This property is on an island!',
  },
  Lake: {
    icon: GiBoatFishing,
    description: 'This property is near a lake!',
  },
  Skiing: {
    icon: FaSkiing,
    description: 'This property has skiing activities!',
  },
  Castles: {
    icon: GiCastle,
    description: 'This property is an ancient castle!',
  },
  Caves: {
    icon: GiCaveEntrance,
    description: 'This property is in a spooky cave!',
  },
  Camping: {
    icon: GiForestCamp,
    description: 'This property offers camping activities!',
  },
  Arctic: {
    icon: BsSnow,
    description: 'This property is in an arctic environment!',
  },
  Desert: {
    icon: GiCactus,
    description: 'This property is in the desert!',
  },
  Barns: {
    icon: GiBarn,
    description: 'This property is in a barn!',
  },
  Lux: {
    icon: IoDiamond,
    description: 'This property is brand new and luxurious!',
  },
};
