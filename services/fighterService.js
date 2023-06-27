import { fighterRepository } from "../repositories/fighterRepository.js";

class FighterService {
  getFighters() {
    const fighters = fighterRepository.getAll();

    if (!fighters) {
      throw Error("Fighters not found");
    }

    return fighters;
  }

  getFighter(id) {
    const fighter = fighterRepository.getOne(id);

    if (!fighter) {
      throw Error("Fighter not found");
    }
    return fighter;
  }

  createFighter(fighterData) {
    const searchFields = {
      name: fighterData.name,
    };
    const isBusy = fighterRepository.findByFields(searchFields);

    if (!isBusy) {
      const updatedData = {
        ...fighterData,
        name: fighterData.name,
        health: fighterData.health || 100,
      };

      const fighter = fighterRepository.create(updatedData);

      if (!fighter) {
        throw Error("Can't create new fighter");
      }

      return fighter;
    }

    throw Error("A user with such data already exists");
  }

  updateFighter(id, fighter) {
    const currentFighter = this.getFighter(id);

    if (currentFighter) {
      const searchFields = { name: fighter.name };
      const isBusy = fighterRepository.findByFields(searchFields);

      if (!isBusy) {
        const updatedFighter = fighterRepository.update(id, fighter);

        if (!updatedFighter) {
          throw Error("Can't update fighter");
        }

        return updatedFighter;
      }
      throw Error("An internal error has occurred");
    }

    throw Error("A fighter with such data already exists");
  }

  deleteFighterById(id) {
    const fighter = this.getFighter(id);

    if (fighter) {
      const isDeleted = fighterRepository.delete(id);

      if (!isDeleted) {
        throw Error("An error occurred while removing");
      }

      return isDeleted;
    }

    throw Error("An internal error has occurred");
  }
}

const fighterService = new FighterService();

export { fighterService };
