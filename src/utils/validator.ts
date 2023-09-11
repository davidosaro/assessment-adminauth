export default function validateInput(type: string, value: string, emptyMessage: string) {
  if (!value) throw new Error(emptyMessage);

  switch(type) {
    case "email": return validateEmail(value);
    case "password": return validatePassword(value);
  }
}
function validateEmail(value: string) {
  //validate value is email
  const pattern = new RegExp(/^[a-zA-Z0-9.]+@[a-zA-Z0-9]+\.[A-Za-z]+$/);
  if (!pattern.test(value)) throw new Error("Please Enter Valid Email")
}

function validatePassword(value: string) {
  const passwordPattern = /^(?=.*[A-Z])(?=.*\d).{6,}$/;
  if (!passwordPattern.test(value)) throw new Error("Password should be more than 6, One Uppercase and One Number. No Special characters")
}