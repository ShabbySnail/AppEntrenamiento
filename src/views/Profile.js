/*import { AuthContext } from '../context/AuthContext';
import { useContext } from 'react';
import 'firebase/auth';

const Profile = () => {
  const { currentUser, isLoading, login, logout, register } = useContext(AuthContext);

  const handleLogin = async () => {
    // Handle login logic
    await login(email, password);
  };

  const handleLogout = async () => {
    // Handle logout logic
    await logout();
  };

  const handleRegister = async () => {
    // Handle register logic
    await register(email, password, name, age, sex, weight);
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <View>
      {currentUser ? (
        <View>
          <Text>Welcome, {currentUser.email}!</Text>
          <Button title="Logout" onPress={handleLogout} />
        </View>
      ) : (
        <View>
          <Text>Please log in or register:</Text>
          <Button title="Login" onPress={handleLogin} />
          <Button title="Register" onPress={handleRegister} />
        </View>
      )}
    </View>
  );
};

export default Profile;

*/