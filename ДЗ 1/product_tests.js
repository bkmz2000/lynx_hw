import { ProductList } from "./product.js";

// Long live to CahtGPT3!
const books = [
    {
        name: "To Kill a Mockingbird",
        price: 10.99,
        quantity: 50,
        description: "Harper Lee's Pulitzer Prize-winning novel about racial injustice in 1930s Alabama."
    },
    {
        name: "1984",
        price: 8.99,
        quantity: 40,
        description: "George Orwell's dystopian novel about a totalitarian government that controls every aspect of its citizens' lives."
    },
    {
        name: "The Great Gatsby",
        price: 12.99,
        quantity: 30,
        description: "F. Scott Fitzgerald's classic novel about love, wealth, and the corrupting influence of the American Dream."
    },
    {
        name: "The Catcher in the Rye",
        price: 9.99,
        quantity: 45,
        description: "J.D. Salinger's coming-of-age novel about a teenage boy's existential crisis in the aftermath of his expulsion from prep school."
    },
    {
        name: "Pride and Prejudice",
        price: 7.99,
        quantity: 55,
        description: "Jane Austen's romantic novel about the Bennet sisters and their search for love and happiness in early 19th century England."
    },
    {
        name: "Moby-Dick",
        price: 14.99,
        quantity: 20,
        description: "Herman Melville's epic novel about the obsessive quest of Captain Ahab to hunt down the white whale that destroyed his ship and severed his leg."
    },
    {
        name: "The Odyssey",
        price: 11.99,
        quantity: 35,
        description: "Homer's ancient Greek epic poem about the ten-year journey of the warrior Odysseus to return home after the Trojan War."
    },
    {
        name: "The Lord of the Rings",
        price: 25.99,
        quantity: 15,
        description: "J.R.R. Tolkien's epic fantasy novel about the quest of Frodo Baggins to destroy the One Ring and defeat the Dark Lord Sauron."
    },
    {
        name: "Harry Potter and the Philosopher's Stone",
        price: 13.99,
        quantity: 25,
        description: "J.K. Rowling's first novel in the Harry Potter series, which tells the story of the boy wizard's first year at Hogwarts School of Witchcraft and Wizardry."
    },
    {
        name: "The Hunger Games",
        price: 10.99,
        quantity: 30,
        description: "Suzanne Collins' dystopian novel about a young girl named Katniss who is forced to compete in a televised fight to the death against other teenagers from her district."
    },
    {
        name: "The Nightingale",
        price: 12.99,
        quantity: 20,
        description: "Historical fiction novel set in World War II France"
    },

    {
        name: "Becoming",
        price: 18.50,
        quantity: 15,
        description: "Memoir by former First Lady Michelle Obama"
    },

    {
        name: "The Testaments",
        price: 22.00,
        quantity: 10,
        description: "Sequel to Margaret Atwood's 'The Handmaid's Tale'"
    },

    {
        name: "Educated",
        price: 15.00,
        quantity: 25,
        description: "Memoir by Tara Westover about growing up in a strict Mormon family and eventually leaving to pursue education"
    },

    {
        name: "The Dutch House",
        price: 21.95,
        quantity: 18,
        description: "Novel by Ann Patchett about a brother and sister's complicated relationship and the house they grew up in"
    },

    {
        name: "The Silent Patient",
        price: 13.99,
        quantity: 30,
        description: "Mystery thriller about a woman who shoots her husband and refuses to speak afterwards"
    },

    {
        name: "The Water Dancer",
        price: 20.00,
        quantity: 12,
        description: "Historical fiction novel about a young slave with a mysterious power who becomes involved in the Underground Railroad"
    },

    {
        name: "Bad Blood",
        price: 16.50,
        quantity: 22,
        description: "Investigative journalism book by John Carreyrou about the rise and fall of biotech company Theranos"
    },

    {
        name: "The Topeka School",
        price: 19.99,
        quantity: 14,
        description: "Novel by Ben Lerner about a family living in Kansas in the late 1990s"
    },

    {
        name: "Normal People",
        price: 14.95,
        quantity: 28,
        description: "Novel by Sally Rooney about the complicated relationship between two Irish teenagers"
    },
    {
        name: "The Catcher in the Rye",
        price: 8.99,
        quantity: 12,
        description: "A classic novel by J.D. Salinger, featuring the iconic character Holden Caulfield and his struggles with adolescence and societal norms."
    },
    {
        name: "The Great Gatsby",
        price: 11.99,
        quantity: 8,
        description: "A masterpiece by F. Scott Fitzgerald, exploring themes of wealth, love, and the American Dream in the 1920s."
    },
    {
        name: "To Kill a Mockingbird",
        price: 9.75,
        quantity: 15,
        description: "A Pulitzer Prize-winning novel by Harper Lee, set in the 1930s in the Deep South and addressing issues of racism and injustice."
    },
    {
        name: "1984",
        price: 10.25,
        quantity: 10,
        description: "A dystopian novel by George Orwell, depicting a totalitarian society and the dangers of government surveillance and propaganda."
    },
    {
        name: "Animal Farm",
        price: 7.99,
        quantity: 20,
        description: "A satirical novella by George Orwell, criticizing the Soviet Union and exploring themes of corruption and revolution."
    },
    {
        name: "Pride and Prejudice",
        price: 12.50,
        quantity: 5,
        description: "A classic novel by Jane Austen, depicting the lives and romances of the Bennet sisters in 19th-century England."
    },
    {
        name: "The Lord of the Rings",
        price: 25.99,
        quantity: 3,
        description: "A trilogy of epic fantasy novels by J.R.R. Tolkien, set in the fictional world of Middle-earth and following the adventures of hobbits, elves, dwarves, and men."
    },
    {
        name: "The Hitchhiker's Guide to the Galaxy",
        price: 9.99,
        quantity: 18,
        description: "A comedic science fiction series by Douglas Adams, following the misadventures of an unwitting human and his alien friend as they travel through space."
    },
    {
        name: "The Da Vinci Code",
        price: 13.75,
        quantity: 7,
        description: "A thriller novel by Dan Brown, exploring conspiracy theories and hidden messages in art and religion."
    },
    {
        name: "The Hunger Games",
        price: 8.50,
        quantity: 14,
        description: "A dystopian young adult novel by Suzanne Collins, featuring a society where children are forced to compete in a televised death match."
    },
    {
        name: "Harry Potter and the Philosopher's Stone",
        price: 10.99,
        quantity: 10,
        description: "The first book in the beloved Harry Potter series by J.K. Rowling, following the adventures of a young orphan boy who discovers he is a wizard."
    },
    {
        name: "The Chronicles of Narnia",
        price: 18.99,
        quantity: 4,
        description: "A series of seven fantasy novels by C.S. Lewis, set in the magical world of Narnia and featuring talking animals, witches, and a lion who is also a messiah figure."
    },
    {
        name: "The Hobbit",
        price: 9.25,
        quantity: 12,
        description: "A children's fantasy novel by J.R.R. Tolkien, featuring hobbits, dwarves, and a dragon, and serving as a prequel to The Lord of the Rings."
    },
];

let bookList = new ProductList(books);

console.log(bookList.query('name-starts-Harry&price-<=20&quantity->=5'), '\n')

console.log(bookList.query('description-contains-science&price->10', '\n'))

console.log(bookList.query('name-contains-fiction&price-<=15&quantity->=3', '\n'))

console.log(bookList.query('description-contains-programming&price-<=30&quantity->=2', '\n'))

console.log(bookList.query('description-contains-mystery&price->=5&quantity-<10', '\n'))

console.log(bookList.query('name-contains-biography&price->=15&quantity->=10', '\n'))

console.log(bookList.query('description-contains-classic&price->=20&quantity->=5', '\n'))

console.log(bookList.query('description-contains-romance&price->=10&quantity->=2', '\n'))

console.log(bookList.query('description-contains-Comedy&price-<=25&quantity->=5', '\n'))

console.log(bookList.query('description-contains-Adventure&price-<=20&quantity->=5', '\n'))