import { userRepository } from "../repositories/userRepository.js";

class UserService {
  getUsers() {
    const users = userRepository.getAll();

    if (!users) {
      throw Error("Users not found");
    }

    return users;
  }

  getUser(id) {
    const user = userRepository.getOne(id);

    if (!user) {
      throw Error("User not found");
    }

    return user;
  }

  createUser(data) {
    const searchFields = { email: data.email, phoneNumber: data.phoneNumber };
    const isBusy = userRepository.findByFields(searchFields);

    if (!isBusy) {
      const user = userRepository.create(data);
      if (!user) {
        throw Error("Can't create new user");
      }

      return user;
    }

    throw Error("A user with such data already exists");
  }

  updateUser(id, data) {
    const user = this.getUser(id);

    if (user) {
      const searchFields = { email: data.email, phoneNumber: data.phoneNumber };
      const isBusy = userRepository.findByFields(searchFields);

      if (!isBusy) {
        const updatedUser = userRepository.update(id, data);

        if (!updatedUser) {
          throw Error("Can't update user");
        }

        return updatedUser;
      }

      throw Error("An internal error has occurred");
    }

    throw Error("A user with such data already exists");
  }

  deleteUser(id) {
    const user = this.getUser(id);

    if (user) {
      const isDeleted = userRepository.delete(id);

      if (!isDeleted) {
        throw Error("An error occurred while removing");
      }

      return isDeleted;
    }

    throw Error("An internal error has occurred");
  }

  search(search) {
    const { email, password } = search;
    if (
      userRepository.findByFields({ email }) &&
      userRepository.findByFields({ password })
    ) {
      return true;
    }
    return false;
  }
}

const userService = new UserService();

export { userService };
