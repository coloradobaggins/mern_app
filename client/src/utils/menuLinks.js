import { IoBarChartSharp } from 'react-icons/io5';
import { MdQueryStats } from 'react-icons/md';
import { FaWpforms } from 'react-icons/fa';
import { ImProfile } from 'react-icons/im';

const menuLinks = [
    {id:1, text:'Resumen', path:'/', icon: <IoBarChartSharp />},
    {id:2, text:'Operaciones', path:'all-operations', icon: <MdQueryStats />},
    {id:3, text:'Nueva operacion', path:'add-operation', icon: <FaWpforms />},
    {id:4, text:'Perfil', path:'profile', icon: <ImProfile />},
];

export default menuLinks;