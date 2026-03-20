const availableImages = [
  "Abby Santiago.jpg", "Cleo Wadley.jpg", "Denise Bean.jpg", "Eric Harper.jpg", 
  "Ilene Harper.jpg", "Jackie Thomas.jpg", "Janice Little.jpg", "Jo Trahan.jpg", 
  "Kenae Thibodeaux.jpg", "Kendon Thibodeaux.jpg", "LaTarsha Brown.jpg", 
  "Lacarria Green.jpg", "Mary Sias.jpg", "Millie Chatham.jpg", "Oscar White.jpg", 
  "Sharon Delesbore.jpg", "Sharon Tanner.jpg", "Sunday Price-Johnson.jpg", "Wendy Terrell.jpg"
];

function getImageForMember(name) {
  const parts = name.split(/[\s,.-]+/);
  for (const file of availableImages) {
    const fileBase = file.split('.')[0].toLowerCase();
    if (name.toLowerCase().includes(fileBase)) return `/images/team/${file}`;
    const lastName = parts[parts.length - 1].toLowerCase();
    const firstName = parts.length > 1 && parts[0].toLowerCase() === 'dr' ? parts[1].toLowerCase() : parts[0].toLowerCase();
    if (fileBase.includes(lastName) && fileBase.includes(firstName)) return `/images/team/${file}`;
  }
  return "FALLBACK";
}

const names = [ 'Cleo Wadley, Ed.D.', 'Millie Chatham', 'Lacarria Green', 'Sharon Tanner', 'Mary Sias', 'Kendon Thibodeaux', 'Ilene Harper, Ph.D.', 'Denise Bean', 'Sharon Delesbore, Ph.D.', 'LaTarsha Brown', 'Eric Harper', 'Jo Trahan', 'Wendy Terrell', 'Oscar White', 'Sunday Price-Johnson, Ph.D., M.Ed', 'Janice Little, Ph.D.', 'Jackie Thomas, BSN, RN', 'Kenae Thibodeaux', 'Abby Santiago'];

names.forEach(n => console.log(n, "=>", getImageForMember(n)));
