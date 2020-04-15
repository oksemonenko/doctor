import Medico1 from '../img/type1/Medico1.jpg'
import Medico2 from '../img/type1/Medico2.jpg'
import Medico3 from '../img/type1/Medico3.jpeg'
import Medico4 from '../img/type1/Medico4.jpg'
import Musico1 from '../img/type2/Musico1.jpeg'
import Musico2 from '../img/type2/Musico2.jpeg'
import Musico3 from '../img/type2/Musico3.jpg'
import Musico4 from '../img/type2/Musico4.jpeg'
import Musico5 from '../img/type2/Musico5.jpg'
import Simple1 from '../img/type3/Simple1.jpeg'
import Simple2 from '../img/type3/Simple2.jpeg'
import Simple3 from '../img/type3/Simple3.jpg'
import Simple4 from '../img/type3/Simple4.jpeg'
import Hero1 from '../img/type4/Hero1.jpeg'
import Hero2 from '../img/type4/Hero2.jpeg'
import Hero3 from '../img/type4/Hero3.jpeg'
import Hero4 from '../img/type4/Hero4.jpg'
import Hero5 from '../img/type4/Hero5.jpeg'
import Bailarin1 from '../img/type5/Bailarin1.jpg'
import Bailarin2 from '../img/type5/Bailarin2.jpg'
import Bailarin3 from '../img/type5/Bailarin3.jpeg'
import Bailarin4 from '../img/type5/Bailarin4.jpg'
import Elegante1 from '../img/type6/Elegante1.jpg'
import Elegante2 from '../img/type6/Elegante2.jpg'
import Elegante3 from '../img/type6/Elegante3.jpg'
import Comedian1 from '../img/type7/Comedian1.jpg'
import Comedian2 from '../img/type7/Comedian2.jpg'
import Comedian3 from '../img/type7/Comedian3.jpg'
import Comedian4 from '../img/type7/Comedian4.jpeg'

const stacksData = [
  {
    title: 'Doctor',
    index: 0,
    items: [
      {
        index: 0,
        image: Medico1,
        name: 'La medicina es amor, de lo contrario no cuesta nada',
        description: 'Paul de Cruy',

      },
      {
        index: 1,
        image: Medico2,
        name: 'Ningún arte es más útil que la medicina',
        description: 'Plinio el Viejo',
      },
      {
        index: 2,
        image: Medico3,
        name: 'La medicina es verdaderamente la más noble de todas las artes',
        description: 'Hipócrates',
      },
      {
        index: 3,
        image: Medico4,
        name: 'El doctor es filósofo. Porque no hay mucha diferencia entre sabiduría y medicina',
        description: 'Hipócrates',

      },
    ]
  },
  {
    title: 'Músico',
    index: 1,
    items: [
      {
        index: 0,
        image: Musico1,
        name: 'El piano desaparece y se nos revela una música',
        description: 'Heinrich Heine',
      },
      {
        index: 1,
        image: Musico2,
        name: 'De todas las artes, la música es la más humana y generalizada',
        description: 'Jean Paul',
      },
      {
        index: 2,
        image: Musico3,
        name: 'La música es el lenguaje universal de la humanidad',
        description: 'Henry W. Longfellow',
      },
      {
        index: 3,
        image: Musico4,
        name: 'La música expresa lo que no podemos decir y sobre lo que es imposible permanecer en silencio',
        description: 'Hugo Victor Marie',
      },
      {
        index: 4,
        image: Musico5,
        name: 'La música muestra a una persona esas posibilidades de grandeza que hay en su alma',
        description: 'Ralph W. Emerson',
      },
    ]
  },
  {
    title: 'Hombre simple',
    index: 2,
    items: [
      {
        index: 0,
        image: Simple1,
        name: 'La simplicidad es una condición necesaria para lo bello',
        description: 'Leo Tolstoi',
      },
      {
        index: 1,
        image: Simple2,
        name: 'La simplicidad es la huella del genio',
        description: 'C. Berne',
      },
      {
        index: 2,
        image: Simple3,
        name: 'Es mucho más difícil ser simple que complejo',
        description: 'John Ruskin',
      },
      {
        index: 3,
        image: Simple4,
        name: 'El arte de ser feliz radica en la capacidad de encontrar la felicidad en las cosas simples',
        description: 'Henry Ward Beecher',
      },
    ]
  },
  {
    title: 'Superhéroe',
    index: 3,
    items: [
      {
        index: 0,
        image: Hero1,
        name: 'No siempre puedes ser un héroe, pero siempre puedes seguir siendo humano',
        description: 'Johann Wolfgang von Goethe',
      },
      {
        index: 1,
        image: Hero2,
        name: 'El héroe hace lo que se puede hacer. Otros no',
        description: 'Romain Rolland',
      },
      {
        index: 2,
        image: Hero3,
        name: 'El héroe no es más valiente que una persona común, pero conserva el coraje cinco minutos más',
        description: 'Ralph W. Emerson',
      },
      {
        index: 3,
        image: Hero4,
        name: 'Un héroe es aquel que crea vida a pesar de la muerte, que conquista la muerte',
        description: 'Maxim Gorki',
      },
      {
        index: 4,
        image: Hero5,
        name: 'Un héroe tiende a acercarse a los héroes. Esta misteriosa y hermosa propiedad es una de las maravillas de la naturaleza',
        description: 'Balthasar Gracian i Morales',
      },
    ]
  },
  {
    title: 'Bailarín',
    index: 0,
    items: [
      {
        index: 0,
        image: Bailarin1,
        name: '',
        description: '',
      },
      {
        index: 1,
        image: Bailarin2,
        name: '',
        description: '',
      },
      {
        index: 2,
        image: Bailarin3,
        name: '',
        description: '',
      },
      {
        index: 3,
        image: Bailarin4,
        name: '',
        description: '',
      },
    ],
  },
  {
    title: 'El Elegante',
    index: 0,
    items: [
      {
        index: 0,
        image: Elegante1,
        name: 'La simplicidad es la esencia de la elegancia',
        description: 'Sophia Loren',
      },
      {
        index: 1,
        image: Elegante2,
        name: 'La elegancia no es algo que te llame la atención, sino algo que se hunde en tu memoria',
        description: 'Giorgio Armani',
      },
      {
        index: 2,
        image: Elegante3,
        name: 'La elegancia reside más en el corazón y el alma que en el exterior, ' +
          'pero con nuestras acciones y palabras demostramos su presencia en nosotros',
        description: 'Ruth Hogan',
      },
    ],
  },
  {
    title: 'Comedian',
    index: 0,
    items: [
      {
        index: 0,
        image: Comedian1,
        name: 'Sin lo ridículo, no puedes entender al serio',
        description: 'Platón',
      },
      {
        index: 1,
        image: Comedian2,
        name: 'Mi manera de bromear es decir la verdad. No hay nada más divertido en el mundo',
        description: 'Bernard Shaw',
      },
      {
        index: 2,
        image: Comedian3,
        name: 'Cualquier humor serio comienza con el hecho de que dejas de tomar en serio a tu propia persona',
        description: 'Hermann Hesse',
      },
      {
        index: 3,
        image: Comedian4,
        name: 'Humor es el talento para llegar arbitrariamente de buen humor',
        description: 'Immanuel Kant',
      },
    ],
  },
];

export default stacksData;
