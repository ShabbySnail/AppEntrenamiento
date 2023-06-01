export function register (email, password) {
    return firebase.auth().createUserWithEmailAndPassword(email, password)
    .then((userCredential) => {
      // Nuevo usuario registrado con éxito
      const user = userCredential.user;
      // Realiza cualquier acción adicional, como guardar datos adicionales en Firebase Realtime Database
    })
    .catch((error) => {
      // Ocurrió un error durante el registro
      const errorCode = error.code;
      const errorMessage = error.message;
      // Maneja el error de acuerdo a tus necesidades

      if (errorCode === 'auth/weak-password') {
        alert('Contraseña débil.');
      }
      else {
        alert(errorMessage);
      }

      console.log(error);
    });
}

export function login (email, password) {
    return firebase.auth().signInWithEmailAndPassword(email, password)
    .then((userCredential) => {
      // Usuario inició sesión con éxito
      const user = userCredential.user;
      // Realiza cualquier acción adicional, como redirigir a otra página
    })
    .catch((error) => {
      // Ocurrió un error durante el inicio de sesión
      const errorCode = error.code;
      const errorMessage = error.message;
      // Maneja el error de acuerdo a tus necesidades

      if (errorCode === 'auth/wrong-password') {
        alert('Contraseña incorrecta.');
      }
      else {
        alert(errorMessage);
      }

      console.log(error);
    });
}

export function logout () {
    return firebase.auth().signOut()
    .then(() => {
      // Sign-out exitoso
    })
    .catch((error) => {
      // Ocurrió un error durante el sign-out
      // Maneja el error de acuerdo a tus necesidades

      console.log(error);

      alert('Ocurrió un error durante el sign-out.');

    });
}
