export const validateEmail = email => {
  const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return regex.test(email);
};

export const validateName = name => {
  return /^[A-Za-zÀ-ÖØ-öø-ÿ\s]+$/.test(name) && name.length >= 3;
};

export const validateDate = date => {
  const regex = /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/\d{4}$/;
  return regex.test(date);
};

export const isCPFValid = cpf => {
  cpf = cpf.replace(/\D/g, '');
  if (cpf.length !== 11) return false;

  if (/^(\d)\1{10}$/.test(cpf)) return false;

  let sum = 0;
  for (let i = 0; i < 9; i++) {
    sum += parseInt(cpf.charAt(i)) * (10 - i);
  }
  let digit1 = 11 - (sum % 11);
  digit1 = digit1 >= 10 ? 0 : digit1;

  sum = 0;
  for (let i = 0; i < 10; i++) {
    sum += parseInt(cpf.charAt(i)) * (11 - i);
  }
  let digit2 = 11 - (sum % 11);
  digit2 = digit2 >= 10 ? 0 : digit2;

  return cpf.charAt(9) == digit1 && cpf.charAt(10) == digit2;
};

export const isCNPJValid = cnpj => {
  cnpj = cnpj.replace(/\D/g, '');
  if (cnpj.length !== 14) return false;

  if (/^(\d)\1{13}$/.test(cnpj)) return false;

  let sum = 0;
  let multipliers1 = [5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2];
  for (let i = 0; i < 12; i++) {
    sum += parseInt(cnpj.charAt(i)) * multipliers1[i];
  }
  let digit1 = 11 - (sum % 11);
  digit1 = digit1 >= 10 ? 0 : digit1;

  sum = 0;
  let multipliers2 = [6, 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2];
  for (let i = 0; i < 13; i++) {
    sum += parseInt(cnpj.charAt(i)) * multipliers2[i];
  }
  let digit2 = 11 - (sum % 11);
  digit2 = digit2 >= 10 ? 0 : digit2;

  return cnpj.charAt(12) == digit1 && cnpj.charAt(13) == digit2;
};

export const validatePassword = password => {
  const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d@$!%*?&]{8,}$/;
  return regex.test(password);
};

export const formatPhone = phone => {
  phone = phone.replace(/\D/g, '');

  phone = phone.slice(0, 11);

  if (phone.length <= 10) {
    phone = phone.replace(/(\d{2})(\d{0,4})(\d{0,4})/, (_, ddd, part1, part2) =>
      part2 ? `(${ddd}) ${part1}-${part2}` : part1 ? `(${ddd}) ${part1}` : `(${ddd}`
    );
  } else {
    phone = phone.replace(/(\d{2})(\d{5})(\d{0,4})/, (_, ddd, part1, part2) =>
      part2 ? `(${ddd}) ${part1}-${part2}` : `(${ddd}) ${part1}`
    );
  }

  return phone;
};

export const formatCPF = cpf => {
  cpf = cpf.replace(/\D/g, '');

  cpf = cpf.slice(0, 11);

  return cpf.replace(/(\d{3})(\d{0,3})(\d{0,3})(\d{0,2})/, (_, p1, p2, p3, p4) =>
    p4 ? `${p1}.${p2}.${p3}-${p4}` : p3 ? `${p1}.${p2}.${p3}` : p2 ? `${p1}.${p2}` : p1
  );
};

export const formatCNPJ = cnpj => {
  cnpj = cnpj.replace(/\D/g, '');

  cnpj = cnpj.slice(0, 14);

  return cnpj.replace(/(\d{2})(\d{0,3})(\d{0,3})(\d{0,4})(\d{0,2})/, (_, p1, p2, p3, p4, p5) =>
    p5
      ? `${p1}.${p2}.${p3}/${p4}-${p5}`
      : p4
        ? `${p1}.${p2}.${p3}/${p4}`
        : p3
          ? `${p1}.${p2}.${p3}`
          : p2
            ? `${p1}.${p2}`
            : p1
  );
};

export const formatDate = date => {
  date = date.replace(/\D/g, '');
  date = date.slice(0, 8);

  return date.replace(/(\d{2})(\d{0,2})(\d{0,4})/, (_, d, m, y) =>
    y ? `${d}/${m}/${y}` : m ? `${d}/${m}` : d
  );
};
