//Greeting in various languages
const greetings = [
  "Hello!",
  "Hi there!",
  "Greetings!",
  "Howdy!",
  "Good to see you!",
  "Hey!",
  "What's up?",
  "Bonjour!",
  "Hola!",
  "Namaste!",
  "Salutations!",
  "Good day!",
  "Yo!",
  "Ahoy!",
  "Hiya!",
  "Welcome!",
  "Hallo!",
  "Ciao!",
  "Shalom!",
  "Konnichiwa!",
  "Annyeong!",
  "Zdravstvuyte!",
  "Sawubona!",
  "Salam!",
  "Merhaba!",
  "Dia dhuit!",
  "Szia!",
  "Terve!",
  "Hej!",
  "Aloha!",
  "Privet!",
  "Buenos días!",
  "Buongiorno!",
  "Bom dia!",
  "Tashi Delek!",
  "Jambo!",
  "Vanakkam!",
  "Sawatdee!",
  "Namaskar!",
  "Mabuhay!",
  "Selamat pagi!",
  "Xin chào!",
  "Chào bạn!",
  "Olá!",
  "Salve!",
  "Marhaba!",
  "Yassas!",
  "Geia sou!",
];

// randon greeting generator
function getRandomGreeting() {
  const randomIndex = Math.floor(Math.random() * greetings.length);
  return greetings[randomIndex];
}

export default getRandomGreeting;
