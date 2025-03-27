import bcrypt from 'bcryptjs';

const password = 'admin123';
const saltRounds = 10;

bcrypt.hash(password, saltRounds, (err, hash) => {
  if (err) {
    console.error('Chyba při generování hashe:', err);
    return;
  }
  console.log('Hash hesla:', hash);
}); 