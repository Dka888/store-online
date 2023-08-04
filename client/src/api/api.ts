import { Category } from '../utils/Categoris';
import {Product} from '../utils/Product';

export const products: Product[] = [
    { name: 'Iphone 14', description: 'new technologu i etc.', price: 1400, imgUrl: 'https://images.pexels.com/photos/198192/pexels-photo-198192.jpeg', category: Category.Technology, rating: 1, id: '1' },
    { name: 'MacBook', description: 'jhseflwiaget;iea/hgrot', price: 1900, imgUrl: 'https://images.pexels.com/photos/198192/pexels-photo-198192.jpeg', rating: 4, category: Category.Technology, id: '2' },
    { name: 'Iphone 14', description: 'new technologu i etc.', price: 1400, imgUrl: 'https://images.pexels.com/photos/198192/pexels-photo-198192.jpeg', category: Category.Food, rating: 1, id: '3' },
    { name: 'Iphone 14', description: 'new technologu i etc.', price: 1400, imgUrl: 'https://images.pexels.com/photos/198192/pexels-photo-198192.jpeg', category: Category.Sport, rating: 3, id: '4' },
    { name: 'Iphone 14', description: 'new technologu i etc.', price: 1400, imgUrl: 'https://images.pexels.com/photos/198192/pexels-photo-198192.jpeg', category: Category.Garden, rating: 5, id: '5' },
];