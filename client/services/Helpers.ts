class Helpers {
  checkEmailValidity(email: string) {
    const result = email.match(/^[\S^@]+@+[\S^@]+\.+[\S^@]+$/);
    return result ? true : false;
  }

  checkPhoneNumberValidity(phoneNumber: string) {
    const result = phoneNumber.match(/^(\(\d{3}\)|\d{3})-?\d{3}-?\d{4}$/);
    return result ? true : false;
  }

  checkPasswordStrength(password: string) {
    const length = password.length;
    let complexity = 0;

    if (password.match(/(?=.*[a-z])/)) complexity += 26;
    if (password.match(/(?=.*[A-Z])/)) complexity += 26;
    if (password.match(/(?=.*[0-9])/)) complexity += 10;
    if (password.match(/([!-\/:-@[-`{-~])/)) complexity += 32;

    const strength = Math.floor(Math.log(Math.pow(complexity, length)) / Math.log(2));

    if (strength > 100) return "Very Strong";
    else if (strength > 75) return "Strong";
    else if (strength > 50) return "Medium";
    else return "Weak";
  }

  shortenFileName(fileName: string) {
    const lastDotIndex = fileName.lastIndexOf(".");
    const name = fileName.slice(0, lastDotIndex), extension = fileName.slice(lastDotIndex);

    if (name.length > 15) return `${name.substring(0, 10)}...${name.substring(name.length - 3)}${extension}`; 
    else return `${name}${extension}`;
  }
}

export default new Helpers();